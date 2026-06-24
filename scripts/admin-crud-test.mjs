import { spawn } from "node:child_process";
import { copyFile, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const rootDir = process.cwd();
const contentPath = path.join(rootDir, "data", "content.json");
const adminUsersPath = path.join(rootDir, "data", "admin-users.json");
const setupKey = "test-admin-setup-key";
const credentials = { username: "qa-admin", password: "qa-admin-password", displayName: "QA Admin" };
const port = process.env.ADMIN_CRUD_TEST_PORT || "3025";
const baseUrl = `http://127.0.0.1:${port}`;
let sessionCookie = "";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function request(pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.auth === false || !sessionCookie ? {} : { cookie: sessionCookie }),
      ...(options.headers || {}),
    },
  });

  const cookie = response.headers.get("set-cookie");
  if (cookie) sessionCookie = cookie.split(";")[0];

  const text = await response.text();
  const body = text ? JSON.parse(text) : {};
  return { response, body };
}

async function waitForServer(processRef) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 15000) {
    if (processRef.exitCode !== null) {
      throw new Error("테스트 서버가 시작 전에 종료되었습니다.");
    }

    try {
      const response = await fetch(baseUrl);
      if (response.status < 500) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  throw new Error("테스트 서버 시작 시간이 초과되었습니다.");
}

async function run() {
  const tempDir = await mkdtemp(path.join(tmpdir(), "unisorder-admin-test-"));
  const backupPath = path.join(tempDir, "content.backup.json");
  const adminUsersBackupPath = path.join(tempDir, "admin-users.backup.json");
  await copyFile(contentPath, backupPath);
  try {
    await copyFile(adminUsersPath, adminUsersBackupPath);
  } catch {
    await writeFile(adminUsersBackupPath, JSON.stringify({ users: [] }), "utf8");
  }
  await writeFile(adminUsersPath, JSON.stringify({ users: [] }, null, 2), "utf8");

  const server = spawn("npm", ["run", "start", "--", "-p", port], {
    cwd: rootDir,
    env: {
      ...process.env,
      SUPABASE_URL: "",
      SUPABASE_SERVICE_ROLE_KEY: "",
      UNISORDER_ADMIN_SETUP_KEY: setupKey,
      UNISORDER_ADMIN_SESSION_SECRET: "test-admin-session-secret",
      PORT: port,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  const serverOutput = [];
  server.stdout.on("data", (chunk) => serverOutput.push(chunk.toString()));
  server.stderr.on("data", (chunk) => serverOutput.push(chunk.toString()));

  try {
    await waitForServer(server);

    const unauthorized = await request("/api/admin/faqs", { auth: false });
    assert(unauthorized.response.status === 401, "인증 없는 FAQ 조회가 차단되어야 합니다.");

    const setup = await request("/api/admin/setup", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ setupKey, ...credentials }),
    });
    assert(setup.response.status === 201, "첫 관리자 생성 API가 201을 반환해야 합니다.");
    assert(setup.body.user?.username === credentials.username, "첫 관리자 아이디가 응답되어야 합니다.");
    assert(sessionCookie.includes("unisorder_admin_session="), "로그인 세션 쿠키가 설정되어야 합니다.");

    const session = await request("/api/admin/session");
    assert(session.body.authenticated === true, "세션 조회가 로그인 상태를 반환해야 합니다.");

    const createdUser = await request("/api/admin/users", {
      method: "POST",
      body: JSON.stringify({
        username: "qa-sub-admin",
        password: "qa-sub-admin-password",
        displayName: "QA Sub Admin",
      }),
    });
    assert(createdUser.response.status === 201, "관리자 계정 등록 API가 201을 반환해야 합니다.");
    assert(createdUser.body.user?.username === "qa-sub-admin", "관리자 계정 등록 응답에 아이디가 있어야 합니다.");

    const updatedUser = await request(`/api/admin/users/${createdUser.body.user.id}`, {
      method: "PUT",
      body: JSON.stringify({
        username: "qa-sub-admin",
        displayName: "QA Sub Admin Updated",
        isActive: true,
      }),
    });
    assert(updatedUser.response.status === 200, "관리자 계정 수정 API가 200을 반환해야 합니다.");
    assert(updatedUser.body.user.displayName === "QA Sub Admin Updated", "관리자 이름이 수정되어야 합니다.");

    const deletedUser = await request(`/api/admin/users/${createdUser.body.user.id}`, { method: "DELETE" });
    assert(deletedUser.response.status === 200, "관리자 계정 삭제 API가 200을 반환해야 합니다.");

    const createdFaq = await request("/api/admin/faqs", {
      method: "POST",
      body: JSON.stringify({
        question: "QA 등록 테스트 질문",
        answer: "QA 등록 테스트 답변",
        sortOrder: 777,
        isPublished: true,
        showOnHome: true,
      }),
    });
    assert(createdFaq.response.status === 201, "FAQ 등록 API가 201을 반환해야 합니다.");
    assert(createdFaq.body.faq?.id, "FAQ 등록 응답에 id가 있어야 합니다.");

    const faqId = createdFaq.body.faq.id;
    const updatedFaq = await request(`/api/admin/faqs/${faqId}`, {
      method: "PUT",
      body: JSON.stringify({
        ...createdFaq.body.faq,
        question: "QA 수정 테스트 질문",
        showOnHome: false,
      }),
    });
    assert(updatedFaq.response.status === 200, "FAQ 수정 API가 200을 반환해야 합니다.");
    assert(updatedFaq.body.faq.question === "QA 수정 테스트 질문", "FAQ 질문이 수정되어야 합니다.");

    const deletedFaq = await request(`/api/admin/faqs/${faqId}`, { method: "DELETE" });
    assert(deletedFaq.response.status === 200, "FAQ 삭제 API가 200을 반환해야 합니다.");

    const faqList = await request("/api/admin/faqs");
    assert(!faqList.body.faqs.some((faq) => faq.id === faqId), "삭제한 FAQ가 목록에서 사라져야 합니다.");

    const guideSlug = `qa-guide-${Date.now()}`;
    const createdGuide = await request("/api/admin/guides", {
      method: "POST",
      body: JSON.stringify({
        slug: guideSlug,
        title: "QA 등록 테스트 가이드",
        category: "QA",
        description: "QA 등록 테스트용 이용가이드입니다.",
        duration: "약 1분",
        iconName: "file",
        sortOrder: 888,
        isPublished: true,
        blocks: [
          {
            type: "overview",
            title: "QA 개요",
            body: "QA 등록 테스트 본문입니다.",
          },
          {
            type: "steps",
            title: "QA 단계",
            items: [
              {
                title: "등록 확인",
                body: "등록된 가이드가 공개 페이지에서 보이는지 확인합니다.",
                bullets: ["등록", "조회", "삭제"],
              },
            ],
          },
        ],
      }),
    });
    assert(createdGuide.response.status === 201, "가이드 등록 API가 201을 반환해야 합니다.");

    const guideId = createdGuide.body.guide.id;
    const publicGuide = await fetch(`${baseUrl}/guide/${guideSlug}`);
    const publicGuideHtml = await publicGuide.text();
    assert(publicGuide.status === 200, "등록한 가이드 공개 페이지가 200이어야 합니다.");
    assert(publicGuideHtml.includes("QA 등록 테스트 가이드"), "등록한 가이드 제목이 공개 페이지에 보여야 합니다.");

    const updatedGuide = await request(`/api/admin/guides/${guideId}`, {
      method: "PUT",
      body: JSON.stringify({
        ...createdGuide.body.guide,
        title: "QA 수정 테스트 가이드",
        description: "QA 수정 테스트용 이용가이드입니다.",
      }),
    });
    assert(updatedGuide.response.status === 200, "가이드 수정 API가 200을 반환해야 합니다.");
    assert(updatedGuide.body.guide.title === "QA 수정 테스트 가이드", "가이드 제목이 수정되어야 합니다.");

    const deletedGuide = await request(`/api/admin/guides/${guideId}`, { method: "DELETE" });
    assert(deletedGuide.response.status === 200, "가이드 삭제 API가 200을 반환해야 합니다.");

    const guideList = await request("/api/admin/guides");
    assert(!guideList.body.guides.some((guide) => guide.id === guideId), "삭제한 가이드가 목록에서 사라져야 합니다.");

    const finalContent = JSON.parse(await readFile(contentPath, "utf8"));
    assert(!finalContent.faqs.some((faq) => faq.id === faqId), "삭제한 FAQ가 데이터 파일에서 사라져야 합니다.");
    assert(!finalContent.guides.some((guide) => guide.id === guideId), "삭제한 가이드가 데이터 파일에서 사라져야 합니다.");

    console.log("Admin CRUD QA passed");
  } catch (error) {
    console.error(serverOutput.join(""));
    throw error;
  } finally {
    server.kill("SIGTERM");
    await new Promise((resolve) => setTimeout(resolve, 500));
    await copyFile(backupPath, contentPath);
    await copyFile(adminUsersBackupPath, adminUsersPath);
    await rm(tempDir, { recursive: true, force: true });
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

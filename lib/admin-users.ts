import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";

export type AdminUser = {
  id: string;
  username: string;
  displayName: string;
  passwordHash: string;
  isActive: boolean;
  sessionVersion: number;
  createdAt: string;
  updatedAt: string;
};

export type PublicAdminUser = Omit<AdminUser, "passwordHash">;

export type AdminUserInput = {
  username: string;
  password: string;
  displayName?: string;
};

const localAdminUsersPath = () => path.join(process.cwd(), "data", "admin-users.json");
const supabaseUrl = () => process.env.SUPABASE_URL?.replace(/\/$/, "");
const supabaseServiceRoleKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;
const hasSupabaseConfig = () => Boolean(supabaseUrl() && supabaseServiceRoleKey());

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeUsername(value: unknown) {
  if (typeof value !== "string") throw new Error("아이디를 입력해주세요.");
  const username = value.trim().toLowerCase();
  if (!/^[a-z0-9._-]{4,32}$/.test(username)) {
    throw new Error("아이디는 영문 소문자, 숫자, ., _, - 조합으로 4~32자까지 입력할 수 있습니다.");
  }
  return username;
}

function normalizeDisplayName(value: unknown, username: string) {
  if (typeof value === "string" && value.trim()) return value.trim().slice(0, 40);
  return username;
}

function ensurePassword(value: unknown) {
  if (typeof value !== "string" || value.length < 8) {
    throw new Error("비밀번호는 8자 이상으로 입력해주세요.");
  }
  return value;
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("base64url");
  const keyLength = 64;
  const hash = scryptSync(password, salt, keyLength).toString("base64url");
  return `scrypt$${keyLength}$${salt}$${hash}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [algorithm, keyLengthText, salt, hash] = storedHash.split("$");
  const keyLength = Number(keyLengthText);
  if (algorithm !== "scrypt" || !salt || !hash || !Number.isFinite(keyLength)) return false;

  const expected = Buffer.from(hash, "base64url");
  const actual = scryptSync(password, salt, keyLength);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function toPublicAdminUser(user: AdminUser): PublicAdminUser {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}

function fromSupabaseUser(row: Record<string, unknown>): AdminUser {
  return {
    id: String(row.id),
    username: normalizeUsername(row.username),
    displayName: normalizeDisplayName(row.display_name, String(row.username)),
    passwordHash: String(row.password_hash),
    isActive: row.is_active !== false,
    sessionVersion: Number(row.session_version ?? 1),
    createdAt: String(row.created_at ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
  };
}

function toSupabaseUser(user: AdminUser) {
  return {
    id: user.id,
    username: user.username,
    display_name: user.displayName,
    password_hash: user.passwordHash,
    is_active: user.isActive,
    session_version: user.sessionVersion,
  };
}

async function supabaseRequest<T>(pathName: string, init?: RequestInit): Promise<T> {
  const baseUrl = supabaseUrl();
  const serviceRoleKey = supabaseServiceRoleKey();
  if (!baseUrl || !serviceRoleKey) {
    throw new Error("Supabase 환경변수가 설정되지 않았습니다.");
  }

  const response = await fetch(`${baseUrl}/rest/v1/${pathName}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      "content-type": "application/json",
      prefer: "return=representation",
      ...(init?.headers ?? {}),
    },
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = isRecord(payload) && typeof payload.message === "string" ? payload.message : "Supabase 요청에 실패했습니다.";
    throw new Error(message);
  }

  return payload as T;
}

async function readLocalUsers() {
  try {
    const raw = await readFile(localAdminUsersPath(), "utf8");
    const parsed = JSON.parse(raw) as { users?: AdminUser[] };
    return Array.isArray(parsed.users) ? parsed.users.map(normalizeStoredUser) : [];
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") return [];
    throw error;
  }
}

function normalizeStoredUser(user: Partial<AdminUser>): AdminUser {
  const username = normalizeUsername(user.username);
  return {
    id: typeof user.id === "string" && user.id ? user.id : randomUUID(),
    username,
    displayName: normalizeDisplayName(user.displayName, username),
    passwordHash: typeof user.passwordHash === "string" ? user.passwordHash : "",
    isActive: user.isActive !== false,
    sessionVersion: Number.isFinite(user.sessionVersion) ? Number(user.sessionVersion) : 1,
    createdAt: typeof user.createdAt === "string" ? user.createdAt : new Date().toISOString(),
    updatedAt: typeof user.updatedAt === "string" ? user.updatedAt : new Date().toISOString(),
  };
}

async function writeLocalUsers(users: AdminUser[]) {
  const filePath = localAdminUsersPath();
  const tempPath = `${filePath}.tmp`;
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(tempPath, `${JSON.stringify({ users }, null, 2)}\n`, "utf8");
  await rename(tempPath, filePath);
}

export async function getAdminUsers() {
  if (hasSupabaseConfig()) {
    const rows = await supabaseRequest<Record<string, unknown>[]>("admin_users?select=*&order=created_at.asc");
    return rows.map(fromSupabaseUser);
  }

  return readLocalUsers();
}

export async function getPublicAdminUsers() {
  const users = await getAdminUsers();
  return users.map(toPublicAdminUser);
}

export async function getAdminUserCount() {
  const users = await getAdminUsers();
  return users.length;
}

export async function getAdminUserById(id: string) {
  if (hasSupabaseConfig()) {
    const rows = await supabaseRequest<Record<string, unknown>[]>(
      `admin_users?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
    );
    return rows[0] ? fromSupabaseUser(rows[0]) : undefined;
  }

  const users = await readLocalUsers();
  return users.find((user) => user.id === id);
}

export async function verifyAdminCredentials(usernameInput: unknown, passwordInput: unknown) {
  const username = normalizeUsername(usernameInput);
  const password = ensurePassword(passwordInput);
  const users = await getAdminUsers();
  const user = users.find((item) => item.username === username && item.isActive);
  if (!user || !verifyPassword(password, user.passwordHash)) return undefined;
  return user;
}

export async function createAdminUser(input: AdminUserInput) {
  const username = normalizeUsername(input.username);
  const password = ensurePassword(input.password);
  const now = new Date().toISOString();
  const user: AdminUser = {
    id: randomUUID(),
    username,
    displayName: normalizeDisplayName(input.displayName, username),
    passwordHash: hashPassword(password),
    isActive: true,
    sessionVersion: 1,
    createdAt: now,
    updatedAt: now,
  };

  if (hasSupabaseConfig()) {
    const [created] = await supabaseRequest<Record<string, unknown>[]>("admin_users", {
      method: "POST",
      body: JSON.stringify(toSupabaseUser(user)),
    });
    return toPublicAdminUser(fromSupabaseUser(created));
  }

  const users = await readLocalUsers();
  if (users.some((item) => item.username === username)) {
    throw new Error("이미 사용 중인 아이디입니다.");
  }
  await writeLocalUsers([...users, user]);
  return toPublicAdminUser(user);
}

export async function updateAdminUser(id: string, input: Partial<AdminUserInput & { isActive: boolean }>) {
  const users = await getAdminUsers();
  const existing = users.find((user) => user.id === id);
  if (!existing) throw new Error("관리자 계정을 찾을 수 없습니다.");

  const nextUsername = input.username ? normalizeUsername(input.username) : existing.username;
  if (users.some((user) => user.id !== id && user.username === nextUsername)) {
    throw new Error("이미 사용 중인 아이디입니다.");
  }

  const next: AdminUser = {
    ...existing,
    username: nextUsername,
    displayName: input.displayName !== undefined ? normalizeDisplayName(input.displayName, nextUsername) : existing.displayName,
    isActive: typeof input.isActive === "boolean" ? input.isActive : existing.isActive,
    passwordHash: input.password ? hashPassword(ensurePassword(input.password)) : existing.passwordHash,
    sessionVersion: input.password ? existing.sessionVersion + 1 : existing.sessionVersion,
    updatedAt: new Date().toISOString(),
  };

  if (hasSupabaseConfig()) {
    const [updated] = await supabaseRequest<Record<string, unknown>[]>(`admin_users?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(toSupabaseUser(next)),
    });
    return toPublicAdminUser(fromSupabaseUser(updated));
  }

  await writeLocalUsers(users.map((user) => (user.id === id ? next : user)));
  return toPublicAdminUser(next);
}

export async function deleteAdminUser(id: string) {
  const users = await getAdminUsers();
  const existing = users.find((user) => user.id === id);
  if (!existing) throw new Error("관리자 계정을 찾을 수 없습니다.");
  if (users.filter((user) => user.isActive && user.id !== id).length === 0) {
    throw new Error("활성 관리자 계정은 최소 1개 이상 필요합니다.");
  }

  if (hasSupabaseConfig()) {
    await supabaseRequest<Record<string, unknown>[]>(`admin_users?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    return;
  }

  await writeLocalUsers(users.filter((user) => user.id !== id));
}

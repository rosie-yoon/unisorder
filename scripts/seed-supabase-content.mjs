import { readFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const contentPath = path.join(rootDir, "data", "content.json");
const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function supabaseRequest(pathname, init = {}) {
  assert(supabaseUrl, "SUPABASE_URL is required.");
  assert(serviceRoleKey, "SUPABASE_SERVICE_ROLE_KEY is required.");

  const response = await fetch(`${supabaseUrl}/rest/v1/${pathname}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      "content-type": "application/json",
      prefer: "resolution=merge-duplicates,return=representation",
      ...(init.headers || {}),
    },
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(typeof payload?.message === "string" ? payload.message : `Supabase request failed: ${response.status}`);
  }

  return payload;
}

function toSupabaseFaq(faq) {
  return {
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    sort_order: faq.sortOrder,
    is_published: faq.isPublished,
    show_on_home: faq.showOnHome,
  };
}

function toSupabaseGuide(guide) {
  return {
    id: guide.id,
    slug: guide.slug,
    title: guide.title,
    category: guide.category,
    description: guide.description,
    duration: guide.duration,
    icon_name: guide.iconName,
    sort_order: guide.sortOrder,
    is_published: guide.isPublished,
    video_url: guide.videoUrl ?? null,
    blocks: guide.blocks,
  };
}

async function run() {
  const content = JSON.parse(await readFile(contentPath, "utf8"));
  assert(Array.isArray(content.faqs), "content.faqs must be an array.");
  assert(Array.isArray(content.guides), "content.guides must be an array.");

  if (content.faqs.length) {
    await supabaseRequest("faqs?on_conflict=id", {
      method: "POST",
      body: JSON.stringify(content.faqs.map(toSupabaseFaq)),
    });
  }

  if (content.guides.length) {
    await supabaseRequest("guides?on_conflict=id", {
      method: "POST",
      body: JSON.stringify(content.guides.map(toSupabaseGuide)),
    });
  }

  console.log(`Seeded ${content.faqs.length} FAQs and ${content.guides.length} guides to Supabase.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

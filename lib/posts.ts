import fs from "node:fs";
import path from "node:path";

const postsDir = path.join(process.cwd(), "content", "blog");
export type Post = { slug: string; title: string; date: string; description: string; content: string; wordCount: number; readingTime: number };

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
    data[key] = value;
  }
  return { data, content: match[2].trim() };
}

export function getAllPosts(): Post[] {
  return fs.readdirSync(postsDir).filter(file => file.endsWith(".mdx")).map(file => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data, content } = parseFrontmatter(raw);
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    return { slug, title: data.title || slug, date: data.date || "2026-01-01", description: data.description || "", content, wordCount, readingTime: Math.max(1, Math.ceil(wordCount / 190)) };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string) { return getAllPosts().find(post => post.slug === slug); }

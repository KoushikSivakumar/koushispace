# koushispace

Personal portfolio for Koushik Sivakumar. Built with Next.js 15, TypeScript and a file-based MDX-style blog.

## design

- warm off-white light theme + NEXUS-inspired monochrome dark theme
- JetBrains Mono / system monospace fallback
- 820px reading column
- visible 2px section rules and restrained 1px row dividers
- separate `/`, `/projects`, `/blog`, and `/blog/[slug]` pages
- command-palette style simplicity without turning the site into a terminal gimmick
- responsive mobile layout

## run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## deploy to Vercel

Import the GitHub repository into Vercel as a Next.js project. No environment variables are required.

## write a blog post

Create a new file inside `content/blog/`, for example `content/blog/my-new-post.mdx`:

```mdx
---
title: "my new post"
date: "2026-09-20"
description: "a short description shown on the blog index."
---

Write normally in Markdown.

## a heading

Use paragraphs, **bold**, lists, links, blockquotes and fenced code blocks.

```ts
console.log("hello");
```
```

The filename becomes the URL slug: `content/blog/my-new-post.mdx` → `/blog/my-new-post`.

## theme

The theme button stores the preference in `localStorage` and applies it to the `<html>` element after hydration. `suppressHydrationWarning` is intentionally used on `<html>` because browser extensions can inject attributes before React hydrates the page, which was the source of the reported `webcrx` mismatch.

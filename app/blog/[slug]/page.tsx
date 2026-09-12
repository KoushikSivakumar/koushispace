import { notFound } from "next/navigation";
import { Markdown } from "../../../components/Markdown";
import { getAllPosts, getPost } from "../../../lib/posts";
export function generateStaticParams() { return getAllPosts().map(post => ({ slug: post.slug })); }
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <main className="site-shell page-enter article-page"><article><header className="article-header"><p className="eyebrow">blog</p><h1>{post.title}</h1><p className="article-description">{post.description}</p><div className="article-meta">{post.wordCount} words · {post.readingTime} min read · {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "2-digit" })}</div></header><Markdown source={post.content} /></article></main>;
}

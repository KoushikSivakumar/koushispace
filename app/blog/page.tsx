import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
export default function BlogPage() {
  const posts = getAllPosts();
  return <main className="site-shell page-enter inner-page"><div className="page-heading"><p className="eyebrow">developer notebook</p><h1>blog</h1><p className="page-lede">notes from building software, learning systems, and figuring things out in public.</p></div><div className="blog-list">{posts.map(post => <Link className="blog-row" href={`/blog/${post.slug}`} key={post.slug}><span><strong>{post.title}</strong><small>{post.description}</small></span><time>{post.date}</time></Link>)}</div><div className="back-link"><Link href="/">← back home</Link></div></main>;
}

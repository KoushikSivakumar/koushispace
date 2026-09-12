import Link from "next/link";
import { projects } from "../../data/site";
export default function ProjectsPage() {
  return <main className="site-shell page-enter inner-page"><div className="page-heading"><p className="eyebrow">archive</p><h1>projects</h1><p className="page-lede">things i've built, broken, rebuilt, and kept around.</p></div><div className="project-list project-archive">{projects.map(project => <article className={`project-row ${project.featured ? "featured" : ""}`} key={project.name}><span className="number">{project.number}</span><div className="project-body"><h2 className="project-title">{project.name}</h2><p className="project-description">{project.description}</p><p className="project-tags">{project.tags}</p></div><a className="project-link" href={project.href} target="_blank" rel="noreferrer">github ↗</a></article>)}</div><div className="back-link"><Link href="/">← back home</Link></div></main>;
}

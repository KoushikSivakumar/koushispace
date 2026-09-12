import Link from "next/link";
import { Section } from "../components/Section";
import { experience, projects, site, stack, writing } from "../data/site";

export default function Home() {
  return (
    <main className="site-shell page-enter">
      <section className="intro">
        <p className="eyebrow">{site.location}</p>
        <p className="eyebrow">{site.role}</p>
        <h1>{site.name}</h1>
        <p className="lede">{site.intro}</p>
        <p className="status"><span className="dot" /> {site.status}</p>
      </section>

      <Section id="work" title="work">
        <div className="work-list">
          {experience.map(item => (
            <article className="work-row" key={`${item.company}-${item.role}`}>
              <div><div className="row-title">{item.company}</div><div className="muted">{item.role}</div></div>
              <div className="work-copy">{item.description}</div>
              <div className="period">{item.period}</div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="selected work">
        <div className="project-list">
          {projects.slice(0, 3).map(project => (
            <Link className={`project-row ${project.featured ? "featured" : ""}`} href="/projects" key={project.name}>
              <span className="number">{project.number}</span>
              <span className="project-body"><span className="project-title">{project.name}</span><span className="project-description">{project.description}</span><span className="project-tags">{project.tags}</span></span>
              <span className="project-link">view ↗</span>
            </Link>
          ))}
        </div>
        <div className="section-more"><Link href="/projects">all projects →</Link></div>
      </Section>

      <Section title="open source / activity">
        <div className="activity-grid">
          <div>
            <p className="subhead">github</p>
            <p className="activity-copy">building in public, experimenting often, and keeping the useful parts around.</p>
            <a className="inline-link" href={site.links.github} target="_blank" rel="noreferrer">github profile ↗</a>
          </div>
          <div>
            <p className="subhead">contribution graph</p>
            <img className="github-evidence" src="https://ghchart.rshah.org/KoushikSivakumar" alt="GitHub contribution graph for Koushik Sivakumar" loading="lazy" />
          </div>
        </div>
      </Section>

      <Section title="writing">
        <div className="writing-list">
          {writing.map(post => (
            <Link className="writing-row" href={post.href} key={post.title}>
              <span>{post.title}</span><time>{post.date}</time>
            </Link>
          ))}
        </div>
        <div className="section-more"><Link href="/blog">all posts →</Link></div>
      </Section>

      <Section title="things i use">
        <div className="things-grid">
          <div><p className="subhead">languages</p><p>{stack.languages.join(" · ")}</p></div>
          <div><p className="subhead">frameworks / data</p><p>{stack.frameworks.join(" · ")}</p></div>
          <div><p className="subhead">systems / workflow</p><p>{stack.systems.join(" · ")}</p></div>
        </div>
      </Section>

      <Section title="connect">
        <div className="links">
          <a href={site.links.github} target="_blank" rel="noreferrer">github ↗</a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer">linkedin ↗</a>
          <a href={site.links.instagram} target="_blank" rel="noreferrer">instagram ↗</a>
          <a href={site.links.email}>email ↗</a>
        </div>
      </Section>

      <footer><div className="quote">“build quietly. make it matter.”</div><div className="footer-meta"><span>© 2026 {site.name.toLowerCase()}</span><span>{site.university.toLowerCase()}</span></div></footer>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const commands = [
  ["about", "/"],
  ["projects", "/projects"],
  ["blog", "/blog"],
];

export function SiteHeader() {
  const [dark, setDark] = useState(false);
  const [palette, setPalette] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("koushispace-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = saved ? saved === "dark" : prefersDark;
    document.documentElement.dataset.theme = initialDark ? "dark" : "light";
    setDark(initialDark);
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPalette(value => !value);
      }
      if (event.key === "Escape") setPalette(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("koushispace-theme", next ? "dark" : "light");
    setDark(next);
  };

  const filtered = commands.filter(([name]) => name.includes(query.toLowerCase()));

  return <>
    <header className="site-header">
      <div className="site-shell header-inner">
        <Link href="/" className="brand" aria-label="Koushik Sivakumar home">ks</Link>
        <nav aria-label="primary navigation">
          <Link href="/">about</Link><Link href="/projects">projects</Link><Link href="/blog">blog</Link>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">{dark ? "light" : "dark"}</button>
          <button className="command-key" onClick={() => setPalette(true)} aria-label="Open command palette">⌘K</button>
        </nav>
      </div>
    </header>
    {palette && <div className="palette-backdrop" onMouseDown={() => setPalette(false)}><div className="palette" onMouseDown={event => event.stopPropagation()}><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="jump to..." />{filtered.map(([name, href]) => <Link key={name} href={href} onClick={() => setPalette(false)} className="palette-item"><span>{name}</span><span>↵</span></Link>)}<div className="palette-hint">esc to close · ctrl/cmd + k</div></div></div>}
  </>;
}

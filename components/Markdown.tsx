function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function inline(value: string) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

export function Markdown({ source }: { source: string }) {
  const lines = source.split("\n");
  const nodes: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let code: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      nodes.push(<p key={nodes.length} dangerouslySetInnerHTML={{ __html: inline(paragraph.join(" ")) }} />);
      paragraph = [];
    }
  };

  lines.forEach((line, index) => {
    if (line.trim().startsWith("```")) {
      if (code) {
        nodes.push(<pre key={nodes.length}><code>{code.join("\n")}</code></pre>);
        code = null;
      } else {
        flushParagraph();
        code = [];
      }
      return;
    }
    if (code) { code.push(line); return; }
    if (line.startsWith("## ")) { flushParagraph(); nodes.push(<h2 key={nodes.length}>{line.slice(3)}</h2>); return; }
    if (line.startsWith("> ")) { flushParagraph(); nodes.push(<blockquote key={nodes.length}>{line.slice(2)}</blockquote>); return; }
    if (line.startsWith("- ")) { flushParagraph(); nodes.push(<ul key={nodes.length}><li>{line.slice(2)}</li></ul>); return; }
    if (!line.trim()) { flushParagraph(); return; }
    paragraph.push(line);
  });
  flushParagraph();
  return <div className="prose">{nodes}</div>;
}

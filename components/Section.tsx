export function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section">
      <div className="section-label">{title}</div>
      {children}
    </section>
  );
}

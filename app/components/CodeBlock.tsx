interface CodeBlockProps {
  filename: string;
  children: React.ReactNode;
}

export default function CodeBlock({ filename, children }: CodeBlockProps) {
  return (
    <figure className="my-8 not-prose rounded-xl overflow-hidden shadow-lg" style={{ fontSize: "0.82rem" }}>
      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "#21252b", borderBottom: "1px solid #181a1f" }}
      >
        {/* macOS traffic lights */}
        <div className="flex items-center gap-[6px]">
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#ff5f57" }} />
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#febc2e" }} />
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#28c840" }} />
        </div>
        <span
          className="text-xs font-medium ml-2"
          style={{ color: "#9da5b4", fontFamily: "ui-monospace, monospace" }}
        >
          {filename}
        </span>
      </div>

      {/* Code body */}
      <div
        className="overflow-x-auto"
        style={{ background: "#282c34" }}
      >
        <pre
          className="px-6 py-5 leading-relaxed"
          style={{
            fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace",
            fontSize: "0.82rem",
            lineHeight: "1.75",
            color: "#abb2bf",
            margin: 0,
          }}
        >
          <code>{children}</code>
        </pre>
      </div>
    </figure>
  );
}

/* ── Colour helpers (One Dark palette) ─── */
export const kw  = (s: string) => <span style={{ color: "#c678dd" }}>{s}</span>;   // keyword
export const fn  = (s: string) => <span style={{ color: "#61afef" }}>{s}</span>;   // function / method
export const str = (s: string) => <span style={{ color: "#98c379" }}>{s}</span>;   // string
export const ty  = (s: string) => <span style={{ color: "#e5c07b" }}>{s}</span>;   // type / class
export const cm  = (s: string) => <span style={{ color: "#5c6370", fontStyle: "italic" }}>{s}</span>; // comment
export const num = (s: string) => <span style={{ color: "#d19a66" }}>{s}</span>;   // number
export const op  = (s: string) => <span style={{ color: "#56b6c2" }}>{s}</span>;   // operator / punctuation
export const dc  = (s: string) => <span style={{ color: "#e06c75" }}>{s}</span>;   // decorator / property

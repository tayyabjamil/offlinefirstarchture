export default function Diagram2() {
  const syncItems = ["queue", "push", "pull", "retry", "conflicts", "recovery"];

  return (
    <figure className="my-10 not-prose">
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 overflow-x-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-6 text-center">
          Diagram 2 — WatermelonDB + Custom Sync Layer
        </p>
        <svg
          viewBox="0 0 560 340"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[560px] mx-auto"
          aria-label="WatermelonDB and custom sync layer architecture"
        >
          <defs>
            <marker id="d2-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#6b7280" />
            </marker>
            <marker id="d2-arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#16a34a" />
            </marker>
          </defs>

          {/* React Native */}
          <rect x="180" y="10" width="200" height="44" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
          <text x="280" y="37" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af" fontFamily="ui-sans-serif, sans-serif">React Native</text>

          <line x1="280" y1="54" x2="280" y2="80" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#d2-arrow)" />

          {/* WatermelonDB */}
          <rect x="180" y="80" width="200" height="44" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
          <text x="280" y="107" textAnchor="middle" fontSize="13" fontWeight="600" fill="#15803d" fontFamily="ui-sans-serif, sans-serif">WatermelonDB</text>

          <line x1="280" y1="124" x2="280" y2="150" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#d2-arrow)" />

          {/* Custom Sync Layer box */}
          <rect x="100" y="150" width="360" height="148" rx="12" fill="#fafaf8" stroke="#e5e7eb" strokeWidth="1.5" />
          <text x="280" y="174" textAnchor="middle" fontSize="12" fontWeight="700" fill="#374151" fontFamily="ui-sans-serif, sans-serif">Custom Sync Layer</text>

          {/* Sync items grid */}
          {syncItems.map((item, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const x = 122 + col * 118;
            const y = 186 + row * 44;
            return (
              <g key={item}>
                <rect x={x} y={y} width="100" height="30" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1" />
                <text x={x + 50} y={y + 19} textAnchor="middle" fontSize="11" fill="#6b7280" fontFamily="ui-monospace, monospace">{item}</text>
              </g>
            );
          })}

          <line x1="280" y1="298" x2="280" y2="320" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#d2-arrow)" />

          {/* Backend */}
          <rect x="180" y="320" width="200" height="14" rx="7" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
          <text x="280" y="331" textAnchor="middle" fontSize="12" fontWeight="600" fill="#374151" fontFamily="ui-sans-serif, sans-serif">Backend</text>
        </svg>
      </div>
      <figcaption className="text-center text-sm text-gray-500 mt-3">
        WatermelonDB handles local persistence, but your team still owns the full sync protocol.
      </figcaption>
    </figure>
  );
}

export default function Diagram3() {
  return (
    <figure className="my-10 not-prose">
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 overflow-x-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-6 text-center">
          Diagram 3 — PowerSync Architecture
        </p>
        <svg
          viewBox="0 0 720 310"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[720px] mx-auto"
          aria-label="PowerSync architecture with separate photo sync pipeline"
        >
          <defs>
            <marker id="d3-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#6b7280" />
            </marker>
            <marker id="d3-arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#16a34a" />
            </marker>
            <marker id="d3-arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6" />
            </marker>
          </defs>

          {/* ── Left column: Relational data flow ───────────── */}
          <rect x="10" y="8" width="340" height="294" rx="12" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
          <text x="180" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#374151" fontFamily="ui-sans-serif, sans-serif">Relational Data</text>

          {/* RN/Expo UI */}
          <rect x="60" y="50" width="240" height="42" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
          <text x="180" y="76" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af" fontFamily="ui-sans-serif, sans-serif">React Native / Expo UI</text>

          <line x1="180" y1="92" x2="180" y2="116" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#d3-arrow)" />

          {/* SQLite */}
          <rect x="60" y="116" width="240" height="42" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
          <text x="180" y="142" textAnchor="middle" fontSize="12" fontWeight="600" fill="#15803d" fontFamily="ui-sans-serif, sans-serif">Local SQLite</text>

          {/* Bidirectional sync arrows */}
          <line x1="172" y1="158" x2="172" y2="186" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#d3-arrow)" />
          <line x1="188" y1="186" x2="188" y2="158" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#d3-arrow-green)" />

          {/* PowerSync */}
          <rect x="60" y="186" width="240" height="42" rx="10" fill="#fef9c3" stroke="#fde047" strokeWidth="1.5" />
          <text x="180" y="212" textAnchor="middle" fontSize="12" fontWeight="600" fill="#713f12" fontFamily="ui-sans-serif, sans-serif">PowerSync</text>

          {/* Bidirectional sync arrows */}
          <line x1="172" y1="228" x2="172" y2="256" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#d3-arrow)" />
          <line x1="188" y1="256" x2="188" y2="228" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#d3-arrow-green)" />

          {/* Supabase / PostgreSQL */}
          <rect x="60" y="256" width="240" height="36" rx="10" fill="#fff" stroke="#d1d5db" strokeWidth="1.5" />
          <text x="180" y="274" textAnchor="middle" fontSize="11" fontWeight="600" fill="#374151" fontFamily="ui-sans-serif, sans-serif">Supabase</text>
          <text x="180" y="287" textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="ui-sans-serif, sans-serif">PostgreSQL</text>

          {/* Sync label */}
          <text x="196" y="175" fontSize="9" fill="#6b7280" fontFamily="ui-sans-serif, sans-serif">sync</text>

          {/* ── Right column: Photo / file flow ─────────────── */}
          <rect x="370" y="8" width="340" height="294" rx="12" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
          <text x="540" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#374151" fontFamily="ui-sans-serif, sans-serif">Photos / Files</text>

          {/* Photos / Files */}
          <rect x="420" y="50" width="240" height="42" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
          <text x="540" y="76" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af" fontFamily="ui-sans-serif, sans-serif">Photos / Files (captured)</text>

          <line x1="540" y1="92" x2="540" y2="116" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#d3-arrow)" />

          {/* Device filesystem */}
          <rect x="420" y="116" width="240" height="42" rx="10" fill="#fff" stroke="#d1d5db" strokeWidth="1.5" />
          <text x="540" y="137" textAnchor="middle" fontSize="12" fontWeight="600" fill="#374151" fontFamily="ui-sans-serif, sans-serif">Device Filesystem</text>
          <text x="540" y="151" textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="ui-sans-serif, sans-serif">local_path stored in SQLite</text>

          <line x1="540" y1="158" x2="540" y2="186" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#d3-arrow)" />

          {/* Upload queue */}
          <rect x="420" y="186" width="240" height="42" rx="10" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5" />
          <text x="540" y="207" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e" fontFamily="ui-sans-serif, sans-serif">Upload Queue</text>
          <text x="540" y="221" textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="ui-sans-serif, sans-serif">retry on reconnect</text>

          <line x1="540" y1="228" x2="540" y2="256" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#d3-arrow-blue)" />

          {/* Object storage */}
          <rect x="420" y="256" width="240" height="36" rx="10" fill="#fff" stroke="#d1d5db" strokeWidth="1.5" />
          <text x="540" y="274" textAnchor="middle" fontSize="11" fontWeight="600" fill="#374151" fontFamily="ui-sans-serif, sans-serif">Object Storage</text>
          <text x="540" y="287" textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="ui-sans-serif, sans-serif">S3 / Supabase Storage</text>
        </svg>
      </div>
      <figcaption className="text-center text-sm text-gray-500 mt-3">
        Relational data flows through PowerSync. Photos travel a separate pipeline to object storage.
      </figcaption>
    </figure>
  );
}

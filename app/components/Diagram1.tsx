export default function Diagram1() {
  return (
    <figure className="my-10 not-prose">
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 overflow-x-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-6 text-center">
          Diagram 1 — Architecture Comparison
        </p>
        <svg
          viewBox="0 0 720 300"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[720px] mx-auto"
          aria-label="Traditional vs Offline-First architecture comparison"
        >
          {/* ── Left panel: Traditional ─────────────────────── */}
          <rect x="10" y="10" width="330" height="280" rx="12" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
          <text x="175" y="38" textAnchor="middle" fontSize="13" fontWeight="700" fill="#374151" fontFamily="ui-sans-serif, sans-serif">Traditional</text>

          {/* Nodes */}
          <rect x="110" y="55" width="130" height="38" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5" />
          <text x="175" y="79" textAnchor="middle" fontSize="12" fill="#374151" fontFamily="ui-sans-serif, sans-serif">UI</text>

          <rect x="110" y="125" width="130" height="38" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5" />
          <text x="175" y="149" textAnchor="middle" fontSize="12" fill="#374151" fontFamily="ui-sans-serif, sans-serif">API Request</text>

          <rect x="110" y="195" width="130" height="38" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5" />
          <text x="175" y="219" textAnchor="middle" fontSize="12" fill="#374151" fontFamily="ui-sans-serif, sans-serif">Server</text>

          {/* Arrows down */}
          <line x1="175" y1="93" x2="175" y2="125" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrow-gray)" />
          <line x1="175" y1="163" x2="175" y2="195" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrow-gray)" />
          {/* Return arrow */}
          <path d="M 240 195 Q 280 245 240 233" stroke="#ef4444" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-red)" />
          <text x="270" y="248" fontSize="10" fill="#ef4444" fontFamily="ui-sans-serif, sans-serif">waits</text>

          {/* Network dependency label */}
          <rect x="62" y="252" width="226" height="24" rx="6" fill="#fee2e2" />
          <text x="175" y="268" textAnchor="middle" fontSize="11" fill="#b91c1c" fontFamily="ui-sans-serif, sans-serif" fontWeight="600">Network is required for every action</text>

          {/* ── Right panel: Offline-First ───────────────────── */}
          <rect x="380" y="10" width="330" height="280" rx="12" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
          <text x="545" y="38" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d" fontFamily="ui-sans-serif, sans-serif">Offline-First</text>

          {/* UI node */}
          <rect x="480" y="55" width="130" height="38" rx="8" fill="#fff" stroke="#86efac" strokeWidth="1.5" />
          <text x="545" y="79" textAnchor="middle" fontSize="12" fill="#374151" fontFamily="ui-sans-serif, sans-serif">UI</text>

          {/* Local DB node */}
          <rect x="480" y="125" width="130" height="38" rx="8" fill="#fff" stroke="#86efac" strokeWidth="1.5" />
          <text x="545" y="149" textAnchor="middle" fontSize="12" fill="#374151" fontFamily="ui-sans-serif, sans-serif">Local Database</text>

          {/* Server node */}
          <rect x="480" y="220" width="130" height="38" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5" />
          <text x="545" y="244" textAnchor="middle" fontSize="12" fill="#374151" fontFamily="ui-sans-serif, sans-serif">Server</text>

          {/* Immediate read/write arrow */}
          <line x1="545" y1="93" x2="545" y2="125" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow-green)" />
          <text x="553" y="115" fontSize="10" fill="#16a34a" fontFamily="ui-sans-serif, sans-serif">instant</text>

          {/* Sync arrow */}
          <line x1="545" y1="163" x2="545" y2="220" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow-gray)" />
          <text x="553" y="198" fontSize="10" fill="#6b7280" fontFamily="ui-sans-serif, sans-serif">syncs when ready</text>

          {/* Return arrow from UI */}
          <path d="M 480 144 Q 440 144 440 74 Q 440 74 480 74" stroke="#16a34a" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-green)" strokeDasharray="0" />
          <text x="412" y="118" fontSize="10" fill="#16a34a" fontFamily="ui-sans-serif, sans-serif">responds</text>
          <text x="416" y="130" fontSize="10" fill="#16a34a" fontFamily="ui-sans-serif, sans-serif">immediately</text>

          {/* Network works label */}
          <rect x="432" y="252" width="226" height="24" rx="6" fill="#dcfce7" />
          <text x="545" y="268" textAnchor="middle" fontSize="11" fill="#15803d" fontFamily="ui-sans-serif, sans-serif" fontWeight="600">Works with or without connectivity</text>

          {/* Arrow marker definitions */}
          <defs>
            <marker id="arrow-gray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#9ca3af" />
            </marker>
            <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#16a34a" />
            </marker>
            <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#ef4444" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="text-center text-sm text-gray-500 mt-3">
        Traditional apps block on the network. Offline-first apps write locally first and sync later.
      </figcaption>
    </figure>
  );
}

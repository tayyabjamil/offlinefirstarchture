import Diagram1 from "./components/Diagram1";
import Diagram2 from "./components/Diagram2";
import Diagram3 from "./components/Diagram3";
import {
  SnippetWatermelonModel,
  SnippetWatermelonSync,
  SnippetPowerSyncSchema,
  SnippetPhotoSchema,
  SnippetUploadQueue,
} from "./components/CodeSnippets";

export default function ArticlePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: "var(--accent)" }}
        aria-hidden="true"
      />

      <main className="mx-auto max-w-[760px] px-5 py-14 sm:py-20 sm:px-8">
        {/* ── Tags ────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["React Native", "Expo", "Offline First"].map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "var(--accent-light)",
                color: "var(--accent)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Title ───────────────────────────────────────── */}
        <h1
          className="text-4xl sm:text-5xl font-bold leading-tight mb-5 tracking-tight"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "#111827",
            letterSpacing: "-0.02em",
          }}
        >
          Building Offline-First React Native Apps: What I Learned in
          Production
        </h1>

        {/* ── Subtitle ────────────────────────────────────── */}
        <p
          className="text-xl mb-9 leading-relaxed"
          style={{ color: "#4b5563", fontFamily: "Georgia, serif" }}
        >
          How local databases, WatermelonDB, SQLite and PowerSync change the
          way you think about mobile architecture.
        </p>

        {/* ── Author row ──────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-10">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
            style={{ background: "var(--accent)" }}
            aria-hidden="true"
          >
            MT
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "#111827" }}>
              Muhammad Tayyab
            </p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Senior Mobile / Full-Stack Engineer &nbsp;·&nbsp; 6 min read
            </p>
          </div>
        </div>

        <hr className="divider" />

        {/* ── Hero diagram ────────────────────────────────── */}
        <Diagram1 />

        <hr className="divider" />

        {/* ── Article body ────────────────────────────────── */}
        <article className="prose-article">
          {/* 1. Open */}
          <h2>The Moment the Network Disappears</h2>
          <p>
            An engineer walks into a building for a scheduled fire-safety
            inspection. They open the app, find their job, and start working.
            Three minutes in, their phone loses signal. They&apos;re in a basement
            plant room with no connectivity and a full inspection to complete.
          </p>
          <p>
            They fill in a dozen form fields. They take 20 photos of
            equipment, cabling, and test points. They record BLE measurements
            from sensors. They capture a supervisor&apos;s signature on the device
            screen. And then they finish the job and walk back outside.
          </p>
          <p>
            Here&apos;s the question that matters:{" "}
            <strong>
              what happens if the app needs the server for every single one of
              those actions?
            </strong>
          </p>
          <p>
            It fails. Forms don&apos;t save. Photos don&apos;t store. The engineer loses
            an hour of work and has to restart. That scenario — repeated across
            100+ field engineers in buildings across the country — is the
            problem that forced us to think seriously about offline-first
            architecture.
          </p>
          <p>The key lesson came early and stayed with us throughout the project:</p>
          <blockquote>
            The network cannot be a dependency for the user completing their
            job.
          </blockquote>

          <hr className="divider" />

          {/* 2. What changes */}
          <h2>What Offline-First Actually Changes</h2>
          <p>
            Most mobile apps follow a straightforward mental model: the UI
            needs data, it calls an API, the server responds, and the UI
            renders. That works fine when connectivity is reliable.
          </p>
          <p>
            Offline-first inverts the dependency. Instead of the UI waiting
            for the network, the UI reads from and writes to a{" "}
            <strong>local database on the device</strong>. The server becomes
            something you synchronize with — not something every screen depends
            on in real time.
          </p>
          <p>
            In practice, that shift changes how you design almost everything.
            You stop thinking in API calls and start thinking in local state
            plus sync events. The device holds a real, queryable copy of the
            data it needs. Screens respond immediately because they&apos;re reading
            from local storage, not waiting for a round trip.
          </p>
          <p>
            The network is still there. Synchronization still happens. But it
            runs in the background, and the user never has to care whether it&apos;s
            happening right now or not.
          </p>

          <hr className="divider" />

          {/* 3. Tooling */}
          <h2>What Can You Use in React Native?</h2>
          <p>
            Before choosing a database, it&apos;s worth separating two questions:
            choosing a <strong>local storage layer</strong> and choosing a{" "}
            <strong>synchronization strategy</strong>. These are different
            decisions, and conflating them leads to confusion.
          </p>
          <p>
            Here&apos;s a practical summary of the main options in the React Native
            / Expo ecosystem:
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto my-8 -mx-1">
            <table
              className="w-full text-sm border-collapse"
              style={{ minWidth: "520px" }}
            >
              <thead>
                <tr
                  style={{
                    background: "var(--accent-light)",
                    borderBottom: "2px solid var(--accent)",
                  }}
                >
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    Tool
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    Good for
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    Important limitation
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    tool: "AsyncStorage / MMKV",
                    good: "Preferences, small key/value state",
                    limit: "Not ideal as a main relational database",
                  },
                  {
                    tool: "Expo SQLite",
                    good: "Real SQLite, excellent foundation for structured local data",
                    limit: "Sync logic is your responsibility",
                  },
                  {
                    tool: "WatermelonDB",
                    good: "Reactive queries, SQLite-backed, offline reads/writes",
                    limit: "You still own much of the sync architecture",
                  },
                  {
                    tool: "PowerSync",
                    good: "Synced SQLite, works well with PostgreSQL / Supabase",
                    limit: "Requires fitting your architecture to its model",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.tool}
                    style={{
                      background: i % 2 === 0 ? "#fff" : "#f9fafb",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <td
                      className="py-3 px-4 font-mono font-semibold"
                      style={{ color: "#111827", fontSize: "0.82rem" }}
                    >
                      {row.tool}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: "#374151", lineHeight: "1.5" }}
                    >
                      {row.good}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: "#6b7280", lineHeight: "1.5" }}
                    >
                      {row.limit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            The point isn&apos;t that one tool wins. Choosing a local database and
            designing a synchronization strategy are two distinct problems. You
            can use Expo SQLite as your database and still need to decide how
            data flows between the device and your backend.
          </p>

          <hr className="divider" />

          {/* 4. WatermelonDB */}
          <h2>Our First Approach: WatermelonDB</h2>
          <p>
            WatermelonDB was a natural starting point. It gave us local
            persistence with reactive queries — components re-rendered
            automatically when underlying data changed. It was SQLite-backed,
            which meant we had a real relational database on the device rather
            than a key/value store. Offline reads and writes worked without any
            network involvement.
          </p>
          <p>
            For the early phase of the product, this was enough. Engineers
            could create inspections, fill out forms, and have that data
            persist locally even without connectivity.
          </p>
          </article>

          <SnippetWatermelonModel />

          <article className="prose-article">
          <p>
            What became difficult as the product matured was not storage. It
            was everything that happens after storage.
          </p>
          <blockquote>
            Offline storage is the easy part. Reliable synchronization is the
            hard part.
          </blockquote>
          <p>
            The real complexity showed up in synchronization: tracking which
            local changes had not yet been pushed to the server, pulling remote
            changes without overwriting local edits, handling deleted records,
            managing relationships between tables during a partial sync,
            retrying failed requests without duplicating records, and knowing
            with confidence what had actually been saved remotely.
          </p>
          <p>
            WatermelonDB provides primitives for synchronization — a push/pull
            model — but building a robust, production-grade sync layer on top of
            those primitives is a significant engineering effort. We were
            essentially maintaining a distributed system inside the mobile
            client.
          </p>
        </article>

        <SnippetWatermelonSync />

        <Diagram2 />

        <article className="prose-article">
          <hr className="divider" />

          {/* 5. PowerSync */}
          <h2>Moving Toward PowerSync + SQLite</h2>
          <p>
            As the complexity of our synchronization layer grew, we looked at
            alternatives. PowerSync was interesting because it shifted a large
            part of that responsibility away from our application code.
          </p>
          <p>
            Instead of our team maintaining a custom sync protocol, PowerSync
            maintains a local SQLite database and keeps it synchronized with a
            PostgreSQL backend — in our case, Supabase. The application reads
            and writes locally, exactly as before. The difference is that the
            machinery coordinating those local writes with the remote state is
            not something your team has to build and maintain.
          </p>
          <p>
            That&apos;s a meaningful reduction in application code, and it means
            fewer edge cases to hunt down in production.
          </p>
        </article>

        <SnippetPowerSyncSchema />

        <article className="prose-article">
          <p>
            That said, PowerSync does not solve everything. It removes a layer
            of custom synchronization infrastructure, but you still need to
            think carefully about:
          </p>
          <ul>
            <li>Schema design and how it maps to sync rules</li>
            <li>Permissions — what data each user can see and modify</li>
            <li>Business rules that live outside the sync protocol</li>
            <li>Conflict resolution when two devices edit the same record</li>
            <li>Media and file sync, which is a separate problem entirely</li>
            <li>
              User-visible sync state — does the user know data is still
              uploading?
            </li>
          </ul>
          <p>
            It is a significant reduction in boilerplate, not an elimination of
            distributed-system thinking.
          </p>
        </article>

        <Diagram3 />

        <article className="prose-article">
          <hr className="divider" />

          {/* 6. Photos */}
          <h2>Photos Were a Separate Problem</h2>
          <p>
            One practical lesson that came up quickly was that images do not
            behave like records in a relational table. Trying to synchronize
            inspection photos through the same mechanism as form data creates
            unnecessary complexity and performance issues.
          </p>
          <p>
            The pattern that worked better was to store{" "}
            <strong>metadata about a photo in the database</strong> and treat
            the actual file as a separate pipeline:
          </p>
          </article>

          <SnippetPhotoSchema />
          <SnippetUploadQueue />

          <article className="prose-article">
          <p>
            The actual file lives on the device filesystem. An upload queue
            picks it up when connectivity is available, uploads it to object
            storage, and only updates <code>remote_url</code> and{" "}
            <code>sync_status</code> once the server confirms success. The
            local file is only removed after that confirmation.
          </p>
          <p>
            With tens of thousands of inspection images across the platform,
            this separation mattered. Keeping files on the filesystem and
            tracking their state in the database kept both systems doing what
            they were designed for.
          </p>

          <hr className="divider" />

          {/* 7. Lessons */}
          <h2>What I Learned</h2>

          <div className="my-8 space-y-5">
            {[
              {
                n: "1",
                title: "Offline-first is an architectural decision",
                body: `Not an "offline mode" feature you add at the end. It has to shape how you model data, design screens, and think about failure from the start.`,
              },
              {
                n: "2",
                title: "Your local database becomes part of a distributed system",
                body: "The moment you have data in two places — on the device and on the server — you have a distributed system. Consistency, ordering, and conflict resolution all apply.",
              },
              {
                n: "3",
                title: "Choosing SQLite is easier than designing synchronization",
                body: "The database decision is straightforward. The hard question is: who is responsible for keeping the device copy and the server copy consistent?",
              },
              {
                n: "4",
                title: "Images and files need a separate sync strategy",
                body: "Relational data and binary files have different sizes, semantics, and failure modes. Treat them as separate pipelines.",
              },
              {
                n: "5",
                title: "The best offline UX is invisible",
                body: "When the app works identically with or without connectivity, users stop thinking about it. That's the goal.",
              },
            ].map((lesson) => (
              <div
                key={lesson.n}
                className="flex gap-4 p-5 rounded-xl"
                style={{
                  background: "#f9fafb",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: "var(--accent)" }}
                >
                  {lesson.n}
                </span>
                <div>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "#111827", fontSize: "0.95rem" }}
                  >
                    {lesson.title}
                  </p>
                  <p
                    style={{
                      color: "#4b5563",
                      fontSize: "0.92rem",
                      lineHeight: "1.65",
                      margin: 0,
                    }}
                  >
                    {lesson.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p>
            At Harmony Fire / Auro, this architecture supported a production
            application used by more than 100 field engineers. Working on it
            changed how I think about mobile architecture: I now design the
            failure path and synchronization model before assuming the network
            will always be there.
          </p>

          <hr className="divider" />

          {/* 8. Conclusion */}
          <h2>Closing Thoughts</h2>
          <p>
            If you&apos;re building a React Native or Expo application where users
            genuinely need to work without connectivity, think carefully about
            how much synchronization infrastructure your team wants to own.
          </p>
          <p>
            WatermelonDB gives you significant control over the synchronization
            process. Expo SQLite gives you a capable local database foundation
            you can pair with any sync strategy you choose. A sync engine like
            PowerSync can remove a large amount of custom synchronization work
            when your architecture fits its model well.
          </p>
          <p>
            The important decision isn&apos;t simply{" "}
            <em>&quot;which database library should I use?&quot;</em> It&apos;s:
          </p>
          <blockquote>
            Who is responsible for keeping all of these copies of the data
            consistent?
          </blockquote>
          <p>Answer that question first. The rest follows.</p>
        </article>

        {/* ── Author card / Footer ─────────────────────────── */}
        <hr className="divider" />
        <footer className="mt-10 pt-4">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: "#f9fafb", border: "1px solid var(--border)" }}
          >
            <div className="flex items-start gap-5">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{ background: "var(--accent)" }}
                aria-hidden="true"
              >
                MT
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-bold text-base"
                  style={{ color: "#111827" }}
                >
                  Muhammad Tayyab
                </p>
                <p
                  className="text-sm mb-4"
                  style={{ color: "var(--muted)" }}
                >
                  Senior Mobile / Full-Stack Engineer
                </p>
                <p
                  className="text-sm mb-5"
                  style={{ color: "#4b5563", lineHeight: "1.65" }}
                >
                  Have you built an offline-first React Native app? I&apos;d love to
                  hear how you approached sync.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      label: "Portfolio",
                      href: "https://tayyabjamil.github.io/portfolio",
                    },
                    {
                      label: "GitHub",
                      href: "https://github.com/tayyabjamil",
                    },
                    {
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/in/muhammad-tayyab-2b31251b8",
                    },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold px-4 py-2 rounded-full transition-colors hover:opacity-80"
                      style={{
                        background: "var(--accent-light)",
                        color: "var(--accent)",
                      }}
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p
            className="text-center text-xs mt-8"
            style={{ color: "var(--muted)" }}
          >
            © {new Date().getFullYear()} Muhammad Tayyab
          </p>
        </footer>
      </main>
    </div>
  );
}

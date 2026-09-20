export default function HomePage() {
  return (
    <main className="container" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: "1.5rem",
        }}
      >
        <div>
          <span className="badge pulse">Phase 1 Operational</span>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              marginTop: "0.5rem",
              letterSpacing: "-0.025em",
            }}
          >
            TVET Bangladesh
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Technical & Vocational Education Freelancing & Live Skill-Training Platform
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", display: "block" }}>
            BTEB & NSDA Dual-Track
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            Architecture v1.0.0
          </span>
        </div>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1rem",
            }}
          >
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Web Frontend</h3>
            <span className="badge">Next.js 14</span>
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              lineHeight: 1.5,
              marginBottom: "1rem",
            }}
          >
            App Router with React Server Components (RSC) optimized for fast rural 3G bandwidths.
          </p>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Health endpoint: <code style={{ color: "var(--accent-cyan)" }}>/api/health</code>
          </div>
        </div>

        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1rem",
            }}
          >
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Core API Gateway</h3>
            <span className="badge">Express.js</span>
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              lineHeight: 1.5,
              marginBottom: "1rem",
            }}
          >
            Layered Modular Monolith with tenant resolution, RBAC, and Zod DTO validation pipeline.
          </p>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Health probes: <code style={{ color: "var(--accent-cyan)" }}>/health</code>,{" "}
            <code style={{ color: "var(--accent-cyan)" }}>/live</code>,{" "}
            <code style={{ color: "var(--accent-cyan)" }}>/ready</code>
          </div>
        </div>

        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1rem",
            }}
          >
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Async Job Worker</h3>
            <span className="badge">BullMQ Node</span>
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              lineHeight: 1.5,
              marginBottom: "1rem",
            }}
          >
            Background job worker cluster with dedicated heartbeat health probe for container
            orchestration.
          </p>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Health probe:{" "}
            <code style={{ color: "var(--accent-cyan)" }}>http://localhost:5001/health</code>
          </div>
        </div>
      </section>

      <footer
        style={{
          marginTop: "auto",
          borderTop: "1px solid var(--border-color)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          color: "var(--text-muted)",
          fontSize: "0.875rem",
        }}
      >
        <span>Turborepo Monorepo &middot; Strict TypeScript &middot; Docker Ready</span>
        <span>Bangladesh Technical Education Board (BTEB) &middot; NSDA Compliant</span>
      </footer>
    </main>
  );
}

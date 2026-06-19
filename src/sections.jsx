/* =========================================================
   lumen-sections.jsx — Nav, Hero, Work index, Capabilities
   ========================================================= */
const { useState: useSS, useEffect: useSE, useRef: useSR } = React;

/* ---------------- NAV ---------------- */
function LNav() {
  const scrolled = useScrollChrome();
  const links = [["Work", "#work"], ["Capabilities", "#capabilities"], ["About", "#about"]];
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="logo footer-sig nav-sig" aria-label="Chidile — top">
          <span className="sig-name">Chidile</span>
          <svg className="sig-scribble" viewBox="0 0 240 46" fill="none" aria-hidden="true" preserveAspectRatio="none">
            <path d="M6 30 C 46 14, 92 12, 132 22 C 168 31, 198 33, 234 18 C 210 24, 150 30, 96 27 C 64 25, 36 27, 14 36" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <div className="nav-right">
          {links.map(([l, h]) => <a key={h} href={h} className="nav-link">{l}</a>)}
          <Magnetic strength={0.35}><a href="#contact" className="nav-cta">Let's talk</a></Magnetic>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- HERO ---------------- */
function LHero() {
  const headRef = useSR(null);
  useSE(() => {
    // Drive the headline rise directly (synced to the loader lift) so it never
    // depends on the IntersectionObserver firing — the hero must always appear.
    const t = setTimeout(() => headRef.current && headRef.current.classList.add("in"), 1450);
    return () => clearTimeout(t);
  }, []);
  return (
    <header className="hero" id="top">
      <div className="hero-top">
        <div className="wrap">
          <div className="hero-eyebrow"><span className="b">Chidile — afrotechboss</span></div>
          <div className="hero-coord">REMOTE · WORLDWIDE<br />AVAILABLE Q3 ’26</div>
        </div>
      </div>

      <div className="hero-stage">
        <div className="wrap" style={{ width: "100%" }}>
          <h1 className="hero-head kinline" ref={headRef}>
            <span className="kline"><span style={{ "--ki": 0 }}>I build what</span></span>
            <span className="kline"><span style={{ "--ki": 1 }}>the world <em className="hero-rot">runs on.</em></span></span>
          </h1>
        </div>
      </div>

    </header>
  );
}

/* ---------------- WORK ---------------- */
const LWORK = [
  { n: "01", title: "UnioGate", tags: ["Fintech", "POS", "Solidity"],
    problem: "Merchants can accept crypto, but spending it means hours of middlemen and punishing rates. A crypto-fiat POS that settles to local currency at the point of sale.",
    metric: { v: "<60s", l: "Settlement target" } },
  { n: "02", title: "Leak", tags: ["Civic Tech", "Privacy", "Zero-metadata"],
    problem: "Reporting wrongdoing can cost you your job — or worse. An anonymous whistleblowing platform engineered to leak nothing about the people who use it.",
    metric: { v: "0", l: "Metadata stored" } },
  { n: "03", title: "Graso", tags: ["Crypto Infra", "RWA", "Cairo"],
    problem: "Property ownership is gated by capital and paperwork most people will never clear. Graso tokenizes real estate so ownership can start small and stay liquid.",
    metric: { v: "1st", l: "Govt-grant backed" } },
];
function LWork() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="sec-num reveal">01 / Selected work</span>
            <h2 className="sec-title serif reveal" data-d="1" style={{ marginTop: 14 }}>Proof, measured in outcomes.</h2>
          </div>
          <p className="sec-aside reveal" data-d="2">Three from the archive. Hover any line to open it.</p>
        </div>

        <div className="work-list reveal" data-d="1">
          {LWORK.map((w) => (
            <a className="work-row" key={w.n} href="#contact" data-cursor>
              <span className="row-fill" />
              <div className="row-main">
                <span className="row-num">{w.n}</span>
                <span className="row-name serif">{w.title}<span className="arr">↗</span></span>
                <span className="row-tags">{w.tags.map((t) => <span className="row-tag" key={t}>{t}</span>)}</span>
              </div>
              <div className="row-detail">
                <div className="row-detail-inner">
                  <p className="row-prob">{w.problem}</p>
                  <div className="row-metric">
                    <div className="mv serif">{w.metric.v}</div>
                    <span className="ml">{w.metric.l}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="reveal" data-d="2" style={{ marginTop: 46 }}>
          <a href="archive.html" className="btn-text">Full archive — 11 projects <span className="ar">→</span></a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CAPABILITIES ---------------- */
const LCAPS = [
  { i: "01", h: "Smart contract development", tech: "Solidity · Cairo · Rust · Move" },
  { i: "02", h: "Blockchain infrastructure & architecture", tech: "Settlement · Wallets · Rails" },
  { i: "03", h: "Technical co-founder / Fractional CTO", tech: "Architecture · PRDs · Fundraising" },
  { i: "04", h: "Civic tech & mission-driven products", tech: "Security · Privacy · Inclusion" },
];
function LCapabilities() {
  return (
    <section className="section" id="capabilities" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="sec-num reveal">02 / Capabilities</span>
            <h2 className="sec-title serif reveal" data-d="1" style={{ marginTop: 14 }}>Four ways founders put me to work.</h2>
          </div>
        </div>

        <div className="caps reveal" data-d="1">
          {LCAPS.map((c) => (
            <div className="cap" key={c.i} data-cursor>
              <span className="cap-idx">{c.i}</span>
              <h3 className="cap-h serif">{c.h}<span className="dotaccent">.</span></h3>
              <span className="cap-tech">{c.tech}</span>
            </div>
          ))}
        </div>

        <div className="caps-foot reveal" data-d="2">
          <p>Engagements are project-based, retainer, or audit/review — most start at <b>$5,000</b>.</p>
          <Magnetic strength={0.3}><a href="#contact" className="btn-text">Scope yours <span className="ar">→</span></a></Magnetic>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LNav, LHero, LWork, LCapabilities });

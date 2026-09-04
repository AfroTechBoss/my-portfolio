/* =========================================================
   lumen-sections.jsx — Nav, Hero, Work index, Capabilities
   ========================================================= */
const { useState: useSS, useEffect: useSE, useRef: useSR } = React;

/* ---------------- NAV ---------------- */
function LNav() {
  const scrolled = useScrollChrome();
  const links = [["Work", "#work"], ["Writing", "#writing"], ["Practice", "#practice"], ["Clients", "#clients"], ["Rooms", "#rooms"], ["About", "#about"]];
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="logo footer-sig nav-sig" aria-label="Chidile — top">
          <span className="sig-name">Chidile</span>
        </a>
        <NavMenu links={links} ctaHref="#contact" />
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
          <div className="hero-eyebrow"><span className="b">Chidile | AfroTechBoss</span>Engineer · Systems architect · Technical writer</div>
          <div className="hero-coord">REMOTE · WORLDWIDE<br />AVAILABLE Q3 ‘26</div>
        </div>
      </div>

      <div className="hero-stage">
        <div className="wrap" style={{ width: "100%" }}>
          <h1 className="hero-head kinline" ref={headRef}>
            <span className="kline"><span style={{ "--ki": 0 }}>I build the systems</span></span>
            <span className="kline"><span style={{ "--ki": 1 }}>the world runs on —</span></span>
            <span className="kline"><span style={{ "--ki": 2 }}>then I <em className="hero-rot">write them down.</em></span></span>
          </h1>

          <div className="hero-foot">
            <p className="hero-sub">Smart contracts, settlement rails and civic platforms — plus the documentation, audits and research that make them usable. <b>I ship the system and the story of how it works.</b></p>
            <div className="scrollcue"><span className="ln" aria-hidden="true" />Scroll</div>
          </div>
        </div>
      </div>

      <Marquee
        className="hero-marquee"
        dur={34}
        items={["Build the system", "Document the system", "Rebuild it 10x"]}
      />

    </header>
  );
}

/* ---------------- WORK ---------------- */
const LWORK = [
  { n: "01", title: "UnioGate", tags: ["Fintech", "POS", "Solidity"],
    problem: "Merchants can accept crypto, but spending it means hours of middlemen and punishing rates. A crypto-fiat POS that settles to local currency at the point of sale.",
    metric: { v: "<60s", l: "Settlement target" },
    live: "https://uniogate.com" },
  { n: "02", title: "BotID Protocol", tags: ["Crypto Infra", "Agents", "Solidity"],
    problem: "Autonomous agents are moving real capital with nothing behind them but trust. BotID gives every agent a bonded identity, a verifiable record of what it executed, and a reputation score protocols can lend against.",
    metric: { v: "255", l: "Tests, ten suites" },
    live: "https://botidprotocol.vercel.app", repo: "https://github.com/AfroTechBoss/botid" },
  { n: "03", title: "Honua", tags: ["Sustainability", "Next.js", "Social"],
    problem: "Sustainability data is scattered across reports nobody reads. Honua is the world's first sustainability engine — one platform where green action is published, discovered and traded.",
    metric: { v: "17", l: "Screens shipped" },
    live: "https://honuaweb.vercel.app", repo: "https://github.com/honua-org/honuaweb" },
  { n: "04", title: "Honua L2", tags: ["Blockchain", "L2", "Sustainability"],
    problem: "Green projects have no native settlement layer of their own. Honua L2 is the on-chain infrastructure underneath them — a decentralized sustainability ecosystem with its own chain.",
    metric: { v: "L2", l: "In development" },
    repo: "https://github.com/Honua-Org/Honua-L2" },
  { n: "05", title: "Leak", tags: ["Civic Tech", "Privacy", "Zero-metadata"],
    problem: "Reporting wrongdoing can cost you your job — or worse. An anonymous whistleblowing platform engineered to leak nothing about the people who use it.",
    metric: { v: "0", l: "Metadata stored" },
    live: "https://leak.ng", repo: "https://github.com/AfroTechBoss/leak" },
  { n: "06", title: "Graso", tags: ["Crypto Infra", "RWA", "Cairo"],
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
          <p className="sec-aside reveal" data-d="2">Six from the archive. Every line opens the live build.</p>
        </div>

        <div className="work-list reveal" data-d="1">
          {LWORK.map((w) => (
            <a className="work-row" key={w.n} href={w.live || w.repo || "#contact"} target={w.live || w.repo ? "_blank" : undefined} rel={w.live || w.repo ? "noopener noreferrer" : undefined} data-cursor>
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
          <a href="/archive" className="btn-text">Full archive — 14 projects <span className="ar">→</span></a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CAPABILITIES ---------------- */
const LCAPS = [
  { i: "01", h: "Smart contract development", tech: "Solidity · Cairo · Rust · Move" },
  { i: "02", h: "Blockchain infrastructure & architecture", tech: "Settlement · Wallets · Rails" },
  { i: "03", h: "Technical documentation", tech: "GitBook · Mintlify · Notion" },
  { i: "04", h: "Systems analysis & redesign", tech: "Audit · Security · Migration" },
  { i: "05", h: "Product & market research", tech: "PRDs · Landscape · Modelling" },
  { i: "06", h: "AI & agent-driven products", tech: "Agents · Inference · Reputation" },
  { i: "07", h: "Technical co-founder / fractional CTO", tech: "Architecture · PRDs · Fundraising" },
  { i: "08", h: "Workshops, teaching & talks", tech: "Bootcamps · Keynotes · Panels" },
];
function LCapabilities() {
  return (
    <section className="section" id="capabilities" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="sec-num reveal">04 / Capabilities</span>
            <h2 className="sec-title serif reveal" data-d="1" style={{ marginTop: 14 }}>Eight ways founders put me to work.</h2>
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
          <p>Engagements are project-based, retainer, or audit/review — most start at <b>$2,000</b>.</p>
          <Magnetic strength={0.3}><a href="/scope" className="btn-text">Scope yours <span className="ar">→</span></a></Magnetic>
        </div>
      </div>
    </section>
  );
}


/* ---------------- HERO STAT BAND ---------------- */
const LCOUNTS = [
  { v: "24+", l: "Stages spoken on" },
  { v: "6", l: "Bootcamps taught" },
  { v: "20+", l: "Brands shipped with" },
  { v: "3", l: "Doc platforms in hand" },
];
function LCounts() {
  return (
    <section className="stat-band" aria-label="By the numbers">
      <div className="wrap">
        <div className="stat-grid">
          {LCOUNTS.map((c) => (
            <div className="stat reveal" key={c.l}>
              <div className="sv">{c.v}</div>
              <span className="sl">{c.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- DOCUMENTATION ---------------- */
const LDOCS = [
  { title: "Ifa Labs", desc: "Full protocol documentation for a multi-chain stablecoin oracle — contracts, price feeds, integration paths.",
    plat: "GitBook", host: "docs.ifalabs.com", url: "https://docs.ifalabs.com" },
  { title: "Honua Whitepaper", desc: "The thesis, tokenomics and architecture of a sustainability network, written to hold up in front of investors and engineers.",
    plat: "GitBook", host: "docs.honua.green", url: "https://docs.honua.green/honua-whitepaper" },
  { title: "Frenspool", desc: "Product and mechanism documentation for a social staking pool — how it works, who it pays, and why.",
    plat: "GitBook", host: "frenspool.gitbook.io", url: "https://frenspool.gitbook.io/frenspool-documentation" },
  { title: "Brij", desc: "On-chain product docs covering smart contract surfaces, user flows and developer onboarding.",
    plat: "GitBook", host: "brij-2.gitbook.io", url: "https://brij-2.gitbook.io/brij-docs" },
];
function LWriting() {
  return (
    <section className="section" id="writing" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="sec-num reveal">02 / Documentation</span>
            <h2 className="sec-title serif reveal" data-d="1" style={{ marginTop: 14 }}>I write the docs your developers actually read.</h2>
          </div>
          <p className="sec-aside reveal" data-d="2">Whitepapers, protocol docs, integration guides and internal handbooks — shipped on GitBook, Mintlify and Notion.</p>
        </div>

        <div className="doc-list reveal" data-d="1">
          {LDOCS.map((d) => (
            <a className="doc-row" key={d.title} href={d.url} target="_blank" rel="noopener noreferrer" data-cursor>
              <span className="doc-name serif">{d.title}<span className="arr">↗</span></span>
              <span className="doc-desc">{d.desc}</span>
              <span className="doc-meta">{d.plat}<br />{d.host}</span>
            </a>
          ))}
        </div>

        <div className="doc-foot reveal" data-d="2">
          <p>Four of many. Documentation engagements cover information architecture, writing, diagrams and handover — on your platform or one I set up.</p>
          <span className="plat">GitBook · Mintlify · Notion</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRACTICE ---------------- */
const LPRAC = [
  { k: "01 — AUDIT & REBUILD", h: "Systems that work 10x better",
    p: "I take apart what you already run — the flows, the contracts, the data, the failure points — and design the version that should exist. Faster, cheaper to operate, and secure by default rather than by patch.",
    steps: ["Teardown of the current system", "Threat + failure mapping", "Target architecture & migration path"] },
  { k: "02 — GO ONLINE", h: "Offline businesses, online properly",
    p: "Plenty of good businesses still run on WhatsApp and memory. I bring them online end to end — the site, the payments, the records, the operating rhythm — without handing them a stack they can't run themselves.",
    steps: ["Web presence & identity", "Payments and record-keeping", "Training and handover"] },
  { k: "03 — RESEARCH", h: "Product research, in detail",
    p: "Deep product and market research documents for products, systems and businesses — the kind teams keep open in a tab for months. Competitive landscape, mechanism design, risks, and a defensible recommendation.",
    steps: ["Landscape & competitor teardown", "Mechanism and economic modelling", "PRDs and decision memos"] },
];
function LPractice() {
  return (
    <section className="section" id="practice">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="sec-num reveal">03 / Practice</span>
            <h2 className="sec-title serif reveal" data-d="1" style={{ marginTop: 14 }}>Three ways I get inside a business.</h2>
          </div>
        </div>

        <div className="prac-grid reveal" data-d="1">
          {LPRAC.map((c) => (
            <div className="prac" key={c.k} data-cursor>
              <span className="prac-kicker">{c.k}</span>
              <h3 className="serif">{c.h}</h3>
              <p>{c.p}</p>
              <div className="prac-steps">{c.steps.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CLIENTS ---------------- */
/* logo: drop a file in assets/clients/ and add `logo: "assets/clients/x.svg"` */
const LCLIENTS = [
  { n: "Google", logo: "assets/clients/google.png" },
  { n: "ICANN", logo: "assets/clients/icann.png" },
  { n: "Trust Wallet", logo: "assets/clients/trust-wallet.svg" },
  { n: "Bybit", logo: "assets/clients/bybit.svg" },
  { n: "WEEX Exchange", logo: "assets/clients/weex.svg" },
  { n: "Internet Computer", logo: "assets/clients/internet-computer.svg" },
  { n: "Reef Chain", logo: "assets/clients/reef.png" },
  { n: "Cassava Network" }, { n: "Sui on Campus" },
  { n: "Uglycash", logo: "assets/clients/uglycash.svg" },
  { n: "Victus Global", logo: "assets/clients/victus-global.svg" }, { n: "Funded" },
  { n: "Cyqur", logo: "assets/clients/cyqur.svg" },
  { n: "Imrat Group" },
  { n: "BotChain", logo: "assets/clients/botchain.webp" },
  { n: "Honua" }, { n: "Bitcoin Africa" },
  { n: "Birmingham University", logo: "assets/clients/birmingham.svg" },
  { n: "CyreneAI", logo: "assets/clients/cyrene.webp" },
  { n: "Binarii Labs", logo: "assets/clients/binarii-labs.svg" },
  { n: "Maringo" },
];
function LClients() {
  return (
    <section className="section" id="clients">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="sec-num reveal">05 / Clients</span>
            <h2 className="sec-title serif reveal" data-d="1" style={{ marginTop: 14 }}>Brands and teams I've built with.</h2>
          </div>
          <p className="sec-aside reveal" data-d="2">Exchanges, foundations, universities, protocols and public institutions.</p>
        </div>

        <div className="client-grid reveal" data-d="1">
          {LCLIENTS.map((c) => (
            <div className={`client ${c.logo ? "has-logo" : ""}`} key={c.n} data-cursor>
              {c.logo ? <img src={c.logo} alt={c.n} /> : c.n}
            </div>
          ))}
          <div className="client nda">+ more under NDA</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ROOMS ---------------- */
const LMEMBERS = [
  { n: "The Rotary Foundation", r: "MEMBER" },
  { n: "ForbesBLK", r: "MEMBER" },
  { n: "ICANN", r: "MEMBER" },
  { n: "Bitcoin Africa", r: "MEMBER" },
];
function LRooms() {
  return (
    <section className="section" id="rooms" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="sec-num reveal">06 / Rooms</span>
            <h2 className="sec-title serif reveal" data-d="1" style={{ marginTop: 14 }}>Stages, classrooms, and the tables I sit at.</h2>
          </div>
          <p className="sec-aside reveal" data-d="2">Conferences, panels and bootcamps across Africa, Europe and online.</p>
        </div>

        <div className="rooms-grid">
          <div className="reveal">
            <div className="room-stat">
              <span className="rv serif">24</span>
              <span className="rl">Events & conferences<br />spoken at</span>
            </div>
            <div className="room-stat">
              <span className="rv serif">6</span>
              <span className="rl">Bootcamps<br />invited to teach</span>
            </div>
          </div>

          <div className="mem-wrap reveal" data-d="1">
            <span className="mem-lbl">Memberships & communities</span>
            <div className="mem-list">
              {LMEMBERS.map((m) => (
                <div className="mem-row" key={m.n}>
                  <span className="m-name serif">{m.n}</span>
                  <span className="m-role">{m.r}</span>
                </div>
              ))}
            </div>
            <p className="mem-foot">Available for keynotes, panels and technical workshops — <a href="#contact">get in touch</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LNav, LHero, LCounts, LWork, LWriting, LPractice, LCapabilities, LClients, LRooms });

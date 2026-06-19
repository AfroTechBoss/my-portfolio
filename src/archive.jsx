/* =========================================================
   lumen-archive.jsx — full project archive (rows that open)
   Reuses lumen-lib (Loader, LumenCursor) + lib (Magnetic, useScrollChrome,
   useRevealObserver) + tweaks-panel. Mounts its own page.
   ========================================================= */
const { useEffect: useAE, useRef: useAR } = React;

const HOME = "index.html";

/* metric: hard number/label · status: pill when there's no clean metric */
const ARCHIVE = [
  { n: "01", title: "UnioGate", tags: ["Fintech", "POS", "Solidity"],
    desc: "A crypto-fiat POS terminal that lets Nigerian SMEs accept USDT, USDC and cNGN and settle to Naira the same day — removing the middlemen and punishing rates that stand between merchants and the value they've already earned.",
    status: "Pre-launch",
    live: "https://uniogate.com" },
  { n: "02", title: "Leak", tags: ["Civic Tech", "Privacy", "PWA"],
    desc: "A secure, anonymous whistleblowing PWA for Nigerian investigative journalists — engineered to leak nothing about the people who use it, and deliberately hosted in Frankfurt for jurisdictional protection beyond Nigerian legal reach.",
    metric: { v: "0", l: "Metadata stored" },
    repo: "https://github.com/AfroTechBoss/leak", live: "https://leak.ng" },
  { n: "03", title: "Graso", tags: ["Crypto Infra", "RWA", "Cairo"],
    desc: "Property ownership is gated by capital and paperwork most people will never clear. Graso tokenizes real estate so ownership can start small and stay liquid.",
    metric: { v: "1st", l: "Govt-grant backed" } },
  { n: "04", title: "Certo.ng", tags: ["E-commerce", "Verification", "Forex"],
    desc: "Sources genuine Apple products from the US, verifies every serial against Apple's own database, and delivers to Nigeria with full US warranty plus 12 months of additional Certo coverage — with live USD/NGN pricing shown transparently before checkout.",
    metric: { v: "12mo", l: "Added warranty" },
    repo: "https://github.com/AfroTechBoss/certo", live: "https://certo.ng" },
  { n: "05", title: "Revelation Bot", tags: ["Trading", "Telegram", "WebSocket"],
    desc: "A Telegram trading-signal bot wired to Deriv's live WebSocket feed, running an 11-signal confluence engine across Forex, Gold and Synthetics, with automated TP/SL outcome tracking and a live win-rate dashboard.",
    metric: { v: "11", l: "Signal confluence" },
    repo: "https://github.com/AfroTechBoss/revelation-bot", live: "https://t.me/revelationtradingbot" },
  { n: "06", title: "NaijaRights", tags: ["Civic Tech", "Next.js", "Legal"],
    desc: "A civic-tech app that helps Nigerian citizens understand their legal rights — built and maintained with a steady release cadence rather than a single drop.",
    metric: { v: "15", l: "Releases shipped" },
    repo: "https://github.com/AfroTechBoss/NaijaRights", live: "https://naijarights.vercel.app" },
  { n: "07", title: "Kast", tags: ["Web3", "Farcaster", "Solidity"],
    desc: "The Info-Fi layer of Farcaster — a Next.js frontend paired with Solidity contracts and a Postgres / Prisma backend. Real contracts, real database layer, MIT-licensed.",
    metric: { v: "MIT", l: "Open source" },
    repo: "https://github.com/AfroTechBoss/kast", live: "https://kast-lyart.vercel.app" },
  { n: "08", title: "WarpKey", tags: ["Web3", "Farcaster", "Wallets"],
    desc: "A Farcaster-native entry point into web3, built on Next.js with wallet-connection flows that get a user from cold to connected in a few taps.",
    status: "Live demo",
    repo: "https://github.com/AfroTechBoss/warpkey", live: "https://warpkey.vercel.app" },
  { n: "09", title: "HelloACA", tags: ["AI", "Contracts", "SME"],
    desc: "An AI contract analyzer that gives freelancers and small businesses a fast, plain-language read on an agreement before they sign it.",
    status: "Early-stage",
    repo: "https://github.com/AfroTechBoss/helloaca", live: "https://helloaca-two.vercel.app" },
  { n: "10", title: "FrensPool", tags: ["Web3", "Base", "Solidity"],
    desc: "A Base-testnet pooling concept pairing a Next.js frontend with Solidity contracts — an early exploration of social, on-chain group savings.",
    status: "Prototype",
    repo: "https://github.com/AfroTechBoss/frenspool" },
  { n: "11", title: "CarbonSystem", tags: ["Academic", "PHP", "Sustainability"],
    desc: "A PHP-based carbon-tracking system — my BSc final-year project, included for the record as an academic build rather than a shipped product.",
    status: "Academic",
    repo: "https://github.com/AfroTechBoss/CarbonSystem" },
];

/* ---------------- NAV ---------------- */
function ArchNav() {
  const scrolled = useScrollChrome();
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href={HOME} className="logo"><span className="dot" />Chidile</a>
        <div className="nav-right">
          <a href={HOME} className="nav-link">Home</a>
          <a href={`${HOME}#work`} className="nav-link">Work</a>
          <a href={`${HOME}#about`} className="nav-link">About</a>
          <Magnetic strength={0.35}><a href={`${HOME}#contact`} className="nav-cta">Let's talk</a></Magnetic>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- ROW ---------------- */
function ArchRow({ p, i }) {
  return (
    <div className="work-row arch-row reveal" data-cursor style={{ transitionDelay: `${Math.min(i * 0.035, 0.3)}s` }}>
      <span className="row-fill" />
      <div className="row-main">
        <span className="row-num">{p.n}</span>
        <span className="row-name serif">{p.title}<span className="arr">↗</span></span>
        <span className="row-tags">{p.tags.map((t) => <span className="row-tag" key={t}>{t}</span>)}</span>
      </div>
      <div className="row-detail">
        <div className="row-detail-inner">
          <div className="arch-detail-l">
            <p className="row-prob">{p.desc}</p>
            <div className="arch-links">
              {p.live
                ? <a className="arch-link" href={p.live} target="_blank" rel="noopener noreferrer">Live <span className="lk">↗</span></a>
                : <span className="arch-link disabled">No live site <span className="lk">·</span></span>}
              {p.repo
                ? <a className="arch-link" href={p.repo} target="_blank" rel="noopener noreferrer">Repository <span className="lk">↗</span></a>
                : <span className="arch-link disabled">Private repo <span className="lk">·</span></span>}
            </div>
          </div>
          <div className="row-metric">
            {p.metric
              ? <><div className="mv serif">{p.metric.v}</div><span className="ml">{p.metric.l}</span></>
              : <span className="arch-status">{p.status}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */
const ATWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E0431B",
  "motion": true,
  "grain": true
}/*EDITMODE-END*/;
const AACCENTS = ["#E0431B", "#1F45E0", "#C9A84C", "#1E7D4F"];

function aHexToRgb(h) {
  const m = h.replace("#", "");
  const n = parseInt(m.length === 3 ? m.split("").map((c) => c + c).join("") : m, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function aApplyAccent(hex) {
  const [r, g, b] = aHexToRgb(hex);
  const root = document.documentElement.style;
  root.setProperty("--accent", hex);
  root.setProperty("--accent-soft", `rgba(${r},${g},${b},0.10)`);
  root.setProperty("--accent-line", `rgba(${r},${g},${b},0.34)`);
}

function ArchApp() {
  const [t, setTweak] = useTweaks(ATWEAK_DEFAULTS);
  useRevealObserver("lumen-archive");

  // Reveal deterministically once the loader lifts — the IntersectionObserver
  // can be unreliable (offscreen/print contexts), and the archive list IS the
  // content, so it must never stay hidden. Per-row transitionDelay staggers it.
  useAE(() => {
    const reveal = () => document.querySelectorAll(".reveal:not(.in)").forEach((e) => e.classList.add("in"));
    const t0 = setTimeout(reveal, 1400);
    return () => clearTimeout(t0);
  }, []);

  useAE(() => { aApplyAccent(t.accent); }, [t.accent]);
  useAE(() => {
    document.body.classList.toggle("reduce-motion", !t.motion);
    document.body.classList.toggle("no-grain", !t.grain);
  }, [t.motion, t.grain]);

  return (
    <>
      <Loader />
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" />
      {t.motion && <LumenCursor />}

      <ArchNav />

      <header className="arch-hero" id="top">
        <div className="wrap">
          <span className="sec-num reveal">Index — Full archive</span>
          <h1 className="arch-title serif reveal" data-d="1">Everything,<br />on the record.</h1>
          <p className="arch-lede reveal" data-d="2">
            <b>{ARCHIVE.length} projects</b> — shipped products, live concepts and early prototypes alike, listed honestly. Hover any line to open it.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="arch-list">
            {ARCHIVE.map((p, i) => <ArchRow key={p.n} p={p} i={i} />)}
          </div>
          <div className="arch-foot reveal">
            <a href={`${HOME}#contact`} className="btn-text">Start a conversation <span className="ar">→</span></a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-mark" aria-hidden="true">Chidile</div>
        <div className="footer-inner">
          <a href={HOME} className="logo"><span className="dot" />Chidile</a>
          <span>© 2026 · afrotechboss · Building worldwide</span>
          <a href={HOME} className="to-top">Back to home <span>↑</span></a>
        </div>
      </footer>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent" />
        <TweakColor label="Color" value={t.accent} options={AACCENTS} onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Motion" />
        <TweakToggle label="Animations & cursor" value={t.motion} onChange={(v) => setTweak("motion", v)} />
        <TweakToggle label="Film grain" value={t.grain} onChange={(v) => setTweak("grain", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ArchApp />);

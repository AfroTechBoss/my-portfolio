/* =========================================================
   archive.jsx — the whole file, on the record
   Same language as the home page: plain type on stone, the ink field
   for the list itself, and every line arriving grey then taking its
   full ink word by word as it comes up the screen.
   Self-contained: mounts its own root.
   ========================================================= */
const { useEffect: aUE } = React;

const EMAIL = "chidileozoemena@gmail.com";
const CALL = "https://calendly.com/afrotechboss/chidile-ozoemena";
const SHOT = "assets/shots/";

/* ---------------- the record ----------------
   Twenty-one builds in three drawers. UnioGate leads the first one,
   and inside each drawer the order is the ranking.
   m: a hard number · st: the stage, where there is no clean number */
const RUNNING = [
  { t: "UnioGate", cat: "Fintech · POS · Solidity",
    d: "A crypto-fiat POS terminal that lets Nigerian SMEs accept USDT, USDC and cNGN and settle to Naira the same day, removing the middlemen and punishing rates that stand between merchants and the value they have already earned.",
    st: "Pre-launch", s: "uniogate.jpg", alt: "The UnioGate merchant dashboard",
    live: "https://uniogate.com" },

  { t: "TUMAM", cat: "Agents · Meta Ads · MCP",
    d: "The unofficial Meta Ads connector for Claude and ChatGPT. Sixteen read tools cover accounts, campaigns, creative and delivery; every write is forced to paused, held behind a typed confirmation and a daily budget ceiling, and read back from the API before it counts as done. A private build, open to use.",
    m: { v: "16", l: "Read tools" }, s: "tumam.jpg", alt: "The TUMAM site",
    live: "https://tumam.vercel.app" },

  { t: "Uzo Labs", cat: "Developer infrastructure · TypeScript · viem",
    d: "The developer path for BOT Chain, and the org I run. A viem-native SDK with chain definitions, typed ABIs and a BOTScan client; clone-and-deploy templates for a token, an NFT, a DEX integration and a gasless ERC-2771 app; and Uzo Deploy, which ships verified contracts from your own wallet through an immutable factory that charges no fees and holds no keys. Independent, not affiliated with or endorsed by BOT Chain.",
    m: { v: "3", l: "Products live" }, s: "uzolabs.jpg", alt: "The Uzo Labs developer site",
    live: "https://uzolabs.xyz", repo: "https://github.com/uzolabs" },

  { t: "BotID Protocol", cat: "Crypto infrastructure · Agents · Solidity",
    d: "A reputation and accountability layer for autonomous agents managing capital on BOT Chain. Every agent posts a bond and every execution settles into a verifiable record. Proofs are graded Bronze by signature, Silver by TEE attestation and Gold by Groth16, so an agent's credit line is earned from outcomes rather than extended on trust.",
    m: { v: "300", l: "Tests, 14 suites" }, s: "botid.jpg", alt: "The BotID Protocol site",
    live: "https://botidprotocol.vercel.app", repo: "https://github.com/AfroTechBoss/botid" },

  { t: "Honua", cat: "Sustainability · Next.js · Social",
    d: "A sustainability engine where green action is published, discovered and traded rather than buried in an annual report. A Next.js 15 build spanning social feed, marketplace and admin surfaces, with the design system carried over from the prototype.",
    m: { v: "17", l: "Screens shipped" }, s: "honua.jpg", alt: "The Honua web app",
    live: "https://honuaweb.vercel.app", repo: "https://github.com/honua-org/honuaweb" },

  { t: "Certo", cat: "E-commerce · Verification · Forex",
    d: "Sources genuine Apple products from the US, verifies every serial against Apple's own database, and delivers to Nigeria with full US warranty plus twelve months of additional Certo coverage, with live USD to Naira pricing shown before checkout.",
    m: { v: "12mo", l: "Added warranty" }, s: "certo.jpg", alt: "The Certo storefront",
    live: "https://certo.ng", repo: "https://github.com/AfroTechBoss/certo" },

  { t: "NaijaRights", cat: "Civic tech · Next.js · Legal",
    d: "A civic-tech app that helps Nigerian citizens understand their legal rights, built and maintained on a steady release cadence rather than a single drop.",
    m: { v: "15", l: "Releases shipped" }, s: "naijarights.jpg", alt: "The NaijaRights app",
    live: "https://naijarights.vercel.app", repo: "https://github.com/AfroTechBoss/NaijaRights" },

  { t: "Kast", cat: "Web3 · Farcaster · Solidity",
    d: "The Info-Fi layer of Farcaster: a Next.js frontend paired with Solidity contracts and a Postgres and Prisma backend. Real contracts, a real database layer, MIT-licensed.",
    m: { v: "MIT", l: "Open source" }, s: "kast.jpg", alt: "The Kast app",
    live: "https://kast-lyart.vercel.app", repo: "https://github.com/AfroTechBoss/kast" },

  { t: "WarpKey", cat: "Web3 · Farcaster · Wallets",
    d: "A Farcaster-native entry point into web3, built on Next.js with wallet-connection flows that take a user from cold to connected in a few taps.",
    st: "Live demo", s: "warpkey.jpg", alt: "The WarpKey demo",
    live: "https://warpkey.vercel.app", repo: "https://github.com/AfroTechBoss/warpkey" },

  { t: "Revelation", cat: "Trading · Telegram · WebSocket",
    d: "A Telegram trading-signal bot wired to Deriv's live WebSocket feed, running an eleven-signal confluence engine across Forex, Gold and Synthetics, with automated take-profit and stop-loss tracking and a live win-rate dashboard.",
    m: { v: "11", l: "Signal confluence" }, s: "revelation.jpg", alt: "The Revelation bot",
    live: "https://t.me/revelationtradingbot" },

  { t: "HelloACA", cat: "AI · Contracts · SME",
    d: "An AI contract analyser that gives freelancers and small businesses a fast, plain-language read on an agreement before they sign it.",
    st: "Early-stage", s: "helloaca.jpg", alt: "The HelloACA analyser",
    live: "https://helloaca-two.vercel.app", repo: "https://github.com/AfroTechBoss/helloaca" },
];

const WRITTEN = [
  { t: "Uzo Docs", cat: "Documentation · SDK · BOT Chain",
    d: "The reference for the Uzo Labs SDK: installation, chain definitions, typed contract calls, Hardhat and Foundry quickstarts, and the verification path for a contract deployed through the factory.",
    st: "Public", s: "uzo-docs.jpg", alt: "The Uzo Docs reference",
    live: "https://docs.uzolabs.xyz" },

  { t: "Ifa Labs", cat: "Documentation · Oracle · Mintlify",
    d: "Protocol documentation for a multi-chain stablecoin oracle: what the oracle reports, how a consumer reads it, and what happens when a feed goes stale. Written in Mintlify.",
    st: "Public", s: "ifa-docs.jpg", alt: "The Ifa Labs documentation",
    live: "https://docs.ifalabs.com" },

  { t: "Honua paper", cat: "Documentation · Protocol · Sustainability",
    d: "The Honua protocol paper: what the chain settles, who it settles for, and the reasoning behind settling green action on-chain rather than reporting it once a year.",
    st: "Public", s: "honua-paper.jpg", alt: "The Honua protocol paper",
    live: "https://docs.honua.green" },

  { t: "Brij", cat: "Documentation · On-chain product",
    d: "Product documentation for an on-chain build: the contract surfaces, the flows a user moves through, and the onboarding path for a developer joining the codebase.",
    st: "Public", s: "brij.jpg", alt: "The Brij documentation",
    live: "https://brij-2.gitbook.io/brij-docs" },

  { t: "FrensPool docs", cat: "Documentation · Base · Solidity",
    d: "The written half of FrensPool: contract surfaces, the flows between them, and the reasoning behind a pooling model built for friends rather than strangers. Unpublished.",
    st: "Unpublished" },
];

const RECORD = [
  { t: "Graso", cat: "Crypto infrastructure · Real-world assets · Cairo",
    d: "Property ownership is gated by capital and paperwork most people will never clear. Graso tokenises real estate so ownership can start small and stay liquid. The first build of mine backed by a government grant.",
    m: { v: "1st", l: "Govt-grant backed" } },

  { t: "Honua L2", cat: "Blockchain · Layer two · Sustainability",
    d: "The on-chain infrastructure underneath Honua: a layer-two chain built to support green projects and settle the sustainability ecosystem on-chain. Early development, no public network yet.",
    st: "In development" },

  { t: "Leak", cat: "Civic tech · Privacy · PWA",
    d: "A secure, anonymous whistleblowing app for Nigerian investigative journalists, engineered to leak nothing about the people who use it and deliberately hosted in Frankfurt, outside Nigerian legal reach.",
    m: { v: "0", l: "Metadata stored" },
    repo: "https://github.com/AfroTechBoss/leak" },

  { t: "FrensPool", cat: "Web3 · Base · Solidity",
    d: "A Base-testnet pooling concept pairing a Next.js frontend with Solidity contracts: an early exploration of social, on-chain group savings.",
    st: "Prototype",
    repo: "https://github.com/AfroTechBoss/frenspool" },

  { t: "CarbonSystem", cat: "Academic · PHP · Sustainability",
    d: "A PHP carbon-tracking system, my BSc final-year project, kept in the file as an academic build rather than a shipped product.",
    st: "Academic",
    repo: "https://github.com/AfroTechBoss/CarbonSystem" },
];

const ALL = [...RUNNING, ...WRITTEN, ...RECORD];
const COUNT = ALL.length;
const LIVE = ALL.filter((p) => p.live).length;
const REPOS = ALL.filter((p) => p.repo).length;

/* ---------- the light-up, as on the home page ---------- */
function useLight() {
  aUE(() => {
    const nodes = document.querySelectorAll(".lit");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("on"));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    const safety = setTimeout(() => nodes.forEach((n) => n.classList.add("on")), 5000);
    return () => { clearTimeout(safety); io.disconnect(); };
  }, []);
}

function Lit({ t, as, className }) {
  const Tag = as || "p";
  const words = t.split(" ");
  return (
    <Tag className={"lit " + (className || "")}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w" style={{ "--d": Math.min(i, 44) * 26 + "ms" }}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/* =========================================================
   HEAD OF THE PAGE
   ========================================================= */
function Top() {
  return (
    <header>
      <nav className="top" aria-label="Top">
        <b><a href="/">Chidile Ozoemena</a></b>
        <div className="top-go">
          <a href="/">Home</a>
          <a href="#running">Running</a>
          <a href="#written">Written</a>
          <a href={"mailto:" + EMAIL}>Email</a>
        </div>
      </nav>

      <div className="wrap hero ar-hero">
        <h1>Everything on the record.</h1>
        <div className="ar-hero-b">
          <div>
            <p className="sub">
              Fintech, crypto infrastructure, civic tech, agents, and the documentation
              that goes with them. Nothing here is a mock-up, and nothing finished has
              been quietly dropped.
            </p>
            <div className="acts">
              <a className="btn" href={CALL}>Book a call</a>
              <a className="btn ghost" href="/#work">Back to the work</a>
            </div>
          </div>
          <div className="st-facts">
            <div><b>{COUNT}</b><span>Builds in the file</span></div>
            <div><b>{LIVE}</b><span>You can open right now</span></div>
            <div><b>{REPOS}</b><span>Open repositories</span></div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   A DRAWER
   ========================================================= */
function Row({ p }) {
  return (
    <article className="wk ar-row">
      <div className={"wk-shot" + (p.s ? "" : " none")}>
        {p.s ? <img src={SHOT + p.s} alt={p.alt} loading="lazy" /> : null}
      </div>
      <h3>{p.t}<span>{p.cat}</span></h3>
      <div className="ar-body">
        <Lit as="p" t={p.d} />
        <p className="ar-links">
          {p.live
            ? <a href={p.live} target="_blank" rel="noopener noreferrer">Open it</a>
            : null}
          {p.repo
            ? <a href={p.repo} target="_blank" rel="noopener noreferrer">Read the code</a>
            : null}
        </p>
      </div>
      <div className="ar-meta">
        {p.m
          ? <p className="ar-m"><b>{p.m.v}</b><span>{p.m.l}</span></p>
          : <p className="ar-st">{p.st}</p>}
      </div>
    </article>
  );
}

function Drawer({ id, title, lede, list, ink }) {
  return (
    <section id={id} className={"ar-sec" + (ink ? " ink" : "")}>
      <div className="wrap">
        <h2 className="sh">{title}</h2>
        <p className="ar-lede">{lede}</p>
        <div className="wk-list">
          {list.map((p) => <Row key={p.t} p={p} />)}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOT OF THE PAGE
   ========================================================= */
function End() {
  return (
    <React.Fragment>
      <section className="cl ar-close">
        <div className="wrap">
          <Lit as="h2" t="That is the whole file." />
          <p className="sub cl-sub">
            If one of these is close to something you need, say which one and I will
            tell you what it would take.
          </p>
          <div className="cl-go">
            <a className="btn" href={CALL}>Book a call</a>
            <a className="btn ghost" href={"mailto:" + EMAIL}>{EMAIL}</a>
          </div>
        </div>
      </section>

      <footer className="ft">
        <div className="wrap ft-cols">
          <div>
            <h2>Chidile Ozoemena</h2>
            <ul>
              <li>Engineer and technical writer</li>
              <li>Lagos, Nigeria</li>
              <li>Next availability: Q1 2027</li>
            </ul>
          </div>
          <div>
            <h2>The work</h2>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="https://github.com/AfroTechBoss">GitHub</a></li>
              <li><a href="https://docs.uzolabs.xyz">Uzo Docs</a></li>
            </ul>
          </div>
          <div>
            <h2>Reach me</h2>
            <ul>
              <li><a href={"mailto:" + EMAIL}>{EMAIL}</a></li>
              <li><a href={CALL}>Book a call</a></li>
              <li><a href="https://x.com/0xAfroTechBoss">x.com/0xAfroTechBoss</a></li>
            </ul>
          </div>
        </div>
        <p className="wrap ft-end">
          Built and written by Chidile Ozoemena. No stock photographs.
        </p>
      </footer>
    </React.Fragment>
  );
}

function Page() {
  useLight();
  return (
    <React.Fragment>
      <Top />
      <Drawer
        id="running"
        title="Shipped and running"
        lede="Eleven builds with something at the other end of a link: a product, a demo, a bot you can message."
        list={RUNNING}
        ink
      />
      <Drawer
        id="written"
        title="Written down"
        lede="The documentation sets. Four are open to read; one is written and kept back."
        list={WRITTEN}
      />
      <Drawer
        id="record"
        title="In development, and for the record"
        lede="Five more in the drawer: infrastructure still being built, one deliberately unpublished, and the academic build kept for honesty."
        list={RECORD}
        ink
      />
      <End />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Page />);

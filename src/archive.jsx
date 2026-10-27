/* =========================================================
   archive.jsx: the file drawer — every project, on the record
   Direction: page-is-the-object (seed 2087627529)
   Self-contained: mounts its own root, no shared.jsx dependency.
   ========================================================= */
const { useEffect: aUE } = React;

const EMAIL = "chidileozoemena@gmail.com";

function useReveal() {
  aUE(() => {
    const nodes = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    // the archive list IS the page: nothing here may depend on an observer that never fires.
    const safety = setTimeout(() => nodes.forEach((n) => n.classList.add("in")), 6000);
    return () => { clearTimeout(safety); io.disconnect(); };
  }, []);
}

/* ---------------- the record ----------------
   metric: a hard number · status: the stage, when there is no clean number */
const RUNNING = [
  { t: "UnioGate", cat: "Fintech · POS · Solidity",
    d: "A crypto-fiat POS terminal that lets Nigerian SMEs accept USDT, USDC and cNGN and settle to Naira the same day, removing the middlemen and punishing rates that stand between merchants and the value they have already earned.",
    st: "Pre-launch",
    shot: "assets/shots/uniogate.jpg", alt: "The UnioGate merchant dashboard",
    live: "https://uniogate.com" },

  { t: "Uzo Labs", cat: "Developer Infra · TypeScript · viem",
    d: "The developer path for BOT Chain, and the org I run. A viem-native SDK with chain definitions, typed ABIs and a BOTScan client; clone-and-deploy templates for a token, an NFT, a DEX integration and a gasless ERC-2771 app; and Uzo Deploy, which ships verified contracts from your own wallet through an immutable factory that charges no fees and holds no keys. Hosted RPC and indexing are next. Independent, not affiliated with or endorsed by BOT Chain.",
    m: { v: "3", l: "Products live" },
    shot: "assets/shots/uzolabs.jpg", alt: "The Uzo Labs developer site",
    live: "https://uzolabs.xyz", repo: "https://github.com/uzolabs" },

  { t: "BotID Protocol", cat: "Crypto Infra · Agents · Solidity",
    d: "A reputation and accountability layer for autonomous agents managing capital on BOT Chain. Every agent posts a bond and every execution settles into a verifiable record. Proofs are graded Bronze by signature, Silver by TEE attestation and Gold by Groth16, so an agent's credit line is earned from outcomes rather than extended on trust.",
    m: { v: "300", l: "Tests, 14 suites" },
    shot: "assets/shots/botid.jpg", alt: "The BotID Protocol site",
    live: "https://botidprotocol.vercel.app", repo: "https://github.com/AfroTechBoss/botid" },

  { t: "Honua", cat: "Sustainability · Next.js · Social",
    d: "A sustainability engine where green action is published, discovered and traded rather than buried in an annual report. A Next.js 15 build spanning social feed, marketplace and admin surfaces, with the design system carried over from the prototype.",
    m: { v: "17", l: "Screens shipped" },
    shot: "assets/shots/honua.jpg", alt: "The Honua web app",
    live: "https://honuaweb.vercel.app", repo: "https://github.com/honua-org/honuaweb" },

  { t: "Certo.ng", cat: "E-commerce · Verification · Forex",
    d: "Sources genuine Apple products from the US, verifies every serial against Apple's own database, and delivers to Nigeria with full US warranty plus twelve months of additional Certo coverage, with live USD to Naira pricing shown before checkout.",
    m: { v: "12mo", l: "Added warranty" },
    live: "https://certo.ng", repo: "https://github.com/AfroTechBoss/certo" },

  { t: "Revelation Bot", cat: "Trading · Telegram · WebSocket",
    d: "A Telegram trading-signal bot wired to Deriv's live WebSocket feed, running an eleven-signal confluence engine across Forex, Gold and Synthetics, with automated take-profit and stop-loss tracking and a live win-rate dashboard.",
    m: { v: "11", l: "Signal confluence" },
    live: "https://t.me/revelationtradingbot", repo: "https://github.com/AfroTechBoss/revelation-bot" },

  { t: "NaijaRights", cat: "Civic Tech · Next.js · Legal",
    d: "A civic-tech app that helps Nigerian citizens understand their legal rights, built and maintained on a steady release cadence rather than a single drop.",
    m: { v: "15", l: "Releases shipped" },
    live: "https://naijarights.vercel.app", repo: "https://github.com/AfroTechBoss/NaijaRights" },

  { t: "Kast", cat: "Web3 · Farcaster · Solidity",
    d: "The Info-Fi layer of Farcaster: a Next.js frontend paired with Solidity contracts and a Postgres and Prisma backend. Real contracts, a real database layer, MIT-licensed.",
    m: { v: "MIT", l: "Open source" },
    live: "https://kast-lyart.vercel.app", repo: "https://github.com/AfroTechBoss/kast" },

  { t: "WarpKey", cat: "Web3 · Farcaster · Wallets",
    d: "A Farcaster-native entry point into web3, built on Next.js with wallet-connection flows that take a user from cold to connected in a few taps.",
    st: "Live demo",
    live: "https://warpkey.vercel.app", repo: "https://github.com/AfroTechBoss/warpkey" },

  { t: "HelloACA", cat: "AI · Contracts · SME",
    d: "An AI contract analyzer that gives freelancers and small businesses a fast, plain-language read on an agreement before they sign it.",
    st: "Early-stage",
    live: "https://helloaca-two.vercel.app", repo: "https://github.com/AfroTechBoss/helloaca" },
];

const RECORD = [
  { t: "Honua L2", cat: "Blockchain · L2 · Sustainability",
    d: "The on-chain infrastructure underneath Honua: a layer-2 chain built to support green projects and settle the sustainability ecosystem on-chain. Early development, no public network yet.",
    st: "In development",
    repo: "https://github.com/Honua-Org/Honua-L2" },

  { t: "Leak", cat: "Civic Tech · Privacy · PWA",
    d: "A secure, anonymous whistleblowing PWA for Nigerian investigative journalists, engineered to leak nothing about the people who use it and deliberately hosted in Frankfurt, outside Nigerian legal reach.",
    m: { v: "0", l: "Metadata stored" },
    repo: "https://github.com/AfroTechBoss/leak" },

  { t: "Graso", cat: "Crypto Infra · RWA · Cairo",
    d: "Property ownership is gated by capital and paperwork most people will never clear. Graso tokenizes real estate so ownership can start small and stay liquid. The first build of mine backed by a government grant.",
    m: { v: "1st", l: "Govt-grant backed" } },

  { t: "FrensPool", cat: "Web3 · Base · Solidity",
    d: "A Base-testnet pooling concept pairing a Next.js frontend with Solidity contracts: an early exploration of social, on-chain group savings.",
    st: "Prototype",
    repo: "https://github.com/AfroTechBoss/frenspool" },

  { t: "CarbonSystem", cat: "Academic · PHP · Sustainability",
    d: "A PHP carbon-tracking system, my BSc final-year project, kept in the file as an academic build rather than a shipped product.",
    st: "Academic",
    repo: "https://github.com/AfroTechBoss/CarbonSystem" },
];

const COUNT = RUNNING.length + RECORD.length;

/* =========================================================
   HEAD OF THE PAGE
   ========================================================= */
function Top() {
  return (
    <header className="ar-ho">
      <div className="ar-top">
        <a className="ar-mark" href="/">Chidile</a>
        <span className="ar-where">The archive</span>
      </div>

      <div className="ar-say">
        <h1 className="ar-h1 dx rv in">Everything on the record</h1>
        <p className="ar-sub rv in" data-d="1">
          {COUNT} projects, shipped products and early prototypes alike, with the
          stage each one is at, and the code where there is code to read.
        </p>
        <a className="act rv in" data-d="2" href="/#contact">Scope a project</a>
      </div>

      <div className="ar-band rv in" data-d="3">
        <img src="assets/arch/arch-corner.jpg" alt="The corner of a concrete building against the sky" />
      </div>
    </header>
  );
}

function Sheet() {
  const live = RUNNING.filter((p) => p.live).length + RECORD.filter((p) => p.live).length;
  const repos = [...RUNNING, ...RECORD].filter((p) => p.repo).length;
  const rows = [
    ["Projects in the file", String(COUNT)],
    ["With a live site", String(live)],
    ["Open repositories", String(repos)],
    ["Fields", "Fintech, crypto infrastructure, civic tech, AI, academic"],
  ];
  return (
    <section className="ar-sum sec">
      <div className="wrapx ar-sum-grid">
        <h2 className="sec-h dx rv">What is in the drawer</h2>
        <dl className="ar-sheet rv" data-d="1">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* =========================================================
   THE LEDGER
   ========================================================= */
function Row({ p, alt }) {
  return (
    <article className={"ar-row rv" + (alt ? " alt" : "")}>
      <div className="ar-id">
        <h3 className="ar-name dx">{p.t}</h3>
        <p className="ar-cat">{p.cat}</p>
        {p.shot && (
          <span className="ar-pic">
            <img src={p.shot} alt={p.alt} loading="lazy" />
          </span>
        )}
      </div>

      <div className="ar-body">
        <p>{p.d}</p>
        <p className="ar-links">
          {p.live
            ? <a className="lnk" href={p.live} target="_blank" rel="noopener noreferrer">Open it</a>
            : <span className="ar-none">No live site yet</span>}
          {p.repo
            ? <a className="lnk" href={p.repo} target="_blank" rel="noopener noreferrer">Read the code</a>
            : <span className="ar-none">Repository private</span>}
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

function Ledger({ id, title, lede, list, from }) {
  return (
    <section className="ar-sec" id={id}>
      <div className="wrapx ar-sec-head">
        <h2 className="sec-h dx rv">{title}</h2>
        <p className="lede rv" data-d="1">{lede}</p>
      </div>
      <div className="ar-led">
        {list.map((p, n) => <Row key={p.t} p={p} alt={(from + n) % 2 === 1} />)}
      </div>
    </section>
  );
}

/* =========================================================
   FOOT OF THE PAGE
   ========================================================= */
function End() {
  return (
    <footer className="ar-end">
      <div className="ar-end-pic">
        <img src="assets/arch/arch-well.jpg" alt="" loading="lazy" />
      </div>
      <div className="ar-end-card rv">
        <h2 className="dx">That is the whole file</h2>
        <p>
          The seven builds I would put my name on first are written up on the home
          page, with the documentation that goes with them. If one of these is close
          to something you need, say which and I will tell you what it would take.
        </p>
        <div className="ar-end-rows">
          <div><span>Email</span><span>{EMAIL}</span></div>
          <div><span>Next availability</span><span>Q3 2026</span></div>
          <div><span>Reply inside</span><span>24 hours</span></div>
        </div>
        <p className="ar-end-go">
          <a className="act" href="/#work">Back to the work</a>
          <a className="lnk" href={"mailto:" + EMAIL}>Write to me</a>
        </p>
      </div>
    </footer>
  );
}

function Page() {
  useReveal();
  return (
    <React.Fragment>
      <Top />
      <Sheet />
      <Ledger
        id="running"
        title="Shipped and running"
        lede="Ten builds with something at the other end of a link: a product, a demo, a bot you can message."
        list={RUNNING}
        from={0}
      />
      <Ledger
        id="record"
        title="In development, and for the record"
        lede="Five more in the drawer: infrastructure still being built, one deliberately unpublished, and the academic build kept for honesty."
        list={RECORD}
        from={1}
      />
      <End />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Page />);

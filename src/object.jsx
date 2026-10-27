/* =========================================================
   object.jsx: the home page as the object
   Direction: page-is-the-object (seed 2087627529)
   Self-contained: mounts its own root, no shared.jsx dependency.
   ========================================================= */
const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM } = React;

const EMAIL = "chidileozoemena@gmail.com";
const CALL  = "https://calendly.com/afrotechboss/chidile-ozoemena";

/* ---------------- entrances ---------------- */
function useReveal() {
  uE(() => {
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
    // nothing on the page may depend on an observer that never fires: on a page this long the
    // last sections can sit below every scroll a reader (or a crawler) ever makes.
    const safety = setTimeout(() => nodes.forEach((n) => n.classList.add("in")), 6000);
    return () => { clearTimeout(safety); io.disconnect(); };
  }, []);
}

/* =========================================================
   HERO
   ========================================================= */
const FOLDERS = [
  { id: "work",     name: "Work",     c: "#1f2b4d", i: "#ffffff" },
  { id: "writing",  name: "Writing",  c: "#2a3760", i: "#ffffff" },
  { id: "practice", name: "Practice", c: "#e3e1dc", i: "#1f2b4d" },
  { id: "clients",  name: "Clients",  c: "#f4f4f2", i: "#1f2b4d" },
  { id: "contact",  name: "Contact",  c: "#ffffff", i: "#1f2b4d" },
];

function Hero() {
  return (
    <header className="ho">
      <div className="ho-top">
        <span className="ho-mark">Chidile</span>
        <a className="lnk" href="/archive">Archive</a>
      </div>

      <div className="ho-say">
        <h1 className="ho-h1 dx rv in">The system and the spec</h1>
        <p className="ho-sub rv in" data-d="1">
          Engineer and technical writer. I build settlement rails, civic platforms
          and agent infrastructure, then write the documentation that makes them usable.
        </p>
      </div>

      <div className="ho-stack">
        {FOLDERS.map((f, n) => (
          <a
            key={f.id}
            className="fold"
            href={"#" + f.id}
            style={{ "--i": n, "--z": n + 1, "--fc": f.c, "--fi": f.i }}
          >
            <span className="fold-tab">{f.name}</span>
            {n === FOLDERS.length - 1 && (
              <span className="act fold-act">Scope a project</span>
            )}
          </a>
        ))}
        <p className="ho-note">Five sheets. One file.</p>
      </div>
    </header>
  );
}

/* =========================================================
   WORK
   ========================================================= */
const BANDS = [
  { t: "UnioGate", cat: "Fintech · POS · Solidity",
    d: "A crypto-fiat POS terminal that lets Nigerian SMEs accept USDT, USDC and cNGN and settle to Naira the same day, removing the middlemen and punishing rates that stand between merchants and the value they have already earned.",
    m: { v: "<60s", l: "Settlement target" },
    shot: "assets/shots/uniogate.jpg",
    alt: "The UnioGate merchant dashboard, showing a balance and a settled transaction list",
    live: "https://uniogate.com",
    fc: "#1f2b4d", fi: "#ffffff", fa: "#f7941d", fai: "#1f2b4d" },

  { t: "Uzo Labs", cat: "Developer Infra · TypeScript · viem",
    d: "The developer path for BOT Chain, and the org I run. A viem-native SDK with typed ABIs and a BOTScan client, clone-and-deploy templates, and Uzo Deploy, which ships verified contracts from your own wallet through an immutable factory that charges no fees and holds no keys.",
    m: { v: "3", l: "Products live" },
    shot: "assets/shots/uzolabs.jpg",
    alt: "The Uzo Labs developer site",
    live: "https://uzolabs.xyz", repo: "https://github.com/uzolabs",
    fc: "#e3e1dc", fi: "#1f2b4d", fa: "#1f2b4d", fai: "#ffffff" },

  { t: "BotID Protocol", cat: "Crypto Infra · Agents · Solidity",
    d: "A reputation and accountability layer for autonomous agents managing capital. Every agent posts a bond and every execution settles into a verifiable record. Proofs are graded Bronze by signature, Silver by TEE attestation and Gold by Groth16, so credit is earned from outcomes rather than extended on trust.",
    m: { v: "300", l: "Tests, 14 suites" },
    shot: "assets/shots/botid.jpg",
    alt: "The BotID Protocol site",
    live: "https://botidprotocol.vercel.app", repo: "https://github.com/AfroTechBoss/botid",
    fc: "#05070a", fi: "#ffffff", fa: "#e3e1dc", fai: "#1f2b4d" },

  { t: "Honua", cat: "Sustainability · Next.js · Social",
    d: "A sustainability engine where green action is published, discovered and traded rather than buried in an annual report. A Next.js 15 build spanning social feed, marketplace and admin surfaces, with the design system carried over from the prototype.",
    m: { v: "17", l: "Screens shipped" },
    shot: "assets/shots/honua.jpg",
    alt: "The Honua web app",
    live: "https://honuaweb.vercel.app", repo: "https://github.com/honua-org/honuaweb",
    fc: "#f4f4f2", fi: "#1f2b4d", fa: "#05070a", fai: "#ffffff" },

  { t: "Honua L2", cat: "Blockchain · L2 · Sustainability",
    d: "The on-chain infrastructure underneath Honua: a layer-2 chain built to support green projects and settle the sustainability ecosystem on-chain. Early development; no public network yet.",
    m: { v: "L2", l: "In development" },
    repo: "https://github.com/Honua-Org/Honua-L2",
    fc: "#1f2b4d", fi: "#ffffff", fa: "#f4f4f2", fai: "#1f2b4d" },

  { t: "Leak", cat: "Civic Tech · Privacy · PWA",
    d: "A secure, anonymous whistleblowing app for Nigerian investigative journalists, engineered to leak nothing about the people who use it, and deliberately hosted in Frankfurt for jurisdictional protection beyond Nigerian legal reach.",
    m: { v: "0", l: "Metadata stored" },
    repo: "https://github.com/AfroTechBoss/leak",
    fc: "#e3e1dc", fi: "#1f2b4d", fa: "#05070a", fai: "#ffffff" },

  { t: "Graso", cat: "Crypto Infra · RWA · Cairo",
    d: "Property ownership is gated by capital and paperwork most people will never clear. Graso tokenizes real estate so ownership can start small and stay liquid.",
    m: { v: "1st", l: "Govt-grant backed" },
    fc: "#05070a", fi: "#ffffff", fa: "#f4f4f2", fai: "#1f2b4d" },
];

function Work() {
  return (
    <section className="work" id="work">
      <div className="wrapx">
        <h2 className="sec-h dx rv">Selected work</h2>
      </div>
      <div className="stack">
        {BANDS.map((b, n) => (
          <article
            key={b.t}
            className="band"
            style={{ "--top": n * 46 + "px", "--z": n + 1,
                     "--fc": b.fc, "--fi": b.fi, "--fa": b.fa, "--fai": b.fai }}
          >
            <div className="band-strip">
              <h3 className="band-name">{b.t}</h3>
              <p className="band-cat">{b.cat}</p>
            </div>
            <div className="band-body">
              {b.shot ? (
                <div className="band-pic rv"><img src={b.shot} alt={b.alt} loading="lazy" /></div>
              ) : (
                <div className="band-figure rv">
                  <b>{b.m.v}</b>
                  <span>{b.m.l}</span>
                </div>
              )}
              <div className="band-text rv" data-d="1">
                <p>{b.d}</p>
                {b.shot && (
                  <p className="band-m"><b>{b.m.v}</b><span>{b.m.l}</span></p>
                )}
                <p className="band-go">
                  {b.live && <a className="lnk" href={b.live} target="_blank" rel="noopener noreferrer">Visit it</a>}
                  {b.repo && <a className="lnk" href={b.repo} target="_blank" rel="noopener noreferrer">Read the code</a>}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   INDEX WITH PREVIEW: the rest of the archive
   ========================================================= */
const INDEX = [
  { t: "Certo.ng",       y: "E-commerce · Verification", p: "assets/arch/arch-corner.jpg" },
  { t: "Revelation Bot", y: "Trading · Telegram",        p: "assets/arch/arch-well.jpg" },
  { t: "NaijaRights",    y: "Civic Tech · Legal",        p: "assets/arch/arch-concrete.jpg" },
  { t: "Kast",           y: "Web3 · Farcaster",          p: "assets/arch/arch-wedge.jpg" },
  { t: "WarpKey",        y: "Web3 · Wallets",            p: "assets/arch/arch-corner.jpg" },
  { t: "HelloACA",       y: "AI · Contracts",            p: "assets/arch/arch-well.jpg" },
  { t: "FrensPool",      y: "Web3 · Base · Solidity",    p: "assets/arch/arch-concrete.jpg" },
  { t: "CarbonSystem",   y: "Academic · Sustainability", p: "assets/arch/arch-wedge.jpg" },
];

function Index() {
  const [hot, setHot] = uS(null);
  return (
    <section className="ix">
      <div className="wrapx ix-grid">
        <div className="ix-head rv">
          <h2 className="sec-h dx">Eight more in the file</h2>
          <p className="lede" style={{ marginTop: 22 }}>
            The archive runs to fifteen. These eight are open to read.
          </p>
        </div>
        <div
          className="ix-list rv"
          data-d="1"
          data-hot={hot === null ? "0" : "1"}
          onMouseLeave={() => setHot(null)}
        >
          {INDEX.map((r) => (
            <a
              key={r.t}
              className="ix-row"
              href="/archive"
              onMouseEnter={() => setHot(r)}
              onFocus={() => setHot(r)}
            >
              <b>{r.t}</b>
              <span>{r.y}</span>
              <span className="ix-row-pic"><img src={r.p} alt="" loading="lazy" /></span>
            </a>
          ))}
          <p className="ix-foot"><a className="lnk" href="/archive">Open the full archive</a></p>
        </div>
      </div>
      <div className={"ix-frame" + (hot ? " on" : "")} aria-hidden="true">
        {hot && <img src={hot.p} alt="" />}
      </div>
    </section>
  );
}

/* =========================================================
   WRITING
   ========================================================= */
const DOCS = [
  { t: "Uzo Docs", pf: "Mintlify",
    d: "The whole developer path for BOT Chain written down: SDK reference, deployment templates and the Uzo Deploy flow, end to end.",
    u: "https://docs.uzolabs.xyz", shot: "assets/shots/uzo-docs.jpg",
    alt: "The Uzo Labs documentation site",
    fc: "#f4f4f2", fi: "#1f2b4d" },
  { t: "Ifa Labs", pf: "Mintlify",
    d: "Platform documentation for Ifa Labs: the concepts, the integration path and the reference, in one place a developer can search.",
    u: "https://docs.ifalabs.com", shot: "assets/shots/ifa-docs.jpg",
    alt: "The Ifa Labs documentation site",
    fc: "#e3e1dc", fi: "#1f2b4d" },
  { t: "Honua Whitepaper", pf: "GitBook",
    d: "The sustainability engine argued from first principles: why green action needs a market, and how the protocol settles it.",
    u: "https://docs.honua.green", shot: "assets/shots/honua-paper.jpg",
    alt: "The Honua whitepaper",
    fc: "#ffffff", fi: "#1f2b4d" },
  { t: "Frenspool", pf: "GitBook",
    d: "An on-chain group-savings concept documented alongside the contracts: the mechanism, the roles and the failure cases.",
    u: "", fc: "#f4f4f2", fi: "#1f2b4d" },
  { t: "Brij", pf: "GitBook",
    d: "Protocol documentation written to be read by the people integrating it rather than the people who already wrote it.",
    u: "", fc: "#e3e1dc", fi: "#1f2b4d" },
];

function Writing() {
  return (
    <section className="wr" id="writing">
      <div className="wrapx">
        <h2 className="sec-h dx rv">The written half</h2>
        <p className="lede rv" data-d="1" style={{ marginTop: 22, color: "#c9ccd6" }}>
          Five documentation sets, three platforms. If it cannot be explained in a
          document, it is not finished.
        </p>
      </div>
      <div className="wr-deck">
        {DOCS.map((d) => {
          const Tag = d.u ? "a" : "div";
          return (
            <Tag
              key={d.t}
              className="wr-card rv"
              style={{ "--fc": d.fc, "--fi": d.fi }}
              {...(d.u ? { href: d.u, target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <h3>{d.t}</h3>
              {d.shot && <div className="wr-pic"><img src={d.shot} alt={d.alt} loading="lazy" /></div>}
              <p>{d.d}</p>
              <p className="wr-meta">
                <span>{d.pf}</span>
                <span>{d.u ? "Read it" : "Private"}</span>
              </p>
            </Tag>
          );
        })}
      </div>
      <p className="wr-foot">
        Five sets written. <a className="lnk" href="#practice">See how I work</a>
      </p>
    </section>
  );
}

/* =========================================================
   ABOUT: the letter
   ========================================================= */
function About() {
  return (
    <section className="ab" id="about">
      <div className="wrapx">
        <div className="ab-sheet rv">
          <div className="ab-por">
            <img src="assets/chidile-avatar.jpg" alt="Chidile Ozoemena" loading="lazy" />
          </div>
          <div className="ab-body">
            <p>
              I build the systems and then I write them down. That second half is the
              part most engineers skip, and it is the reason the first half survives
              contact with anyone else.
            </p>
            <p>
              Most of my work sits where money, records and public interest meet:
              settlement rails for merchants who lose too much to middlemen, an
              accountability layer for agents that move capital, a whistleblowing app
              built to know nothing about the people using it.
            </p>
            <p>
              Crypto adoption is not a trend to me. It is the next piece of financial
              infrastructure, and infrastructure has to be documented to be trusted.
            </p>
            <p>
              Clients hire people, not CVs. So I build like my name is on it, because
              it is: on the contracts, on the docs, and on this page.
            </p>
          </div>
          <p className="ab-sign">
            <b>Chidile Ozoemena</b>
            <span>Engineer · Systems architect · Technical writer</span>
          </p>
        </div>
        <div className="ab-scal" />
        <div className="ab-dots" />
        <div className="ab-tear">
          <span>Tear off and keep</span>
          <a className="lnk" href={"mailto:" + EMAIL}>{EMAIL}</a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CAPABILITIES + SCOPE: the menu and its receipt (the live thing)
   ========================================================= */
const MENU = [
  { g: "Build", items: [
    { k: "sc", n: "Smart contracts",        v: "Project", d: "Solidity, Cairo, Rust and Move, written, tested and documented." },
    { k: "bi", n: "Blockchain infrastructure", v: "Project", d: "Chains, SDKs, indexers and the deployment path around them." },
    { k: "ap", n: "AI and agent products",  v: "Project", d: "Agent systems that act on capital or records, with a trail." },
  ]},
  { g: "Write", items: [
    { k: "td", n: "Technical documentation", v: "Per set", d: "GitBook, Mintlify or Notion. Reference, guides and concepts." },
    { k: "pr", n: "Product and market research", v: "Per report", d: "The detailed read before a team commits to a direction." },
  ]},
  { g: "Advise", items: [
    { k: "sa", n: "Systems analysis and redesign", v: "Audit", d: "Find what is costing you, then rebuild it to work 10x better." },
    { k: "cto", n: "Technical co-founder / fractional CTO", v: "Retainer", d: "Ownership of the technical direction, not just the tickets." },
    { k: "ws", n: "Workshops, teaching and talks", v: "Per day", d: "24 stages and 6 bootcamps so far, for teams and for rooms." },
  ]},
];

const LEDGER = [
  { g: "Crypto and settlement", rows: [
    { n: "UnioGate, Uzo Labs, BotID, Graso", v: "4" },
  ]},
  { g: "Sustainability", rows: [
    { n: "Honua, Honua L2, CarbonSystem", v: "3" },
  ]},
  { g: "Civic technology", rows: [
    { n: "Leak, NaijaRights", v: "2" },
  ]},
  { g: "Web3 applications", rows: [
    { n: "Kast, WarpKey, FrensPool", v: "3" },
  ]},
  { g: "Commerce and trading", rows: [
    { n: "Certo.ng, Revelation Bot", v: "2" },
  ]},
  { g: "AI products", rows: [
    { n: "HelloACA", v: "1" },
  ]},
];

function Capabilities({ picked, toggle }) {
  return (
    <section className="cp" id="practice">
      <div className="wrapx">
        <div className="cp-zig rv" />
        <div className="cp-sheet rv">
          <h2 className="cp-h dx">What I take on</h2>
          <p className="cp-sub">
            Tick what you need. It goes onto the slip below, and the slip adds up.
          </p>
          <div className="cp-groups" data-ui="menu">
            {MENU.map((grp) => (
              <div className="cp-group" key={grp.g}>
                <h3>{grp.g}</h3>
                {grp.items.map((it) => (
                  <label className="cp-item" key={it.k}>
                    <span className="cp-line">
                      <input
                        className="cp-box"
                        type="checkbox"
                        checked={!!picked[it.k]}
                        onChange={() => toggle(it.k)}
                      />
                      <span className="cp-nm">{it.n}</span>
                      <span className="cp-dot" aria-hidden="true" />
                      <span className="cp-val">{it.v}</span>
                    </span>
                    <span className="cp-dsc">{it.d}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
          <p className="cp-floor">
            Scopes differ, but most start at <b>$2,000</b>.
          </p>
        </div>
        <div className="cp-zig bot rv" />
      </div>
    </section>
  );
}

function Scope({ picked, clear }) {
  const chosen = uM(() => {
    const flat = MENU.flatMap((g) => g.items.map((i) => ({ ...i, g: g.g })));
    return flat.filter((i) => picked[i.k]);
  }, [picked]);

  const live = chosen.length > 0;
  const groups = uM(() => {
    if (!live) return LEDGER;
    const by = {};
    chosen.forEach((c) => { (by[c.g] = by[c.g] || []).push(c); });
    return Object.keys(by).map((g) => ({
      g,
      rows: by[g].map((c) => ({ n: c.n, v: "1" })),
    }));
  }, [chosen, live]);

  return (
    <section className="sc" id="scope">
      <div className="wrapx sc-grid">
        <div className="sc-left">
          <h2 className="sec-h dx rv">
            {live ? "Your scope, so far" : "Everything, counted"}
          </h2>
          <p className="sc-note rv" data-d="1">
            {live
              ? "Eight lines of work; these are the ones you picked. Send the slip and we start from it."
              : "Fifteen projects in the file, grouped by what they actually do. The slip beside this adds up to the figure."}
          </p>
          <p className="sc-total rv" data-d="2">
            <b>{live ? chosen.length : 15}</b>
            <span>{live ? "lines on your slip" : "projects shipped, 2019 to now"}</span>
          </p>
        </div>

        <div className="sc-slipwrap rv" data-d="1">
          <div className="sc-slip">
            <h3>{live ? "Scope slip" : "The archive ledger"}</h3>
            <div className="sc-rows">
              {groups.map((grp) => (
                <div key={grp.g}>
                  <p className="sc-grp">{grp.g}</p>
                  {grp.rows.map((r) => (
                    <p className="sc-row" key={r.n}>
                      <span>{r.n}</span>
                      <span className="d" aria-hidden="true" />
                      <span className="v">{r.v}</span>
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <p className="sc-sum">
              <span>{live ? "Lines selected" : "Total shipped"}</span>
              <span>{live ? chosen.length : 15}</span>
            </p>
            {live && (
              <p className="sc-sum" style={{ marginTop: 2 }}>
                <span>Starts at</span>
                <span>$2,000</span>
              </p>
            )}
            <p className="sc-reset">
              {live
                ? <button type="button" onClick={clear}>Clear the slip</button>
                : <a className="lnk" style={{ fontSize: "0.875rem" }} href="#practice">Build your own slip</a>}
            </p>
          </div>
          <div className="sc-zig" />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CLIENTS
   ========================================================= */
const CLIENTS = [
  { n: "Google",               f: "google.svg" },
  { n: "ICANN",                f: "icann.svg", sq: true },
  { n: "Trust Wallet",         f: "trustwallet.svg" },
  { n: "Bybit",                f: "bybit.png" },
  { n: "WEEX",                 f: "weex.svg" },
  { n: "Internet Computer",    f: "icp.svg" },
  { n: "Reef Chain" },
  { n: "Cassava Network" },
  { n: "Sui on Campus",        f: "sui.svg" },
  { n: "Uglycash" },
  { n: "Victus Global" },
  { n: "Funded" },
  { n: "Cyqur",                f: "cyqur.svg", sq: true },
  { n: "Imrat Group" },
  { n: "BotChain",             f: "botchain.png", sq: true },
  { n: "Honua",                f: "honua.svg", sq: true },
  { n: "Bitcoin Africa" },
  { n: "Birmingham University" },
  { n: "CyreneAI" },
  { n: "Binarii Labs",         f: "binarii.svg" },
  { n: "Maringo" },
];

function Clients() {
  return (
    <section className="cl" id="clients">
      <div className="cl-card rv">
        <h2 className="dx">Who has hired me</h2>
        <div className="cl-pic">
          <img src="assets/arch/arch-corner.jpg" alt="" loading="lazy" />
        </div>
        <ul className="cl-wall">
          {CLIENTS.map((c) => (
            <li className={c.f ? (c.sq ? "cl-cell sq" : "cl-cell") : "cl-cell word"} key={c.n}>
              {c.f
                ? <img src={"assets/logos/" + c.f} alt={c.n} title={c.n} loading="lazy" />
                : <span>{c.n}</span>}
            </li>
          ))}
        </ul>
        <span className="cl-more">and more under NDA</span>
      </div>
    </section>
  );
}

/* =========================================================
   MARQUEE: the running strip
   ========================================================= */
function Strip() {
  const run = (
    <div className="mq-run" aria-hidden="true">
      <span>Build the system</span>
      <span>Document the system</span>
      <span>Rebuild it 10x</span>
      <span>Build the system</span>
      <span>Document the system</span>
      <span>Rebuild it 10x</span>
    </div>
  );
  return <div className="mq marquee">{run}{run}</div>;
}

/* =========================================================
   CONTACT
   ========================================================= */
function Contact() {
  return (
    <section className="ct" id="contact">
      <div className="ct-pic">
        <img src="assets/arch/arch-concrete.jpg" alt="" />
      </div>
      <div className="ct-card rv">
        <h2>Say hello</h2>
        <address>
          Remote, worldwide<br />
          Working from Nigeria
        </address>
        <div className="ct-rows">
          <div><span>Email</span><span>{EMAIL}</span></div>
          <div><span>Next availability</span><span>Q3 2026</span></div>
          <div><span>Reply inside</span><span>24 hours</span></div>
        </div>
        <a className="act" href={CALL} target="_blank" rel="noopener noreferrer">Book a call</a>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */
function Foot() {
  return (
    <footer className="ft">
      <div className="ft-panel rv">
        <div className="ft-say">
          <h2 className="dx">Built and written down</h2>
          <p>
            If you have a system that works but nobody can explain, or an explanation
            with no system under it, that is the conversation I want. Send the slip,
            or just say what is broken.
          </p>
        </div>
        <div className="ft-addr">
          <div className="ft-stamp">
            <img src="assets/arch/arch-wedge.jpg" alt="" loading="lazy" />
          </div>
          <a href={"mailto:" + EMAIL}>{EMAIL}</a>
          <a href="https://www.linkedin.com/in/chidileozoemena/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/AfroTechBoss" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://x.com/0xAfroTechBoss" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
        <p className="ft-imp">
          Chidile Ozoemena · Engineer and technical writer · Member of The Rotary
          Foundation, ForbesBLK, ICANN and Bitcoin Africa
        </p>
      </div>
    </footer>
  );
}

/* =========================================================
   PAGE
   ========================================================= */
function Page() {
  const [picked, setPicked] = uS({});
  const toggle = (k) => setPicked((p) => ({ ...p, [k]: !p[k] }));
  const clear = () => setPicked({});
  useReveal();

  uE(() => {
    const h = window.location.hash;
    if (!h || h.length < 2) return;
    const el = document.querySelector(h);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
  }, []);

  return (
    <React.Fragment>
      <Hero />
      <Work />
      <Index />
      <Writing />
      <About />
      <Capabilities picked={picked} toggle={toggle} />
      <Scope picked={picked} clear={clear} />
      <Clients />
      <Strip />
      <Contact />
      <Foot />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Page />);

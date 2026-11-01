/* =========================================================
   object.jsx — the split stage
   Direction: split-stage (seed 508810379)
   Half the screen never moves. The fixed half holds the thing
   that runs; the scrolling half does the writing. The index in
   the reading column is what changes the fixed half.
   Self-contained: mounts its own root.
   ========================================================= */
const { useState: uS, useEffect: uE, useMemo: uM } = React;

const EMAIL = "chidileozoemena@gmail.com";
const CALL  = "https://calendly.com/afrotechboss/chidile-ozoemena";
const GH    = "https://github.com/AfroTechBoss";

/* ---------------- the grading ---------------- */
const RANK  = { Bronze: 0, Silver: 1, Gold: 2 };
const GRADE = {
  Bronze: "You have my word, and nothing else.",
  Silver: "You can read the source. There is nothing hosted to open.",
  Gold:   "You can open it and use it right now.",
};

const FIELDS = ["Money", "Civic", "Agents", "Docs"];

/* Twenty claims. `s` is the screenshot of the thing itself, where one exists;
   the eight without one get a plate that says so rather than a borrowed picture. */
const BUILDS = [
  { n: "UnioGate",      d: "Money",  g: "Gold",   live: "https://uniogate.com",                   s: "uniogate" },
  { n: "Uzo Labs",      d: "Agents", g: "Gold",   live: "https://uzolabs.xyz",                    s: "uzolabs" },
  { n: "BotID",         d: "Agents", g: "Gold",   live: "https://botidprotocol.vercel.app",       s: "botid" },
  { n: "Honua",         d: "Civic",  g: "Gold",   live: "https://honuaweb.vercel.app",            s: "honua" },
  { n: "Certo",         d: "Money",  g: "Gold",   live: "https://certo.ng",                       s: "certo" },
  { n: "NaijaRights",   d: "Civic",  g: "Gold",   live: "https://naijarights.vercel.app",         s: "naijarights" },
  { n: "Kast",          d: "Civic",  g: "Gold",   live: "https://kast-lyart.vercel.app",          s: "kast" },
  { n: "WarpKey",       d: "Money",  g: "Gold",   live: "https://warpkey.vercel.app",             s: "warpkey" },
  { n: "Revelation",    d: "Money",  g: "Gold",   live: "https://t.me/revelationtradingbot",      s: "revelation" },
  { n: "Uzo Docs",      d: "Docs",   g: "Gold",   live: "https://docs.uzolabs.xyz",               s: "uzo-docs" },
  { n: "Ifa Labs",      d: "Docs",   g: "Gold",   live: "https://docs.ifalabs.com",               s: "ifa-docs" },
  { n: "Honua paper",   d: "Docs",   g: "Gold",   live: "https://docs.honua.green",               s: "honua-paper" },
  { n: "HelloACA",      d: "Agents", g: "Gold",   live: "https://helloaca-two.vercel.app" },
  { n: "Leak",          d: "Civic",  g: "Silver", repo: "https://github.com/AfroTechBoss/leak" },
  { n: "FrensPool",     d: "Money",  g: "Silver", repo: "https://github.com/AfroTechBoss/frenspool" },
  { n: "CarbonSystem",  d: "Civic",  g: "Silver", repo: "https://github.com/AfroTechBoss/CarbonSystem" },
  { n: "Honua L2",      d: "Money",  g: "Bronze" },
  { n: "Graso",         d: "Money",  g: "Bronze" },
  { n: "FrensPool docs", d: "Docs",  g: "Bronze" },
  { n: "Brij",          d: "Docs",   g: "Bronze" },
];

const SHOTS = BUILDS.filter((b) => b.s);

const CLIENTS = [
  { n: "Google",              f: "google.svg" },
  { n: "ICANN",               f: "icann.svg", sq: true },
  { n: "Trust Wallet",        f: "trustwallet.svg" },
  { n: "Bybit",               f: "bybit.png" },
  { n: "WEEX",                f: "weex.svg" },
  { n: "Internet Computer",   f: "icp.svg" },
  { n: "Reef Chain" },
  { n: "Cassava Network" },
  { n: "Sui on Campus",       f: "sui.svg" },
  { n: "Uglycash" },
  { n: "Victus Global" },
  { n: "Funded" },
  { n: "Cyqur",               f: "cyqur.svg", sq: true },
  { n: "Imrat Group" },
  { n: "BotChain",            f: "botchain.png", sq: true },
  { n: "Honua",               f: "honua.svg", sq: true },
  { n: "Bitcoin Africa" },
  { n: "Birmingham University" },
  { n: "CyreneAI" },
  { n: "Binarii Labs",        f: "binarii.svg" },
  { n: "Maringo" },
];

/* Prices are set like a menu: the shape of the engagement on the right,
   the floor stated once beside the heading. Nothing here is invented. */
const MENU = [
  {
    g: "Building",
    items: [
      { n: "Smart contracts",           v: "Per project", d: "Solidity, Cairo, Rust and Move, audited before anyone touches money." },
      { n: "Blockchain infrastructure", v: "Per project", d: "Chains, SDKs and indexers, with the operator in mind." },
      { n: "AI and agent products",     v: "Per project", d: "Agents that leave a trail you can read afterwards." },
    ],
  },
  {
    g: "Writing",
    items: [
      { n: "Technical documentation",   v: "Per set",    d: "GitBook, Mintlify or Notion. Five sets of mine are open right now." },
      { n: "Product and market research", v: "Per report", d: "The numbers, where they came from, and what they do not say." },
    ],
  },
  {
    g: "Advising",
    items: [
      { n: "Systems analysis and redesign", v: "Audit",     d: "I read what you have and tell you what is load-bearing." },
      { n: "Technical co-founder, fractional CTO", v: "Retainer", d: "Monthly, with a cap on hours so neither of us pretends." },
      { n: "Workshops, teaching and talks", v: "Per day",   d: "Lagos in the room, or anywhere on a call." },
    ],
  },
];

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
    // nothing may depend on an observer that never fires: on a page this long the last
    // sections can sit below every scroll a reader (or a crawler) ever makes.
    const safety = setTimeout(() => nodes.forEach((n) => n.classList.add("in")), 6000);
    return () => { clearTimeout(safety); io.disconnect(); };
  }, []);
}

/* =========================================================
   THE SPLIT — the sheet and the index scroll, the stage does not
   ========================================================= */
function Stage({ pick }) {
  const open = pick.live || pick.repo;

  return (
    <aside className="split-stage" aria-live="polite">
      {SHOTS.map((b, i) => (
        <img
          key={b.s}
          className={"stage-shot" + (b.n === pick.n ? " on" : "")}
          src={"assets/shots/" + b.s + ".jpg"}
          alt={b.n + ", as it stands today"}
          width="2880"
          height="1800"
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}

      <div className={"stage-plate" + (pick.s ? "" : " on")} aria-hidden={pick.s ? "true" : "false"}>
        <strong>{pick.n}</strong>
        <span>
          Nothing to show you. {GRADE[pick.g]} A picture of something else would be
          worth less than this sentence.
        </span>
      </div>

      <p className="stage-bar">
        <b>{pick.n}</b>
        {open ? (
          <a className="act-2" href={open} target="_blank" rel="noreferrer">
            {pick.live ? "Open it" : "Read the source"}
          </a>
        ) : (
          <span>{pick.g}, my word only</span>
        )}
      </p>
    </aside>
  );
}

function Split() {
  const [lit, setLit] = uS(false);
  const [pick, setPick] = uS(BUILDS[0]);
  const openable = uM(() => BUILDS.filter((b) => b.live).length, []);

  uE(() => {
    const t = requestAnimationFrame(() => setLit(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="split">
      <div className="split-read">
        <header className={"hero" + (lit ? " lit" : "")}>
          <nav className="hero-top" aria-label="Top">
            <b>Chidile Ozoemena</b>
            <a href="/archive">Archive</a>
          </nav>

          <h1 className="hero-say">
            Built to run, <i>written</i> to last.
          </h1>

          <div className="hero-mid">
            <p>
              I build settlement rails, civic platforms and agent infrastructure in
              Nigeria, then write the documentation that keeps them alive.
            </p>
            <a className="act" href={CALL} target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </header>

        <section className="ix" id="work">
          <h2 className="sec-h rv ix-h">Twenty claims, and what backs each one</h2>
          <p className="lead rv ix-count" data-d="1">
            <b>{openable} of {BUILDS.length}</b> you can open in a new tab right now. Pick any
            line and the half beside it changes to that one.
          </p>

          <ul className="ix-list rv" data-d="2">
            {BUILDS.map((b) => (
              <li key={b.n}>
                <button
                  type="button"
                  aria-current={b.n === pick.n}
                  onClick={() => setPick(b)}
                >
                  {b.n}
                  <em>{b.d} · {b.g}</em>
                </button>
              </li>
            ))}
          </ul>

          <p className="lead rv ix-foot" data-d="3">
            Gold means you can open it. Silver means you can read the source. Bronze means
            you have my word and nothing else, and I would rather say so than dress it up.
          </p>
        </section>
      </div>

      <Stage pick={pick} />
    </div>
  );
}

/* =========================================================
   FIXED OUTPUT, LIVE CONTROLS — the ledger you configure
   ========================================================= */
function Config() {
  const [field, setField] = uS("All");
  const [bar, setBar] = uS("Bronze");
  const [only, setOnly] = uS(false);
  const [q, setQ] = uS("");

  const rows = uM(() => BUILDS.filter((b) => {
    if (field !== "All" && b.d !== field) return false;
    if (RANK[b.g] < RANK[bar]) return false;
    if (only && !b.live) return false;
    if (q.trim() && !b.n.toLowerCase().includes(q.trim().toLowerCase())) return false;
    return true;
  }), [field, bar, only, q]);

  return (
    <section className="cf" id="services">
      <div className="wrap grid12 cf-in">
        <h2 className="sec-h cf-h rv">How to check my work</h2>

        <div className="cf-fix">
          <div className="ledger rv" data-ui>
            <div className="ledger-h">
              <strong>The ledger</strong>
              <span>{field === "All" ? "every field" : field}, {bar} and up</span>
            </div>

            {rows.length ? (
              <ul>
                {rows.map((b) => (
                  <li key={b.n}>
                    <b>{b.n}</b>
                    <i>{b.g}</i>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ledger-empty">Nothing I have built meets that. I am not going to invent one.</p>
            )}

            <p className="ledger-sum">
              <span>Claims shown</span>
              <b>{rows.length} of {BUILDS.length}</b>
            </p>
          </div>
        </div>

        <div className="cf-read">
          <div className="blk rv">
            <h3>Four fields, and I will not pretend to a fifth.</h3>
            <p>
              Money moves, civic records, agent infrastructure, and the documentation
              that keeps all three usable. Narrow the ledger to one and see how much is
              left standing.
            </p>
            <div className="seg" role="group" aria-label="Field">
              {["All", ...FIELDS].map((f) => (
                <button key={f} type="button" aria-pressed={field === f} onClick={() => setField(f)}>{f}</button>
              ))}
            </div>
          </div>

          <div className="blk rv">
            <h3>Set the proof you need before you believe me.</h3>
            <p>
              Every claim carries a grade I gave it myself, and the bar you set here is
              the one the ledger answers to. Raise it to Gold and the list gets honest fast.
            </p>
            <div className="seg" role="group" aria-label="Lowest grade">
              {["Bronze", "Silver", "Gold"].map((g) => (
                <button key={g} type="button" aria-pressed={bar === g} onClick={() => setBar(g)}>{g}</button>
              ))}
            </div>
          </div>

          <div className="blk rv">
            <h3>Hosted, or only hosted on my word.</h3>
            <p>
              Some of this is a running service with a URL. Some is a repository. Some is
              finished work I cannot show you. Switch this on to drop everything you
              cannot click.
            </p>
            <div className="sw">
              <button
                type="button"
                role="switch"
                aria-checked={only}
                aria-labelledby="only-l"
                onClick={() => setOnly(!only)}
              >
                <span />
              </button>
              <label id="only-l">Only things with a live URL</label>
            </div>
          </div>

          <div className="blk rv">
            <h3>Or go straight to the one you came for.</h3>
            <p>
              If somebody sent you here about a particular build, type its name. The
              ledger keeps whatever you set above.
            </p>
            <div className="fld">
              <label className="sr" htmlFor="q">Search claims by name</label>
              <input
                id="q"
                type="search"
                value={q}
                placeholder="UnioGate, Certo, Ifa Labs…"
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   THE LETTER
   ========================================================= */
function Letter() {
  return (
    <section className="lt" id="about">
      <div className="wrap lt-col">
        <img className="rv" src="assets/chidile-photo.jpg" alt="Chidile Ozoemena" width="625" height="625" loading="lazy" />

        <h2 className="sec-h rv" data-d="1">Why there is a grade on everything here</h2>

        <p className="rv" data-d="1">
          I started writing documentation because I kept inheriting systems nobody could
          explain. The code ran; the reasoning behind it had left with whoever wrote it.
        </p>
        <p className="rv" data-d="2">
          So I began shipping both halves, the thing that runs and the writing that keeps
          it alive, and I stopped being able to tell you which half is the real work.
        </p>
        <p className="rv" data-d="2">
          That habit is why this page grades itself. <mark>If I cannot show you, I say so.</mark>{" "}
          Eight of the twenty claims on this page have nothing for you to open, and they
          are still on the list, marked for what they are.
        </p>
        <p className="rv" data-d="3">
          I work out of Nigeria, mostly on money that has to settle and records that have
          to hold. If that is your problem, we will get along.
        </p>

        <p className="lt-sign rv" data-d="3">
          <b>Chidile Ozoemena</b>
          <span>Engineer and technical writer, Lagos</span>
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   PRICES, SET LIKE A MENU
   ========================================================= */
function Prices() {
  return (
    <section className="pr" id="prices">
      <div className="wrap grid12">
        <div className="pr-h">
          <h2 className="sec-h rv">Rates, plainly</h2>
          <p className="lead rv" data-d="1">Engagements start at <b>$2,000</b>.</p>
          <figure className="rv" data-d="2">
            <img
              src="assets/arch/arch-wedge.jpg"
              alt="A narrow wedge-shaped building corner seen from below against a teal sky"
              width="600"
              height="800"
              loading="lazy"
            />
            <figcaption>Photograph: Anthony DELANOIX</figcaption>
          </figure>
        </div>

        <div className="pr-list">
          {MENU.map((grp, i) => (
            <div className="pr-group rv" data-d={String(i + 1)} key={grp.g}>
              <h3>{grp.g}</h3>
              <ul>
                {grp.items.map((it) => (
                  <li key={it.n}>
                    <p className="pr-row">
                      <b>{it.n}</b>
                      <i>{it.v}</i>
                    </p>
                    <p className="pr-note">{it.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   THE NAMES
   ========================================================= */
function Names() {
  const [on, setOn] = uS(0);

  uE(() => {
    const t = setInterval(() => setOn((i) => (i + 1) % CLIENTS.length), 2000);
    return () => clearInterval(t);
  }, []);

  const marks = CLIENTS.filter((c) => c.f);

  return (
    <section className="nm" id="clients">
      <div className="wrap">
        <h2 className="sec-h rv">Twenty-one names have paid for this</h2>

        <p className="nm-say rv" data-d="1">
          {CLIENTS.map((c, i) => (
            <React.Fragment key={c.n}>
              <i className={i === on ? "on" : ""}>{c.n}</i>
              {i < CLIENTS.length - 1 ? ", " : "."}
            </React.Fragment>
          ))}
        </p>

        <div className="nm-marks rv" data-d="2">
          {marks.map((c) => (
            <img
              key={c.n}
              className={c.sq ? "sq" : ""}
              src={"assets/logos/" + c.f}
              alt={c.n}
              height={c.sq ? "40" : "34"}
              loading="lazy"
            />
          ))}
        </div>

        <p className="nm-note rv" data-d="3">
          Contracts, infrastructure, agent work and documentation, between 2021 and today.
          Ten of the names above have no mark here yet; I would rather leave a gap than
          draw one myself.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   THE LAST PHOTOGRAPH
   ========================================================= */
function Close() {
  return (
    <section className="cta">
      <img
        src="assets/arch/arch-concrete.jpg"
        alt="A white angular concrete building standing against a black sky"
        width="1600"
        height="1000"
        loading="lazy"
      />
      <div className="wrap grid12 cta-in">
        <div className="cta-t rv">
          <h2>The part nobody documents</h2>
          <p>
            Tell me what has to settle, what has to hold, and who has to be able to read
            it afterwards. I will tell you what it takes.
          </p>
          <a className="act" href={CALL} target="_blank" rel="noreferrer">Book a call</a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER — photograph half, menu half
   ========================================================= */
function Foot() {
  return (
    <footer className="ft">
      <div className="ft-shot">
        <img
          src="assets/arch/arch-well.jpg"
          alt="The view straight up a dark building lightwell to a bright sky"
          width="1200"
          height="800"
          loading="lazy"
        />
      </div>

      <div className="ft-menu">
        <p className="ft-mark">Chidile Ozoemena</p>

        <h2>The rest of this page</h2>
        <nav className="ft-nav" aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#prices">Rates</a>
          <a href="#clients">Clients</a>
          <a href="/archive">Archive</a>
        </nav>

        <div className="ft-cols">
          <div>
            <b>Write to me</b>
            <a href={"mailto:" + EMAIL}>{EMAIL}</a>
            <a href={CALL} target="_blank" rel="noreferrer">Book a call</a>
          </div>
          <div>
            <b>Elsewhere</b>
            <a href={GH} target="_blank" rel="noreferrer">GitHub</a>
            <a href="/archive">The archive</a>
          </div>
          <div>
            <b>Photographs</b>
            <span>Carl Nenzen Loven</span>
            <span>Liam Andrew</span>
            <span>Anthony DELANOIX</span>
          </div>
        </div>

        <p className="ft-legal">
          Lagos, Nigeria. Screenshots are of my own work, taken {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
}

function App() {
  useReveal();
  return (
    <React.Fragment>
      <Split />
      <Config />
      <Letter />
      <Prices />
      <Names />
      <Close />
      <Foot />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

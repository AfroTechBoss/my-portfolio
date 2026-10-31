/* =========================================================
   object.jsx: type and nothing else
   Direction: type-only-statement (seed 1747536568)
   The first screen is words, colour and space. After it the
   ground colour changes as you read, and the grade of each
   claim is what carries you from one field to the next.
   Self-contained: mounts its own root.
   ========================================================= */
const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM } = React;

const EMAIL = "chidileozoemena@gmail.com";
const CALL  = "https://calendly.com/afrotechboss/chidile-ozoemena";

/* ---------------- the grading ---------------- */
const RANK  = { Bronze: 0, Silver: 1, Gold: 2 };
const GRADE = [
  { g: "Bronze", say: "You have my word, and nothing else." },
  { g: "Silver", say: "You can read the source. There is nothing hosted to open." },
  { g: "Gold",   say: "You can open it and use it right now." },
];

/* the four disciplines, and the colour each one takes on the shelf */
const FIELD = {
  Money:  "#ff8126",
  Civic:  "#4db3ff",
  Agents: "#c5f53d",
  Docs:   "#de194b",
};

const BUILDS = [
  { n: "UnioGate",     d: "Money",  g: "Gold",   live: "https://uniogate.com" },
  { n: "Uzo Labs",     d: "Agents", g: "Gold",   live: "https://uzolabs.xyz" },
  { n: "BotID",        d: "Agents", g: "Gold",   live: "https://botidprotocol.vercel.app" },
  { n: "Honua",        d: "Civic",  g: "Gold",   live: "https://honuaweb.vercel.app" },
  { n: "Certo",        d: "Money",  g: "Gold",   live: "https://certo.ng" },
  { n: "NaijaRights",  d: "Civic",  g: "Gold",   live: "https://naijarights.vercel.app" },
  { n: "Kast",         d: "Civic",  g: "Gold",   live: "https://kast-lyart.vercel.app" },
  { n: "WarpKey",      d: "Money",  g: "Gold",   live: "https://warpkey.vercel.app" },
  { n: "HelloACA",     d: "Agents", g: "Gold",   live: "https://helloaca-two.vercel.app" },
  { n: "Revelation",   d: "Money",  g: "Gold",   live: "https://t.me/revelationtradingbot" },
  { n: "Leak",         d: "Civic",  g: "Silver", repo: "https://github.com/AfroTechBoss/leak" },
  { n: "FrensPool",    d: "Money",  g: "Silver", repo: "https://github.com/AfroTechBoss/frenspool" },
  { n: "CarbonSystem", d: "Civic",  g: "Silver", repo: "https://github.com/AfroTechBoss/CarbonSystem" },
  { n: "Honua L2",     d: "Money",  g: "Bronze" },
  { n: "Graso",        d: "Money",  g: "Bronze" },
  { n: "Uzo Docs",     d: "Docs",   g: "Gold",   live: "https://docs.uzolabs.xyz" },
  { n: "Ifa Labs",     d: "Docs",   g: "Gold",   live: "https://docs.ifalabs.com" },
  { n: "Honua paper",  d: "Docs",   g: "Gold",   live: "https://docs.honua.green" },
  { n: "Frenspool doc", d: "Docs",  g: "Bronze" },
  { n: "Brij",         d: "Docs",   g: "Bronze" },
];

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

const SERVICES = [
  { n: "Smart contracts",                      v: "Solidity, Cairo, Rust, Move" },
  { n: "Blockchain infrastructure",            v: "Chains, SDKs, indexers" },
  { n: "AI and agent products",                v: "With a trail behind them" },
  { n: "Technical documentation",              v: "GitBook, Mintlify, Notion" },
  { n: "Product and market research",          v: "Per report" },
  { n: "Systems analysis and redesign",        v: "Audit" },
  { n: "Technical co-founder, fractional CTO", v: "Retainer" },
  { n: "Workshops, teaching and talks",        v: "Per day" },
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
   THE FIRST SCREEN — words, colour and space
   ========================================================= */
function Hero() {
  const [lit, setLit] = uS(false);
  uE(() => {
    const t = requestAnimationFrame(() => setLit(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <header className={"hero f f-orange" + (lit ? " lit" : "")}>
      <div className="hero-top">
        <b>Chidile Ozoemena</b>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="/archive">Archive</a>
          <a href={"mailto:" + EMAIL}>Email</a>
        </nav>
      </div>

      <h1 className="hero-say">
        <span className="l hero-l1"><span>Built</span></span>
        <span className="l hero-l2"><span>and written</span></span>
      </h1>

      <div className="hero-foot">
        <p>
          I build settlement rails, civic platforms and agent infrastructure in Nigeria,
          then write the documentation that keeps them alive.
        </p>
        <a className="act" href={CALL} target="_blank" rel="noreferrer">Book a call</a>
      </div>
    </header>
  );
}

/* =========================================================
   THE SHELF — twenty claims, and the ladder that sorts them
   The live thing on this page: choosing a grade brings the
   claims that meet it to the front of the shelf.
   ========================================================= */
function Shelf() {
  const [sel, setSel] = uS("Bronze");
  const met = uM(() => BUILDS.filter((x) => RANK[x.g] >= RANK[sel]).length, [sel]);
  const said = GRADE.find((x) => x.g === sel).say;

  return (
    <section className="sh f f-dark" id="work">
      <div className="wrap">
        <div className="sh-top">
          <div>
            <h2 className="sec-h rv">Twenty claims, on one shelf</h2>
            <p className="sh-count rv" data-d="1">
              <b>{met} of {BUILDS.length}</b> meet {sel}. {said}
            </p>
          </div>

          <div className="ladder rv" data-d="2" role="group" aria-label="Sort the shelf by proof">
            {GRADE.map((x) => (
              <button
                key={x.g}
                type="button"
                aria-pressed={sel === x.g}
                onClick={() => setSel(x.g)}
              >
                {x.g}
              </button>
            ))}
          </div>
        </div>

        <div className="shelf">
          {BUILDS.map((x) => {
            const held = RANK[x.g] >= RANK[sel];
            const href = x.live || x.repo || "/archive";
            const out = !href.startsWith("/");
            return (
              <a
                key={x.n}
                className={"spine" + (held ? "" : " late")}
                data-k={x.d === "Docs" ? "crimson" : x.d}
                style={{ "--sp": FIELD[x.d] }}
                href={href}
                target={out ? "_blank" : undefined}
                rel={out ? "noreferrer" : undefined}
              >
                {x.n}<i>{x.d}</i>
              </a>
            );
          })}
        </div>

        <p className="sh-key rv">
          {Object.keys(FIELD).map((k) => (
            <span key={k}><b style={{ "--sp": FIELD[k] }} aria-hidden="true"></b>{k}</span>
          ))}
        </p>

        <p className="sh-foot rv" data-d="1">
          <a className="act-2" href="/archive">Every claim in one ledger</a>
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   WHAT I AM HIRED FOR — one item per poster line
   ========================================================= */
function Hired() {
  return (
    <section className="po f f-sky" id="scope">
      <div className="wrap">
        <div className="po-h">
          <h2 className="sec-h rv">What I am hired for</h2>
        </div>
        <ul className="po-list">
          {SERVICES.map((s, i) => (
            <li key={s.n} className="rv" data-d={String((i % 5) + 1)}>
              <span className="po-n">{s.n}</span>
              <span className="po-v">{s.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =========================================================
   THE PICTURES — large and few, as relief from the type
   ========================================================= */
function Pictures() {
  return (
    <section className="ph f f-orange" id="screens">
      <div className="wrap">
        <div className="ph-h">
          <h2 className="sec-h rv">Five of them, as shipped</h2>
        </div>

        <figure className="ph-big rv">
          <img src="assets/shots/uniogate.jpg" alt="The UnioGate point-of-sale dashboard"
               width="1440" height="900" loading="lazy" />
          <figcaption>UnioGate. Cards and stablecoins settling into one merchant ledger.</figcaption>
        </figure>

        <figure className="ph-pair rv" data-d="1">
          <img src="assets/shots/honua.jpg" alt="The Honua climate network feed"
               width="1440" height="900" loading="lazy" />
          <img src="assets/shots/kast.jpg" alt="The Kast broadcasting client"
               width="1440" height="900" loading="lazy" />
          <figcaption>Honua and Kast. Both open in a new tab, right now.</figcaption>
        </figure>

        <figure className="ph-pair rv" data-d="2">
          <img src="assets/shots/certo.jpg" alt="The Certo seller verification page"
               width="1440" height="900" loading="lazy" />
          <img src="assets/shots/naijarights.jpg" alt="The NaijaRights constitution reader"
               width="1440" height="900" loading="lazy" />
          <figcaption>Certo and NaijaRights. Verification, and the constitution in plain words.</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* =========================================================
   ABOUT — side facts, wide paragraph
   ========================================================= */
function About() {
  return (
    <section className="ab f f-orange" id="about">
      <div className="wrap">
        <h2 className="sec-h rv">Who you are hiring</h2>
        <div className="ab-in">
          <div className="ab-facts rv">
            <div><b>Nigeria</b><em>Working from Lagos, hired from everywhere</em></div>
            <div><b>Q3 2026</b><em>Next availability</em></div>
            <div><b>24 hours</b><em>Reply time on a cold email</em></div>
          </div>

          <div>
            <p className="ab-say rv" data-d="1">
              I build the systems and then I write them down. Most engineers skip that
              second half. It is why the first half survives.
            </p>
            <p className="ab-body rv" data-d="2">
              Most of my work sits where money, records and public interest meet: settlement
              rails for merchants who lose too much to middlemen, an accountability layer for
              agents that move capital, a whistleblowing app built to know nothing about the
              people using it. Clients hire people, not CVs, so I build like my name is on it,
              because it is: on the contracts, on the docs, and on{" "}
              <a href="#clients">this page</a>.
            </p>
            <figure className="ab-por rv" data-d="3">
              <img src="assets/chidile-photo.jpg" alt="Chidile Ozoemena"
                   width="625" height="625" loading="lazy" />
              <figcaption>Chidile Ozoemena, Lagos.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   THE PRICE, VERY LARGE
   ========================================================= */
function Price() {
  return (
    <section className="pr f f-lime" id="price">
      <div className="wrap pr-in">
        <div className="pr-say rv">
          <h2 className="sec-h">What it costs to start</h2>
          <p>
            Scopes differ, and the number beside this is a floor rather than a quote. Tell me
            what you are building and I will send back a written scope before you commit
            to anything.
          </p>
          <div className="pr-go">
            <a className="act" href={CALL} target="_blank" rel="noreferrer">Book a call</a>
            <a className="act-2" href="/scope">See the full scope sheet</a>
          </div>
        </div>

        <div>
          <p className="pr-fig rv" data-d="1">
            <span className="pr-cur">$</span>
            <span className="pr-num">2,000</span>
            <span className="pr-per">per project, most start here</span>
          </p>
          <ul className="pr-list">
            {SERVICES.slice(0, 4).map((s, i) => (
              <li key={s.n} className="rv" data-d={String((i % 5) + 1)}>
                {s.n}<span>{s.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   THE NAMES, AS ONE SENTENCE
   ========================================================= */
function Clients() {
  const [on, setOn] = uS(0);
  uE(() => {
    const t = setInterval(() => setOn((i) => (i + 1) % CLIENTS.length), 2000);
    return () => clearInterval(t);
  }, []);
  const marks = CLIENTS.filter((c) => c.f);

  return (
    <section className="cl f f-sky" id="clients">
      <div className="wrap">
        <h2 className="sec-h rv">Twenty-one names have paid for this</h2>

        <p className="cl-names rv" data-d="1">
          {CLIENTS.map((c, i) => (
            <React.Fragment key={c.n}>
              <i className={i === on ? "on" : ""}>{c.n}</i>
              {i < CLIENTS.length - 1 ? ", " : "."}
            </React.Fragment>
          ))}
        </p>

        <div className="cl-marks rv" data-d="2">
          {marks.map((c) => (
            <img
              key={c.n}
              className={c.sq ? "sq" : ""}
              src={"assets/logos/" + c.f}
              alt={c.n}
              height="40"
              loading="lazy"
            />
          ))}
        </div>

        <p className="cl-note rv" data-d="3">
          Eleven of them have a mark above. The other ten are named because the work
          happened, not because I have their logo on file.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT — one prompt, one field
   ========================================================= */
function Contact() {
  const [who, setWho] = uS("");

  const send = (e) => {
    e.preventDefault();
    const body = who ? "Reply to: " + who + "\n\n" : "";
    window.location.href =
      "mailto:" + EMAIL + "?subject=" + encodeURIComponent("A build to talk about") +
      "&body=" + encodeURIComponent(body);
  };

  return (
    <section className="co f f-dark" id="contact">
      <div className="wrap co-in">
        <h2 className="co-p rv">
          <span>Tell me what you are building.</span>
          Leave an address and I will write back.
        </h2>

        <form className="co-f rv" data-d="1" onSubmit={send}>
          <input
            type="email"
            value={who}
            onChange={(e) => setWho(e.target.value)}
            placeholder="you@company.com"
            aria-label="Your email address"
          />
          <button type="submit" aria-label="Start the email">&#9654;</button>
        </form>

        <p className="co-next rv" data-d="2">
          This opens your mail client with my address already in it. Reply time is 24 hours.
        </p>

        <div className="co-rows rv" data-d="3">
          <div><b>Email</b><a href={"mailto:" + EMAIL}>{EMAIL}</a></div>
          <div><b>Calls</b><a href={CALL} target="_blank" rel="noreferrer">Calendly</a></div>
          <div><b>Where</b><span>Lagos, Nigeria. Remote worldwide.</span></div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER — the address is the headline
   ========================================================= */
function Footer() {
  return (
    <footer className="ft f f-dark">
      <div className="wrap ft-top">
        <p>
          Chidile Ozoemena, engineer and technical writer. Member of The Rotary Foundation,
          ForbesBLK, ICANN and Bitcoin Africa.
        </p>
        <a className="act-2" href="#work">Back to the top</a>
      </div>

      <div className="wrap ft-mid">
        <h2 className="ft-h rv">Write to me</h2>
        <a className="ft-mail rv" data-d="1" href={"mailto:" + EMAIL}>
          chidileozoemena<wbr />@gmail.com
        </a>
      </div>

      <div className="wrap ft-meta">
        <nav aria-label="Elsewhere">
          <a href="/archive">Archive</a>
          <a href="https://github.com/afrotechboss" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/chidileozoemena/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://x.com/0xAfroTechBoss" target="_blank" rel="noreferrer">X</a>
          <a href="https://t.me/afrotechboss" target="_blank" rel="noreferrer">Telegram</a>
        </nav>
        <span>Screenshots are of my own builds.</span>
        <span>Lagos, 2026</span>
      </div>
    </footer>
  );
}

/* =========================================================
   THE PAGE
   ========================================================= */
function App() {
  useReveal();
  return (
    <>
      <Hero />
      <Shelf />
      <Hired />
      <Pictures />
      <About />
      <Price />
      <Clients />
      <Contact />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

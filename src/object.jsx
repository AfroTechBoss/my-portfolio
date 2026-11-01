/* =========================================================
   object.jsx — ink on paper
   Plain type, one ink, no photographs. The page's only moving part
   is the writing: each line arrives grey and takes its full ink word
   by word as it comes up the screen.
   Self-contained: mounts its own root.
   ========================================================= */
const { useEffect: uE, useRef: uR } = React;

const EMAIL = "chidileozoemena@gmail.com";
const CALL  = "https://calendly.com/afrotechboss/chidile-ozoemena";
const GH    = "https://github.com/AfroTechBoss";

/* Twenty-one builds. UnioGate leads, and the order is the ranking. */
const SHOT = "assets/shots/";

const WORK = [
  { n: "UnioGate", s: "uniogate.jpg", f: "Fintech", d: "A crypto-fiat POS terminal that lets Nigerian merchants take USDT, USDC and cNGN and settle to Naira the same day.", live: "https://uniogate.com" },
  { n: "TUMAM", s: "tumam.jpg", f: "Agents", d: "The unofficial Meta Ads connector for Claude and ChatGPT: sixteen read tools, and every write forced to paused and read back before it counts.", live: "https://tumam.vercel.app" },
  { n: "Uzo Labs", s: "uzolabs.jpg", f: "Developer infrastructure", d: "The developer path for BOT Chain, and the org I run: a viem-native SDK, deploy templates, and a factory that holds no keys.", live: "https://uzolabs.xyz" },
  { n: "BotID Protocol", s: "botid.jpg", f: "Agents", d: "A reputation layer for agents that move capital. Every agent posts a bond, every execution settles into a record you can check.", live: "https://botidprotocol.vercel.app" },
  { n: "Honua", s: "honua.jpg", f: "Sustainability", d: "A sustainability engine where green action is published and traded instead of buried in an annual report.", live: "https://honuaweb.vercel.app" },
  { n: "Certo", s: "certo.jpg", f: "E-commerce", d: "Genuine Apple hardware sourced from the US, every serial checked against Apple's own database, delivered to Nigeria.", live: "https://certo.ng" },
  { n: "NaijaRights", s: "naijarights.jpg", f: "Civic tech", d: "An app that tells a Nigerian citizen what their rights actually are, on a steady release cadence.", live: "https://naijarights.vercel.app" },
  { n: "Kast", s: "kast.jpg", f: "Web3", d: "The Info-Fi layer of Farcaster: real contracts, a real database layer, MIT-licensed.", live: "https://kast-lyart.vercel.app" },
  { n: "WarpKey", s: "warpkey.jpg", f: "Web3", d: "A Farcaster-native way into web3 that takes someone from cold to connected in a few taps.", live: "https://warpkey.vercel.app" },
  { n: "Revelation", s: "revelation.jpg", f: "Trading", d: "A Telegram signal bot on Deriv's live feed, running an eleven-signal confluence engine with its win rate on show.", live: "https://t.me/revelationtradingbot" },
  { n: "HelloACA", s: "helloaca.jpg", f: "AI", d: "A contract analyser that gives a freelancer a plain-language read on an agreement before they sign it.", live: "https://helloaca-two.vercel.app" },
  { n: "Leak", s: "leak.jpg", f: "Civic tech", d: "An anonymous whistleblowing app for Nigerian journalists. It stores no metadata, and it is hosted in Frankfurt on purpose.", live: "https://leak.fly.dev" },
  { n: "Uzo Docs", s: "uzo-docs.jpg", f: "Documentation", d: "SDK reference, Hardhat and Foundry quickstarts, and verification guides for BOT Chain.", live: "https://docs.uzolabs.xyz" },
  { n: "Ifa Labs", s: "ifa-docs.jpg", f: "Documentation", d: "Protocol documentation for a multi-chain stablecoin oracle, written in Mintlify.", live: "https://docs.ifalabs.com" },
  { n: "Honua paper", s: "honua-paper.jpg", f: "Documentation", d: "The Honua protocol paper: what the chain settles, and why it settles it that way.", live: "https://docs.honua.green" },
  { n: "Brij", s: "brij.jpg", f: "Documentation", d: "On-chain product docs: contract surfaces, user flows and developer onboarding.", live: "https://brij-2.gitbook.io/brij-docs" },
  { n: "FrensPool", s: "frenspool.jpg", f: "Web3", d: "A Base-testnet pooling concept: an early look at on-chain group savings between friends.", repo: "https://github.com/AfroTechBoss/frenspool" },
  { n: "CarbonSystem", s: "carbonsystem.jpg", f: "Academic", d: "A PHP carbon-tracking system, my final-year project, kept on the record as what it is.", repo: "https://github.com/AfroTechBoss/CarbonSystem" },
  { n: "Graso", f: "Real-world assets", d: "Tokenised real estate, so ownership can start small and stay liquid. The first build of mine backed by a government grant.", priv: "In development" },
  { n: "Honua L2", f: "Blockchain", d: "The chain underneath Honua: a layer two built to settle green projects. No public network yet.", priv: "In development" },
  { n: "FrensPool docs", f: "Documentation", d: "The written half of FrensPool: contract surfaces and the flows between them.", priv: "Unpublished" },
];

const CLIENTS = [
  { n: "Google",             f: "google.svg" },
  { n: "ICANN",              f: "icann.svg", sq: true },
  { n: "Trust Wallet",       f: "trustwallet.svg" },
  { n: "Bybit",              f: "bybit.png" },
  { n: "WEEX",               f: "weex.svg" },
  { n: "Internet Computer",  f: "icp.svg" },
  { n: "Sui on Campus",      f: "sui.svg" },
  { n: "Cyqur",              f: "cyqur.svg", sq: true },
  { n: "BotChain",           f: "botchain.png", sq: true },
  { n: "Honua",              f: "honua.svg", sq: true },
  { n: "Binarii Labs",       f: "binarii.svg" },
];

const REST = ["Reef Chain", "Cassava Network", "Uglycash", "Victus Global", "Funded",
  "Imrat Group", "Bitcoin Africa", "Birmingham University", "CyreneAI", "Maringo"];

const MENU = [
  { g: "Building", items: [
    { n: "Smart contracts", v: "Per project", d: "Solidity, Cairo, Rust and Move, audited before anyone touches money." },
    { n: "Blockchain infrastructure", v: "Per project", d: "Chains, SDKs and indexers, built with the operator in mind." },
    { n: "AI and agent products", v: "Per project", d: "Agents that leave a trail you can read afterwards." },
  ]},
  { g: "Writing", items: [
    { n: "Technical documentation", v: "Per set", d: "GitBook, Mintlify or Notion. Five sets of mine are open right now." },
    { n: "Product and market research", v: "Per report", d: "The numbers, where they came from, and what they do not say." },
  ]},
  { g: "Advising", items: [
    { n: "Systems analysis and redesign", v: "Audit", d: "I read what you have and tell you what is load-bearing." },
    { n: "Fractional CTO", v: "Retainer", d: "Monthly, with a cap on hours so neither of us pretends." },
    { n: "Workshops and talks", v: "Per day", d: "Lagos in the room, or anywhere on a call." },
  ]},
];

/* ---------------- the light-up ----------------
   One observer for the whole page. A block lights when it arrives, and
   anything the observer never reaches lights anyway on a timer, so a
   crawler or a reader who lands deep still gets every word at full ink. */
function useLight() {
  uE(() => {
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

/* A run of text that takes its ink word by word. The delay is capped so a
   long paragraph finishes rather than trailing off down the page. */
function Lit({ t, as, className }) {
  const Tag = as || "p";
  const words = t.split(" ");
  return (
    <Tag className={"lit " + (className || "")}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w" style={{ "--d": Math.min(i, 44) * 30 + "ms" }}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/* =========================================================
   TOP AND FIRST SCREEN
   ========================================================= */
function Hero() {
  return (
    <header>
      <nav className="top" aria-label="Top">
        <b>Chidile Ozoemena</b>
        <div className="top-go">
          <a href="#work">Work</a>
          <a href="#charge">Rates</a>
          <a href="/archive">Archive</a>
          <a href={"mailto:" + EMAIL}>Email</a>
        </div>
      </nav>

      <div className="wrap hero">
        <h1>I build systems, then I write them down.</h1>
        <p className="sub">
          Smart contracts, blockchain infrastructure and AI agents, with the documentation
          that makes them usable by somebody who is not me. Twenty-one builds. Lagos.
        </p>
        <div className="acts">
          <a className="btn" href={CALL}>Book a call</a>
          <a className="btn ghost" href="#work">See the work</a>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   THE STATEMENT — the page's argument, lit word by word
   ========================================================= */
function Statement() {
  return (
    <section id="about" className="band">
      <div className="wrap st-grid">
        <div>
          <h2 className="sh">What I actually do</h2>
          <Lit
            as="p"
            className="st-say"
            t="I take the part of a product that has to be correct, and I make it correct.
               Then I write it down, because a system nobody can read is a system
               nobody can keep."
          />
        </div>
        <div className="st-facts">
          <div><b>21</b><span>Builds on the record</span></div>
          <div><b>18</b><span>You can open right now</span></div>
          <div><b>5</b><span>Open documentation sets</span></div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   THE WORK
   ========================================================= */
function Work() {
  return (
    <section id="work" className="ink">
      <div className="wrap">
        <h2 className="sh">The work</h2>
        <div className="wk-list">
          {WORK.map((p) => (
            <article className="wk" key={p.n}>
              <div className={"wk-shot" + (p.s ? "" : " none")}>
                {p.s ? <img src={SHOT + p.s} alt={"The first screen of " + p.n} loading="lazy" /> : null}
              </div>
              <h3>{p.n}<span>{p.f}</span></h3>
              <Lit as="p" t={p.d} />
              {p.live ? <a href={p.live}>Open it</a>
                : p.repo ? <a href={p.repo}>Read the source</a>
                : <em>{p.priv}</em>}
            </article>
          ))}
        </div>
        <p className="wk-more">
          <a className="btn ghost" href="/archive">The full archive</a>
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   WHO I HAVE WORKED WITH
   ========================================================= */
function Names() {
  return (
    <section id="clients" className="band">
      <div className="wrap">
        <h2 className="sh">Who I have worked with</h2>
        <div className="nm-marks">
          {CLIENTS.map((c) => (
            <img key={c.n} className={c.sq ? "sq" : ""} src={"assets/logos/" + c.f}
                 alt={c.n} width="160" height="40" loading="lazy" />
          ))}
        </div>
        <Lit as="p" className="nm-rest" t={"Also " + REST.join(", ") + "."} />
      </div>
    </section>
  );
}

/* =========================================================
   WHAT I CHARGE
   ========================================================= */
function Charge() {
  return (
    <section id="charge">
      <div className="wrap">
        <div className="pr-top">
          <h2 className="sh" style={{ marginBottom: 0 }}>What I charge</h2>
          <p>
            Engagements start at <b>$2,000</b>. The shape is on the right of every line;
            the number depends on what the thing has to survive.
          </p>
        </div>

        {MENU.map((g) => (
          <div className="pr-g" key={g.g}>
            <h3>{g.g}</h3>
            {g.items.map((i) => (
              <div className="pr-row" key={i.n}>
                <b>{i.n}</b>
                <Lit as="p" t={i.d} />
                <span>{i.v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   THE LETTER
   ========================================================= */
function Letter() {
  return (
    <section id="letter" className="band">
      <div className="wrap">
        <h2 className="sh">Where this comes from</h2>
        <div className="lt-body">
          <div>
            <Lit as="p" t="I started building because the tools I wanted did not exist where
              I live. A merchant in Lagos holding dollars cannot spend them, so the money sits
              still. A journalist with a document cannot publish it safely, so the story dies.
              Those are engineering problems before they are anything else." />
            <Lit as="p" t="So I learned the part that has to be correct: contracts, chains,
              the settlement underneath. Then I learned to write it down, which turned out to
              be the harder half." />
          </div>
          <div>
            <Lit as="p" t="Most of what I ship is open. Five documentation sets of mine are
              public right now, and you can read the source of the rest. That is deliberate.
              The quickest way to tell whether someone can build the thing is to read what
              they already built." />
            <Lit as="p" t="I work from Lagos, with teams anywhere. If you have the part of a
              product that nobody wants to document, that is the part I want." />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   THE CLOSE
   ========================================================= */
function Close() {
  return (
    <section id="contact" className="cl">
      <div className="wrap">
        <Lit as="h2" t="Tell me what has to be correct." />
        <div className="cl-go">
          <a className="btn" href={CALL}>Book a call</a>
          <a className="btn ghost" href={"mailto:" + EMAIL}>{EMAIL}</a>
        </div>
      </div>
    </section>
  );
}

function Foot() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-cols">
          <div>
            <h2>Chidile Ozoemena</h2>
            <ul>
              <li>Engineer and technical writer</li>
              <li>Lagos, Nigeria</li>
              <li>Next availability: Q1 2027</li>
            </ul>
          </div>
          <div>
            <h2>The record</h2>
            <ul>
              <li><a href="/archive">Full archive</a></li>
              <li><a href={GH}>GitHub</a></li>
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
        <p className="ft-end">Built and written by Chidile Ozoemena. No stock photographs.</p>
      </div>
    </footer>
  );
}

function App() {
  useLight();
  return (
    <>
      <Hero />
      <Statement />
      <Work />
      <Names />
      <Charge />
      <Letter />
      <Close />
      <Foot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

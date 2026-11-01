/* =========================================================
   notfound.jsx — the page that is not there
   Same language as the rest of the site: ink on paper, one typeface,
   and the writing lighting word by word. A wrong address is still a
   page, so it gets a heading, a way out, and three builds to look at.
   Self-contained: mounts its own root, absolute paths throughout,
   because 404.html is served from any depth.
   ========================================================= */
const { useEffect: uE } = React;

const EMAIL = "chidileozoemena@gmail.com";
const CALL  = "https://calendly.com/afrotechboss/chidile-ozoemena";
const GH    = "https://github.com/AfroTechBoss";
const SHOT  = "/assets/shots/";

/* The four newest. UnioGate leads, the way it does everywhere. */
const NEWEST = [
  { n: "UnioGate", s: "uniogate.jpg", f: "Fintech", d: "A crypto-fiat POS terminal that lets Nigerian merchants take USDT, USDC and cNGN and settle to Naira the same day.", live: "https://uniogate.com" },
  { n: "TUMAM", s: "tumam.jpg", f: "Agents", d: "The unofficial Meta Ads connector for Claude and ChatGPT: sixteen read tools, and every write forced to paused and read back before it counts.", live: "https://tumam.vercel.app" },
  { n: "Uzo Labs", s: "uzolabs.jpg", f: "Developer infrastructure", d: "The developer path for BOT Chain, and the org I run: a viem-native SDK, deploy templates, and a factory that holds no keys.", live: "https://uzolabs.xyz" },
  { n: "BotID Protocol", s: "botid.jpg", f: "Agents", d: "A reputation layer for agents that move capital. Every agent posts a bond, every execution settles into a record you can check.", live: "https://botidprotocol.vercel.app" },
];

/* The light-up, the same one the rest of the site uses: one observer for
   the page, plus a timer so nothing is ever left grey. */
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

function Head() {
  return (
    <header>
      <nav className="top" aria-label="Top">
        <b><a href="/">Chidile Ozoemena</a></b>
        <div className="top-go">
          <a href="/#work">Work</a>
          <a href="/#charge">Rates</a>
          <a href="/archive">Archive</a>
          <a href={"mailto:" + EMAIL}>Email</a>
        </div>
      </nav>

      <div className="wrap hero nf-hero">
        <h1>That page is not here.</h1>
        <div className="hero-b">
          <div>
            <p className="sub">
              The address you followed does not point at anything on this site. Either it
              moved, or it never existed. Everything that does exist is one link away.
            </p>
            <div className="acts">
              <a className="btn" href="/">Back to the front</a>
              <a className="btn ghost" href="/archive">The full archive</a>
            </div>
          </div>
          <div className="hero-now">
            <h2>If you were looking for</h2>
            <ul className="nf-ways">
              <li><a href="/#work">The work</a> — eight builds, with the newest first</li>
              <li><a href="/archive">The archive</a> — all twenty-one, live and unfinished</li>
              <li><a href="/scope">Scope a project</a> — eight short questions</li>
              <li><a href={"mailto:" + EMAIL}>{EMAIL}</a> — or write to me</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

function Newest() {
  return (
    <section className="ink">
      <div className="wrap">
        <h2 className="sh">While you are here</h2>
        <div className="wk-list">
          {NEWEST.map((p) => (
            <article className="wk" key={p.n}>
              <div className="wk-shot">
                <img src={SHOT + p.s} alt={"The first screen of " + p.n} loading="lazy" />
              </div>
              <h3>{p.n}<span>{p.f}</span></h3>
              <Lit as="p" t={p.d} />
              <a href={p.live}>Open it</a>
            </article>
          ))}
        </div>
        <p className="wk-more">
          <Lit as="span" t={"Four of twenty-one. The rest, including the ones still being built and the ones kept for the record, are in the archive."} />
          <a className="btn ghost" href="/archive">The full archive</a>
        </p>
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

function NotFound() {
  useLight();
  return (
    <>
      <Head />
      <Newest />
      <Foot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<NotFound />);

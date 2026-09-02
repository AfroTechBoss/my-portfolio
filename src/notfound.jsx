/* =========================================================
   notfound.jsx — 404 page
   Same Lumen chrome as the home page; ruled index of what does exist.
   ========================================================= */
const NF_LINKS = [
  { i: "01", h: "Home", d: "The whole story, start to finish", url: "/" },
  { i: "02", h: "Selected work", d: "Six builds, measured in outcomes", url: "/#work" },
  { i: "03", h: "Documentation", d: "Docs that are, in fact, documented", url: "/#writing" },
  { i: "04", h: "Full archive", d: "All 14 projects, on the record", url: "/archive" },
  { i: "05", h: "Contact", d: "Tell me what you're building", url: "/#contact" },
];

function NFNav() {
  return (
    <nav className="nav scrolled nf-nav">
      <div className="nav-inner">
        <a href="/" className="logo footer-sig nav-sig" aria-label="Chidile — home">
          <span className="sig-name">Chidile</span>
          <svg className="sig-scribble" viewBox="0 0 240 46" fill="none" aria-hidden="true" preserveAspectRatio="none">
            <path d="M6 30 C 46 14, 92 12, 132 22 C 168 31, 198 33, 234 18 C 210 24, 150 30, 96 27 C 64 25, 36 27, 14 36"
              stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <div className="nav-right">
          <a href="/" className="nav-link">Home</a>
          <a href="/archive" className="nav-link">Archive</a>
          <Magnetic strength={0.35}><a href="/#contact" className="nav-cta">Let's talk</a></Magnetic>
        </div>
      </div>
    </nav>
  );
}

function NFMain() {
  return (
    /* LFooter's "back to top" points at #top, so the page has to own that id. */
    <main className="nf" id="top" data-screen-label="404">
      <PlotGrid />
      <div className="wrap nf-wrap">
        <div className="nf-top">
          <div>
            <span className="sec-num">
              <span className="rule" aria-hidden="true" />Error 404 — no such page
            </span>
            <h1 className="nf-head serif">
              <span className="nf-line"><span style={{ "--i": 0 }}>This one isn't</span></span>
              <span className="nf-line"><span style={{ "--i": 1 }}>documented <em className="hero-rot">yet.</em></span></span>
            </h1>
            <p className="nf-lede">
              The address you followed doesn't exist — a dead link, a typo, or something I've since moved.{" "}
              <span className="b">Here's everything that does exist.</span>
            </p>
          </div>

          <div className="nf-numeral" aria-hidden="true"><span>404</span></div>
        </div>

        <div className="nf-list">
          {NF_LINKS.map((l) => (
            <a className="nf-row" key={l.i} href={l.url} data-cursor>
              <span className="nf-i">{l.i}</span>
              <span className="nf-h serif">{l.h}</span>
              <span className="nf-d">{l.d}</span>
            </a>
          ))}
        </div>

        <p className="nf-foot">
          Think this link should work? <a href="/#contact">Tell me about it</a>
        </p>
      </div>
    </main>
  );
}

function NFApp() {
  useRevealObserver("nf");
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <LumenCursor />
      <PortalManager />
      <NFNav />
      <NFMain />
      <LFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<NFApp />);

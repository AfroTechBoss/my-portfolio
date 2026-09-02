/* =========================================================
   notfound.jsx — 404 page
   Nothing but the numeral, floated in the middle of an empty field.
   ========================================================= */
function NFNav() {
  return (
    <nav className="nav scrolled nf-nav">
      <div className="nav-inner">
        <a href="/" className="logo footer-sig nav-sig" aria-label="Chidile — home">
          <span className="sig-name">Chidile</span>
        </a>
        <NavMenu links={[["Home", "/"], ["Archive", "/archive"]]} ctaHref="/#contact" />
      </div>
    </nav>
  );
}

function NFMain() {
  return (
    <main className="nf" data-screen-label="404">
      <PlotGrid />
      {/* The numeral is the only content left, so it carries the page's
          meaning now and can no longer be hidden from assistive tech. */}
      <div className="nf-numeral">
        <span className="nf-eyebrow">Not found</span>
        <span className="nf-num">404</span>
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
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<NFApp />);

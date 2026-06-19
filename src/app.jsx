/* =========================================================
   lumen-app.jsx — composition + mount
   Accent (#E0431B), motion and grain are now permanent — no tweak panel.
   ========================================================= */
function LApp() {
  useRevealObserver("lumen");

  React.useEffect(() => {
    // Section snapping (rides with the always-on motion).
    document.documentElement.classList.add("snap-y");
  }, []);

  return (
    <>
      <Loader />
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" />
      <LumenCursor />

      <LNav />
      <LHero />
      <Statement
        eyebrow="The thesis"
        parts={[
          { t: "Financial" }, { t: "infrastructure" }, { t: "for" }, { t: "a" }, { t: "borderless" }, { t: "economy," },
          { t: "engineered", em: true }, { t: "to", em: true }, { t: "move", em: true },
          { t: "value" }, { t: "anywhere." },
        ]}
      />
      <LWork />
      <LCapabilities />
      <LAbout />
      <LBand />
      <LContact />
      <LFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LApp />);

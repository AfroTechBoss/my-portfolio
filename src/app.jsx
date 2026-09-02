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
      <PortalManager />

      <LNav />
      <LHero />
      <LCounts />
      <Statement
        eyebrow="The thesis"
        parts={[
          { t: "A" }, { t: "system" }, { t: "nobody" }, { t: "can" }, { t: "explain" },
          { t: "is" }, { t: "a" }, { t: "system" }, { t: "nobody" }, { t: "can" }, { t: "trust." },
          { t: "I", em: true }, { t: "build", em: true }, { t: "it,", em: true },
          { t: "document", em: true }, { t: "it,", em: true }, { t: "and", em: true },
          { t: "rebuild", em: true }, { t: "what's", em: true }, { t: "already", em: true }, { t: "broken.", em: true },
        ]}
      />
      <LWork />
      <LWriting />
      <LPractice />
      <LCapabilities />
      <LClients />
      <LRooms />
      <LAbout />
      <LBand />
      <LContact />
      <LFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LApp />);

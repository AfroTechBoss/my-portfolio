/* =========================================================
   lumen-about.jsx — About, marquee band, Contact finale, Footer
   ========================================================= */

/* ---------------- LINK PORTAL ---------------- */
// clip-path circle expansion: grows from exact cursor position to fill viewport
function LinkPortal({ platform, url, origin, onClose }) {
  const [phase, setPhase] = useLS("start"); // start → open → closing

  const ox = origin.x;
  const oy = origin.y;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxR = Math.ceil(
    Math.sqrt(Math.pow(Math.max(ox, vw - ox), 2) + Math.pow(Math.max(oy, vh - oy), 2))
  ) + 4;

  useLE(() => {
    // Next tick: trigger the expand transition
    const t1 = requestAnimationFrame(() =>
      requestAnimationFrame(() => setPhase("open"))
    );
    return () => cancelAnimationFrame(t1);
  }, []);

  const handleProceed = () => {
    setPhase("closing");
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      onClose();
    }, 500);
  };

  const handleClose = () => {
    setPhase("closing");
    setTimeout(onClose, 500);
  };

  const clipStart = `circle(31px at ${ox}px ${oy}px)`;
  const clipFull  = `circle(${maxR}px at ${ox}px ${oy}px)`;

  const clipPath = phase === "start" ? clipStart
                 : phase === "open"  ? clipFull
                 : clipStart; // closing → shrink back

  const transition = phase === "closing"
    ? "clip-path .45s cubic-bezier(.4,0,1,1)"
    : "clip-path .65s cubic-bezier(.4,0,.2,1)";

  const contentVisible = phase === "open";

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        background: "var(--accent)",
        clipPath,
        transition,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: phase === "start" ? "none" : "auto",
      }}
    >
      <div
        style={{
          textAlign: "center", color: "#fff",
          padding: "0 clamp(24px,6vw,80px)",
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0)" : "translateY(12px)",
          transition: contentVisible
            ? "opacity .32s .28s ease, transform .32s .28s ease"
            : "opacity .12s ease, transform .12s ease",
          pointerEvents: contentVisible ? "auto" : "none",
        }}
      >
        <p style={{
          fontFamily: "var(--ff-serif)", fontSize: "clamp(1.2rem,2.8vw,2rem)",
          lineHeight: 1.4, maxWidth: "36ch", margin: "0 auto 2.2rem",
        }}>
          You are about to leave my portfolio to visit my{" "}
          <em>{platform}</em> profile.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={handleProceed}
            style={{
              padding: ".75rem 2.2rem", borderRadius: "2px",
              background: "#fff", color: "var(--accent)",
              border: "none", cursor: "pointer",
              fontFamily: "var(--ff-sans)", fontWeight: 700,
              fontSize: ".9rem", letterSpacing: ".08em",
            }}
          >
            Proceed →
          </button>
          <button
            onClick={handleClose}
            style={{
              padding: ".75rem 2.2rem", borderRadius: "2px",
              background: "transparent", color: "#fff",
              border: "1.5px solid rgba(255,255,255,.6)", cursor: "pointer",
              fontFamily: "var(--ff-sans)", fontWeight: 500,
              fontSize: ".9rem", letterSpacing: ".08em",
            }}
          >
            Do that later
          </button>
        </div>
      </div>
    </div>
  );
}

// Global portal state manager — rendered once in LApp
function PortalManager() {
  const [active, setActive] = useLS(null); // null | { platform, url, origin }

  useLE(() => {
    window.__openPortal = (platform, url, origin) => setActive({ platform, url, origin });
    return () => { delete window.__openPortal; };
  }, []);

  if (!active) return null;
  return (
    <LinkPortal
      platform={active.platform}
      url={active.url}
      origin={active.origin}
      onClose={() => setActive(null)}
    />
  );
}

/* ---------------- HOBBY OVERLAY ---------------- */
const HOBBIES = {
  Swimming: "In 2024 I fell into a 12ft pool and nearly became a statistic. Instead of developing a healthy fear of water like a normal person, I decided the real problem was that I didn't know how to swim — so I learned. Now I actually swim for fun, voluntarily, which still feels illegal given how it started. Best plot twist of my life: almost drowning turned into my favourite hobby.",
  Singing: "I have 28 playlists on Spotify. Twenty-eight. There's one for sad days, one for happy days, one for \"I just became single,\" one for missing my parents — basically if you know the playlist I'm on, you know exactly what kind of day I'm having. Then there's my YouTube karaoke playlist, which exists purely so my homies and I can sing terribly and still feel like we're MJ for three minutes. My personal anthem is \"Older\" by Sam Opoku — if you ever hear me randomly humming it, just know I'm having a moment.",
  Audiobooks: "I'm dyslexic, so reading used to feel like a wrestling match I kept losing. Then I discovered you can read the book AND listen to the audiobook at the same time — like subtitles, but for your brain. Suddenly I went from \"avoids books\" to \"has opinions on The 48 Laws of Power, Rich Dad Poor Dad, and 1984.\" Turns out I didn't hate reading, I just hated reading the hard way.",
  Films: "I haven't watched every movie ever made. Probably. I just have a suspiciously large opinion about most of them. If you need a recommendation, I'm your guy — and yes, I will generously offer you my Netflix login, fully knowing I am never actually giving you the password. It's the thought that counts.",
};

function HobbyOverlay({ hobby, origin, onClose }) {
  const [phase, setPhase] = useLS("start");

  useLE(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("open")));
    return () => cancelAnimationFrame(raf);
  }, []);

  const close = () => {
    setPhase("closing");
    setTimeout(onClose, 420);
  };

  // origin is relative to the about-body container
  const ox = origin.x;
  const oy = origin.y;
  // radius to cover the container from origin
  const maxR = Math.ceil(Math.sqrt(Math.pow(Math.max(ox, 2000 - ox), 2) + Math.pow(Math.max(oy, 2000 - oy), 2)));
  const clipStart = `circle(20px at ${ox}px ${oy}px)`;
  const clipFull  = `circle(${maxR}px at ${ox}px ${oy}px)`;

  const clipPath = phase === "start" ? clipStart : phase === "open" ? clipFull : clipStart;
  const easing   = phase === "closing"
    ? "clip-path .38s cubic-bezier(.4,0,1,1)"
    : "clip-path .6s cubic-bezier(.4,0,.2,1)";

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 10,
      background: "var(--accent)",
      clipPath, transition: easing,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "clamp(24px,5%,48px)",
      pointerEvents: phase === "start" ? "none" : "auto",
    }}>
      <button
        onClick={close}
        style={{
          position: "absolute", top: 20, right: 20,
          background: "none", border: "none", cursor: "pointer",
          color: "#fff", fontSize: "1.4rem", lineHeight: 1,
          opacity: phase === "open" ? 1 : 0,
          transition: "opacity .2s .35s",
          fontFamily: "var(--ff-sans)",
        }}
        aria-label="Close"
      >✕</button>

      <div style={{
        opacity: phase === "open" ? 1 : 0,
        transform: phase === "open" ? "translateY(0)" : "translateY(10px)",
        transition: phase === "open"
          ? "opacity .3s .25s ease, transform .3s .25s ease"
          : "opacity .1s ease",
      }}>
        <p style={{
          fontFamily: "var(--ff-sans)", fontSize: ".7rem", fontWeight: 600,
          letterSpacing: ".12em", color: "rgba(255,255,255,.65)",
          marginBottom: "1rem", textTransform: "uppercase",
        }}>{hobby}</p>
        <p style={{
          fontFamily: "var(--ff-serif)", fontSize: "clamp(1rem,1.6vw,1.25rem)",
          lineHeight: 1.65, color: "#fff", margin: 0,
        }}>{HOBBIES[hobby]}</p>
      </div>
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
const LBELIEFS = [
"Crypto adoption isn't a trend. It's the next financial infrastructure.",
"Great products cross borders — so I build for users anywhere.",
"Clients hire people, not CVs. So I build like my name is on it."];

function LAbout() {
  const [activeHobby, setActiveHobby] = useLS(null); // { name, origin }
  const bodyRef = useLR(null);

  const openHobby = (name, e) => {
    const rect = bodyRef.current.getBoundingClientRect();
    setActiveHobby({
      name,
      origin: { x: e.clientX - rect.left, y: e.clientY - rect.top },
    });
  };

  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="sec-num reveal">03 / About</span>
            <h2 className="sec-title serif reveal" data-d="1" style={{ marginTop: 14 }}>Who you'd actually<br />be working with.</h2>
          </div>
        </div>

        <div className="about-grid">
          <div className="reveal">
            <div className="about-photo" data-cursor>
              <img className="hp-avatar" src="assets/chidile-avatar.jpg" alt="Chidile — avatar" />
              <img className="hp-real" src="assets/chidile-photo.jpg" alt="Chidile — portrait" />
              <span className="hp-chip">HOVER — MEET THE HUMAN</span>
            </div>
            <div className="about-cap"><span>Chidile</span><span>Remote · 2026</span></div>
          </div>

          <div className="about-body" ref={bodyRef} style={{ position: "relative", overflow: "hidden" }}>
            {activeHobby && (
              <HobbyOverlay
                hobby={activeHobby.name}
                origin={activeHobby.origin}
                onClose={() => setActiveHobby(null)}
              />
            )}

            <p className="about-lede serif reveal">
              I build the financial infrastructure for a borderless economy — wherever value needs to move.
            </p>
            <p className="reveal" data-d="1">
              I started building at 17 and never really stopped.
              <span className="muted"> That trajectory ran from early ventures into Graso — which won a state-government grant — then UnioGate, Leak, and the work I take on today.</span>
            </p>
            <p className="reveal" data-d="2">
              I bring both the technical depth and the operator's instinct for how money actually moves — the rails, the regulatory constraints, the trust gap that makes someone hesitate before wiring funds to a stranger online. I close that gap by shipping.
            </p>

            <div className="offclock reveal" data-d="2">
              <span className="lbl">Off the clock</span>
              <div className="oc-tags">
                {Object.keys(HOBBIES).map((h) => (
                  <span key={h} onClick={(e) => openHobby(h, e)} style={{ cursor: "pointer" }}>{h}</span>
                ))}
              </div>
            </div>

            <div className="beliefs">
              {LBELIEFS.map((b, i) =>
              <div className="belief reveal" data-d={i + 1} key={i}>
                  <span className="bnum">0{i + 1}</span>
                  <p>{b}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ---------------- MARQUEE BAND ---------------- */
function LBand() {
  return (
    <section aria-hidden="true" style={{ padding: "clamp(40px,7vh,90px) 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <Marquee dur={30} itemClass="out" items={["Let's build something that ships", "Local roots → Global reach", "Built to ship, not to impress"]} />
    </section>);

}

/* ---------------- CONTACT / FINALE ---------------- */
const LSOCIALS = [
{ h: "in",  l: "LinkedIn", u: "Chidile Ozoemena",  url: "https://www.linkedin.com/in/chidileozoemena/" },
{ h: "𝕏",   l: "Twitter",  u: "0xAfroTechBoss",    url: "https://x.com/0xAfroTechBoss" },
{ h: "{ }", l: "GitHub",   u: "afrotechboss",       url: "https://github.com/AfroTechBoss" },
];

function LContact() {
  const openPortal = (s, e) => {
    e.preventDefault();
    if (window.__openPortal) {
      window.__openPortal(s.l, s.url, { x: e.clientX, y: e.clientY });
    }
  };

  return (
    <section className="finale" id="contact">
      <div className="wrap">
        <span className="eyebrow reveal">04 / Contact</span>
        <h2 className="finale-head kinline">
          <span className="kin" style={{ "--ki": 0 }}><span>Let's build</span></span>{" "}
          <span className="kin" style={{ "--ki": 1 }}><span><em>something</em></span></span>{" "}
          <span className="kin" style={{ "--ki": 2 }}><span><em>that ships.</em></span></span>
        </h2>
        <div className="finale-actions">
          <Magnetic strength={0.4}>
            <a href="https://calendly.com/afrotechboss/chidile-ozoemena" target="_blank" rel="noopener noreferrer" className="btn-primary">Book a call <span>→</span></a>
          </Magnetic>
          <div className="finale-socials reveal" data-d="2">
            {LSOCIALS.map((s) =>
              <a className="fsoc" key={s.l} href={s.url} onClick={(e) => openPortal(s, e)}>
                <span className="h">{s.h}</span>{s.l} <span style={{ color: "var(--muted-2)" }}>/ {s.u}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function LFooter() {
  return (
    <footer className="footer">
      <div className="footer-mark" aria-hidden="true">Chidile</div>
      <div className="footer-inner">
        <a href="#top" className="logo footer-sig" aria-label="Chidile — back to top">
          <span className="sig-name">Chidile</span>
          <svg className="sig-scribble" viewBox="0 0 240 46" fill="none" aria-hidden="true" preserveAspectRatio="none">
            <path d="M6 30 C 46 14, 92 12, 132 22 C 168 31, 198 33, 234 18 C 210 24, 150 30, 96 27 C 64 25, 36 27, 14 36" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <span>© 2026 · afrotechboss · Building worldwide</span>
        <a href="#top" className="to-top">Back to top <span>↑</span></a>
      </div>
    </footer>);

}

Object.assign(window, { LAbout, LBand, LContact, LFooter, PortalManager });
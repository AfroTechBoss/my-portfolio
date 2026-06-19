/* =========================================================
   lumen-about.jsx — About, marquee band, Contact finale, Footer
   ========================================================= */

/* ---------------- ABOUT ---------------- */
const LBELIEFS = [
"Crypto adoption isn't a trend. It's the next financial infrastructure.",
"Great products cross borders — so I build for users anywhere.",
"Clients hire people, not CVs. So I build like my name is on it."];

function LAbout() {
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

          <div className="about-body">
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
                <span>Swimming</span><span>Singing</span><span>Audiobooks</span><span>Films</span>
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
{ h: "in", l: "LinkedIn", u: "afrotechboss" },
{ h: "𝕏", l: "Twitter", u: "afrotechboss" },
{ h: "{ }", l: "GitHub", u: "afrotechboss" }];

function LContact() {
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
            <a href="mailto:hello@afrotechboss.dev" className="btn-primary">Book a call <span>→</span></a>
          </Magnetic>
          <div className="finale-socials reveal" data-d="2">
            {LSOCIALS.map((s) =>
            <a className="fsoc" key={s.l} href="#">
                <span className="h">{s.h}</span>{s.l} <span style={{ color: "var(--muted-2)" }}>/ {s.u}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>);

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

Object.assign(window, { LAbout, LBand, LContact, LFooter });
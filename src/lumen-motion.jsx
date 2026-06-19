/* =========================================================
   lumen-lib.jsx — motion primitives unique to the Lumen direction
   (reuses global lib.jsx for Magnetic, Cursor, CountUp, useRevealObserver)
   ========================================================= */
const { useState: useLS, useEffect: useLE, useRef: useLR } = React;

/* ---- rotating word swapper (vertical slide) ---- */
function RotatingWord({ words, interval = 2100, className = "" }) {
  const [i, setI] = useLS(0);
  const [phase, setPhase] = useLS("show"); // show | out | in-prep
  useLE(() => {
    if (document.body.classList.contains("reduce-motion")) {
      const t = setInterval(() => setI((p) => (p + 1) % words.length), interval);
      return () => clearInterval(t);
    }
    let a, b, c;
    const loop = () => {
      a = setTimeout(() => setPhase("out"), interval);
      b = setTimeout(() => { setI((p) => (p + 1) % words.length); setPhase("in-prep"); }, interval + 600);
      c = setTimeout(() => { setPhase("show"); loop(); }, interval + 660);
    };
    loop();
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c); };
  }, [words, interval]);
  const cls = phase === "out" ? "rot out" : phase === "in-prep" ? "rot in-prep" : "rot";
  // widen to the longest word so layout doesn't jump
  const longest = words.reduce((m, w) => (w.length > m.length ? w : m), "");
  return (
    <span className={`${cls} ${className}`}>
      <span className="rot-ghost" aria-hidden="true" style={{ visibility: "hidden", display: "inline-block", height: 0, overflow: "hidden" }}>{longest}</span>
      <span className="rot-inner">{words[i]}</span>
    </span>
  );
}

/* ---- marquee row (duplicated track) ---- */
function Marquee({ items, dur = 38, reverse = false, className = "", itemClass = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? "rev" : ""} ${className}`}>
      <div className="marquee-track" style={{ "--mdur": `${dur}s` }}>
        {row.map((it, i) => (
          <span className={`mq-item ${itemClass}`} key={i}>
            {it}<span className="star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---- sticky statement: words light up as they enter ---- */
function Statement({ eyebrow, parts }) {
  const ref = useLR(null);
  useLE(() => {
    const root = ref.current; if (!root) return;
    const words = [...root.querySelectorAll(".w")];
    const onScroll = () => {
      const vh = window.innerHeight;
      words.forEach((w) => {
        const r = w.getBoundingClientRect();
        const trigger = vh * 0.78;
        w.classList.toggle("dim", r.top > trigger);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section className="statement" id="about-top">
      <div className="wrap">
        <div className="stmt-eyebrow">{eyebrow}</div>
        <h2 className="stmt-text serif" ref={ref}>
          {parts.map((p, i) =>
            p.em
              ? <em key={i}>{p.t} </em>
              : <span className="w dim" key={i}>{p.t} </span>
          )}
        </h2>
      </div>
    </section>
  );
}

/* ---- loader curtain (timer-driven + self-unmounting so it can never trap the page) ---- */
function Loader() {
  const [gone, setGone] = useLS(false);
  const [done, setDone] = useLS(false);
  const [pct, setPct] = useLS(0);
  useLE(() => {
    const start = Date.now(), dur = 1150;
    const iv = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setPct(Math.round(p * 100));
      if (p >= 1) clearInterval(iv);
    }, 40);
    const t1 = setTimeout(() => setGone(true), 1350);
    const t2 = setTimeout(() => setDone(true), 2450); // hard removal — never blocks the page
    return () => { clearInterval(iv); clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (done) return null;
  return (
    <div className={`loader ${gone ? "gone" : ""}`} aria-hidden="true">
      <div className="loader-name"><span>Chidile</span></div>
      <div className="loader-bar"><i /></div>
      <div className="loader-pct">{String(pct).padStart(3, "0")} — afrotechboss</div>
    </div>
  );
}

/* ---- custom 2D arrow cursor (replaces the abstract ring) ---- */
function LumenCursor() {
  useLE(() => {
    if (window.matchMedia("(hover:none),(pointer:coarse)").matches) return;
    const el = document.createElement("div");
    el.className = "lcursor";
    el.innerHTML =
      '<svg class="lc-arrow" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M3 1.5 L3 19.5 L8.3 14.6 L11.7 22 L14.6 20.7 L11.1 13.4 L18 13.4 Z"/></svg>' +
      '<div class="lc-disc"><span class="lc-label"></span></div>';
    document.body.appendChild(el);
    const label = el.querySelector(".lc-label");
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      const t = e.target.closest("a,button,.work-row,.cap,.about-photo,.fsoc,.oc-tags span,[data-cursor]");
      el.classList.toggle("hover", !!t);
      if (t) {
        label.textContent =
          e.target.closest(".work-row") ? "OPEN" :
          e.target.closest(".about-photo") ? "MEET" :
          e.target.closest("a,button,.fsoc") ? "→" : "";
      }
    };
    let raf;
    const loop = () => {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", onMove);
    const hide = () => (el.style.opacity = 0), show = () => (el.style.opacity = 1);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      cancelAnimationFrame(raf); el.remove();
    };
  }, []);
  return null;
}

Object.assign(window, { RotatingWord, Marquee, Statement, Loader, LumenCursor });

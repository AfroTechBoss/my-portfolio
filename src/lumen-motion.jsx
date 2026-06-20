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
      if (window.__planeHovered) {
        el.classList.add("hover", "plane-hover");
        label.textContent = "I am not a cursor; I am an Airplane ✈";
        return;
      }
      el.classList.remove("plane-hover");
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

/* ---- scroll-driven paper airplane ---- */
function PaperAirplane() {
  useLE(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.cssText = [
      "position:fixed",
      "top:0",
      "left:0",
      "pointer-events:auto",
      "cursor:none",
      "z-index:49",
      "will-change:transform",
      "transition:opacity .4s",
      "opacity:0",
    ].join(";");

    el.addEventListener("mouseenter", () => { window.__planeHovered = true; });
    el.addEventListener("mouseleave", () => {
      window.__planeHovered = false;
      // force cursor back to normal state immediately
      const cur = document.querySelector(".lcursor");
      if (cur) { cur.classList.remove("hover", "plane-hover"); }
    });

    // SVG with live-updatable polygons for true 3D pitch morphing
    el.innerHTML = `<svg width="96" height="58" viewBox="0 0 96 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon id="pl-upper" stroke="var(--ink)" stroke-width="0.9" stroke-linejoin="round"/>
      <polygon id="pl-lower" stroke="var(--ink)" stroke-width="0.9" stroke-linejoin="round"/>
      <polygon id="pl-body"  stroke="var(--ink)" stroke-width="0.7" stroke-linejoin="round"/>
      <line    id="pl-spine" stroke="var(--ink)" stroke-width="0.45" opacity="0.2"/>
    </svg>`;

    document.body.appendChild(el);

    const pU = el.querySelector('#pl-upper');
    const pL = el.querySelector('#pl-lower');
    const pB = el.querySelector('#pl-body');
    const pS = el.querySelector('#pl-spine');

    // Cubic-bezier helpers
    const cb  = (p0,p1,p2,p3,t) => {
      const m = 1 - t;
      return m*m*m*p0 + 3*m*m*t*p1 + 3*m*t*t*p2 + t*t*t*p3;
    };
    const cbD = (p0,p1,p2,p3,t) => {
      const m = 1 - t;
      return 3*m*m*(p1-p0) + 6*m*t*(p2-p1) + 3*t*t*(p3-p2);
    };

    const update = () => {
      const hero = document.getElementById("top");
      const stmt = document.getElementById("about-top");
      if (!hero || !stmt) return;

      // Animate over hero + full statement section
      const range = stmt.offsetTop + stmt.offsetHeight;
      const raw   = window.scrollY / range;
      const t     = Math.max(0, Math.min(1, raw));

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // 3-segment path: loop around hero text, then climb to thesis
      // Seg 1 (t 0→0.38): start bottom-left, arc UP and OVER the headline
      // Seg 2 (t 0.38→0.68): sweep DOWN the right side, loop back left UNDER the text
      // Seg 3 (t 0.68→1):  cross and exit right toward the thesis section
      const s1x = [vw*0.05, vw*0.06, vw*0.62, vw*0.90];
      const s1y = [vh*0.72, vh*0.08, vh*0.08, vh*0.30];
      const s2x = [vw*0.90, vw*0.94, vw*0.48, vw*0.14];
      const s2y = [vh*0.30, vh*0.72, vh*0.76, vh*0.66];
      const s3x = [vw*0.14, vw*0.55, vw*0.88, vw*0.88];
      const s3y = [vh*0.66, vh*0.60, vh*0.34, vh*0.12];

      const sp1 = 0.38, sp2 = 0.68;
      let lt, sx, sy;
      if (t < sp1) {
        lt = t / sp1; sx = s1x; sy = s1y;
      } else if (t < sp2) {
        lt = (t - sp1) / (sp2 - sp1); sx = s2x; sy = s2y;
      } else {
        lt = (t - sp2) / (1 - sp2); sx = s3x; sy = s3y;
      }

      const x  = cb( sx[0], sx[1], sx[2], sx[3], lt);
      const y  = cb( sy[0], sy[1], sy[2], sy[3], lt);
      const dx = cbD(sx[0], sx[1], sx[2], sx[3], lt);
      const dy = cbD(sy[0], sy[1], sy[2], sy[3], lt);
      const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);

      // ── 3D SVG morphing based on pitch ──────────────────────────────
      // pitch: -1 = nose-up (viewer sees belly), +1 = nose-down (viewer sees top)
      const pitch = Math.sin(rawAngle * Math.PI / 180);
      const mid   = 29; // SVG vertical centre

      // Wing-tip Y positions spread apart at level, compress when pitching
      const upperTipY = mid - 21 + pitch * 10;   // 8 level → 18 diving → -2 climbing
      const lowerTipY = mid + 21 - pitch * 8;    // 50 level → 42 diving → 58 climbing
      const foldY     = mid + pitch * 2;
      const bellyY    = foldY + 4 + pitch;

      // Shading: top face brighter when diving (viewer looks down at the top surface)
      const p01 = (pitch + 1) / 2; // 0 = max-climb, 1 = max-dive
      const topFill  = `rgb(${Math.round(238-p01*22)},${Math.round(234-p01*20)},${Math.round(224-p01*18)})`;
      const botFill  = `rgb(${Math.round(188+p01*16)},${Math.round(184+p01*14)},${Math.round(175+p01*12)})`;
      const bodyFill = '#b0aaa0';

      const pts = (coords) => coords.map(([a,b]) => `${a},${b.toFixed(1)}`).join(' ');
      pU.setAttribute('points', pts([[96,mid],[4,upperTipY],[18,foldY]]));
      pU.setAttribute('fill', topFill);
      pL.setAttribute('points', pts([[96,mid],[4,lowerTipY],[18,foldY]]));
      pL.setAttribute('fill', botFill);
      pB.setAttribute('points', pts([[18,foldY],[4,lowerTipY],[10,mid],[4,upperTipY]]));
      pB.setAttribute('fill', bodyFill);
      pS.setAttribute('x1','18'); pS.setAttribute('y1', foldY.toFixed(1));
      pS.setAttribute('x2','96'); pS.setAttribute('y2', String(mid));

      // ── Direction transform (flip nose to face travel direction) ────
      const goingLeft   = Math.cos(rawAngle * Math.PI / 180) < 0;
      const flipX       = goingLeft ? -1 : 1;
      const noseTilt    = goingLeft
        ? -(180 - Math.abs(rawAngle)) * Math.sign(rawAngle)
        : rawAngle;
      const clampedTilt = Math.max(-42, Math.min(42, noseTilt));

      el.style.transform = `translate(${x - 48}px, ${y - 29}px) scaleX(${flipX}) rotate(${clampedTilt}deg)`;
      el.style.opacity   = t <= 0.98 ? "1" : "0";
    };

    // Delay first paint until loader is gone
    const t0 = setTimeout(() => {
      update();
      window.addEventListener("scroll", update, { passive: true });
    }, 1500);

    return () => {
      clearTimeout(t0);
      window.removeEventListener("scroll", update);
      el.remove();
    };
  }, []);
  return null;
}

Object.assign(window, { RotatingWord, Marquee, Statement, Loader, LumenCursor, PaperAirplane });

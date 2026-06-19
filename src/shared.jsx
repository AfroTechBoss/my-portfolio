/* =========================================================
   lib.jsx — animation hooks, helpers, shared primitives
   ========================================================= */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- global scroll reveal observer ---- */
function useRevealObserver(key) {
  useEffect(() => {
    let io;
    const bind = () => {
      const els = document.querySelectorAll(".reveal:not(.in), .line-grow:not(.in), .kinline:not(.in)");
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      els.forEach((el) => io.observe(el));
    };
    bind();
    return () => { if (io) io.disconnect(); };
  }, [key]);
}

/* ---- count-up when in view ---- */
function CountUp({ to, from = 0, dur = 1600, prefix = "", suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(from);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf, started = false;
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(from + (to - from) * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, from, dur]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

/* ---- kinetic headline: word-by-word rise ---- */
function Kinetic({ text, className = "", tag = "h1", as }) {
  const Tag = as || tag;
  const words = String(text).split(" ");
  return (
    <Tag className={`kinline ${className}`}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="kin" style={{ "--ki": i }}>
            <span style={{ transitionDelay: `${i * 0.055}s` }}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/* ---- magnetic wrapper ---- */
function Magnetic({ children, strength = 0.4, className = "", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const reset = () => { el.style.transform = "translate(0,0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", reset); };
  }, [strength]);
  return <span ref={ref} className={className} style={{ display: "inline-flex" }} {...rest}>{children}</span>;
}

/* ---- custom cursor ---- */
function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot"; ring.className = "cursor-ring";
    document.body.append(dot, ring);
    let rx = innerWidth / 2, ry = innerHeight / 2, mx = rx, my = ry;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target.closest("a, button, .work-card, .svc, .cal-day.avail, .slot, .write-row, [data-cursor]");
      ring.classList.toggle("hover", !!t);
    };
    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", () => { dot.style.opacity = 0; ring.style.opacity = 0; });
    document.addEventListener("mouseenter", () => { dot.style.opacity = 1; ring.style.opacity = 1; });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); dot.remove(); ring.remove(); };
  }, []);
  return null;
}

/* ---- scroll progress + nav state ---- */
function useScrollChrome() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const bar = document.querySelector(".scroll-progress");
    const onScroll = () => {
      const st = window.scrollY;
      setScrolled(st > 40);
      const h = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

/* ---- constellation canvas (hero B motif) ---- */
function Constellation({ accent }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let w, h, dpr, raf, mouse = { x: -999, y: -999 };
    const N = 46;
    let nodes = [];
    const seed = () => {
      nodes = Array.from({ length: N }, () => ({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0006,
        r: Math.random() * 1.6 + 0.7,
      }));
    };
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    seed(); resize();
    const ro = new ResizeObserver(resize); ro.observe(cv);
    const onMove = (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / w; mouse.y = (e.clientY - r.top) / h;
    };
    cv.parentElement.addEventListener("mousemove", onMove);
    cv.parentElement.addEventListener("mouseleave", () => { mouse.x = -999; mouse.y = -999; });
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 0.16) { n.x += dx * 0.012; n.y += dy * 0.012; }
      });
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h;
          const dist = Math.hypot(dx, dy);
          if (dist < 132) {
            ctx.strokeStyle = accent;
            ctx.globalAlpha = (1 - dist / 132) * 0.22;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      nodes.forEach((n) => {
        ctx.fillStyle = accent; ctx.globalAlpha = 0.85;
        ctx.beginPath(); ctx.arc(n.x * w, n.y * h, n.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [accent]);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ---- faint plot-grid backdrop (hero A) ---- */
function PlotGrid() {
  return (
    <div className="hero-canvas" aria-hidden="true" style={{
      backgroundImage:
        "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
      backgroundSize: "76px 76px",
      position: "absolute",
      inset: 0,
      opacity: 0.14,
      pointerEvents: "none",
    }} />
  );
}

function LumenCursor() {
  useEffect(() => {
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
    const hide = () => (el.style.opacity = 0);
    const show = () => (el.style.opacity = 1);
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

Object.assign(window, { useRevealObserver, CountUp, Kinetic, Magnetic, Cursor, useScrollChrome, Constellation, PlotGrid, LumenCursor });

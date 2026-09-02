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

/* LumenCursor lives in lumen-motion.jsx, which every page loads after this
   file — the copy that used to sit here was dead code the moment it did. */

/* ---- nav menu ----
   Inline links on desktop; below 720px they collapse into a hamburger that
   opens a full-screen sheet. The sheet sits under the nav bar (z-index 69 vs
   70) so the burger stays reachable to close it again. */
function NavMenu({ links, ctaHref = "#contact", ctaLabel = "Let's talk", meta }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    // The sheet covers the viewport, so the page behind it must not scroll.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onResize = () => { if (window.innerWidth > 720) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  const close = () => setOpen(false);
  return (
    <React.Fragment>
      <div className="nav-right">
        {links.map(([l, h]) => <a key={h} href={h} className="nav-link">{l}</a>)}
        <Magnetic strength={0.35}><a href={ctaHref} className="nav-cta">{ctaLabel}</a></Magnetic>
      </div>

      <button
        type="button"
        className={`nav-burger ${open ? "open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span />
      </button>

      <div className={`nav-sheet ${open ? "open" : ""}`} onClick={close}>
        <div className="nav-sheet-inner" onClick={(e) => e.stopPropagation()}>
          {links.map(([l, h], i) => (
            <a key={h} href={h} className="nav-sheet-link" style={{ transitionDelay: `${70 + i * 45}ms` }} onClick={close}>
              <span className="nav-sheet-i">{String(i + 1).padStart(2, "0")}</span>{l}
            </a>
          ))}
          <a href={ctaHref} className="nav-sheet-cta" onClick={close}>{ctaLabel}</a>
          <div className="nav-sheet-meta">{meta || "REMOTE \u00b7 WORLDWIDE \u00b7 AVAILABLE Q3 \u201826"}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { NavMenu, useRevealObserver, CountUp, Kinetic, Magnetic, Cursor, useScrollChrome, Constellation, PlotGrid });

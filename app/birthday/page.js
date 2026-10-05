"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   ROHIT SHARMA — BIRTHDAY COUNTDOWN (30 April · IST)
   Standalone page · put it at app/birthday/page.js
========================================================= */

const display = { className: "font-black tracking-[-0.04em] uppercase" };

function Navigation() {
  const links = [["Home", "/"], ["Profile", "/profile"], ["Career", "/career"], ["Stats", "/stats"], ["Innings", "/innings"], ["Birthday", "/birthday"]];
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="/" className="text-xl font-black tracking-[-0.04em] text-white">ROHIT<span className="text-amber-300">45</span></a>
        <nav className="hidden items-center gap-5 md:flex">
          {links.map(([l, h]) => <a key={l} href={h} className={`text-[11px] font-black uppercase tracking-[0.1em] transition ${l === "Birthday" ? "text-amber-300" : "text-white/40 hover:text-white"}`}>{l}</a>)}
        </nav>
        <a href="/profile" className="rounded-full border border-amber-300/30 px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition hover:bg-amber-300/10">45</a>
      </div>
    </header>
  );
}

/* ---------- DATE MATHS (birthday 30 Apr 1987, India time) ---------- */

const IST = 19800000, DAY = 864e5;
const BORN = Date.UTC(1987, 3, 30) - IST;
const tgt = (y) => Date.UTC(y, 3, 30) - IST;
const p2 = (n) => String(n).padStart(2, "0");

function plan(n) {
  const y = new Date(n + IST).getUTCFullYear();
  let t = tgt(y);
  if (n >= t + DAY) t = tgt(y + 1);
  const ty = new Date(t + IST).getUTCFullYear();
  return { t, age: ty - 1987, today: n >= t && n < t + DAY, prev: tgt(ty - 1) };
}

/* ---------- FIREWORKS ---------- */

const COL = [[253, 224, 138], [255, 255, 255], [96, 165, 250], [34, 211, 238], [251, 191, 36], [244, 114, 182]];

function Fireworks({ api, gap }) {
  const ref = useRef(null);
  const gapRef = useRef(gap);
  gapRef.current = gap;

  useEffect(() => {
    const c = ref.current, x = c.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0, H = 0, R = [], S = [], raf, last = 0;

    const rs = () => {
      W = window.innerWidth; H = window.innerHeight;
      c.width = W * dpr; c.height = H * dpr;
      c.style.width = W + "px"; c.style.height = H + "px";
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    rs();

    const burst = (px, py) => {
      const n = 70 + ((Math.random() * 60) | 0), col = COL[(Math.random() * COL.length) | 0], ring = Math.random() < 0.35;
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n, sp = ring ? 4.2 : 1.5 + Math.random() * 4;
        S.push({ x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, l: 1, d: 0.009 + Math.random() * 0.012, c: Math.random() < 0.25 ? COL[0] : col });
      }
    };
    const launch = (tx, ty) => R.push({ x: tx ?? W * (0.1 + Math.random() * 0.8), y: H, ty: ty ?? H * (0.12 + Math.random() * 0.35), vy: -(10 + Math.random() * 3) });

    api.current = {
      launch,
      finale: () => { for (let i = 0; i < 14; i++) setTimeout(() => launch(), i * 260); },
    };

    const loop = (t) => {
      x.globalCompositeOperation = "destination-out";
      x.fillStyle = "rgba(0,0,0,.2)";
      x.fillRect(0, 0, W, H);
      x.globalCompositeOperation = "lighter";
      if (t - last > gapRef.current) { launch(); last = t; }
      R = R.filter((r) => {
        r.y += r.vy; r.vy *= 0.985;
        x.fillStyle = "#fde68a"; x.fillRect(r.x, r.y, 2, 7);
        if (r.y <= r.ty || r.vy > -1.6) { burst(r.x, r.y); return false; }
        return true;
      });
      S = S.filter((s) => {
        s.x += s.vx; s.y += s.vy; s.vx *= 0.985; s.vy = s.vy * 0.985 + 0.04; s.l -= s.d;
        if (s.l <= 0) return false;
        x.fillStyle = `rgba(${s.c[0]},${s.c[1]},${s.c[2]},${s.l})`;
        x.beginPath(); x.arc(s.x, s.y, 1.9, 0, 7); x.fill();
        return true;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const down = (e) => { if (!e.target.closest("input,textarea,select")) launch(e.clientX, e.clientY); };
    window.addEventListener("resize", rs);
    window.addEventListener("pointerdown", down);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", rs); window.removeEventListener("pointerdown", down); };
  }, [api]);

  return <canvas ref={ref} className="pointer-events-none fixed left-0 top-0 z-[5]" />;
}

/* ---------- SMALL PIECES ---------- */

function Reveal({ children, className = "", d = 0 }) {
  const r = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(r.current);
    return () => io.disconnect();
  }, []);
  return <div ref={r} style={{ transitionDelay: `${d}ms` }} className={`rv ${on ? "rv-on" : ""} ${className}`}>{children}</div>;
}

function Unit({ v, label }) {
  return (
    <div className="ring">
      <div className="px-3 py-6 text-center sm:px-8 sm:py-9">
        <p className={`${display.className} gold relative h-[1.05em] overflow-hidden text-[16vw] leading-none sm:text-8xl lg:text-9xl`}>
          <span key={v} className="tick block">{v == null ? "--" : p2(v)}</span>
        </p>
        <p className="mt-3 text-[10px] font-black uppercase tracking-[0.35em] text-amber-200/60 sm:text-xs">{label}</p>
      </div>
    </div>
  );
}

const FACTS = [
  ["30 APR 1987", "Born in Nagpur, Maharashtra — the Hitman’s day."],
  ["264", "Highest ODI score ever — Eden Gardens, 2014."],
  ["3 × 200+", "Only batter with three ODI double hundreds."],
  ["5 IPL TITLES", "Lifted as captain of Mumbai Indians."],
  ["T20 WC 2024", "Led India to the T20 World Cup title."],
  ["5 TONS", "Hundreds in a single ODI World Cup — 2019."],
];

export default function BirthdayPage() {
  const [now, setNow] = useState(null);
  const [name, setName] = useState("");
  const [wishes, setWishes] = useState([]);
  const api = useRef(null);

  useEffect(() => {
    setNow(Date.now());
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const P = now ? plan(now) : null;
  const left = P ? Math.max(0, P.t - now) : null;
  const pct = P ? Math.min(100, Math.max(0, ((now - P.prev) / (P.t - P.prev)) * 100)) : 0;
  const lived = now ? now - BORN : null;
  const sparks = Array.from({ length: 36 }, (_, i) => i);

  const sendWish = () => {
    const n = name.trim() || "A fan";
    setWishes((w) => [{ id: Date.now(), n }, ...w].slice(0, 14));
    setName("");
    for (let i = 0; i < 4; i++) setTimeout(() => api.current?.launch(), i * 200);
  };

  const ticker = ["HAPPY BIRTHDAY HITMAN", "30 APRIL", "ROHIT SHARMA", "JERSEY 45", "THE HITMAN", "CAPTAIN · LEGEND"];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#04050a] text-white selection:bg-amber-300 selection:text-black">
      <Navigation />
      <Fireworks api={api} gap={P?.today ? 700 : 2800} />

      <div className="relative z-10">
        {/* HERO */}
        <section className="relative overflow-hidden px-5 pb-20 pt-24 text-center lg:px-8">
          <div className="blob left-[-10%] top-[0%] h-[30rem] w-[30rem] bg-amber-400/20" />
          <div className="blob right-[-8%] top-[30%] h-[26rem] w-[26rem] bg-blue-600/30" style={{ animationDelay: "-6s" }} />
          {sparks.map((i) => <i key={i} className="spark" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${(i * 0.37) % 5}s`, width: 2 + (i % 3), height: 2 + (i % 3) }} />)}
          <div className={`${display.className} outline-gold pointer-events-none absolute left-1/2 top-[6%] -translate-x-1/2 select-none text-[48vw] leading-none opacity-30`} aria-hidden>45</div>

          <div className="relative mx-auto max-w-5xl">
            <p className="hero-in text-xs font-black uppercase tracking-[0.5em] text-amber-200/80">{P?.today ? "Today is the day" : `Countdown to turning ${P ? P.age : "—"}`}</p>
            <h1 className={`${display.className} mt-4 leading-[0.85]`}>
              <span className="hero-in gold-text block text-[15vw] sm:text-8xl lg:text-[8.5rem]" style={{ animationDelay: ".1s" }}>{P?.today ? "HAPPY BIRTHDAY" : "ROHIT SHARMA"}</span>
              <span className="hero-in outline-white block text-[11vw] sm:text-6xl lg:text-7xl" style={{ animationDelay: ".25s" }}>{P?.today ? "HITMAN" : "BIRTHDAY COUNTDOWN"}</span>
            </h1>

            <div className="hero-in mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4" style={{ animationDelay: ".45s" }}>
              <Unit v={left == null ? null : Math.floor(left / DAY)} label="Days" />
              <Unit v={left == null ? null : Math.floor((left % DAY) / 36e5)} label="Hours" />
              <Unit v={left == null ? null : Math.floor((left % 36e5) / 6e4)} label="Minutes" />
              <Unit v={left == null ? null : Math.floor((left % 6e4) / 1e3)} label="Seconds" />
            </div>

            <div className="hero-in mx-auto mt-10 max-w-2xl" style={{ animationDelay: ".6s" }}>
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-amber-200/60"><span>Last birthday</span><span>{pct.toFixed(1)}% of the year</span><span>30 Apr</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="prog h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-200 to-white" style={{ width: `${pct}%` }} /></div>
            </div>

            <div className="hero-in mt-10 flex flex-wrap justify-center gap-3" style={{ animationDelay: ".75s" }}>
              <button onClick={() => api.current?.finale()} className="btn-gold rounded-full px-8 py-4 text-sm font-black uppercase tracking-widest text-black">🎆 Launch fireworks</button>
              <a href="#wish" className="rounded-full border border-amber-300/40 px-8 py-4 text-sm font-black uppercase tracking-widest transition hover:bg-amber-300/10">Send a wish</a>
            </div>
            <p className="mt-4 text-xs text-white/35">Tap anywhere on the screen to fire a rocket.</p>
          </div>
        </section>

        <div className="overflow-hidden border-y border-amber-300/15 bg-amber-300/[0.04] py-3">
          <div className="ticker">{[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => <span key={i} className={`${display.className} mx-6 whitespace-nowrap text-sm text-amber-100/70`}>{t} <span className="text-amber-300">◆</span></span>)}</div>
        </div>

        {/* LIFE IN NUMBERS */}
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <Reveal><h2 className={`${display.className} text-4xl sm:text-6xl`}>Life in <span className="gold-text">numbers</span></h2><p className="mt-2 text-sm text-white/50">Ticking live, every second, since 30 April 1987.</p></Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[["Days lived", lived && Math.floor(lived / DAY)], ["Hours lived", lived && Math.floor(lived / 36e5)], ["Seconds lived", lived && Math.floor(lived / 1e3)]].map(([l, v], i) => (
              <Reveal key={l} d={i * 100}>
                <div className="lux p-8">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-200/70">{l}</p>
                  <p className={`${display.className} gold-text mt-3 text-4xl tabular-nums sm:text-5xl`}>{v ? v.toLocaleString("en-US") : "—"}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FACTS */}
        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <Reveal><h2 className={`${display.className} text-4xl sm:text-6xl`}>Hitman <span className="gold-text">milestones</span></h2></Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FACTS.map(([t, s], i) => (
              <Reveal key={t} d={(i % 3) * 90}>
                <div className="lux h-full p-8"><p className={`${display.className} gold-text text-4xl`}>{t}</p><p className="mt-3 text-sm text-white/60">{s}</p></div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WISH WALL */}
        <section id="wish" className="mx-auto max-w-4xl px-5 pb-32 text-center lg:px-8">
          <Reveal>
            <h2 className={`${display.className} text-4xl sm:text-6xl`}>Wish <span className="gold-text">wall</span></h2>
            <p className="mt-2 text-sm text-white/50">Write your name, send a wish — the sky lights up.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendWish()} maxLength={30} placeholder="Your name" className="flex-1 rounded-full border border-amber-300/30 bg-black/60 px-6 py-4 text-sm font-bold outline-none focus:border-amber-300" />
              <button onClick={sendWish} className="btn-gold rounded-full px-8 py-4 text-sm font-black uppercase tracking-widest text-black">Send wish 🎉</button>
            </div>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {wishes.map((w) => <span key={w.id} className="slide rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-bold text-amber-100">🎂 {w.n}: Happy Birthday Hitman!</span>)}
          </div>
        </section>
      </div>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .gold { background: linear-gradient(180deg,#fff7d6,#f5d98b 45%,#b8892b); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .gold-text { background: linear-gradient(90deg,#fff7d6,#f5d98b,#c9a24b,#fff7d6); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shine 6s linear infinite; }
        .outline-gold { color: transparent; -webkit-text-stroke: 1px rgba(245,217,139,.7); }
        .outline-white { color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.7); }
        .ring { position: relative; overflow: hidden; padding: 1px; border-radius: 1.5rem; }
        .ring::before { content: ""; position: absolute; inset: -80%; background: conic-gradient(from 0deg, transparent 0 65%, #f5d98b 85%, #fff 100%); animation: spin 4s linear infinite; }
        .ring > div { position: relative; border-radius: calc(1.5rem - 1px); background: radial-gradient(circle at 50% 0%, rgba(245,217,139,.12), transparent 60%), #07090f; }
        .lux { border: 1px solid rgba(245,217,139,.2); border-radius: 1.5rem; background: radial-gradient(circle at 20% 0%, rgba(245,217,139,.1), transparent 55%), rgba(7,9,15,.7); backdrop-filter: blur(10px); transition: border-color .3s, box-shadow .3s; }
        .lux:hover { border-color: rgba(245,217,139,.6); box-shadow: 0 0 50px rgba(245,217,139,.15); }
        .btn-gold { background: linear-gradient(90deg,#c9a24b,#fff1b8,#c9a24b); background-size: 200% 100%; box-shadow: 0 0 40px rgba(245,217,139,.4); transition: background-position .6s, transform .2s; }
        .btn-gold:hover { background-position: 100% 0; transform: translateY(-2px); }
        .blob { position: absolute; border-radius: 9999px; filter: blur(100px); animation: float 14s ease-in-out infinite alternate; }
        .spark { position: absolute; border-radius: 9999px; background: #fde68a; box-shadow: 0 0 10px 2px rgba(253,224,138,.8); animation: twinkle 4s ease-in-out infinite; }
        .hero-in { animation: up .9s cubic-bezier(.16,1,.3,1) both; }
        .tick { animation: tick .55s cubic-bezier(.16,1,.3,1); }
        .prog { transition: width 1s ease; }
        .ticker { display: flex; width: max-content; animation: marquee 50s linear infinite; }
        .rv { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .8s cubic-bezier(.16,1,.3,1); }
        .rv-on { opacity: 1; transform: none; }
        .slide { animation: slideIn .5s cubic-bezier(.16,1,.3,1) both; }
        @keyframes shine { to { background-position: -300% 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { to { transform: translate(60px,-40px) scale(1.2); } }
        @keyframes twinkle { 0%,100% { opacity: 0; transform: scale(.4); } 50% { opacity: 1; transform: scale(1); } }
        @keyframes up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        @keyframes tick { from { transform: translateY(-70%); opacity: 0; } to { transform: none; opacity: 1; } }
        @keyframes marquee { to { transform: translateX(-25%); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(14px) scale(.95); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .gold-text,.ring::before,.blob,.spark,.hero-in,.tick,.ticker,.slide { animation: none !important; } .rv { opacity: 1; transform: none; } }
      `}</style>
    </main>
  );
}
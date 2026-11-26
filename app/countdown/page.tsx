"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Hitman Day countdown + reveal.
   Locked until 5:45 PM IST, 27 Nov 2026, then plays the Rohit Sharma captain-return sequence.
   Open the page with #rehearsal in the URL to test a 16 second countdown.
   Note: the lock runs on the viewer's device clock, so it is a presentation lock, not a security lock. */

const TARGET_ISO = "2026-11-27T17:45:00+05:30";

const SEQ = [
  { id: "eyebrow", d: 200 },
  { id: "l1", d: 900 },
  { id: "l2", d: 2000 },
  { id: "name", d: 3300, hit: "slam" },
  { id: "role", d: 4700, hit: "badge" },
  { id: "stats", d: 5800 },
  { id: "chant", d: 6600 },
  { id: "replay", d: 7200 },
] as const;

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; c: string; r: number };
type Ember = { x: number; y: number; r: number; vy: number; vx: number; ph: number; a: number };

const pad = (n: number) => (n < 10 ? "0" : "") + n;

export default function Page() {
  const [rehearsal, setRehearsal] = useState(false);
  const [phase, setPhase] = useState<"locked" | "revealed">("locked");
  const [vals, setVals] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [finalN, setFinalN] = useState<number | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [live, setLive] = useState(false);
  const [flash, setFlash] = useState(false);
  const [localText, setLocalText] = useState("");

  const stageRef = useRef<HTMLElement | null>(null);
  const cvRef = useRef<HTMLCanvasElement | null>(null);
  const burstRef = useRef<(x: number, y: number, n: number) => void>(() => {});
  const sizeRef = useRef({ w: 0, h: 0 });
  const actxRef = useRef<AudioContext | null>(null);
  const soundRef = useRef(false);
  const phaseRef = useRef<"locked" | "revealed">("locked");
  const targetRef = useRef<number>(new Date(TARGET_ISO).getTime());
  const lastFinalRef = useRef(-1);
  const timersRef = useRef<number[]>([]);
  const fwRef = useRef<number | null>(null);
  const reduceRef = useRef(false);

  /* ---------- sound (synthesised, starts only after a click) ---------- */
  const blip = useCallback((freq: number, dur: number, vol: number, type: OscillatorType = "sine") => {
    const a = actxRef.current;
    if (!soundRef.current || !a) return;
    const o = a.createOscillator();
    const g = a.createGain();
    const t = a.currentTime;
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(a.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }, []);

  const thump = useCallback(() => {
    const a = actxRef.current;
    if (!soundRef.current || !a) return;
    const t = a.currentTime;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(30, t + 0.6);
    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
    o.connect(g);
    g.connect(a.destination);
    o.start(t);
    o.stop(t + 0.85);
    const len = Math.floor(a.sampleRate * 0.5);
    const buf = a.createBuffer(1, len, a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const n = a.createBufferSource();
    const ng = a.createGain();
    n.buffer = buf;
    ng.gain.value = 0.35;
    n.connect(ng);
    ng.connect(a.destination);
    n.start(t);
  }, []);

  const chime = useCallback(() => {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      window.setTimeout(() => blip(f, 1.2, 0.12, "triangle"), i * 110);
    });
  }, [blip]);

  const toggleSound = () => {
    const next = !soundRef.current;
    soundRef.current = next;
    setSoundOn(next);
    if (next) {
      try {
        const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        actxRef.current = actxRef.current || new Ctor();
        if (actxRef.current.state === "suspended") void actxRef.current.resume();
        blip(660, 0.12, 0.12);
      } catch {
        soundRef.current = false;
        setSoundOn(false);
      }
    }
  };

  const shake = () => {
    const el = stageRef.current;
    if (!el) return;
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
  };

  /* ---------- fx canvas: embers + fireworks ---------- */
  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = reduceRef.current;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w: window.innerWidth, h: window.innerHeight };
      cv.width = sizeRef.current.w * dpr;
      cv.height = sizeRef.current.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = ["#ffe49a", "#d9ae3f", "#3b86ff", "#9cc3ff", "#ffffff"];
    const embers: Ember[] = [];
    const sparks: Spark[] = [];
    const newEmber = (initial: boolean): Ember => {
      const { w, h } = sizeRef.current;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + 10,
        r: Math.random() * 2 + 0.6,
        vy: -(Math.random() * 0.6 + 0.2),
        vx: (Math.random() - 0.5) * 0.3,
        ph: Math.random() * 6.28,
        a: Math.random() * 0.6 + 0.25,
      };
    };
    const EN = reduce ? 0 : sizeRef.current.w < 600 ? 46 : 95;
    for (let i = 0; i < EN; i++) embers.push(newEmber(true));

    burstRef.current = (x, y, n) => {
      const count = reduce ? Math.round(n / 4) : n;
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = Math.random() * 5.5 + 1.2;
        sparks.push({
          x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0,
          max: 60 + Math.random() * 40,
          c: COLORS[(Math.random() * COLORS.length) | 0],
          r: Math.random() * 2 + 1,
        });
      }
    };

    let raf = 0;
    const frame = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const gold = phaseRef.current === "revealed";
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.ph += 0.02;
        e.x += e.vx + Math.sin(e.ph) * 0.25;
        e.y += e.vy * (gold ? 1.8 : 1);
        if (e.y < -10) embers[i] = newEmber(false);
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, 6.283);
        ctx.fillStyle = gold ? `rgba(255,228,154,${e.a})` : `rgba(110,170,255,${e.a * 0.8})`;
        ctx.fill();
      }
      for (let j = sparks.length - 1; j >= 0; j--) {
        const s = sparks[j];
        s.life++;
        s.vy += 0.07;
        s.vx *= 0.985;
        s.vy *= 0.985;
        s.x += s.vx;
        s.y += s.vy;
        const k = 1 - s.life / s.max;
        if (k <= 0) { sparks.splice(j, 1); continue; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * k + 0.3, 0, 6.283);
        ctx.globalAlpha = k;
        ctx.fillStyle = s.c;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ---------- reveal sequence ---------- */
  const celebrate = useCallback(() => {
    if (fwRef.current) window.clearInterval(fwRef.current);
    let count = 0;
    fwRef.current = window.setInterval(() => {
      const { w, h } = sizeRef.current;
      burstRef.current(w * (0.15 + Math.random() * 0.7), h * (0.12 + Math.random() * 0.4), 70);
      count++;
      if (count > 16) {
        if (fwRef.current) window.clearInterval(fwRef.current);
        fwRef.current = window.setInterval(() => {
          const s = sizeRef.current;
          burstRef.current(s.w * (0.1 + Math.random() * 0.8), s.h * (0.1 + Math.random() * 0.45), 55);
        }, 2200);
      }
    }, 520);
  }, []);

  const hit = useCallback((kind: string) => {
    const { w, h } = sizeRef.current;
    if (kind === "slam") {
      shake();
      thump();
      burstRef.current(w * 0.5, h * 0.42, 160);
      burstRef.current(w * 0.25, h * 0.3, 90);
      burstRef.current(w * 0.75, h * 0.3, 90);
    }
    if (kind === "badge") {
      chime();
      burstRef.current(w * 0.5, h * 0.58, 130);
    }
  }, [thump, chime]);

  const runSequence = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setOn({});
    setLive(false);
    window.setTimeout(() => setLive(true), 30);
    SEQ.forEach((item) => {
      timersRef.current.push(
        window.setTimeout(() => {
          setOn((prev) => ({ ...prev, [item.id]: true }));
          if ("hit" in item && item.hit) hit(item.hit);
        }, item.d)
      );
    });
    celebrate();
  }, [hit, celebrate]);

  const doReveal = useCallback((instant: boolean) => {
    if (phaseRef.current === "revealed") return;
    phaseRef.current = "revealed";
    setFinalN(null);
    if (!instant) {
      setFlash(true);
      window.setTimeout(() => setFlash(false), 1200);
      thump();
      shake();
      const { w, h } = sizeRef.current;
      burstRef.current(w * 0.5, h * 0.5, 220);
    }
    window.setTimeout(() => {
      setPhase("revealed");
      runSequence();
    }, instant ? 0 : 450);
  }, [thump, runSequence]);

  /* ---------- countdown loop ---------- */
  useEffect(() => {
    let reh = false;
    try { reh = window.location.hash === "#rehearsal"; } catch { /* ignore */ }
    if (reh) {
      targetRef.current = Date.now() + 16000;
      setRehearsal(true);
    }
    try {
      setLocalText(
        "Your local time: " +
          new Date(targetRef.current).toLocaleString(undefined, {
            weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit",
          })
      );
    } catch { /* ignore */ }

    if (!reh && targetRef.current - Date.now() <= 0) {
      doReveal(true);
      return;
    }

    const tick = () => {
      const rem = targetRef.current - Date.now();
      if (rem <= 0) {
        window.clearInterval(id);
        doReveal(false);
        return;
      }
      const sec = Math.floor(rem / 1000);
      setVals({
        d: pad(Math.floor(sec / 86400)),
        h: pad(Math.floor((sec % 86400) / 3600)),
        m: pad(Math.floor((sec % 3600) / 60)),
        s: pad(sec % 60),
      });
      const n = Math.ceil(rem / 1000);
      if (n <= 10) {
        setFinalN(n);
        if (n !== lastFinalRef.current) {
          lastFinalRef.current = n;
          shake();
          blip(n <= 3 ? 880 : 520, 0.18, 0.2, "square");
        }
      }
    };
    tick();
    const id = window.setInterval(tick, 200);
    return () => {
      window.clearInterval(id);
      timersRef.current.forEach(clearTimeout);
      if (fwRef.current) window.clearInterval(fwRef.current);
    };
  }, [doReveal, blip]);

  const cls = (id: string, base: string) => `${base} seq${on[id] ? " on" : ""}`;
  const revealed = phase === "revealed";

  return (
    <div className={`hd${revealed ? " is-revealed" : ""}`}>
      <style>{CSS}</style>

      <div className="sky" />
      <div className="beams" aria-hidden="true">
        <div className="beam" /><div className="beam" /><div className="beam" /><div className="beam" />
      </div>
      <canvas ref={cvRef} className="fx" aria-hidden="true" />
      <div className="vignette" />
      <div className="grain" />

      <main className="stage" ref={stageRef}>
        <div className="top">
          <div className="tag">
             {rehearsal ? " · Rehearsal" : ""}
          </div>
          <button className="snd" type="button" aria-pressed={soundOn} onClick={toggleSound}>
            {soundOn ? "Sound on" : "Sound off"}
          </button>
        </div>

        {!revealed && (
          <section className="pane" aria-label="Countdown">
            <div className="eyebrow">Hitman Day &middot; 27 Nov 2026</div>
            <h1>
              The King<span className="gold">is coming</span>
            </h1>
            <p className="sub"> </p>
            <div className="clock" role="timer" aria-label="Time left until 5:45 PM IST on 27 November 2026">
              {(
                [
                  ["d", "Days"],
                  ["h", "Hours"],
                  ["m", "Minutes"],
                  ["s", "Seconds"],
                ] as const
              ).map(([k, label]) => (
                <div className="cell" key={k}>
                  <span className="num bump" key={vals[k]}>{vals[k]}</span>
                  <span className="lbl">{label}</span>
                </div>
              ))}
            </div>
            <div className="lock">
              <svg viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <g className="shackle"><path d="M6 11V7a6 6 0 0 1 12 0v4" /></g>
                <rect x="3" y="11" width="18" height="13" rx="2" fill="currentColor" stroke="none" />
              </svg>
              <span>Page locked &middot; opens 5:45 PM IST</span>
            </div>
            <div className="local">{localText}</div>
          </section>
        )}

        {revealed && (
          <section className={`pane reveal${live ? " live" : ""}`} aria-label="Announcement">
            <div className="ghost" aria-hidden="true">45</div>
            <div className={cls("eyebrow", "eyebrow")}>27.11.2026</div>
            <div className={cls("l1", "l1")}>The wait is over</div>
            <div className={cls("l2", "l2")}>The Hitman is back</div>
            <h1 className={cls("name", "name")}>
              <span>Rohit</span>
              <span>Sharma</span>
            </h1>
            <div className={cls("role", "role")}>Captain &middot; Mumbai Indians</div>
            <div className={cls("stats", "stats")}>
              <div className="stat"><b>5</b><i>IPL titles as captain</i></div>
              <div className="stat"><b></b><i></i></div>
              <div className="stat"><b>45</b><i>The number</i></div>
            </div>
            <p className={cls("chant", "chant")}>
               <em></em>
            </p>
            <button className={cls("replay", "replay")} type="button" onClick={runSequence}>
              
            </button>
          </section>
        )}

        <p className="fine">
          
        </p>
      </main>

      {finalN !== null && !revealed && (
        <div className="final" aria-hidden="true">
          <span className="pulse" key={finalN}>{finalN}</span>
        </div>
      )}
      <div className={`flashfx${flash ? " go" : ""}`} />
      <div className={`ring${flash ? " go" : ""}`} />
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@500;600;700&display=swap');

.hd{
  --bg:#020611; --blue:#0b4bc4; --blue-hi:#3b86ff; --gold:#d9ae3f; --gold-hi:#ffe49a;
  --fg:#eef3ff; --muted:#8ea6cf; --line:rgba(217,174,63,.32);
  --display:'Anton','Impact','Arial Narrow',sans-serif;
  --body:'Barlow Condensed','Arial Narrow',system-ui,sans-serif;
  color-scheme:dark;
  position:relative;min-height:100vh;display:flex;flex-direction:column;
  background:var(--bg);color:var(--fg);font-family:var(--body);font-size:1.125rem;font-weight:500;overflow-x:hidden;
}
.hd *{box-sizing:border-box}
.hd .sky{position:fixed;inset:0;z-index:0;pointer-events:none;
  background:radial-gradient(ellipse at 50% 110%,rgba(11,75,196,.55),transparent 60%),
             radial-gradient(ellipse at 50% -10%,rgba(59,134,255,.18),transparent 55%),var(--bg);}
.hd.is-revealed .sky{
  background:radial-gradient(ellipse at 50% 110%,rgba(217,174,63,.38),transparent 58%),
             radial-gradient(ellipse at 50% -10%,rgba(59,134,255,.22),transparent 55%),var(--bg);}
.hd .beams{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.hd .beam{position:absolute;left:50%;bottom:-25%;width:42vmax;height:150vmax;margin-left:-21vmax;transform-origin:50% 100%;
  background:linear-gradient(to top,rgba(59,134,255,.34),rgba(59,134,255,0) 72%);
  clip-path:polygon(46% 0,54% 0,100% 100%,0 100%);filter:blur(5px);
  transform:rotate(var(--r0));animation:hd-sweep var(--t) ease-in-out var(--dl) infinite alternate}
.hd.is-revealed .beam{background:linear-gradient(to top,rgba(255,228,154,.38),rgba(255,228,154,0) 72%)}
.hd .beam:nth-child(1){--r0:-48deg;--r1:-14deg;--t:7s;--dl:0s}
.hd .beam:nth-child(2){--r0:-22deg;--r1:20deg;--t:9s;--dl:-2s}
.hd .beam:nth-child(3){--r0:14deg;--r1:-26deg;--t:8s;--dl:-4s}
.hd .beam:nth-child(4){--r0:46deg;--r1:12deg;--t:10s;--dl:-1s}
@keyframes hd-sweep{to{transform:rotate(var(--r1))}}
.hd .fx{position:fixed;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}
.hd .vignette{position:fixed;inset:0;z-index:2;pointer-events:none;background:radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,.72) 100%)}
.hd .grain{position:fixed;inset:0;z-index:2;pointer-events:none;opacity:.07;mix-blend-mode:overlay;
  background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.5) 0 1px,transparent 1px 3px)}

.hd .stage{position:relative;z-index:3;flex:1;display:flex;flex-direction:column;width:100%;max-width:1100px;margin:0 auto;
  padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));
  padding-block:18px 20px}
.hd .top{display:flex;justify-content:space-between;align-items:center;gap:12px}
.hd .tag{font-size:.8rem;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);min-width:0}
.hd .snd{font:inherit;font-size:.8rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-hi);
  background:rgba(2,6,17,.55);border:1px solid var(--line);padding:8px 14px;border-radius:999px;cursor:pointer;white-space:nowrap}
.hd .snd:hover{border-color:var(--gold)}
.hd .snd:focus-visible,.hd .replay:focus-visible{outline:2px solid var(--gold-hi);outline-offset:3px}
.hd .snd[aria-pressed="true"]{background:var(--gold);color:#1a1300;border-color:var(--gold)}

.hd .pane{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:22px;min-width:0}
.hd .eyebrow{font-size:clamp(.9rem,3.4vw,1.15rem);letter-spacing:.38em;text-transform:uppercase;color:var(--gold-hi)}
.hd h1{margin:0;font-family:var(--display);font-weight:400;text-transform:uppercase;
  font-size:clamp(3.4rem,17vw,9.5rem);line-height:.92;letter-spacing:.01em;text-wrap:balance;text-shadow:0 0 40px rgba(59,134,255,.55)}
.hd h1 .gold{display:block;color:var(--gold);background:linear-gradient(180deg,var(--gold-hi),var(--gold) 70%);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  filter:drop-shadow(0 0 22px rgba(217,174,63,.5));animation:hd-glow 3s ease-in-out infinite alternate}
@keyframes hd-glow{from{filter:drop-shadow(0 0 12px rgba(217,174,63,.35))}to{filter:drop-shadow(0 0 34px rgba(255,228,154,.75))}}
.hd .sub{margin:0;max-width:34ch;color:var(--muted);font-size:clamp(1.05rem,3.8vw,1.35rem);letter-spacing:.04em}

.hd .clock{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(6px,2vw,16px);width:100%;max-width:720px}
.hd .cell{position:relative;padding:clamp(10px,3vw,20px) 4px 10px;border:1px solid var(--line);border-radius:6px;
  background:linear-gradient(180deg,rgba(11,75,196,.28),rgba(2,6,17,.7));
  box-shadow:inset 0 0 30px rgba(59,134,255,.12),0 0 30px rgba(11,75,196,.25);overflow:hidden;min-width:0}
.hd .cell::after{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold-hi),transparent)}
.hd .num{display:block;font-family:var(--display);font-variant-numeric:tabular-nums;font-size:clamp(2.3rem,12.5vw,5.6rem);
  line-height:1;color:var(--fg);text-shadow:0 0 22px rgba(59,134,255,.7)}
.hd .num.bump{animation:hd-bump .5s cubic-bezier(.2,.9,.3,1.3)}
@keyframes hd-bump{0%{transform:translateY(-35%);opacity:0;filter:blur(6px)}100%{transform:none;opacity:1;filter:none}}
.hd .lbl{display:block;margin-top:6px;font-size:clamp(.62rem,2.6vw,.85rem);letter-spacing:.28em;text-transform:uppercase;color:var(--muted)}

.hd .lock{display:inline-flex;align-items:center;gap:12px;max-width:100%;padding:10px 18px;border:1px solid var(--line);border-radius:999px;
  background:rgba(2,6,17,.6);font-size:clamp(.8rem,3vw,1rem);letter-spacing:.14em;text-transform:uppercase;color:var(--gold-hi);text-align:left}
.hd .lock svg{flex:none;width:20px;height:22px}
.hd .lock .shackle{transform-origin:12px 10px;animation:hd-rattle 4s ease-in-out infinite}
@keyframes hd-rattle{0%,82%,100%{transform:rotate(0)}86%{transform:rotate(-9deg)}90%{transform:rotate(8deg)}94%{transform:rotate(-5deg)}}
.hd .local{font-size:.85rem;letter-spacing:.12em;color:var(--muted);margin-top:-8px}

.hd .final{position:fixed;inset:0;z-index:20;display:grid;place-items:center;pointer-events:none;
  background:radial-gradient(circle,rgba(2,6,17,.72),rgba(2,6,17,.94))}
.hd .final span{font-family:var(--display);font-size:clamp(10rem,62vw,34rem);line-height:1;color:transparent;
  -webkit-text-stroke:3px var(--gold-hi);filter:drop-shadow(0 0 34px rgba(255,228,154,.7))}
.hd .final span.pulse{animation:hd-pulse 1s cubic-bezier(.15,.8,.2,1)}
@keyframes hd-pulse{0%{transform:scale(1.7);opacity:0}18%{opacity:1}100%{transform:scale(.82);opacity:.35}}
.hd .shake{animation:hd-shake .45s linear}
@keyframes hd-shake{0%,100%{transform:translate(0,0)}20%{transform:translate(-7px,4px)}40%{transform:translate(6px,-5px)}60%{transform:translate(-5px,-3px)}80%{transform:translate(4px,5px)}}

.hd .flashfx{position:fixed;inset:0;z-index:30;background:#fff;opacity:0;pointer-events:none}
.hd .flashfx.go{animation:hd-flash 1.1s ease-out}
@keyframes hd-flash{0%{opacity:1}100%{opacity:0}}
.hd .ring{position:fixed;left:50%;top:50%;width:20px;height:20px;margin:-10px 0 0 -10px;border:4px solid var(--gold-hi);border-radius:50%;z-index:29;pointer-events:none;opacity:0}
.hd .ring.go{animation:hd-ring 1.4s ease-out}
@keyframes hd-ring{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(90)}}

.hd .reveal{position:relative;overflow:hidden;padding-block:20px}
.hd .ghost{position:absolute;left:50%;top:50%;transform:translate(-50%,-52%);z-index:0;pointer-events:none;font-family:var(--display);
  font-size:clamp(16rem,78vw,46rem);line-height:1;color:transparent;-webkit-text-stroke:2px rgba(59,134,255,.28);opacity:0;transition:opacity 2s}
.hd .reveal.live .ghost{opacity:1}
.hd .reveal>*:not(.ghost){position:relative;z-index:1}
.hd .seq{opacity:0}
.hd .seq.on{animation:hd-rise .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes hd-rise{from{opacity:0;transform:translateY(26px);filter:blur(10px)}to{opacity:1;transform:none;filter:none}}
.hd .l1{font-size:clamp(1rem,4.6vw,1.6rem);text-transform:uppercase;color:var(--fg);letter-spacing:.2em}
.hd .l1.on{animation:hd-track 1.8s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes hd-track{from{opacity:0;letter-spacing:.9em;filter:blur(8px)}to{opacity:1;letter-spacing:.42em;filter:none}}
.hd .l2{font-family:var(--display);font-size:clamp(1.9rem,9vw,4rem);text-transform:uppercase;line-height:1.05;color:var(--blue-hi);text-shadow:0 0 30px rgba(59,134,255,.8)}
.hd .name{margin:0;font-family:var(--display);font-weight:400;text-transform:uppercase;font-size:clamp(4.2rem,22vw,12.5rem);line-height:.9;letter-spacing:.01em}
.hd .name span{display:block;background:linear-gradient(180deg,#fff7d6,var(--gold-hi) 30%,var(--gold) 80%);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 28px rgba(217,174,63,.55))}
.hd .name.on{animation:hd-slam .85s cubic-bezier(.2,.9,.25,1) forwards}
@keyframes hd-slam{0%{opacity:0;transform:scale(2.8);filter:blur(22px)}55%{opacity:1;transform:scale(.95);filter:blur(0)}100%{opacity:1;transform:scale(1);filter:none}}
.hd .role{position:relative;overflow:hidden;display:inline-block;padding:12px clamp(16px,5vw,34px);border:1px solid var(--gold);border-radius:4px;
  font-family:var(--display);font-size:clamp(1.1rem,5.2vw,2rem);letter-spacing:.14em;text-transform:uppercase;color:#120d00;
  background:linear-gradient(180deg,var(--gold-hi),var(--gold));box-shadow:0 0 40px rgba(217,174,63,.5)}
.hd .role::after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);animation:hd-shine 3s ease-in-out 1s infinite}
@keyframes hd-shine{0%{left:-60%}55%,100%{left:140%}}
.hd .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(6px,2vw,14px);width:100%;max-width:620px}
.hd .stat{padding:12px 4px;border-top:1px solid var(--line);min-width:0}
.hd .stat b{display:block;font-family:var(--display);font-weight:400;font-size:clamp(1.8rem,8vw,3rem);line-height:1;color:var(--gold-hi)}
.hd .stat i{display:block;margin-top:6px;font-style:normal;font-size:clamp(.62rem,2.6vw,.85rem);letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
.hd .chant{margin:0;font-size:clamp(1.1rem,4.4vw,1.5rem);letter-spacing:.12em;text-transform:uppercase;color:var(--fg);text-wrap:balance}
.hd .chant em{font-style:normal;color:var(--gold-hi)}
.hd .replay{font:inherit;font-size:.9rem;letter-spacing:.24em;text-transform:uppercase;cursor:pointer;color:var(--fg);
  background:transparent;border:1px solid var(--line);padding:10px 22px;border-radius:999px}
.hd .replay:hover{border-color:var(--gold-hi);color:var(--gold-hi)}
.hd .fine{margin:18px 0 0;text-align:center;font-size:.78rem;letter-spacing:.08em;color:var(--muted);opacity:.85}

@media (prefers-reduced-motion:reduce){
  .hd *,.hd *::before,.hd *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
  .hd .seq{opacity:1}
  .hd .beam{animation:none}
}
`;

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";

const display = Anton({ weight: "400", subsets: ["latin"] });

/* ---------- data (unchanged) ---------- */

const majorAwards = [
  {
    year: "2015",
    award: "Arjuna Award",
    organization: "Government of India",
    description: "Honoured for his contribution to Indian cricket.",
  },
  {
    year: "2019",
    award: "ICC Men's ODI Cricketer of the Year",
    organization: "International Cricket Council",
    description: "After an outstanding 2019, including five centuries at the ODI World Cup.",
  },
  {
    year: "2020",
    award: "Major Dhyan Chand Khel Ratna",
    organization: "Government of India",
    description: "India's highest sporting honour at the time.",
  },
];

const achievements = [
  { n: 7, title: "World Cup centuries", text: "Including a record five in 2019." },
  { n: 3, title: "ODI double centuries", text: "Three in ODI cricket." },
  { n: 5, title: "IPL titles", text: "As Mumbai Indians captain." },
  { n: 2, title: "ICC titles as captain", text: "2024 T20 World Cup and 2025 Champions Trophy." },
];

const navLinks = [
  ["Home", "/"], ["Profile", "/profile"], ["Career", "/career"], ["Stats", "/stats"],
  ["Records", "/records"], ["IPL", "/ipl"], ["World Cups", "/world-cups"], ["Awards", "/awards"],
];

const explore = [
  ["Records", "/records"], ["Centuries", "/centuries"], ["Captaincy", "/captaincy"], ["World Cups", "/world-cups"],
];

/* ---------- helpers ---------- */

function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function CountUp({ to, className = "" }) {
  const [ref, seen] = useInView();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / 1200, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref} className={className}>{n}</span>;
}

function Reveal({ children }) {
  const [ref, seen] = useInView(0.2);
  return <div ref={ref} className={`reveal ${seen ? "reveal-on" : ""}`}>{children}</div>;
}

/* ---------- page ---------- */

export default function AwardsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [sy, setSy] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setSy(Math.min(window.scrollY, 900));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-blue-500/40">
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .reveal { opacity: 0; transform: translateY(40px); transition: opacity .9s cubic-bezier(.2,.8,.2,1), transform .9s cubic-bezier(.2,.8,.2,1); }
        .reveal-on { opacity: 1; transform: none; }
        .hero-in { opacity: 0; transform: translateY(60px) skewY(2deg); animation: heroIn 1s cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes heroIn { to { opacity: 1; transform: none; } }
        .outline { -webkit-text-stroke: 2px rgba(255,255,255,.9); color: transparent; }
        .outline-blue { -webkit-text-stroke: 2px #2f6bff; color: transparent; }
        .pulse-glow { animation: pulseGlow 4s ease-in-out infinite; }
        @keyframes pulseGlow { 0%,100% { opacity: .55; transform: scale(1); } 50% { opacity: .9; transform: scale(1.08); } }
        :focus-visible { outline: 2px solid #5b8cff; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .hero-in, .pulse-glow { animation: none; opacity: 1; transform: none; }
          .reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className={`${display.className} text-2xl tracking-wide`}>
            ROHIT<span className="text-blue-500">SHARMA</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map(([t, h]) => (
              <Link key={t} href={h} className={`text-sm font-bold transition hover:text-white ${t === "Awards" ? "text-blue-400" : "text-white/55"}`}>
                {t}
              </Link>
            ))}
          </div>
          <Link href="/" className="rounded-full border border-white/25 px-5 py-2 text-xs font-bold transition hover:bg-white hover:text-black md:hidden">
            ← Home
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(47,107,255,.45),transparent_55%),linear-gradient(180deg,#02040a,#04102e_60%,#000)]" />
        <div className="pulse-glow absolute right-[10%] top-[15%] h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute -top-40 left-[16%] h-[120%] w-44 rotate-[18deg] bg-gradient-to-b from-blue-400/25 to-transparent blur-2xl" />
        <div
          className="pointer-events-none absolute right-[4%] top-[12%] select-none text-[34vw] leading-none opacity-70"
          style={{ transform: `translateY(${-sy * 0.25}px)`, filter: "drop-shadow(0 0 60px rgba(47,107,255,.7))" }}
          aria-hidden
        >
          🏆
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8">
          <h1 className={`${display.className} leading-[0.85]`}>
            <span className="hero-in block text-[26vw] lg:text-[15rem]" style={{ animationDelay: ".1s" }}>THE</span>
            <span className="hero-in outline block text-[26vw] lg:text-[15rem]" style={{ animationDelay: ".25s" }}>AWARDS</span>
          </h1>
        </div>
      </section>

      {/* MAJOR HONOURS — expanding panels */}
      <section className="bg-black px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className={`${display.className} text-6xl leading-[0.9] sm:text-8xl`}>
              MAJOR <span className="text-blue-500">HONOURS</span>
            </h2>
          </Reveal>
          <div className="mt-14 flex flex-col gap-4 lg:h-[34rem] lg:flex-row">
            {majorAwards.map((a) => (
              <article
                key={a.year}
                tabIndex={0}
                className="group relative min-h-[22rem] flex-1 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-blue-700/40 via-blue-950/30 to-black transition-all duration-700 hover:flex-[2.2] hover:border-blue-400 focus-visible:flex-[2.2]"
              >
                <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-blue-400/25 blur-3xl transition duration-700 group-hover:scale-150" />
                <div className={`${display.className} outline absolute -left-3 top-2 text-[11rem] leading-none opacity-25 transition duration-700 group-hover:translate-x-4 group-hover:opacity-55 lg:text-[13rem]`}>
                  {a.year}
                </div>
                <div className="absolute right-6 top-6 text-4xl transition duration-500 group-hover:scale-125 group-hover:-rotate-6">🏆</div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-8 pt-28">
                  <p className="text-sm font-bold text-blue-300">{a.organization}</p>
                  <h3 className={`${display.className} mt-1 text-4xl leading-tight lg:text-5xl`}>{a.award.toUpperCase()}</h3>
                  <p className="mt-3 max-w-md text-sm text-white/65 transition duration-500 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
                    {a.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="relative bg-[#02040a] px-5 py-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,.18),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <h2 className={`${display.className} text-6xl leading-[0.9] sm:text-8xl`}>
              MORE THAN <span className="outline-blue">TROPHIES</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((a) => (
              <div key={a.title} className="group bg-black p-8 transition duration-500 hover:bg-blue-950/60 lg:p-10">
                <CountUp to={a.n} className={`${display.className} block text-8xl transition duration-500 group-hover:scale-110 group-hover:text-blue-400 lg:text-9xl`} />
                <p className="mt-3 font-bold">{a.title}</p>
                <p className="mt-1 text-sm text-white/40">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-blue-600 px-5 py-32 text-center lg:px-8">
        <div className={`${display.className} pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[40vw] leading-none text-black/10`} aria-hidden>45</div>
        <div className="relative">
          <h2 className={`${display.className} text-6xl leading-[0.9] sm:text-9xl`}>FROM RECORDS TO RECOGNITION.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {explore.map(([t, h], i) => (
              <Link key={t} href={h} className={`rounded-full px-8 py-4 text-sm font-black tracking-wide transition hover:scale-105 ${i === 0 ? "bg-white text-black" : "bg-black hover:bg-white hover:text-black"}`}>
                {t.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black px-5 py-14 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className={`${display.className} text-3xl`}>ROHIT<span className="text-blue-500">SHARMA</span></div>
            <p className="mt-3 max-w-md text-xs text-white/35">
              Independent fan-made site, not affiliated with Rohit Sharma or any cricket organisation. © {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/50">
            {[["Profile", "/profile"], ["Career", "/career"], ["Stats", "/stats"], ["Records", "/records"], ["IPL", "/ipl"], ["Gallery", "/gallery"], ["Videos", "/videos"], ["News", "/news"], ["Contact", "/contact"], ["Privacy", "/privacy-policy"]].map(([t, h]) => (
              <Link key={t} href={h} className="transition hover:text-white">{t}</Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

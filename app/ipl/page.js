"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";

const display = Anton({ weight: "400", subsets: ["latin"] });

/* ---------- data (unchanged) ---------- */

const seasons = [
  { year: "2008", team: "Deccan Chargers", role: "Batter" },
  { year: "2009", team: "Deccan Chargers", role: "Batter" },
  { year: "2010", team: "Mumbai Indians", role: "Batter" },
  { year: "2011", team: "Mumbai Indians", role: "Batter" },
  { year: "2012", team: "Mumbai Indians", role: "Batter" },
  ...["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"].map(
    (year) => ({ year, team: "Mumbai Indians", role: "Captain" })
  ),
  { year: "2024", team: "Mumbai Indians", role: "Batter" },
  { year: "2025", team: "Mumbai Indians", role: "Batter" },
];

const titles = ["2013", "2015", "2017", "2019", "2020"];

const milestones = [
  { year: "2008", title: "IPL Debut", text: "Began his IPL journey in the inaugural season with Deccan Chargers." },
  { year: "2011", title: "Mumbai Indians", text: "MI became the defining franchise chapter of his career." },
  { year: "2013", title: "Captain & First Title", text: "Led Mumbai Indians to their first IPL championship." },
  { year: "2015", title: "Second Title", text: "MI win again under Rohit's leadership." },
  { year: "2017", title: "Third Title", text: "MI beat Rising Pune Supergiant in the final." },
  { year: "2019", title: "Fourth Title", text: "Another trophy for the captain's legacy." },
  { year: "2020", title: "Five-Time Champions", text: "MI win their fifth IPL title." },
  { year: "2024", title: "Captaincy Transition", text: "Continued with MI as a batter after the captaincy changed." },
  { year: "2025", title: "Still Mumbai", text: "Remained part of the MI squad for IPL 2025." },
];

const FILTERS = ["All", "Captain", "Deccan Chargers", "Mumbai Indians"];

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

function Reveal({ children, className = "" }) {
  const [ref, seen] = useInView(0.2);
  return (
    <div ref={ref} className={`reveal ${seen ? "reveal-on" : ""} ${className}`}>
      {children}
    </div>
  );
}

function CountUp({ to, suffix = "", className = "" }) {
  const [ref, seen] = useInView();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / 1400, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}

function Title({ children }) {
  return (
    <Reveal>
      <h2 className={`${display.className} text-6xl leading-[0.9] sm:text-8xl`}>{children}</h2>
    </Reveal>
  );
}

/* ---------- page ---------- */

export default function IPLPage() {
  const [filter, setFilter] = useState("All");
  const [mi, setMi] = useState(2); // selected milestone index (2013)
  const [scrolled, setScrolled] = useState(false);
  const [sy, setSy] = useState(0);
  const trophyRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setSy(Math.min(window.scrollY, 900));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shown = seasons.filter((s) =>
    filter === "All" ? true : filter === "Captain" ? s.role === "Captain" : s.team === filter
  );
  const m = milestones[mi];

  const navLinks = [
    ["Home", "/"],
    ["Profile", "/profile"],
    ["Career", "/career"],
    ["Stats", "/stats"],
    ["Records", "/records"],
    ["Captaincy", "/captaincy"],
    ["IPL", "/ipl"],
  ];

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
        .rail { scrollbar-width: none; scroll-snap-type: x mandatory; }
        .rail::-webkit-scrollbar { display: none; }
        .swap { animation: swap .5s cubic-bezier(.2,.8,.2,1); }
        @keyframes swap { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .sweep { position: relative; overflow: hidden; }
        .sweep::after { content: ""; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.35) 50%, transparent 65%); transform: translateX(-120%); transition: transform .7s ease; }
        .sweep:hover::after { transform: translateX(120%); }
        :focus-visible { outline: 2px solid #5b8cff; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .hero-in, .swap { animation: none; opacity: 1; transform: none; }
          .reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className={`${display.className} text-2xl tracking-wide`}>
            ROHIT<span className="text-blue-500">SHARMA</span>
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map(([t, h]) => (
              <Link key={t} href={h} className={`text-sm font-bold transition hover:text-white ${t === "IPL" ? "text-blue-400" : "text-white/55"}`}>
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
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#02040a,#04102e_60%,#000)]" />
        {/* local image — parallax */}
        <img
          src="/images/rohit-profile.jpg"
          alt="Rohit Sharma"
          className="absolute inset-0 h-[115%] w-full object-cover object-center opacity-45"
          style={{ transform: `translateY(${-sy * 0.15}px) scale(1.05)` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(47,107,255,.45),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute -top-40 right-[20%] h-[120%] w-48 -rotate-[14deg] bg-gradient-to-b from-sky-300/20 to-transparent blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 lg:px-8">
          <h1 className={`${display.className} leading-[0.82]`} style={{ transform: `translateY(${-sy * 0.1}px)` }}>
            <span className="hero-in block text-[34vw] lg:text-[22rem]" style={{ animationDelay: ".1s" }}>
              IPL
            </span>
            <span className="hero-in outline block text-[16vw] lg:text-[9rem]" style={{ animationDelay: ".3s" }}>
              5× CHAMPION
            </span>
          </h1>
          <div className="hero-in mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: ".5s" }}>
            <a href="#trophies" className="sweep rounded-full bg-blue-600 px-9 py-4 text-sm font-black tracking-wide shadow-[0_0_50px_rgba(47,107,255,.55)] transition hover:scale-105">
              SEE THE TROPHIES
            </a>
            <span className="rounded-full border border-white/30 px-6 py-4 text-sm font-black tracking-wide backdrop-blur">
              MUMBAI INDIANS · #45
            </span>
          </div>
        </div>
      </section>

      {/* QUICK NUMBERS */}
      <section className="bg-blue-600">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {[
            [5, "×", "IPL titles"],
            [2008, "", "Debut season"],
            [18, "", "Seasons"],
            [45, "", "Jersey"],
          ].map(([n, s, l]) => (
            <div key={l} className="border-white/20 px-6 py-8 odd:border-r lg:border-r lg:last:border-r-0">
              <CountUp to={n} suffix={s} className={`${display.className} block text-6xl sm:text-7xl`} />
              <p className="mt-1 text-sm font-bold text-white/75">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TROPHIES */}
      <section id="trophies" className="relative overflow-hidden bg-black py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,.2),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-7xl items-end justify-between px-5 lg:px-8">
          <Title>
            FIVE <span className="text-blue-500">TROPHIES</span>
          </Title>
          <div className="hidden gap-3 sm:flex">
            {[-1, 1].map((d) => (
              <button
                key={d}
                aria-label={d < 0 ? "Previous" : "Next"}
                onClick={() => trophyRef.current?.scrollBy({ left: d * 420, behavior: "smooth" })}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 text-xl transition hover:bg-white hover:text-black"
              >
                {d < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
        <div ref={trophyRef} className="rail relative mt-14 flex gap-5 overflow-x-auto px-5 pb-4 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {titles.map((y, i) => (
            <article key={y} className="group relative h-[26rem] w-[75vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-700/50 via-blue-950/40 to-black">
              <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-blue-400/30 blur-3xl transition duration-700 group-hover:scale-150" />
              <div className={`${display.className} outline absolute -left-2 top-4 text-[10rem] leading-none opacity-30 transition duration-700 group-hover:translate-x-3 group-hover:opacity-60`}>
                {y.slice(2)}
              </div>
              <div className="absolute right-6 top-6 text-5xl transition duration-500 group-hover:scale-125 group-hover:-rotate-6">🏆</div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-7 pt-24">
                <p className="text-sm font-bold text-blue-300">Title {i + 1} of 5</p>
                <p className={`${display.className} text-6xl`}>{y}</p>
                <p className="text-sm font-bold text-white/60">Mumbai Indians</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FRANCHISES */}
      <section className="bg-[#02040a] px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            TWO TEAMS. <span className="outline">ONE LEGACY.</span>
          </Title>
          <div className="mt-14 grid gap-5 md:grid-cols-[1fr_1.5fr]">
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-black p-10 transition duration-500 hover:border-white/40">
              <div className={`${display.className} outline absolute -right-4 -top-4 text-[9rem] leading-none opacity-20`}>08</div>
              <p className="relative text-sm font-bold text-white/50">2008 – 2009</p>
              <h3 className={`${display.className} relative mt-24 text-5xl`}>DECCAN CHARGERS</h3>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-blue-500/40 bg-gradient-to-br from-blue-600/50 via-blue-950/40 to-black p-10 transition duration-500 hover:border-blue-400">
              <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl transition duration-700 group-hover:scale-150" />
              <div className={`${display.className} outline absolute -right-4 -top-4 text-[9rem] leading-none opacity-20`}>MI</div>
              <p className="relative text-sm font-bold text-blue-300">2011 – 2025</p>
              <h3 className={`${display.className} relative mt-24 text-6xl`}>MUMBAI INDIANS</h3>
              <p className="relative mt-2 text-sm font-bold text-white/70">5× champion as captain</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-black px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            YEAR BY <span className="outline-blue">YEAR</span>
          </Title>
          <div className="rail mt-12 flex gap-2 overflow-x-auto pb-3">
            {milestones.map((x, i) => (
              <button
                key={x.year}
                onClick={() => setMi(i)}
                className={`${display.className} shrink-0 rounded-full px-7 py-3 text-2xl tracking-wide transition duration-300 ${mi === i ? "bg-blue-600 shadow-[0_0_40px_rgba(47,107,255,.6)]" : "border border-white/20 text-white/55 hover:border-white hover:text-white"}`}
              >
                {x.year}
              </button>
            ))}
          </div>
          <div key={mi} className="swap relative mt-6 overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-700/30 via-blue-950/20 to-black p-8 sm:p-14">
            <div className={`${display.className} outline absolute -right-4 -top-8 text-[12rem] leading-none opacity-20 sm:text-[20rem]`}>
              {m.year}
            </div>
            <h3 className={`${display.className} relative text-5xl sm:text-8xl`}>{m.title.toUpperCase()}</h3>
            <p className="relative mt-6 max-w-lg text-lg text-white/70">{m.text}</p>
          </div>
        </div>
      </section>

      {/* SEASONS */}
      <section className="bg-[#02040a] px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            EVERY <span className="text-blue-500">SEASON</span>
          </Title>
          <div className="mt-10 flex flex-wrap gap-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-6 py-2.5 text-sm font-black transition duration-300 ${filter === f ? "bg-blue-600 shadow-[0_0_40px_rgba(47,107,255,.6)]" : "border border-white/20 text-white/55 hover:border-white hover:text-white"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div key={filter} className="swap mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {shown.map((s) => {
              const cap = s.role === "Captain";
              const champ = titles.includes(s.year);
              return (
                <div
                  key={s.year}
                  className={`group relative overflow-hidden rounded-2xl border p-5 transition duration-300 hover:-translate-y-2 ${
                    champ
                      ? "border-blue-400/70 bg-gradient-to-b from-blue-600/50 to-black"
                      : cap
                      ? "border-blue-500/30 bg-blue-950/30"
                      : "border-white/10 bg-white/[0.03]"
                  } hover:border-blue-400`}
                >
                  <p className={`${display.className} text-5xl transition group-hover:text-blue-300`}>{s.year}</p>
                  <p className="mt-3 text-xs font-bold text-white/55">{s.team}</p>
                  <p className={`mt-1 text-xs font-black ${cap ? "text-blue-300" : "text-white/35"}`}>
                    {cap ? "Captain" : "Batter"}
                  </p>
                  {champ && <span className="absolute right-4 top-4 text-xl">🏆</span>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-blue-600 px-5 py-32 text-center lg:px-8">
        <div className={`${display.className} pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[40vw] leading-none text-black/10`} aria-hidden>
          45
        </div>
        <div className="relative">
          <h2 className={`${display.className} text-6xl leading-[0.9] sm:text-9xl`}>MEET THE CAPTAIN.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              ["Captaincy", "/captaincy"],
              ["Stats", "/stats"],
              ["Records", "/records"],
              ["Career", "/career"],
              ["Profile", "/profile"],
            ].map(([t, h], i) => (
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
            <div className={`${display.className} text-3xl`}>
              ROHIT<span className="text-blue-500">SHARMA</span>
            </div>
            <p className="mt-3 text-xs text-white/35">Independent fan-made site. © {new Date().getFullYear()}</p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/50">
            {[
              ["Profile", "/profile"],
              ["Career", "/career"],
              ["Stats", "/stats"],
              ["Records", "/records"],
              ["Captaincy", "/captaincy"],
              ["World Cups", "/world-cups"],
              ["Centuries", "/centuries"],
              ["Gallery", "/gallery"],
              ["Videos", "/videos"],
              ["News", "/news"],
              ["Contact", "/contact"],
              ["Privacy", "/privacy-policy"],
            ].map(([t, h]) => (
              <Link key={t} href={h} className="transition hover:text-white">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";

const display = Anton({ weight: "400", subsets: ["latin"] });

/* ---------- data (unchanged) ---------- */

const FORMATS = ["Test", "ODI", "T20I", "IPL"];

const profile = [
  ["Born", "April 30, 1987"],
  ["Birth Place", "Nagpur, Maharashtra"],
  ["Role", "Batsman"],
  ["Batting", "Right Handed Bat"],
  ["Bowling", "Right-arm offbreak"],
];

const rankings = [
  ["Test", "--", "5"],
  ["ODI", "4", "1"],
  ["T20I", "--", "7"],
];

const battingRows = [
  ["Matches", "67", "291", "159", "281"],
  ["Innings", "116", "283", "151", "276"],
  ["Runs", "4301", "12120", "4231", "7329"],
  ["Balls", "7538", "12979", "3003", "5514"],
  ["Highest", "212", "264", "121", "109"],
  ["Average", "40.58", "49.27", "32.05", "29.91"],
  ["SR", "57.06", "93.39", "140.90", "132.92"],
  ["Not Out", "10", "37", "19", "31"],
  ["Fours", "473", "1147", "383", "661"],
  ["Sixes", "88", "381", "205", "323"],
  ["Ducks", "6", "16", "12", "19"],
  ["50s", "18", "63", "32", "49"],
  ["100s", "12", "35", "5", "2"],
  ["200s", "1", "3", "0", "0"],
  ["300s", "0", "0", "0", "0"],
  ["400s", "0", "0", "0", "0"],
];

const bowlingRows = [
  ["Matches", "67", "291", "159", "281"],
  ["Innings", "16", "40", "9", "32"],
  ["Balls", "383", "610", "68", "339"],
  ["Runs", "224", "533", "113", "453"],
  ["Maidens", "5", "2", "0", "0"],
  ["Wickets", "2", "9", "1", "15"],
  ["Avg", "112.0", "59.22", "113.0", "30.2"],
  ["Eco", "3.51", "5.24", "9.97", "8.02"],
  ["SR", "191.5", "67.78", "68.0", "22.6"],
  ["BBI", "1/26", "2/27", "1/22", "4/6"],
  ["BBM", "1/35", "2/27", "1/22", "4/6"],
  ["4w", "0", "0", "0", "1"],
  ["5w", "0", "0", "0", "0"],
  ["10w", "0", "0", "0", "0"],
];

const internationalCards = [
  ["Matches", "517", "Test + ODI + T20I"],
  ["Runs", "20,652", "All formats"],
  ["Hundreds", "52", "12 Test · 35 ODI · 5 T20I"],
  ["Fifties", "113", "18 Test · 63 ODI · 32 T20I"],
  ["Sixes", "674", "88 Test · 381 ODI · 205 T20I"],
  ["Highest", "264", "ODI"],
];

const iplSeasons = [
  ["2008", "Deccan Chargers"],
  ["2009", "Deccan Chargers"],
  ...Array.from({ length: 16 }, (_, i) => [String(2010 + i), "Mumbai Indians"]),
];

const recordCards = [
  ["264", "Highest ODI score"],
  ["3", "ODI double-centuries"],
  ["1", "Test double-century"],
  ["35", "ODI centuries"],
  ["5", "T20I centuries"],
  ["2", "IPL centuries"],
  ["323", "IPL sixes"],
  ["4/6", "Best IPL bowling"],
];

// headline numbers shown big for each format (labels must exist in battingRows)
const HEADLINE = ["Runs", "Highest", "Average", "SR"];

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

// Counts up pure-integer values (e.g. "20,652"); anything else renders as-is.
function Num({ value, className = "" }) {
  const [ref, seen] = useInView();
  const isInt = /^[0-9,]+$/.test(value);
  const [text, setText] = useState(isInt ? "0" : value);

  useEffect(() => {
    if (!isInt) {
      setText(value);
      return;
    }
    if (!seen) return;
    const n = parseInt(value.replace(/,/g, ""), 10);
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / 1200, 1);
      const v = Math.round(n * (1 - Math.pow(1 - p, 4)));
      setText(value.includes(",") ? v.toLocaleString("en-US") : String(v));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value, isInt]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

function Reveal({ children, className = "" }) {
  const [ref, seen] = useInView(0.2);
  return (
    <div ref={ref} className={`reveal ${seen ? "reveal-on" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Title({ children }) {
  return (
    <Reveal>
      <h2 className={`${display.className} text-6xl leading-[0.9] sm:text-8xl`}>{children}</h2>
    </Reveal>
  );
}

const lookup = (rows, label, fi) => rows.find((r) => r[0] === label)?.[fi + 1];

/* ---------- page ---------- */

export default function StatsPage() {
  const [rankingTab, setRankingTab] = useState("Batting");
  const [fi, setFi] = useState(1); // default ODI
  const [scrolled, setScrolled] = useState(false);
  const railRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    ["Home", "/"],
    ["Profile", "/profile"],
    ["Career", "/career"],
    ["Stats", "/stats"],
    ["Records", "/records"],
    ["IPL", "/ipl"],
    ["World Cups", "/world-cups"],
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
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map(([t, h]) => (
              <Link key={t} href={h} className={`text-sm font-bold transition hover:text-white ${t === "Stats" ? "text-white" : "text-white/55"}`}>
                {t}
              </Link>
            ))}
          </div>
          <Link href="/" className="rounded-full border border-white/25 px-5 py-2 text-xs font-bold transition hover:bg-white hover:text-black lg:hidden">
            ← Home
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(47,107,255,.4),transparent_55%),linear-gradient(180deg,#02040a,#04102e_60%,#000)]" />
        <div className="absolute -top-40 left-[14%] h-[120%] w-40 rotate-[18deg] bg-gradient-to-b from-blue-400/25 to-transparent blur-2xl" />
        <div className={`${display.className} outline-blue pointer-events-none absolute right-[-3%] top-[10%] select-none text-[42vw] leading-none opacity-60`} aria-hidden>
          45
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8">
          <h1 className={`${display.className} leading-[0.85]`}>
            <span className="hero-in block text-[22vw] lg:text-[13rem]" style={{ animationDelay: ".1s" }}>
              THE
            </span>
            <span className="hero-in outline block text-[22vw] lg:text-[13rem]" style={{ animationDelay: ".25s" }}>
              NUMBERS
            </span>
          </h1>
        </div>
      </section>

      {/* INTERNATIONAL TOTALS */}
      <section className="relative bg-black px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm font-bold text-blue-400">International career</p>
          <div className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {internationalCards.map(([label, value, note]) => (
              <div key={label} className="group bg-black p-8 transition duration-500 hover:bg-blue-950/60 lg:p-10">
                <Num value={value} className={`${display.className} block text-7xl transition duration-500 group-hover:scale-105 group-hover:text-blue-400 lg:text-8xl`} />
                <p className="mt-3 text-sm font-bold">{label}</p>
                <p className="mt-1 text-xs text-white/35">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFILE + RANKINGS */}
      <section className="bg-[#02040a] px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {/* profile */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-700/30 via-blue-950/20 to-black p-8 sm:p-10">
            <div className={`${display.className} outline absolute -right-4 -top-6 text-[11rem] leading-none opacity-20`} aria-hidden>
              45
            </div>
            <h2 className={`${display.className} relative text-5xl`}>ROHIT SHARMA</h2>
            <p className="relative mt-1 text-sm font-bold text-blue-300">🇮🇳 India</p>
            <dl className="relative mt-8 grid gap-6 sm:grid-cols-2">
              {profile.map(([l, v]) => (
                <div key={l}>
                  <dt className="text-xs text-white/40">{l}</dt>
                  <dd className="mt-1 font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* rankings */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <h2 className={`${display.className} text-4xl`}>ICC RANKINGS</h2>
            </div>
            <div className="mt-6 flex rounded-full bg-white/[0.07] p-1">
              {["Batting", "Bowling", "All-Rounder"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRankingTab(tab)}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-bold transition ${rankingTab === tab ? "bg-blue-600 text-white shadow-[0_0_30px_rgba(47,107,255,.6)]" : "text-white/45 hover:text-white"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {rankingTab === "Batting" ? (
              <div key="b" className="swap mt-6 grid grid-cols-3 gap-3">
                {rankings.map(([format, current, best]) => (
                  <div key={format} className={`rounded-2xl border p-5 text-center ${current === "4" ? "border-blue-500/60 bg-blue-600/15" : "border-white/10"}`}>
                    <p className="text-xs font-bold text-white/45">{format}</p>
                    <p className={`${display.className} mt-3 text-6xl ${current === "4" ? "text-blue-400" : "text-white/40"}`}>
                      {current === "--" ? "–" : `#${current}`}
                    </p>
                    <p className="mt-3 text-xs text-white/40">
                      Best <span className="font-bold text-white">#{best}</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p key="o" className="swap mt-6 rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-white/40">
                No {rankingTab.toLowerCase()} ranking data yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CAREER EXPLORER */}
      <section className="relative overflow-hidden bg-black px-5 py-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,.18),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Title>
            PICK A <span className="text-blue-500">FORMAT</span>
          </Title>

          <div className="mt-10 flex flex-wrap gap-3">
            {FORMATS.map((f, i) => (
              <button
                key={f}
                onClick={() => setFi(i)}
                className={`${display.className} rounded-full px-10 py-3 text-2xl tracking-wide transition duration-300 ${fi === i ? "bg-blue-600 shadow-[0_0_50px_rgba(47,107,255,.6)]" : "border border-white/20 text-white/60 hover:border-white hover:text-white"}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div key={fi} className="swap">
            {/* headline numbers */}
            <div className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {HEADLINE.map((l) => (
                <div key={l} className="bg-black p-8">
                  <p className={`${display.className} text-6xl text-blue-400 sm:text-7xl`}>{lookup(battingRows, l, fi)}</p>
                  <p className="mt-2 text-sm font-bold text-white/50">{l === "SR" ? "Strike rate" : l}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {[
                ["BATTING", battingRows],
                ["BOWLING", bowlingRows],
              ].map(([title, rows]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
                  <h3 className={`${display.className} text-4xl`}>{title}</h3>
                  <ul className="mt-5">
                    {rows.map((r) => {
                      const v = r[fi + 1];
                      const zero = v === "0";
                      return (
                        <li key={r[0]} className="flex items-center justify-between border-b border-white/5 py-3 text-sm transition last:border-0 hover:bg-blue-500/[0.06] hover:px-2">
                          <span className="text-white/55">{r[0]}</span>
                          <span className={`font-black ${zero ? "text-white/25" : "text-white"}`}>{v}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="bg-[#02040a] px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            NUMBERS THAT <span className="outline">STAND OUT</span>
          </Title>
          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {recordCards.map(([value, label], i) => (
              <div
                key={label}
                className={`group relative overflow-hidden rounded-3xl border p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-500/60 ${i === 0 ? "border-blue-500/40 bg-gradient-to-br from-blue-600/40 to-black lg:col-span-2 lg:row-span-1" : "border-white/10 bg-white/[0.03]"}`}
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl transition duration-700 group-hover:scale-150" />
                <Num value={value} className={`${display.className} relative block leading-none ${i === 0 ? "text-8xl sm:text-9xl" : "text-6xl sm:text-7xl"}`} />
                <p className="relative mt-3 text-sm font-bold text-white/55">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IPL RAIL */}
      <section className="bg-black py-28">
        <div className="mx-auto flex max-w-7xl items-end justify-between px-5 lg:px-8">
          <Title>
            IPL, <span className="outline-blue">SEASON BY SEASON</span>
          </Title>
          <div className="hidden gap-3 sm:flex">
            {[-1, 1].map((d) => (
              <button
                key={d}
                aria-label={d < 0 ? "Previous seasons" : "Next seasons"}
                onClick={() => railRef.current?.scrollBy({ left: d * 480, behavior: "smooth" })}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 text-xl transition hover:bg-white hover:text-black"
              >
                {d < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
        <div ref={railRef} className="rail mt-14 flex gap-4 overflow-x-auto px-5 pb-4 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {iplSeasons.map(([year, team]) => {
            const mi = team === "Mumbai Indians";
            return (
              <div
                key={year}
                className={`group relative h-64 w-56 shrink-0 snap-start overflow-hidden rounded-3xl border p-6 transition duration-500 hover:-translate-y-2 ${mi ? "border-blue-500/30 bg-gradient-to-b from-blue-700/40 to-black hover:border-blue-400" : "border-white/15 bg-gradient-to-b from-white/10 to-black hover:border-white/50"}`}
              >
                <div className={`${display.className} outline absolute -right-2 top-0 text-[8rem] leading-none opacity-25 transition duration-500 group-hover:scale-110 group-hover:opacity-50`}>
                  {year.slice(2)}
                </div>
                <div className="absolute inset-x-6 bottom-6">
                  <p className={`${display.className} text-5xl`}>{year}</p>
                  <p className="mt-1 text-xs font-bold text-white/60">{team}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-blue-600 px-5 py-28 text-center lg:px-8">
        <div className={`${display.className} pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[40vw] leading-none text-black/10`} aria-hidden>
          45
        </div>
        <div className="relative">
          <h2 className={`${display.className} text-6xl leading-[0.9] sm:text-9xl`}>GO DEEPER.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              ["Records", "/records"],
              ["IPL", "/ipl"],
              ["World Cups", "/world-cups"],
              ["Captaincy", "/captaincy"],
            ].map(([t, h]) => (
              <Link key={t} href={h} className="rounded-full bg-black px-8 py-4 text-sm font-black tracking-wide transition hover:scale-105 hover:bg-white hover:text-black">
                {t.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-white/35 md:flex-row md:items-center">
          <div className={`${display.className} text-2xl text-white`}>
            ROHIT<span className="text-blue-500">SHARMA</span>
          </div>
          <p>Independent fan-made site. © 2026</p>
        </div>
      </footer>
    </main>
  );
}

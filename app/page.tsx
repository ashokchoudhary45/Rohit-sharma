"use client";

import { useEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";

const display = Anton({ weight: "400", subsets: ["latin"] });

/* ---------- helpers ---------- */

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
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

  return [ref, seen] as const;
}

function CountUp({
  to,
  className = "",
}: {
  to: string;
  className?: string;
}) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!seen) return;

    const n = parseInt(to.replace(/[^0-9]/g, ""), 10);
    const t0 = performance.now();
    let raf = 0;

    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1400, 1);
      const v = Math.round(n * (1 - Math.pow(1 - p, 4)));

      setText(
        to.includes(",")
          ? v.toLocaleString("en-US")
          : String(v)
      );

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [seen, to]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className={`reveal ${
        seen ? "reveal-on" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- data ---------- */

const stats = [
  { value: "510", label: "Matches" },
  { value: "20,284", label: "Runs" },
  { value: "51", label: "Hundreds" },
  { value: "656", label: "Sixes" },
];

const moments = [
  {
    year: "2007",
    title: "Debut",
    tag: "Day one",
    hue: "from-blue-700/60",
  },
  {
    year: "2013",
    title: "Opener",
    tag: "New role",
    hue: "from-sky-600/50",
  },
  {
    year: "2014",
    title: "264",
    tag: "ODI record",
    hue: "from-blue-500/60",
  },
  {
    year: "2019",
    title: "5 Hundreds",
    tag: "World Cup",
    hue: "from-indigo-600/60",
  },
  {
    year: "2024",
    title: "Champions",
    tag: "T20 World Cup",
    hue: "from-blue-600/70",
  },
];

const media = [
  "Best Innings",
  "World Cup",
  "Interviews",
];

const explore = [
  ["Stats", "/stats"],
  ["IPL", "/ipl"],
  ["World Cups", "/world-cups"],
  ["Captaincy", "/captaincy"],
];

/* ---------- page ---------- */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Hero: cursor spotlight + parallax
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();

      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      hero.style.setProperty("--mx", `${x * 100}%`);
      hero.style.setProperty("--my", `${y * 100}%`);
      hero.style.setProperty("--px", `${(x - 0.5) * 2}`);
      hero.style.setProperty("--py", `${(y - 0.5) * 2}`);
    };

    hero.addEventListener("pointermove", move);

    return () => {
      hero.removeEventListener("pointermove", move);
    };
  }, []);

  // Scroll: nav state + hero scroll parallax
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      heroRef.current?.style.setProperty(
        "--sy",
        String(Math.min(window.scrollY, 900))
      );
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  const slide = (dir: number) =>
    railRef.current?.scrollBy({
      left: dir * 440,
      behavior: "smooth",
    });

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-blue-500/40">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition:
            opacity 0.9s cubic-bezier(.2,.8,.2,1),
            transform 0.9s cubic-bezier(.2,.8,.2,1);
        }

        .reveal-on {
          opacity: 1;
          transform: none;
        }

        .hero-in {
          opacity: 0;
          transform: translateY(60px) skewY(2deg);
          animation: heroIn 1s cubic-bezier(.2,.8,.2,1) forwards;
        }

        @keyframes heroIn {
          to {
            opacity: 1;
            transform: none;
          }
        }

        .outline {
          -webkit-text-stroke: 2px rgba(255,255,255,.9);
          color: transparent;
        }

        .outline-blue {
          -webkit-text-stroke: 2px #2f6bff;
          color: transparent;
        }

        .marquee {
          animation: marquee 28s linear infinite;
        }

        @keyframes marquee {
          to {
            transform: translateX(-50%);
          }
        }

        .sweep {
          position: relative;
          overflow: hidden;
        }

        .sweep::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(255,255,255,.35) 50%,
            transparent 65%
          );
          transform: translateX(-120%);
          transition: transform .7s ease;
        }

        .sweep:hover::after {
          transform: translateX(120%);
        }

        .rail {
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
        }

        .rail::-webkit-scrollbar {
          display: none;
        }

        :focus-visible {
          outline: 2px solid #5b8cff;
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .marquee,
          .hero-in {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/75 backdrop-blur-xl"
            : "bg-black/20"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1500px] items-center gap-5 px-5 lg:px-8">
          {/* LOGO */}

          <a
            href="#home"
            className={`${display.className} shrink-0 text-2xl tracking-wide`}
          >
            ROHIT<span className="text-blue-500">SHARMA</span>
          </a>

          {/* =================================================
              DESKTOP PRIMARY MENU
          ================================================= */}

          <div className="ml-auto hidden items-center gap-5 xl:flex">
            {[
              ["Home", "#home"],
              ["Awards", "/awards"],
              ["Birthday", "/birthday"],
              ["Career", "#career"],
              ["Contact", "/contact"],
              ["IPL", "/ipl"],
              ["News", "/news"],
              ["Innings", "/innings"],
              ["Stats", "#stats"],
              ["Videos", "/videos"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="whitespace-nowrap text-[13px] font-bold text-white/65 transition hover:text-white"
              >
                {label}
              </a>
            ))}

            {/* =================================================
                SECONDARY / MORE MENU
            ================================================= */}

            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-2 whitespace-nowrap text-[13px] font-bold text-white/65 transition hover:text-white"
              >
                More
                <span className="text-[9px] transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </button>

              <div className="pointer-events-none absolute right-0 top-full w-60 translate-y-3 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-2xl border border-white/10 bg-black/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl">
                  {[
                    ["Captaincy", "/captaincy"],
                    ["Centuries", "/centuries"],
                    ["Gallery", "/gallery"],
                    ["Profile", "/profile"],
                    ["Quiz", "/quiz"],
                    ["Records", "/records"],
                    ["Wallpapers", "/wallpapers"],
                    ["World Cups", "/world-cups"],
                    ["Privacy Policy", "/privacy-policy"],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      className="block rounded-xl px-4 py-3 text-sm font-bold text-white/60 transition hover:bg-blue-600/15 hover:text-white"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* WATCH CTA */}

            <a
              href="/videos"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-[0_0_30px_rgba(47,107,255,.35)] transition hover:scale-105 hover:bg-blue-500"
            >
              Watch
            </a>
          </div>

          {/* MOBILE / TABLET MENU BUTTON */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        {menuOpen && (
          <div className="border-t border-white/10 bg-black/95 px-6 py-7 backdrop-blur-2xl lg:hidden">
            {/* PRIMARY */}

            <p className="mb-4 text-[10px] font-black tracking-[0.3em] text-blue-400">
              PRIMARY
            </p>

            <div className="grid grid-cols-2 gap-2">
              {[
                ["Home", "#home"],
                ["Awards", "/awards"],
                ["Birthday", "/birthday"],
                ["Career", "#career"],
                ["Contact", "/contact"],
                ["IPL", "/ipl"],
                ["News", "/news"],
                ["Innings", "/innings"],
                ["Stats", "#stats"],
                ["Videos", "/videos"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`${display.className} rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xl transition hover:border-blue-500/50 hover:bg-blue-600/10`}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* SECONDARY */}

            <div className="mt-8 border-t border-white/10 pt-7">
              <p className="mb-4 text-[10px] font-black tracking-[0.3em] text-white/35">
                MORE
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                {[
                  ["Captaincy", "/captaincy"],
                  ["Centuries", "/centuries"],
                  ["Gallery", "/gallery"],
                  ["Profile", "/profile"],
                  ["Quiz", "/quiz"],
                  ["Records", "/records"],
                  ["Wallpapers", "/wallpapers"],
                  ["World Cups", "/world-cups"],
                  ["Privacy Policy", "/privacy-policy"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-white/5 py-4 text-sm font-bold text-white/55 transition hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        ref={heroRef}
        id="home"
        className="relative flex min-h-screen items-end overflow-hidden"
        style={
          {
            ["--mx" as string]: "70%",
            ["--my" as string]: "40%",
            ["--px" as string]: "0",
            ["--py" as string]: "0",
            ["--sy" as string]: "0",
          } as React.CSSProperties
        }
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx) var(--my), rgba(47,107,255,.35), transparent 60%), linear-gradient(180deg,#02040a 0%,#04102e 55%,#000 100%)",
          }}
        />

        {/* stadium floodlights */}

        <div className="absolute -top-40 left-[12%] h-[120%] w-40 rotate-[18deg] bg-gradient-to-b from-blue-400/25 to-transparent blur-2xl" />

        <div className="absolute -top-40 right-[18%] h-[120%] w-56 -rotate-[14deg] bg-gradient-to-b from-sky-300/20 to-transparent blur-3xl" />

        {/* giant jersey number */}

        <div
          className={`${display.className} outline-blue pointer-events-none absolute right-[-4%] top-[8%] select-none text-[42vw] leading-none opacity-70`}
          style={{
            transform:
              "translate3d(calc(var(--px) * -30px), calc(var(--py) * -20px - var(--sy) * 0.25px), 0)",
          }}
          aria-hidden
        >
          45
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 lg:px-8">
          <p
            className="hero-in text-sm font-bold tracking-[0.4em] text-blue-400"
            style={{ animationDelay: ".1s" }}
          >
            THE HITMAN
          </p>

          <h1
            className={`${display.className} mt-2 leading-[0.85]`}
            style={{
              transform:
                "translateY(calc(var(--sy) * -0.12px))",
            }}
          >
            <span
              className="hero-in block text-[22vw] lg:text-[14rem]"
              style={{ animationDelay: ".25s" }}
            >
              ROHIT
            </span>

            <span
              className="hero-in outline block text-[22vw] lg:text-[14rem]"
              style={{ animationDelay: ".4s" }}
            >
              SHARMA
            </span>
          </h1>

          <div
            className="hero-in mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: ".6s" }}
          >
            <a
              href="#stats"
              className="sweep rounded-full bg-blue-600 px-9 py-4 text-sm font-black tracking-wide shadow-[0_0_50px_rgba(47,107,255,.55)] transition hover:scale-105"
            >
              SEE THE NUMBERS
            </a>

            <a
              href="#media"
              className="rounded-full border border-white/30 px-9 py-4 text-sm font-black tracking-wide backdrop-blur transition hover:bg-white hover:text-black"
            >
              WATCH
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 h-12 w-px -translate-x-1/2 overflow-hidden bg-white/10">
          <div className="h-1/2 w-full animate-bounce bg-blue-400" />
        </div>
      </section>

      {/* =====================================================
          MARQUEE
      ===================================================== */}

      <div className="overflow-hidden border-y border-white/10 bg-blue-600 py-4">
        <div
          className={`${display.className} marquee flex w-max gap-10 whitespace-nowrap text-3xl tracking-wide`}
        >
          {Array.from({ length: 2 }).flatMap((_, i) =>
            [
              "264",
              "656 SIXES",
              "5 IPL TITLES",
              "T20 WORLD CUP 2024",
              "51 HUNDREDS",
            ].map((t) => (
              <span
                key={`${i}-${t}`}
                className="flex items-center gap-10"
              >
                {t}

                <span className="text-black/40">
                  ///
                </span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section
        id="stats"
        className="relative bg-black px-5 py-28 lg:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,.18),transparent_55%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group bg-black p-8 transition duration-500 hover:bg-blue-950/60 lg:p-10"
            >
              <CountUp
                to={s.value}
                className={`${display.className} block text-7xl transition duration-500 group-hover:scale-105 group-hover:text-blue-400 lg:text-8xl`}
              />

              <p className="mt-3 text-sm font-bold text-white/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <p className="relative mx-auto mt-5 max-w-7xl text-xs text-white/30">
          International career totals.
        </p>
      </section>

      {/* =====================================================
          CAREER
      ===================================================== */}

      <section
        id="career"
        className="bg-[#02040a] py-28"
      >
        <div className="mx-auto flex max-w-7xl items-end justify-between px-5 lg:px-8">
          <Reveal>
            <h2
              className={`${display.className} text-6xl leading-[0.9] sm:text-8xl`}
            >
              MOMENTS THAT
              <br />
              <span className="outline">
                MOVED INDIA
              </span>
            </h2>
          </Reveal>

          <div className="hidden gap-3 sm:flex">
            {[-1, 1].map((d) => (
              <button
                key={d}
                onClick={() => slide(d)}
                aria-label={
                  d < 0 ? "Previous" : "Next"
                }
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 text-xl transition hover:bg-white hover:text-black"
              >
                {d < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={railRef}
          className="rail mt-14 flex gap-5 overflow-x-auto px-5 pb-4 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {moments.map((m) => (
            <article
              key={m.year}
              className="group relative h-[28rem] w-[80vw] max-w-[26rem] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-black"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-t ${m.hue} via-transparent to-transparent transition duration-700 group-hover:scale-125`}
              />

              <div
                className={`${display.className} outline absolute -right-4 -top-2 text-[9rem] leading-none opacity-30 transition duration-700 group-hover:-translate-y-3 group-hover:opacity-60`}
              >
                {m.year.slice(2)}
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(to_top,#000_5%,transparent_60%)]" />

              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-sm font-bold text-blue-400">
                  {m.year} · {m.tag}
                </p>

                <h3
                  className={`${display.className} mt-1 text-5xl transition duration-500 group-hover:translate-x-2`}
                >
                  {m.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          RECORDS
      ===================================================== */}

      <section
        id="records"
        className="relative overflow-hidden bg-black px-5 py-28 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2
              className={`${display.className} text-6xl leading-[0.9] sm:text-8xl`}
            >
              BUILT FOR THE
              <br />
              <span className="text-blue-500">
                RECORD BOOKS
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <div className="group relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-700/40 via-blue-950/40 to-black p-10 sm:p-14">
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl transition duration-700 group-hover:scale-150" />

              <p className="relative text-sm font-bold text-white/60">
                Highest ODI score
              </p>

              <CountUp
                to="264"
                className={`${display.className} relative block text-[9rem] leading-none sm:text-[16rem]`}
              />
            </div>

            <div className="flex flex-col gap-5">
              {[
                ["264", "2014"],
                ["209", "ODI double"],
                ["208*", "ODI double"],
              ].map(([v, l]) => (
                <div
                  key={v}
                  className="group flex flex-1 items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-6 transition duration-300 hover:border-blue-500/60 hover:bg-blue-600/10"
                >
                  <span
                    className={`${display.className} text-6xl transition group-hover:text-blue-400`}
                  >
                    {v}
                  </span>

                  <span className="text-sm font-bold text-white/45">
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-3">
            {[
              ["5", "World Cup hundreds, 2019"],
              ["5×", "IPL titles as MI captain"],
              ["2024", "T20 World Cup champions"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="rounded-3xl border border-white/10 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50"
              >
                <div
                  className={`${display.className} text-5xl`}
                >
                  {v}
                </div>

                <p className="mt-2 text-sm text-white/45">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MEDIA
      ===================================================== */}

      <section
        id="media"
        className="bg-[#02040a] px-5 py-28 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2
              className={`${display.className} text-6xl leading-[0.9] sm:text-8xl`}
            >
              PRESS{" "}
              <span className="outline-blue">
                PLAY
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {media.map((t, i) => (
              <a
                key={t}
                href="/videos"
                className={`group relative flex min-h-[26rem] items-end overflow-hidden rounded-3xl border border-white/10 p-8 ${
                  i === 1
                    ? "md:-translate-y-8"
                    : ""
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(47,107,255,.45),transparent_60%)] transition duration-700 group-hover:scale-150" />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute left-1/2 top-[38%] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur transition duration-500 group-hover:scale-125 group-hover:bg-blue-600 group-hover:shadow-[0_0_60px_rgba(47,107,255,.8)]">
                  ▶
                </div>

                <h3
                  className={`${display.className} relative text-5xl`}
                >
                  {t}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-blue-600 px-5 py-32 text-center lg:px-8">
        <div
          className={`${display.className} pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[40vw] leading-none text-black/10`}
          aria-hidden
        >
          45
        </div>

        <div className="relative">
          <h2
            className={`${display.className} text-6xl leading-[0.9] sm:text-9xl`}
          >
            GO DEEPER.
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {explore.map(([t, href]) => (
              <a
                key={t}
                href={href}
                className="rounded-full bg-black px-8 py-4 text-sm font-black tracking-wide transition hover:scale-105 hover:bg-white hover:text-black"
              >
                {t.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-black px-5 py-14 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div
              className={`${display.className} text-3xl`}
            >
              ROHIT
              <span className="text-blue-500">
                SHARMA
              </span>
            </div>

            <p className="mt-3 text-xs text-white/35">
              Independent fan-made site. © 2026
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/50">
            {[
              ["Profile", "/profile"],
              ["Career", "/career"],
              ["Records", "/records"],
              ["Gallery", "/gallery"],
              ["Videos", "/videos"],
              ["News", "/news"],
              ["Contact", "/contact"],
              ["Privacy", "/privacy-policy"],
            ].map(([t, h]) => (
              <a
                key={t}
                href={h}
                className="transition hover:text-white"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
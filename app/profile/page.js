"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Anton } from "next/font/google";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
});

/* -------------------------------------------------
   NAVIGATION
------------------------------------------------- */

const NAV = [
  ["Home", "/"],
  ["Career", "/career"],
  ["Stats", "/stats"],
  ["Records", "/records"],
  ["Captaincy", "/captaincy"],
  ["IPL", "/ipl"],
  ["World Cups", "/world-cups"],
  ["Gallery", "/gallery"],
  ["News", "/news"],
];

const FOOT = [
  ["Profile", "/profile"],
  ["Career", "/career"],
  ["Stats", "/stats"],
  ["Records", "/records"],
  ["Captaincy", "/captaincy"],
  ["IPL", "/ipl"],
  ["World Cups", "/world-cups"],
  ["Awards", "/awards"],
  ["Gallery", "/gallery"],
  ["Videos", "/videos"],
  ["News", "/news"],
  ["Contact", "/contact"],
  ["Privacy", "/privacy-policy"],
];

/* -------------------------------------------------
   PROFILE DATA
------------------------------------------------- */

const profileData = [
  ["Full name", "Rohit Sharma"],
  ["Nickname", "Hitman"],
  ["Role", "Batter"],
  ["Born", "30 April 1987"],
  ["Birthplace", "Nagpur, Maharashtra"],
  ["Batting", "Right-hand"],
  ["Bowling", "Right-arm off break"],
  ["Jersey", "45"],
];

const careerStats = [
  ["Test", "67", "4,301", "212"],
  ["ODI", "291", "12,120", "264"],
  ["T20I", "159", "4,231", "121"],
  ["IPL", "281", "7,329", "109"],
];

const careerPath = [
  {
    year: "2007",
    title: "International Arrival",
    text: "Announced himself at the 2007 World T20 with an unbeaten half-century against South Africa.",
  },
  {
    year: "2008–12",
    title: "Finding His Place",
    text: "Flashes of brilliance and inconsistency; the IPL kept him in the reckoning.",
  },
  {
    year: "2013",
    title: "The Opening Transformation",
    text: "Moved to the top of the ODI order, starred in the Champions Trophy win, then made 209 against Australia.",
  },
  {
    year: "2013–19",
    title: "Record-Breaking Batting",
    text: "Three ODI double-centuries including the world-record 264, then 648 runs and five centuries at the 2019 World Cup.",
  },
  {
    year: "2022–24",
    title: "India Captain",
    text: "Became India's full-time white-ball captain and led India to the 2024 T20 World Cup title.",
  },
  {
    year: "2025",
    title: "Another ICC Triumph",
    text: "Player of the Match in the Champions Trophy final as India claimed another ICC title.",
  },
];

const milestones = [
  {
    year: "2007",
    title: "World T20 breakthrough",
    text: "Unbeaten fifty against South Africa.",
  },
  {
    year: "2013",
    title: "Test debut",
    text: "177 against West Indies at Eden Gardens, then an unbeaten 111.",
  },
  {
    year: "2013",
    title: "First ODI double-century",
    text: "209 against Australia in Bengaluru.",
  },
  {
    year: "2014",
    title: "264 at Eden Gardens",
    text: "One of ODI cricket's most extraordinary scores, against Sri Lanka.",
  },
  {
    year: "2019",
    title: "World Cup excellence",
    text: "648 runs from nine matches and five centuries.",
  },
  {
    year: "2024",
    title: "T20 World Cup champion",
    text: "Led India to the title, then retired from T20Is.",
  },
  {
    year: "2025",
    title: "Champions Trophy final",
    text: "Top-scored in the final and was Player of the Match.",
  },
  {
    year: "2025",
    title: "Test retirement",
    text: "Announced his retirement from Test cricket in April 2025.",
  },
];

const identity = [
  [
    "Elegant batting",
    "Timing, balance and effortless strokeplay.",
  ],
  [
    "The Hitman",
    "Extraordinary six-hitting and huge scores from controlled starts.",
  ],
  [
    "Leadership",
    "Five IPL titles at Mumbai Indians to India's 2024 T20 World Cup.",
  ],
];

const qualities = [
  "Calm under pressure",
  "Tactical thinking",
  "Leading from the front",
  "Trust in players",
  "Big-match mindset",
  "Team-first approach",
];

const titles = [
  "2013",
  "2015",
  "2017",
  "2019",
  "2020",
];

/* -------------------------------------------------
   SCROLL REVEAL
------------------------------------------------- */

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, seen];
}

function Reveal({ children, className = "" }) {
  const [ref, seen] = useInView();

  return (
    <div
      ref={ref}
      className={`reveal ${
        seen ? "reveal-visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------
   NUMBER ANIMATION
------------------------------------------------- */

function Num({ value, className = "" }) {
  const [ref, seen] = useInView();

  const original = String(value);
  const numericPart = original.replace(
    /[^0-9]/g,
    ""
  );

  const isNumber = numericPart.length > 0;

  const [text, setText] = useState(
    isNumber ? "0" : original
  );

  useEffect(() => {
    if (!seen || !isNumber) return;

    const target = Number(numericPart);

    if (!Number.isFinite(target)) {
      setText(original);
      return;
    }

    const start = performance.now();
    let frame;

    const animate = (time) => {
      const progress = Math.min(
        (time - start) / 1000,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 4);

      const current = Math.round(
        target * eased
      );

      let output = String(current);

      if (original.includes(",")) {
        output = current.toLocaleString("en-US");
      }

      if (original.includes("×")) {
        output += "×";
      }

      setText(output);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [
    seen,
    isNumber,
    numericPart,
    original,
  ]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

/* -------------------------------------------------
   TITLE
------------------------------------------------- */

function Title({ children }) {
  return (
    <Reveal>
      <h2
        className={`${display.className} text-6xl leading-[0.9] sm:text-8xl`}
      >
        {children}
      </h2>
    </Reveal>
  );
}

/* -------------------------------------------------
   NAVIGATION
------------------------------------------------- */

function Navigation() {
  const [scrolled, setScrolled] =
    useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          className={`${display.className} text-2xl tracking-wide`}
        >
          ROHIT
          <span className="text-blue-500">
            SHARMA
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className={`text-sm font-bold transition ${
                label === "Profile"
                  ? "text-blue-400"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            setOpen((value) => !value)
          }
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-xl lg:hidden"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 border-t border-white/10 bg-black px-6 pb-8 pt-6 lg:hidden">
          {NAV.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className={`${display.className} text-3xl transition ${
                label === "Profile"
                  ? "text-blue-400"
                  : "text-white hover:text-blue-400"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

/* -------------------------------------------------
   HERO
------------------------------------------------- */

function Hero() {
  const [scrollY, setScrollY] =
    useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(
        Math.min(window.scrollY, 700)
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <section className="relative flex min-h-[82vh] items-end overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(47,107,255,.42),transparent_52%),linear-gradient(180deg,#02040a,#06132f_60%,#000)]" />

      <div className="absolute -left-20 top-0 h-[120%] w-40 rotate-[18deg] bg-gradient-to-b from-blue-500/20 to-transparent blur-3xl" />

      <div className="absolute right-[12%] top-[-20%] h-[130%] w-52 -rotate-[18deg] bg-gradient-to-b from-blue-300/15 to-transparent blur-3xl" />

      <div
        className={`${display.className} pointer-events-none absolute right-[-3%] top-[8%] select-none text-[42vw] leading-none text-transparent opacity-60`}
        style={{
          WebkitTextStroke:
            "2px rgba(47,107,255,.65)",
          transform: `translateY(${
            -scrollY * 0.2
          }px)`,
        }}
        aria-hidden
      >
        45
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-blue-400">
          THE PLAYER
        </div>

        <h1
          className={`${display.className} leading-[0.82]`}
          style={{
            transform: `translateY(${
              -scrollY * 0.08
            }px)`,
          }}
        >
          <span
            className="hero-line block text-[22vw] lg:text-[13rem]"
            style={{
              animationDelay: "0.1s",
            }}
          >
            ROHIT
          </span>

          <span
            className="hero-line block text-[22vw] text-transparent lg:text-[13rem]"
            style={{
              WebkitTextStroke:
                "2px rgba(255,255,255,.9)",
              animationDelay: "0.25s",
            }}
          >
            HITMAN
          </span>
        </h1>
      </div>
    </section>
  );
}

/* -------------------------------------------------
   CTA
------------------------------------------------- */

function Cta({
  title,
  links = [],
}) {
  return (
    <section className="relative overflow-hidden bg-blue-600 px-5 py-32 text-center lg:px-8">
      <div
        className={`${display.className} pointer-events-none absolute inset-0 flex items-center justify-center text-[40vw] leading-none text-black/10`}
        aria-hidden
      >
        45
      </div>

      <div className="relative">
        <h2
          className={`${display.className} text-6xl leading-[0.9] sm:text-9xl`}
        >
          {title}
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map(
            ([label, href], index) => (
              <Link
                key={`${label}-${href}`}
                href={href}
                className={`rounded-full px-8 py-4 text-sm font-black tracking-wide transition duration-300 hover:scale-105 ${
                  index === 0
                    ? "bg-white text-black"
                    : "bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                {label.toUpperCase()}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------
   FOOTER
------------------------------------------------- */

function Footer() {
  return (
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

          <p className="mt-3 max-w-md text-xs leading-6 text-white/35">
            Independent fan-made site, not
            affiliated with Rohit Sharma, the BCCI,
            the ICC, Mumbai Indians or any other
            cricket organisation. ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex max-w-xl flex-wrap gap-x-7 gap-y-3 text-sm text-white/50">
          {FOOT.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="transition hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------
   PROFILE PAGE
------------------------------------------------- */

export default function ProfilePage() {
  const [p, setP] = useState(3);
  const step = careerPath[p];

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
            opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1),
            transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-line {
          opacity: 0;
          transform: translateY(60px);
          animation: heroReveal 1s
            cubic-bezier(0.2, 0.8, 0.2, 1)
            forwards;
        }

        @keyframes heroReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .swap {
          animation: swapIn 0.5s
            cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        @keyframes swapIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .outline {
          color: transparent;
          -webkit-text-stroke: 2px
            rgba(255, 255, 255, 0.9);
        }

        .outline-blue {
          color: transparent;
          -webkit-text-stroke: 2px #2f6bff;
        }

        .rail {
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
        }

        .rail::-webkit-scrollbar {
          display: none;
        }

        .sweep {
          position: relative;
          overflow: hidden;
        }

        .sweep::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 65%
          );
          transform: translateX(-120%);
          transition: transform 0.7s ease;
        }

        .sweep:hover::after {
          transform: translateX(120%);
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .hero-line,
          .swap {
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

      <Navigation />

      <Hero />

      {/* AT A GLANCE */}
      <section className="bg-blue-600">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {profileData.map(([label, value]) => (
            <div
              key={label}
              className="border-b border-white/15 px-6 py-6 odd:border-r lg:border-r lg:[&:nth-child(4n)]:border-r-0"
            >
              <p className="text-xs font-bold text-white/65">
                {label}
              </p>

              <p
                className={`${display.className} mt-1 text-3xl`}
              >
                {value.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SNAPSHOT */}
      <section className="relative bg-black px-5 py-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,.18),transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Title>
            THE{" "}
            <span className="text-blue-500">
              NUMBERS
            </span>
          </Title>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {careerStats.map(
              ([format, matches, runs, highest]) => (
                <Reveal key={format}>
                  <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-400 hover:bg-blue-600/10">
                    <div
                      className={`${display.className} outline absolute -right-2 -top-4 text-[7rem] leading-none opacity-20 transition duration-500 group-hover:opacity-50`}
                    >
                      {format}
                    </div>

                    <p className="relative text-sm font-bold text-blue-300">
                      {format}
                    </p>

                    <Num
                      value={runs}
                      className={`${display.className} relative mt-6 block text-7xl`}
                    />

                    <p className="relative text-xs text-white/45">
                      Runs
                    </p>

                    <div className="relative mt-5 flex gap-6 text-sm">
                      <div>
                        <p className="font-black">
                          {matches}
                        </p>

                        <p className="text-xs text-white/40">
                          Matches
                        </p>
                      </div>

                      <div>
                        <p className="font-black">
                          {highest}
                        </p>

                        <p className="text-xs text-white/40">
                          Highest
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/stats"
              className="sweep rounded-full bg-blue-600 px-8 py-4 text-sm font-black tracking-wide shadow-[0_0_40px_rgba(47,107,255,.5)] transition hover:scale-105"
            >
              FULL STATISTICS
            </Link>
          </div>
        </div>
      </section>

      {/* IDENTITY */}
      <section className="bg-[#02040a] px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            MORE THAN{" "}
            <span className="outline">
              ELEGANCE
            </span>
          </Title>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {identity.map(([title, description]) => (
              <Reveal key={title}>
                <div className="group relative min-h-[18rem] overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-700/40 via-blue-950/30 to-black p-8 transition duration-500 hover:border-blue-400">
                  <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-blue-400/25 blur-3xl transition duration-700 group-hover:scale-150" />

                  <h3
                    className={`${display.className} relative mt-24 text-5xl transition duration-500 group-hover:translate-x-2`}
                  >
                    {title.toUpperCase()}
                  </h3>

                  <p className="relative mt-2 text-sm text-white/60">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER PATH */}
      <section className="bg-black px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            FROM PROMISE TO{" "}
            <span className="outline-blue">
              POWER
            </span>
          </Title>

          <div className="rail mt-12 flex gap-2 overflow-x-auto pb-3">
            {careerPath.map((item, index) => (
              <button
                key={`${item.year}-${index}`}
                type="button"
                onClick={() => setP(index)}
                className={`${display.className} shrink-0 rounded-full px-7 py-3 text-2xl tracking-wide transition duration-300 ${
                  p === index
                    ? "bg-blue-600 shadow-[0_0_40px_rgba(47,107,255,.6)]"
                    : "border border-white/20 text-white/55 hover:border-white hover:text-white"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>

          <div
            key={p}
            className="swap relative mt-6 overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-700/30 via-blue-950/20 to-black p-8 sm:p-14"
          >
            <div
              className={`${display.className} outline absolute -right-4 -top-8 text-[12rem] leading-none opacity-20 sm:text-[20rem]`}
            >
              0{p + 1}
            </div>

            <h3
              className={`${display.className} relative max-w-3xl text-5xl sm:text-8xl`}
            >
              {step.title.toUpperCase()}
            </h3>

            <p className="relative mt-6 max-w-xl text-lg leading-8 text-white/70">
              {step.text}
            </p>
          </div>
        </div>
      </section>

      {/* LANDMARKS */}
      <section className="bg-[#02040a] py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Title>
            LANDMARK{" "}
            <span className="text-blue-500">
              MOMENTS
            </span>
          </Title>
        </div>

        <div className="rail mt-14 flex gap-5 overflow-x-auto px-5 pb-4 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {milestones.map((milestone, index) => (
            <Reveal key={`${milestone.year}-${index}`}>
              <article className="group relative h-[24rem] w-[75vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-blue-700/40 via-blue-950/30 to-black transition duration-500 hover:border-blue-400">
                <div
                  className={`${display.className} outline absolute -left-2 top-2 text-[9rem] leading-none opacity-25 transition duration-700 group-hover:translate-x-3 group-hover:opacity-55`}
                >
                  {milestone.year.slice(2)}
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-7 pt-24">
                  <p className="text-sm font-bold text-blue-300">
                    {milestone.year}
                  </p>

                  <h3
                    className={`${display.className} text-3xl leading-tight`}
                  >
                    {milestone.title.toUpperCase()}
                  </h3>

                  <p className="mt-2 text-sm text-white/55">
                    {milestone.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* IPL + LEADERSHIP */}
      <section className="bg-black px-5 py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-blue-500/40 bg-gradient-to-br from-blue-600/40 via-blue-950/30 to-black p-8 sm:p-12">
              <h2
                className={`${display.className} text-6xl`}
              >
                MUMBAI
              </h2>

              <p className="mt-2 text-sm text-white/60">
                Deccan Chargers first, then Mumbai
                Indians. Five titles as MI captain.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {titles.map((year) => (
                  <span
                    key={year}
                    className={`${display.className} rounded-full border border-blue-400/50 bg-blue-500/10 px-5 py-2 text-2xl`}
                  >
                    {year} 🏆
                  </span>
                ))}
              </div>

              <Link
                href="/ipl"
                className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black tracking-wide text-black transition hover:scale-105"
              >
                IPL CAREER
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
              <h2
                className={`${display.className} text-6xl`}
              >
                CAPTAINCY
              </h2>

              <p className="mt-2 text-sm text-white/60">
                From Mumbai Indians to India's 2023
                World Cup run and the 2024 T20 World
                Cup title.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {qualities.map((quality) => (
                  <span
                    key={quality}
                    className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/70 transition hover:border-blue-400 hover:text-white"
                  >
                    {quality}
                  </span>
                ))}
              </div>

              <Link
                href="/captaincy"
                className="mt-8 inline-flex rounded-full border border-white/30 px-8 py-4 text-sm font-black tracking-wide transition hover:bg-white hover:text-black"
              >
                CAPTAINCY
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <Cta
        title="KEEP EXPLORING."
        links={[
          ["Career", "/career"],
          ["Stats", "/stats"],
          ["Records", "/records"],
          ["Captaincy", "/captaincy"],
          ["IPL", "/ipl"],
          ["Gallery", "/gallery"],
        ]}
      />

      <Footer />
    </main>
  );
}
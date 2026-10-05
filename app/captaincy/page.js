"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
});

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
   DATA
------------------------------------------------- */

const milestones = [
  {
    year: "2013",
    title: "Mumbai Indians Leadership",
    text: "Took on a major leadership role with Mumbai Indians, shaping the team with a calm, tactical approach.",
  },
  {
    year: "2013",
    title: "First IPL Title as Captain",
    text: "Mumbai Indians won their first IPL title, the start of one of the most successful captaincy eras in IPL history.",
  },
  {
    year: "2015",
    title: "Second IPL Triumph",
    text: "Another IPL championship, establishing his reputation as an elite T20 captain.",
  },
  {
    year: "2017",
    title: "Third IPL Title",
    text: "Another trophy, with his captaincy a defining part of the team's identity.",
  },
  {
    year: "2019",
    title: "Fourth IPL Championship",
    text: "Guided Mumbai Indians to another title in a closely contested season.",
  },
  {
    year: "2020",
    title: "Back-to-Back Champions",
    text: "Mumbai Indians defended their crown, giving Rohit his fifth IPL title as captain.",
  },
  {
    year: "2021",
    title: "India's White-Ball Leadership",
    text: "Part of India's leadership group across white-ball cricket before becoming full-time captain across formats in 2022.",
  },
  {
    year: "2022",
    title: "India's Full-Time Captain",
    text: "Became India's full-time captain across the major international formats.",
  },
  {
    year: "2023",
    title: "ODI World Cup Captain",
    text: "Led India at the 2023 ODI World Cup with aggressive batting, taking the side to the final.",
  },
  {
    year: "2024",
    title: "T20 World Cup Champion",
    text: "Captained India to the ICC Men's T20 World Cup title.",
  },
  {
    year: "2025",
    title: "Champions Trophy Champion",
    text: "Captained India to the ICC Men's Champions Trophy title.",
  },
];

const qualities = [
  [
    "Calm under pressure",
    "Composed decisions in high-pressure moments.",
  ],
  [
    "Tactical thinking",
    "Field placements, bowling changes and match-ups.",
  ],
  [
    "Leading from the front",
    "Sets the tone with aggressive starts as an opener.",
  ],
  [
    "Trust in players",
    "Backs players and gives them confidence to perform.",
  ],
  [
    "Big-match mindset",
    "Major IPL finals and international tournaments.",
  ],
  [
    "Team-first approach",
    "Builds a strong collective, not one individual.",
  ],
];

const titles = ["2013", "2015", "2017", "2019", "2020"];

/* -------------------------------------------------
   HOOK
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

/* -------------------------------------------------
   REVEAL
------------------------------------------------- */

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
   NUMBER
------------------------------------------------- */

function Num({ value, className = "" }) {
  const [ref, seen] = useInView();

  const original = String(value);
  const numeric = original.replace(/[^0-9]/g, "");
  const isNumber = numeric.length > 0;

  const [displayValue, setDisplayValue] = useState(
    isNumber ? "0" : original
  );

  useEffect(() => {
    if (!seen || !isNumber) return;

    const target = Number(numeric);

    if (!Number.isFinite(target)) {
      setDisplayValue(original);
      return;
    }

    const start = performance.now();
    let animationFrame;

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

      if (original.includes("×")) {
        setDisplayValue(`${current}×`);
      } else {
        setDisplayValue(String(current));
      }

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () =>
      cancelAnimationFrame(animationFrame);
  }, [seen, isNumber, numeric, original]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
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
  const [scrolled, setScrolled] = useState(false);
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

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
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
                label === "Captaincy"
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
                label === "Captaincy"
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
  const [scrollY, setScrollY] = useState(0);

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
        <div
          className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-blue-400"
          style={{
            opacity: Math.max(
              0,
              1 - scrollY / 300
            ),
          }}
        >
          LEADERSHIP
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
            CAPTAIN
          </span>

          <span
            className="hero-line block text-[22vw] text-transparent lg:text-[13rem]"
            style={{
              WebkitTextStroke:
                "2px rgba(255,255,255,.9)",
              animationDelay: "0.25s",
            }}
          >
            COOL
          </span>
        </h1>
      </div>
    </section>
  );
}

/* -------------------------------------------------
   CTA
------------------------------------------------- */

function Cta({ title, links = [] }) {
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
          {links.map(([label, href], index) => (
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
          ))}
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
            Independent fan-made site, not affiliated
            with Rohit Sharma, the BCCI, the ICC,
            Mumbai Indians or any other cricket
            organisation. ©{" "}
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
   PAGE
------------------------------------------------- */

export default function CaptaincyPage() {
  const [i, setI] = useState(1);
  const m = milestones[i];

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-blue-500/40">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .reveal {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
            transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-line {
          opacity: 0;
          transform: translateY(55px);
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

        .rail {
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
        }

        .rail::-webkit-scrollbar {
          display: none;
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

        .outline-blue {
          color: transparent;
          -webkit-text-stroke: 2px #2f6bff;
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

      {/* NUMBERS */}
      <section className="bg-blue-600">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {[
            ["5×", "IPL titles as MI captain"],
            ["2024", "T20 World Cup"],
            ["2025", "Champions Trophy"],
            ["2023", "World Cup finalists"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="border-white/20 px-6 py-8 odd:border-r lg:border-r lg:last:border-r-0"
            >
              <Num
                value={value}
                className={`${display.className} block text-6xl sm:text-7xl`}
              />

              <p className="mt-1 text-sm font-bold text-white/75">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP STYLE */}
      <section className="relative bg-black px-5 py-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,.18),transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Title>
            HOW HE{" "}
            <span className="text-blue-500">
              LEADS
            </span>
          </Title>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {qualities.map(([title, description]) => (
              <Reveal key={title}>
                <div className="group relative overflow-hidden bg-black p-8 transition duration-500 hover:bg-blue-950/60 lg:p-10">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl transition duration-700 group-hover:scale-150" />

                  <h3
                    className={`${display.className} relative text-4xl transition duration-500 group-hover:translate-x-2 group-hover:text-blue-400`}
                  >
                    {title.toUpperCase()}
                  </h3>

                  <p className="relative mt-3 text-sm leading-6 text-white/50">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-[#02040a] px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            THE{" "}
            <span className="outline-blue">
              JOURNEY
            </span>
          </Title>

          <div className="rail mt-12 flex gap-2 overflow-x-auto pb-3">
            {milestones.map((item, index) => (
              <button
                key={`${item.year}-${index}`}
                type="button"
                onClick={() => setI(index)}
                className={`${display.className} shrink-0 rounded-full px-7 py-3 text-2xl tracking-wide transition duration-300 ${
                  i === index
                    ? "bg-blue-600 shadow-[0_0_40px_rgba(47,107,255,.6)]"
                    : "border border-white/20 text-white/55 hover:border-white hover:text-white"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>

          <div
            key={i}
            className="swap relative mt-6 overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-700/30 via-blue-950/20 to-black p-8 sm:p-14"
          >
            <div
              className={`${display.className} pointer-events-none absolute -right-4 -top-8 text-[12rem] leading-none text-transparent opacity-20 sm:text-[20rem]`}
              style={{
                WebkitTextStroke:
                  "2px rgba(255,255,255,.8)",
              }}
            >
              {m.year}
            </div>

            <h3
              className={`${display.className} relative max-w-3xl text-5xl sm:text-8xl`}
            >
              {m.title.toUpperCase()}
            </h3>

            <p className="relative mt-6 max-w-xl text-lg leading-8 text-white/70">
              {m.text}
            </p>
          </div>
        </div>
      </section>

      {/* FIVE IPL TITLES */}
      <section className="bg-black px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            THE FIVE-TIME{" "}
            <span className="text-blue-500">
              CHAMPION
            </span>
          </Title>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {titles.map((year) => (
              <Reveal key={year}>
                <div className="group relative flex h-64 items-end overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-700/50 via-blue-950/40 to-black p-6 transition duration-500 hover:-translate-y-2 hover:border-blue-400">
                  <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-400/30 blur-3xl transition duration-700 group-hover:scale-150" />

                  <span className="absolute right-5 top-5 text-3xl transition duration-500 group-hover:scale-125">
                    🏆
                  </span>

                  <div className="relative">
                    <p
                      className={`${display.className} text-6xl`}
                    >
                      {year}
                    </p>

                    <p className="text-xs font-bold text-white/60">
                      Mumbai Indians
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <Cta
        title="MORE FROM THE CAPTAIN."
        links={[
          ["IPL", "/ipl"],
          ["World Cups", "/world-cups"],
          ["Records", "/records"],
          ["Awards", "/awards"],
        ]}
      />

      <Footer />
    </main>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";

export const display = Anton({
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

/* ---------- hooks / small components ---------- */

export function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );

    io.observe(el);

    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen];
}

export function Reveal({ children, className = "" }) {
  const [ref, seen] = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "reveal-on" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function Num({ value, className = "" }) {
  const v = String(value);
  const [ref, seen] = useInView();
  const isInt = /^[0-9,]+$/.test(v);

  const [text, setText] = useState(isInt ? "0" : v);

  useEffect(() => {
    if (!isInt || !seen) return;

    const n = parseInt(v.replace(/,/g, ""), 10);
    const t0 = performance.now();

    let raf;

    const tick = (time) => {
      const p = Math.min((time - t0) / 1200, 1);

      const x = Math.round(
        n * (1 - Math.pow(1 - p, 4))
      );

      setText(
        v.includes(",")
          ? x.toLocaleString("en-US")
          : String(x)
      );

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [seen, v, isInt]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

export function Title({ children }) {
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

/* ---------- global styles ---------- */

export function Styles() {
  return (
    <style jsx global>{`
      html {
        scroll-behavior: smooth;
      }

      body {
        background: #000;
      }

      .reveal {
        opacity: 0;
        transform: translateY(40px);
        transition:
          opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1),
          transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      .reveal-on {
        opacity: 1;
        transform: none;
      }

      .hero-in {
        opacity: 0;
        transform: translateY(60px) skewY(2deg);
        animation: heroIn 1s cubic-bezier(0.2, 0.8, 0.2, 1)
          forwards;
      }

      @keyframes heroIn {
        to {
          opacity: 1;
          transform: none;
        }
      }

      .outline {
        -webkit-text-stroke: 2px rgba(255, 255, 255, 0.9);
        color: transparent;
      }

      .outline-blue {
        -webkit-text-stroke: 2px #2f6bff;
        color: transparent;
      }

      .rail {
        scrollbar-width: none;
        scroll-snap-type: x mandatory;
      }

      .rail::-webkit-scrollbar {
        display: none;
      }

      .swap {
        animation: swap 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      @keyframes swap {
        from {
          opacity: 0;
          transform: translateY(18px);
        }

        to {
          opacity: 1;
          transform: none;
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
          rgba(255, 255, 255, 0.35) 50%,
          transparent 65%
        );
        transform: translateX(-120%);
        transition: transform 0.7s ease;
        pointer-events: none;
      }

      .sweep:hover::after {
        transform: translateX(120%);
      }

      :focus-visible {
        outline: 2px solid #5b8cff;
        outline-offset: 3px;
      }

      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto;
        }

        .hero-in,
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
  );
}

/* ---------- layout pieces ---------- */

export function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 40);
    };

    on();

    window.addEventListener("scroll", on, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", on);
    };
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-black/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          className={`${display.className} text-2xl tracking-wide`}
        >
          ROHIT
          <span className="text-blue-500">SHARMA</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV.map(([title, href]) => (
            <Link
              key={title}
              href={href}
              className={`text-sm font-bold transition hover:text-white ${
                title === active
                  ? "text-blue-400"
                  : "text-white/55"
              }`}
            >
              {title}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-lg lg:hidden"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 px-6 pb-8 pt-6 lg:hidden">
          {NAV.map(([title, href]) => (
            <Link
              key={title}
              href={href}
              onClick={() => setOpen(false)}
              className={`${display.className} text-3xl transition hover:text-blue-400 ${
                title === active
                  ? "text-blue-400"
                  : "text-white"
              }`}
            >
              {title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export function Hero({
  line1,
  line2,
  size = "lg:text-[13rem]",
  children,
}) {
  const [sy, setSy] = useState(0);

  useEffect(() => {
    const on = () => {
      setSy(Math.min(window.scrollY, 900));
    };

    window.addEventListener("scroll", on, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", on);
    };
  }, []);

  return (
    <section className="relative flex min-h-[80vh] items-end overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(47,107,255,.45),transparent_55%),linear-gradient(180deg,#02040a,#04102e_60%,#000)]" />

      <div className="absolute -top-40 left-[14%] h-[120%] w-44 rotate-[18deg] bg-gradient-to-b from-blue-400/25 to-transparent blur-2xl" />

      <div className="absolute -top-40 right-[18%] h-[120%] w-48 -rotate-[14deg] bg-gradient-to-b from-sky-300/20 to-transparent blur-3xl" />

      <div
        className={`${display.className} outline-blue pointer-events-none absolute right-[-3%] top-[10%] select-none text-[42vw] leading-none opacity-60`}
        style={{
          transform: `translateY(${-sy * 0.25}px)`,
        }}
        aria-hidden
      >
        45
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8">
        <h1
          className={`${display.className} leading-[0.85]`}
          style={{
            transform: `translateY(${-sy * 0.1}px)`,
          }}
        >
          <span
            className={`hero-in block text-[22vw] ${size}`}
            style={{
              animationDelay: "0.1s",
            }}
          >
            {line1}
          </span>

          <span
            className={`hero-in outline block text-[22vw] ${size}`}
            style={{
              animationDelay: "0.25s",
            }}
          >
            {line2}
          </span>
        </h1>

        {children}
      </div>
    </section>
  );
}

export function Cta({ title, links = [] }) {
  return (
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
          {title}
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map(([titleText, href], index) => (
            <Link
              key={`${titleText}-${href}`}
              href={href}
              className={`rounded-full px-8 py-4 text-sm font-black tracking-wide transition hover:scale-105 ${
                index === 0
                  ? "bg-white text-black"
                  : "bg-black hover:bg-white hover:text-black"
              }`}
            >
              {titleText.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
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
            Independent fan-made site, not affiliated with
            Rohit Sharma, the BCCI, the ICC, Mumbai Indians
            or any other cricket organisation. ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex max-w-xl flex-wrap gap-x-7 gap-y-3 text-sm text-white/50">
          {FOOT.map(([title, href]) => (
            <Link
              key={title}
              href={href}
              className="transition hover:text-white"
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function Page({ active, children }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-blue-500/40">
      <Styles />
      <Nav active={active} />
      {children}
      <Footer />
    </main>
  );
}

/* ---------- CAREER PAGE ---------- */

const CAREER_MILESTONES = [
  {
    year: "2007",
    title: "INTERNATIONAL DEBUT",
    description:
      "Rohit Sharma began his international career in 2007 and became part of India's emerging generation of white-ball talent.",
  },
  {
    year: "2011",
    title: "A TOUGH WORLD CUP MISS",
    description:
      "Despite his talent, Rohit was not selected in India's 2011 ODI World Cup squad.",
  },
  {
    year: "2013",
    title: "THE OPENING ERA",
    description:
      "Moving into the opening role became a defining transformation in Rohit's ODI career.",
  },
  {
    year: "2013",
    title: "TEST DEBUT",
    description:
      "Rohit made his Test debut against West Indies and announced himself with a century-level impact immediately.",
  },
  {
    year: "2013",
    title: "209 AGAINST AUSTRALIA",
    description:
      "Rohit's explosive ODI batting reached another level with his 209 against Australia in Bengaluru.",
  },
  {
    year: "2014",
    title: "264 — THE RECORD",
    description:
      "At Eden Gardens, Rohit produced a historic 264 against Sri Lanka, one of the most iconic ODI innings ever played.",
  },
  {
    year: "2017",
    title: "208* AGAINST SRI LANKA",
    description:
      "Rohit produced another double century in Mohali, finishing unbeaten on 208.",
  },
  {
    year: "2019",
    title: "WORLD CUP DOMINANCE",
    description:
      "Rohit scored 648 runs and five centuries during the 2019 ODI World Cup.",
  },
  {
    year: "2022",
    title: "INDIA CAPTAIN",
    description:
      "Rohit became India's full-time white-ball captain and took responsibility for a new phase of Indian cricket.",
  },
  {
    year: "2023",
    title: "WORLD CUP CAPTAIN",
    description:
      "Rohit led India through an outstanding 2023 ODI World Cup campaign.",
  },
  {
    year: "2024",
    title: "T20 WORLD CHAMPION",
    description:
      "As captain, Rohit led India to the 2024 T20 World Cup title.",
  },
  {
    year: "2025",
    title: "CHAMPIONS TROPHY",
    description:
      "Rohit played a key role in India's Champions Trophy triumph, including a match-winning performance in the final.",
  },
];

export default function CareerPage() {
  return (
    <Page active="Career">
      <Hero
        line1="ROHIT"
        line2="CAREER"
        size="lg:text-[12rem]"
      >
        <div className="mt-8 max-w-2xl">
          <p className="text-sm leading-7 text-white/60 sm:text-base">
            From an emerging international talent to one of
            cricket's defining modern batters and leaders.
          </p>
        </div>
      </Hero>

      {/* Career introduction */}
      <section className="relative border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <Reveal>
              <div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                  THE JOURNEY
                </span>

                <h2
                  className={`${display.className} mt-5 text-6xl leading-[0.88] sm:text-8xl`}
                >
                  BUILT
                  <br />
                  OVER
                  <br />
                  YEARS.
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="border-l border-white/10 pl-6 lg:pl-10">
                <p className="max-w-2xl text-lg leading-8 text-white/55 sm:text-xl">
                  Rohit Sharma's career has moved through
                  multiple phases — from early international
                  cricket and the IPL to becoming a major
                  opening batter, World Cup performer and
                  international captain.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 lg:block" />

        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36">
          <Reveal>
            <div className="mb-20 flex items-end justify-between gap-6">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                  CAREER TIMELINE
                </span>

                <h2
                  className={`${display.className} mt-4 text-6xl leading-none sm:text-8xl`}
                >
                  MILESTONES
                </h2>
              </div>

              <div className="hidden text-right text-xs uppercase tracking-[0.25em] text-white/30 sm:block">
                2007 — 2025
              </div>
            </div>
          </Reveal>

          <div className="space-y-0">
            {CAREER_MILESTONES.map(
              (item, index) => (
                <Reveal key={`${item.year}-${item.title}`}>
                  <article
                    className={`group relative border-t border-white/10 py-10 lg:grid lg:grid-cols-2 lg:gap-20 lg:py-16 ${
                      index % 2 === 1
                        ? "lg:text-right"
                        : ""
                    }`}
                  >
                    {/* Desktop centre marker */}
                    <div className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500 bg-black transition-transform duration-500 group-hover:scale-150 lg:block" />

                    <div
                      className={`${
                        index % 2 === 1
                          ? "lg:col-start-2"
                          : "lg:col-start-1"
                      }`}
                    >
                      <div
                        className={`${display.className} text-6xl leading-none text-blue-500 sm:text-8xl`}
                      >
                        {item.year}
                      </div>

                      <h3
                        className={`${display.className} mt-5 text-3xl leading-none sm:text-5xl`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base ${
                          index % 2 === 1
                            ? "lg:ml-auto"
                            : ""
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>

      {/* Signature moments */}
      <section className="relative border-t border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <Reveal>
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                  SIGNATURE MOMENTS
                </span>

                <h2
                  className={`${display.className} mt-4 text-6xl leading-[0.9] sm:text-8xl`}
                >
                  ICONIC
                  <br />
                  NUMBERS
                </h2>
              </div>

              <Link
                href="/records"
                className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm font-bold transition hover:border-blue-500 hover:bg-blue-500"
              >
                VIEW RECORDS
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["264", "ODI HIGH SCORE"],
              ["209", "ODI INNINGS"],
              ["208*", "UNBEATEN ODI DOUBLE"],
              ["648", "2019 WC RUNS"],
            ].map(([number, label]) => (
              <Reveal key={number}>
                <div className="group relative bg-[#050505] p-8 transition duration-500 hover:bg-blue-600 sm:p-10">
                  <div
                    className={`${display.className} text-6xl leading-none sm:text-7xl`}
                  >
                    <Num value={number} />
                  </div>

                  <div className="mt-5 text-[10px] font-black uppercase tracking-[0.25em] text-white/40 transition group-hover:text-white/70">
                    {label}
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Career phases */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <Title>THREE ERAS</Title>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "THE RISE",
                years: "2007 — 2012",
                text: "Early international cricket, IPL development and the search for a permanent role at the highest level.",
              },
              {
                number: "02",
                title: "THE HITMAN",
                years: "2013 — 2021",
                text: "Opening transformed Rohit's ODI career and produced some of the greatest limited-overs innings of his generation.",
              },
              {
                number: "03",
                title: "THE LEADER",
                years: "2022 — 2025",
                text: "Captaincy, major ICC campaigns and another World Cup title defined a new phase of his career.",
              },
            ].map((item) => (
              <Reveal key={item.number}>
                <div className="sweep group relative min-h-[330px] overflow-hidden border border-white/10 bg-white/[0.02] p-8 transition duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:bg-white/[0.04] sm:p-10">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-black tracking-[0.25em] text-blue-400">
                      {item.number}
                    </span>

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                      {item.years}
                    </span>
                  </div>

                  <div className="mt-24">
                    <h3
                      className={`${display.className} text-4xl leading-none sm:text-5xl`}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-white/40">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["RECORDS", "/records"],
                ["CAPTAINCY", "/captaincy"],
                ["IPL", "/ipl"],
                ["WORLD CUPS", "/world-cups"],
              ].map(([title, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative overflow-hidden border border-white/10 p-7 transition duration-500 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/35 transition group-hover:text-white/70">
                    EXPLORE
                  </span>

                  <h3
                    className={`${display.className} mt-8 text-3xl`}
                  >
                    {title}
                  </h3>

                  <span className="absolute bottom-7 right-7 text-xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Cta
        title="THE HITMAN ERA"
        links={[
          ["Explore Records", "/records"],
          ["Captaincy", "/captaincy"],
        ]}
      />
    </Page>
  );
}
"use client";

/* =========================================================
   LOCAL SITE CHROME
   No ../site-chrome dependency
========================================================= */

const display = {
  className: "font-black tracking-[-0.04em] uppercase",
};

function Navigation({ active = "" }) {
  const links = [
    ["Home", "/"],
    ["Profile", "/profile"],
    ["Career", "/career"],
    ["Records", "/records"],
    ["Stats", "/stats"],
    ["Captaincy", "/captaincy"],
    ["World Cups", "/world-cups"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a
          href="/"
          className="text-xl font-black tracking-[-0.04em] text-white"
        >
          ROHIT<span className="text-blue-500">45</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`text-xs font-black uppercase tracking-[0.12em] transition ${
                active === label
                  ? "text-blue-400"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="/profile"
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition hover:border-blue-400 hover:bg-blue-500/10"
        >
          45
        </a>
      </div>
    </header>
  );
}

function Page({ active = "", children }) {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white selection:bg-blue-500 selection:text-white">
      <Navigation active={active} />
      {children}
    </main>
  );
}

function Hero({ line1, line2 }) {
  return (
    <section className="relative overflow-hidden bg-black px-5 pb-24 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
      <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <p className="mb-6 text-xs font-black uppercase tracking-[0.35em] text-blue-400">
          ROHIT SHARMA • 45
        </p>

        <h1
          className={`${display.className} text-[18vw] leading-[0.78] sm:text-[15vw] lg:text-[12rem]`}
        >
          {line1}
          <br />
          <span className="text-blue-500">{line2}</span>
        </h1>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-blue-500 via-white/20 to-transparent" />
      </div>
    </section>
  );
}

function Cta({ title, links = [] }) {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 lg:px-8 lg:py-32">
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <h2
          className={`${display.className} text-6xl leading-none sm:text-8xl lg:text-[9rem]`}
        >
          {title}
        </h2>

        <div className="mt-10 flex flex-wrap gap-3">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-black uppercase tracking-wide text-white/70 transition hover:border-blue-400 hover:bg-blue-500 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Title({ children }) {
  return (
    <h2
      className={`${display.className} text-5xl leading-none sm:text-7xl lg:text-8xl`}
    >
      {children}
    </h2>
  );
}

function Num({ value, className = "" }) {
  return <span className={className}>{value}</span>;
}

/* =========================================================
   DATA
========================================================= */

const worldCups = [
  {
    year: "2007",
    format: "T20 World Cup",
    role: "Player",
    result: "Champions",
    text: "Part of India's inaugural T20 World Cup-winning campaign.",
    accent: true,
  },
  {
    year: "2011",
    format: "ODI World Cup",
    role: "Not selected",
    result: "India champions",
    text: "Not included in India's 2011 squad.",
  },
  {
    year: "2015",
    format: "ODI World Cup",
    role: "Player",
    result: "Semi-final",
    text: "India's opening batter in a key role.",
  },
  {
    year: "2019",
    format: "ODI World Cup",
    role: "Player",
    result: "Semi-final",
    text: "One of the greatest World Cup batting campaigns: five centuries.",
    accent: true,
  },
  {
    year: "2022",
    format: "T20 World Cup",
    role: "Captain",
    result: "Semi-final",
    text: "Led India at the T20 World Cup in Australia.",
  },
  {
    year: "2023",
    format: "ODI World Cup",
    role: "Captain",
    result: "Final",
    text: "Captained India through the league and knockouts to the final.",
  },
  {
    year: "2024",
    format: "T20 World Cup",
    role: "Captain",
    result: "Champions",
    text: "Led India to the title.",
    accent: true,
  },
];

const highlights = [
  ["5", "World Cup centuries", "All at the 2019 ODI World Cup."],
  ["648", "Runs in 2019", "At an average of 81."],
  ["2024", "World champion", "Captained India to the T20 World Cup."],
];

/* =========================================================
   PAGE
========================================================= */

export default function WorldCupsPage() {
  return (
    <Page active="World Cups">
      <Hero line1="WORLD" line2="CUPS" />

      {/* =================================================
          HIGHLIGHTS
      ================================================= */}

      <section className="relative bg-black px-5 py-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,.2),transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Title>
            THE BIG <span className="text-blue-500">STAGE</span>
          </Title>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-3">
            {highlights.map(([n, t, d]) => (
              <div
                key={t}
                className="group bg-black p-8 transition duration-500 hover:bg-blue-950/60 lg:p-12"
              >
                <Num
                  value={n}
                  className={`${display.className} block text-8xl transition duration-500 group-hover:scale-105 group-hover:text-blue-400 lg:text-9xl`}
                />

                <p className="mt-3 font-bold">{t}</p>

                <p className="mt-1 text-sm text-white/40">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          2019 FEATURE
      ================================================= */}

      <section className="relative overflow-hidden bg-[#02040a] px-5 py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold text-blue-400">
              2019 ODI World Cup
            </p>

            <h2
              className={`${display.className} mt-2 text-[28vw] leading-[0.85] lg:text-[16rem]`}
            >
              <span className="outline-blue">FIVE.</span>
            </h2>

            <p className="mt-4 max-w-md text-white/60">
              Five centuries in a single ODI World Cup, one of the defining
              achievements of his career.
            </p>

            <a
              href="/records"
              className="sweep mt-8 inline-flex rounded-full bg-blue-600 px-8 py-4 text-sm font-black tracking-wide shadow-[0_0_40px_rgba(47,107,255,.5)] transition hover:scale-105"
            >
              EXPLORE RECORDS
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              ["5×", "Centuries"],
              ["648", "Runs"],
              ["81", "Average"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-700/40 to-black p-6 text-center transition hover:-translate-y-2 hover:border-blue-400"
              >
                <p
                  className={`${display.className} text-5xl sm:text-6xl`}
                >
                  {v}
                </p>

                <p className="mt-2 text-xs font-bold text-white/55">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          TIMELINE
      ================================================= */}

      <section className="bg-black py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Title>
            EVERY <span className="outline">TOURNAMENT</span>
          </Title>
        </div>

        <div className="rail mt-14 flex gap-5 overflow-x-auto px-5 pb-4 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {worldCups.map((w) => {
            const champ = w.result === "Champions";

            return (
              <article
                key={w.year + w.format}
                className={`group relative h-[28rem] w-[78vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-3xl border transition duration-500 hover:border-blue-400 ${
                  champ
                    ? "border-blue-400/60 bg-gradient-to-b from-blue-600/50 via-blue-950/40 to-black"
                    : w.accent
                    ? "border-blue-500/30 bg-gradient-to-b from-blue-700/30 to-black"
                    : "border-white/10 bg-gradient-to-b from-white/[0.06] to-black"
                }`}
              >
                <div
                  className={`${display.className} outline absolute -left-2 top-2 text-[10rem] leading-none opacity-25 transition duration-700 group-hover:translate-x-3 group-hover:opacity-55`}
                >
                  {w.year.slice(2)}
                </div>

                {champ && (
                  <span className="absolute right-6 top-6 text-4xl transition duration-500 group-hover:scale-125 group-hover:-rotate-6">
                    🏆
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-7 pt-28">
                  <p className="text-sm font-bold text-blue-300">
                    {w.year} · {w.format}
                  </p>

                  <h3
                    className={`${display.className} text-4xl`}
                  >
                    {w.result.toUpperCase()}
                  </h3>

                  <p className="mt-1 text-xs font-black text-white/50">
                    {w.role}
                  </p>

                  <p className="mt-2 text-sm text-white/60">
                    {w.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =================================================
          2024 FEATURE
      ================================================= */}

      <section className="relative overflow-hidden bg-blue-600 px-5 py-28 lg:px-8">
        <div
          className={`${display.className} pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[40vw] leading-none text-black/10`}
          aria-hidden
        >
          24
        </div>

        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold text-white/75">
            2024 T20 World Cup
          </p>

          <h2
            className={`${display.className} mt-2 text-7xl leading-[0.9] sm:text-9xl`}
          >
            WORLD CHAMPIONS.
          </h2>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-black px-7 py-3 text-sm font-black">
              INDIA · CHAMPIONS
            </span>

            <span className="rounded-full bg-black px-7 py-3 text-sm font-black">
              CAPTAIN · ROHIT SHARMA
            </span>

            <a
              href="/captaincy"
              className="rounded-full bg-white px-8 py-3 text-sm font-black text-black transition hover:scale-105"
            >
              CAPTAINCY
            </a>
          </div>
        </div>
      </section>

      {/* =================================================
          CTA
      ================================================= */}

      <Cta
        title="BEYOND THE WORLD CUP."
        links={[
          ["Career", "/career"],
          ["Stats", "/stats"],
          ["Records", "/records"],
          ["IPL", "/ipl"],
        ]}
      />
    </Page>
  );
}
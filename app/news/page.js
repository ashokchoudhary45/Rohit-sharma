"use client";

/* =========================================================
   ROHIT SHARMA — NEWS
   Standalone page
   No dependency on ../site-chrome
========================================================= */

const display = {
  className: "font-black tracking-[-0.04em] uppercase",
};

/* ---------- LOCAL CHROME ---------- */

function Navigation({ active = "" }) {
  const links = [
    ["Home", "/"],
    ["Profile", "/profile"],
    ["Career", "/career"],
    ["Records", "/records"],
    ["Stats", "/stats"],
    ["Captaincy", "/captaincy"],
    ["World Cups", "/world-cups"],
    ["News", "/news"],
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

        <nav className="hidden items-center gap-5 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`text-[11px] font-black uppercase tracking-[0.12em] transition ${
                active === label
                  ? "text-blue-400"
                  : "text-white/45 hover:text-white"
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

      <div className="absolute right-[-10%] top-[15%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />

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

function Title({ children }) {
  return (
    <h2
      className={`${display.className} text-5xl leading-none sm:text-7xl lg:text-8xl`}
    >
      {children}
    </h2>
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

/* ---------- DATA ---------- */

const newsSources = [
  {
    title: "Latest News",
    description: "Updates, interviews and match news.",
    link: "https://www.google.com/search?q=Rohit+Sharma+latest+news&tbm=nws",
    button: "Read now",
  },
  {
    title: "ESPNcricinfo",
    description: "News, match reports and analysis.",
    link: "https://www.espncricinfo.com/",
    button: "Visit",
  },
  {
    title: "Cricbuzz",
    description: "Live coverage and player stories.",
    link: "https://www.cricbuzz.com/",
    button: "Visit",
  },
  {
    title: "BCCI",
    description: "Official Indian cricket announcements.",
    link: "https://www.bcci.tv/",
    button: "Visit",
  },
  {
    title: "ICC",
    description: "Official tournament news and records.",
    link: "https://www.icc-cricket.com/",
    button: "Visit",
  },
];

const stories = [
  {
    year: "2024",
    title: "T20 World Cup Champion",
    text: "Led India to the T20 World Cup title.",
  },
  {
    year: "2023",
    title: "ODI World Cup Captain",
    text: "Captained India through the 2023 campaign.",
  },
  {
    year: "2019",
    title: "World Cup Record",
    text: "Five centuries at the 2019 ODI World Cup.",
  },
  {
    year: "2014",
    title: "The 264",
    text: "Record-breaking 264 against Sri Lanka.",
  },
];

/* ---------- PAGE ---------- */

export default function NewsPage() {
  return (
    <Page active="News">
      <Hero line1="LATEST" line2="NEWS" />

      {/* SOURCES */}
      <section className="relative bg-black px-5 py-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,.18),transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Title>
            FOLLOW THE <span className="text-blue-500">STORY</span>
          </Title>

          <p className="mt-5 max-w-md text-sm text-white/45">
            Live stories come from trusted cricket sources. This site doesn&apos;t
            publish unverified news.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {newsSources.map((s, i) => (
              <a
                key={s.title}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex min-h-[18rem] flex-col justify-between overflow-hidden rounded-3xl border p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-400 ${
                  i === 0
                    ? "border-blue-500/40 bg-gradient-to-br from-blue-600/50 via-blue-950/40 to-black md:col-span-2 lg:col-span-1"
                    : "border-white/10 bg-white/[0.03] hover:bg-blue-600/10"
                }`}
              >
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-500/25 blur-3xl transition duration-700 group-hover:scale-150" />

                <h3
                  className={`${display.className} relative text-5xl`}
                >
                  {s.title.toUpperCase()}
                </h3>

                <div className="relative">
                  <p className="text-sm text-white/55">
                    {s.description}
                  </p>

                  <p className="mt-4 text-sm font-black text-blue-300 transition group-hover:translate-x-2 group-hover:text-white">
                    {s.button} ↗
                  </p>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-6 text-xs text-white/30">
            Links open external sites. We don&apos;t own third-party articles,
            photos or videos.
          </p>
        </div>
      </section>

      {/* STORIES */}
      <section className="bg-[#02040a] px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            STORIES THAT <span className="outline-blue">STAND</span>
          </Title>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stories.map((s) => (
              <div
                key={s.year}
                className="group relative flex h-[22rem] items-end overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-blue-700/40 via-blue-950/30 to-black p-7 transition duration-500 hover:-translate-y-2 hover:border-blue-400"
              >
                <div
                  className={`${display.className} absolute -left-2 top-2 text-[9rem] leading-none opacity-25 transition duration-700 group-hover:translate-x-3 group-hover:opacity-55`}
                >
                  {s.year.slice(2)}
                </div>

                <div className="relative">
                  <p className="text-sm font-bold text-blue-300">
                    {s.year}
                  </p>

                  <h3
                    className={`${display.className} text-4xl leading-tight`}
                  >
                    {s.title.toUpperCase()}
                  </h3>

                  <p className="mt-2 text-sm text-white/55">
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Cta
        title="GO DEEPER."
        links={[
          ["Career", "/career"],
          ["Records", "/records"],
          ["IPL", "/ipl"],
          ["World Cups", "/world-cups"],
        ]}
      />

      <style jsx global>{`
        .outline-blue {
          color: transparent;
          -webkit-text-stroke: 1px rgba(59, 130, 246, 0.8);
        }
      `}</style>
    </Page>
  );
}
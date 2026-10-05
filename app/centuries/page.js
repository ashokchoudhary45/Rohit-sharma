"use client";

import Link from "next/link";

const centuries = [
  {
    format: "ODI",
    score: "264",
    opponent: "Sri Lanka",
    venue: "Eden Gardens, Kolkata",
    date: "13 November 2014",
    balls: "173",
    fours: "33",
    sixes: "9",
    strikeRate: "152.60",
    highlight: "Highest ODI score",
  },
  {
    format: "ODI",
    score: "208*",
    opponent: "Sri Lanka",
    venue: "Mohali",
    date: "13 December 2017",
    balls: "153",
    fours: "13",
    sixes: "12",
    strikeRate: "135.94",
    highlight: "Third ODI double century",
  },
  {
    format: "ODI",
    score: "209",
    opponent: "Australia",
    venue: "Bengaluru",
    date: "2 November 2013",
    balls: "158",
    fours: "12",
    sixes: "16",
    strikeRate: "132.27",
    highlight: "First ODI double century",
  },
  {
    format: "ODI",
    score: "140",
    opponent: "Pakistan",
    venue: "Manchester",
    date: "16 June 2019",
    balls: "113",
    fours: "14",
    sixes: "3",
    strikeRate: "123.89",
    highlight: "2019 World Cup century",
  },
  {
    format: "ODI",
    score: "122*",
    opponent: "South Africa",
    venue: "Southampton",
    date: "5 June 2019",
    balls: "144",
    fours: "13",
    sixes: "2",
    strikeRate: "84.72",
    highlight: "2019 World Cup century",
  },
  {
    format: "ODI",
    score: "102",
    opponent: "England",
    venue: "Birmingham",
    date: "30 June 2019",
    balls: "109",
    fours: "15",
    sixes: "0",
    strikeRate: "93.57",
    highlight: "2019 World Cup century",
  },
  {
    format: "ODI",
    score: "104",
    opponent: "Bangladesh",
    venue: "Birmingham",
    date: "2 July 2019",
    balls: "92",
    fours: "7",
    sixes: "5",
    strikeRate: "113.04",
    highlight: "2019 World Cup century",
  },
  {
    format: "ODI",
    score: "103",
    opponent: "Sri Lanka",
    venue: "Leeds",
    date: "6 July 2019",
    balls: "94",
    fours: "14",
    sixes: "2",
    strikeRate: "109.57",
    highlight: "Fifth World Cup century",
  },
];

const worldCupCenturies = [
  {
    score: "122*",
    opponent: "South Africa",
    year: "2019",
  },
  {
    score: "140",
    opponent: "Pakistan",
    year: "2019",
  },
  {
    score: "102",
    opponent: "England",
    year: "2019",
  },
  {
    score: "104",
    opponent: "Bangladesh",
    year: "2019",
  },
  {
    score: "103",
    opponent: "Sri Lanka",
    year: "2019",
  },
];

const doubleCenturies = [
  {
    score: "209",
    opponent: "Australia",
    date: "2 November 2013",
    note: "First ODI double century",
  },
  {
    score: "264",
    opponent: "Sri Lanka",
    date: "13 November 2014",
    note: "Highest ODI score",
  },
  {
    score: "208*",
    opponent: "Sri Lanka",
    date: "13 December 2017",
    note: "Third ODI double century",
  },
];

export default function CenturiesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030508] text-white">
      {/* NAVBAR */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link
            href="/"
            className="text-xl font-black tracking-[0.18em]"
          >
            ROHIT<span className="text-blue-500">SHARMA</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="nav-link">
              HOME
            </Link>

            <Link href="/profile" className="nav-link">
              PROFILE
            </Link>

            <Link href="/career" className="nav-link">
              CAREER
            </Link>

            <Link href="/stats" className="nav-link">
              STATS
            </Link>

            <Link href="/records" className="nav-link">
              RECORDS
            </Link>

            <Link href="/ipl" className="nav-link">
              IPL
            </Link>

            <Link href="/world-cups" className="nav-link">
              WORLD CUPS
            </Link>

            <Link
              href="/centuries"
              className="font-bold text-blue-400"
            >
              CENTURIES
            </Link>
          </div>

          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold tracking-wider transition hover:border-blue-500/50 hover:bg-blue-500/10"
          >
            HOME
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-[76vh] items-end overflow-hidden pt-20">
        {/* LOCAL ASSET — NO EXTERNAL IMAGE */}
        <img
          src="/images/rohit-profile.jpg"
          alt="Rohit Sharma"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-50"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(37,99,235,0.24),transparent_30%)]" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#030508] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-blue-500" />

              <p className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">
                Batting Legacy
              </p>
            </div>

            <h1 className="mt-6 text-6xl font-black uppercase leading-[0.82] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[9rem]">
              THE
              <br />
              <span className="text-blue-500">CENTURIES.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 md:text-xl">
              A premium archive of Rohit Sharma&apos;s landmark
              hundred-plus performances, double centuries and his
              extraordinary 2019 World Cup campaign.
            </p>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["SIGNATURE SCORE", "264", "Highest ODI score", true],
            ["ODI DOUBLE CENTURIES", "3", "209, 264 & 208*", false],
            ["WORLD CUP 2019", "5", "Centuries in one tournament", true],
            ["2019 WORLD CUP", "648", "Tournament runs", false],
          ].map(([label, value, description, blue]) => (
            <div
              key={label}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-blue-500/[0.04]"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                {label}
              </p>

              <p
                className={`mt-5 text-5xl font-black tracking-[-0.05em] ${
                  blue ? "text-blue-500" : "text-white"
                }`}
              >
                {value}
              </p>

              <p className="mt-3 text-sm leading-6 text-white/35">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DOUBLE CENTURY STRIP */}
      <section className="border-y border-white/10 bg-white/[0.018]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-400">
                The Double-Century Era
              </p>

              <h2 className="mt-5 text-4xl font-black uppercase leading-none sm:text-6xl">
                THREE
                <br />
                <span className="text-white/30">MASTERPIECES.</span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                Three ODI double centuries form one of the most distinctive
                parts of Rohit Sharma&apos;s batting legacy.
              </p>
            </div>

            <div className="grid gap-3">
              {doubleCenturies.map((item, index) => (
                <div
                  key={item.score}
                  className="group flex flex-col justify-between gap-6 rounded-[2rem] border border-white/10 bg-black/40 p-6 transition hover:border-blue-500/30 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-xs font-black text-white/20">
                      0{index + 1}
                    </span>

                    <div>
                      <p className="text-4xl font-black tracking-[-0.04em] text-blue-500">
                        {item.score}
                      </p>

                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/35">
                        vs {item.opponent}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs font-bold text-white/35">
                      {item.date}
                    </p>

                    <p className="mt-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 264 FEATURE */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-400">
                The Icon
              </p>

              <h2 className="mt-4 text-[7rem] font-black leading-[0.75] tracking-[-0.08em] sm:text-[10rem]">
                264
              </h2>

              <h3 className="mt-8 text-2xl font-black uppercase sm:text-4xl">
                The Record-Breaker
              </h3>

              <p className="mt-6 max-w-xl text-sm leading-8 text-white/40 sm:text-base">
                Rohit Sharma produced one of the most extraordinary innings
                in ODI cricket when he scored 264 against Sri Lanka at Eden
                Gardens in 2014.
              </p>

              <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["173", "BALLS"],
                  ["33", "FOURS"],
                  ["9", "SIXES"],
                  ["152.60", "STRIKE RATE"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                  >
                    <p className="text-xl font-black">{value}</p>
                    <p className="mt-1 text-[9px] font-bold tracking-widest text-white/25">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-blue-500/20 bg-blue-500/[0.035] p-7 sm:p-9">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                Match Details
              </p>

              <div className="mt-8 space-y-5">
                {[
                  ["Opponent", "Sri Lanka"],
                  ["Venue", "Eden Gardens, Kolkata"],
                  ["Date", "13 November 2014"],
                  ["Format", "ODI"],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between gap-5 ${
                      index !== 3
                        ? "border-b border-white/10 pb-5"
                        : ""
                    }`}
                  >
                    <span className="text-sm text-white/30">
                      {label}
                    </span>

                    <span
                      className={`text-right text-sm font-bold ${
                        label === "Format"
                          ? "text-blue-400"
                          : "text-white"
                      }`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-blue-500/15 bg-blue-500/[0.05] p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                  Highlight
                </p>

                <p className="mt-2 text-sm font-bold">
                  Highest ODI score
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CENTURY ARCHIVE */}
      <section className="bg-[#070a0f]">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-400">
              Archive
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase sm:text-6xl">
              Century Collection
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/35 sm:text-base">
              Selected landmark ODI centuries and double-century
              performances.
            </p>
          </div>

          <div className="mt-14 space-y-3">
            {centuries.map((century, index) => (
              <div
                key={`${century.score}-${century.opponent}-${index}`}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-blue-500/[0.025] sm:p-7"
              >
                <div className="grid items-center gap-6 lg:grid-cols-[110px_1fr_auto]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                      {century.format}
                    </p>

                    <p className="mt-2 text-4xl font-black tracking-[-0.04em]">
                      {century.score}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-black uppercase sm:text-xl">
                      vs {century.opponent}
                    </h3>

                    <p className="mt-2 text-xs text-white/30 sm:text-sm">
                      {century.venue} • {century.date}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-black tracking-widest text-white/30">
                      <span>{century.balls} BALLS</span>
                      <span>{century.fours} FOURS</span>
                      <span>{century.sixes} SIXES</span>
                      <span>SR {century.strikeRate}</span>
                    </div>
                  </div>

                  <div className="w-fit rounded-full border border-blue-500/20 bg-blue-500/[0.04] px-4 py-2 text-[9px] font-black uppercase tracking-widest text-blue-400">
                    {century.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2019 WORLD CUP */}
      <section className="border-y border-white/10 bg-white/[0.018]">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-400">
                World Cup 2019
              </p>

              <h2 className="mt-5 text-6xl font-black uppercase leading-[0.8] tracking-[-0.05em] sm:text-8xl">
                FIVE
                <br />
                <span className="text-blue-500">TONS.</span>
              </h2>

              <p className="mt-8 max-w-md text-sm leading-8 text-white/40">
                Rohit Sharma scored five centuries during the 2019 ODI World
                Cup, becoming one of the defining performers of the
                tournament.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-black tracking-widest text-white/40">
                  5 CENTURIES
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-black tracking-widest text-white/40">
                  648 RUNS
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {worldCupCenturies.map((century, index) => (
                <div
                  key={`${century.score}-${century.opponent}`}
                  className="group rounded-[2rem] border border-white/10 bg-black/60 p-6 transition duration-300 hover:border-blue-500/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black tracking-widest text-white/20">
                      0{index + 1}
                    </span>

                    <span className="text-[10px] font-black tracking-widest text-blue-400">
                      {century.year}
                    </span>
                  </div>

                  <p className="mt-7 text-4xl font-black text-blue-500">
                    {century.score}
                  </p>

                  <p className="mt-4 text-sm font-black uppercase">
                    vs {century.opponent}
                  </p>

                  <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/25">
                    ODI World Cup
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEGACY */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-blue-500/[0.08] via-white/[0.025] to-transparent p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-400">
                The Legacy
              </p>

              <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
                When the numbers
                <br />
                <span className="text-white/30">
                  become part of history.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-8 text-white/40">
                From 209 to 264 and 208*, Rohit Sharma&apos;s ODI double
                centuries form a defining part of his batting identity.
                His five-century 2019 World Cup campaign adds another
                extraordinary chapter to that story.
              </p>
            </div>

            <Link
              href="/records"
              className="w-fit rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-black transition hover:scale-105"
            >
              Explore Records →
            </Link>
          </div>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="bg-[#070a0f]">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="mb-12">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-400">
              Keep Exploring
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase sm:text-6xl">
              Rohit Sharma
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["/records", "🏆", "Records", "Explore historic records."],
              ["/stats", "📊", "Stats", "View career statistics."],
              [
                "/world-cups",
                "🌍",
                "World Cups",
                "Explore his World Cup journey.",
              ],
              ["/videos", "▶", "Videos", "Watch iconic moments."],
            ].map(([href, icon, title, description]) => (
              <Link
                key={href}
                href={href}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-blue-500/[0.035]"
              >
                <p className="text-2xl">{icon}</p>

                <h3 className="mt-6 font-black uppercase">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/30">
                  {description}
                </p>

                <p className="mt-6 text-xs font-black uppercase tracking-widest text-blue-400 opacity-0 transition group-hover:opacity-100">
                  Explore →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 text-center sm:p-9">
          <p className="text-xs leading-7 text-white/25">
            This is an independent fan-made website. Statistics and
            records should be verified against official cricket records
            and trusted statistical databases before final publication.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-black tracking-[0.2em]">
                ROHIT<span className="text-blue-500">SHARMA</span>
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-7 text-white/25">
                An independent fan-made website dedicated to the cricket
                journey, records, achievements and legacy of Rohit Sharma.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black tracking-widest text-white/50">
                EXPLORE
              </h4>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/30">
                <Link href="/profile" className="hover:text-white">
                  Profile
                </Link>

                <Link href="/career" className="hover:text-white">
                  Career
                </Link>

                <Link href="/stats" className="hover:text-white">
                  Stats
                </Link>

                <Link href="/records" className="hover:text-white">
                  Records
                </Link>

                <Link href="/captaincy" className="hover:text-white">
                  Captaincy
                </Link>

                <Link href="/ipl" className="hover:text-white">
                  IPL
                </Link>

                <Link href="/world-cups" className="hover:text-white">
                  World Cups
                </Link>

                <Link href="/centuries" className="text-blue-400">
                  Centuries
                </Link>

                <Link href="/gallery" className="hover:text-white">
                  Gallery
                </Link>

                <Link href="/videos" className="hover:text-white">
                  Videos
                </Link>

                <Link href="/news" className="hover:text-white">
                  News
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black tracking-widest text-white/50">
                WEBSITE
              </h4>

              <div className="mt-5 space-y-3 text-sm text-white/30">
                <Link
                  href="/contact"
                  className="block hover:text-white"
                >
                  Contact
                </Link>

                <Link
                  href="/privacy-policy"
                  className="block hover:text-white"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-7 text-center text-xs text-white/20">
            © {new Date().getFullYear()} Rohit Sharma Fan Website. All
            rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
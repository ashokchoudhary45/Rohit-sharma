"use client";

import { useState } from "react";

/* =========================================================
   LOCAL SITE CHROME
   No dependency on ../site-chrome
========================================================= */

const display = {
  className:
    "font-black tracking-[-0.04em] uppercase",
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

const intl = {
  columns: [
    "Format",
    "Matches",
    "Innings",
    "Runs",
    "Average",
    "Strike Rate",
    "100s",
    "50s",
    "Best",
  ],

  rows: [
    [
      "Tests",
      "67",
      "116",
      "4,301",
      "40.58",
      "57.06",
      "12",
      "18",
      "212",
    ],
    [
      "ODIs",
      "291",
      "283",
      "12,120",
      "49.27",
      "93.39",
      "35",
      "63",
      "264",
    ],
    [
      "T20Is",
      "159",
      "151",
      "4,231",
      "32.05",
      "140.90",
      "5",
      "32",
      "121",
    ],
    [
      "Overall",
      "517",
      "550",
      "20,652",
      "—",
      "—",
      "52",
      "113",
      "264",
    ],
  ],
};

/* IPL archive */
const iplSeasons = [
  ["2008", "Deccan Chargers"],
  ["2009", "Deccan Chargers"],
  ["2010", "Deccan Chargers"],
  ...Array.from(
    { length: 15 },
    (_, i) => [String(2011 + i), "Mumbai Indians"]
  ),
];

const iplSeasonRuns = {
  2013: "538",
};

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

const battingBreakdown = [
  ["20,652", "Runs", "International"],
  ["52", "100s", "International"],
  ["113", "50s", "International"],
  ["4", "200s", "Tests + ODIs"],
  ["2,003", "4s", "International"],
  ["674", "6s", "International"],
];

const bowlingCols = [
  "Format",
  "Matches",
  "Innings",
  "Balls",
  "Runs",
  "Mdns",
  "Wkts",
  "Avg",
  "Eco",
  "SR",
  "BBI",
];

const bowling = [
  [
    "Tests",
    "67",
    "16",
    "383",
    "224",
    "5",
    "2",
    "112.0",
    "3.51",
    "191.5",
    "1/26",
  ],
  [
    "ODIs",
    "291",
    "40",
    "610",
    "533",
    "2",
    "9",
    "59.22",
    "5.24",
    "67.78",
    "2/27",
  ],
  [
    "T20Is",
    "159",
    "9",
    "68",
    "113",
    "1",
    "1",
    "113.0",
    "9.97",
    "68.0",
    "1/22",
  ],
  [
    "IPL",
    "281",
    "32",
    "339",
    "453",
    "—",
    "15",
    "30.2",
    "8.02",
    "22.6",
    "4/6",
  ],
];

const iplCareer = [
  ["281", "Matches"],
  ["276", "Innings"],
  ["7,329", "Runs"],
  ["29.91", "Average"],
  ["132.92", "Strike rate"],
  ["2", "100s"],
  ["49", "50s"],
  ["109", "Best"],
  ["661", "4s"],
  ["323", "6s"],
];

const titles = ["2013", "2015", "2017", "2019", "2020"];

/* =========================================================
   TABLE
========================================================= */

function Table({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10">
      <table className="w-full min-w-[720px] text-left">
        <thead className="bg-white/[0.05]">
          <tr>
            {columns.map((c, i) => (
              <th
                key={c}
                className={`px-5 py-4 text-xs font-bold text-white/45 ${
                  i === 0
                    ? "sticky left-0 bg-[#0a0d14]"
                    : ""
                }`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr
              key={r[0]}
              className={`border-t border-white/5 transition hover:bg-blue-500/10 ${
                r[0] === "Overall"
                  ? "bg-blue-500/10"
                  : ""
              }`}
            >
              {r.map((v, i) => (
                <td
                  key={i}
                  className={`whitespace-nowrap px-5 py-4 text-sm ${
                    i === 0
                      ? `sticky left-0 bg-[#05070b] ${display.className} text-xl`
                      : v === "—"
                      ? "text-white/20"
                      : "text-white/70"
                  }`}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   BUTTON
========================================================= */

const chip = (on) =>
  `rounded-full px-6 py-2.5 text-sm font-black transition duration-300 ${
    on
      ? "bg-blue-600 shadow-[0_0_40px_rgba(47,107,255,.6)]"
      : "border border-white/20 text-white/55 hover:border-white hover:text-white"
  }`;

/* =========================================================
   PAGE
========================================================= */

export default function RecordsPage() {
  const [tab, setTab] = useState("International");
  const [fmt, setFmt] = useState("All");

  const rows =
    fmt === "All"
      ? intl.rows
      : intl.rows.filter((r) => r[0] === fmt);

  return (
    <Page active="Records">
      <Hero
        line1="THE"
        line2="RECORDS"
      />

      {/* =================================================
          RECORD CARDS
      ================================================= */}

      <section className="relative bg-black px-5 py-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,.2),transparent_55%)]" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
          {recordCards.map(([v, l], i) => (
            <div
              key={l}
              className={`group relative overflow-hidden rounded-3xl border p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-400 ${
                i === 0
                  ? "border-blue-500/40 bg-gradient-to-br from-blue-600/40 to-black lg:col-span-2"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl transition duration-700 group-hover:scale-150" />

              <Num
                value={v}
                className={`${display.className} relative block leading-none ${
                  i === 0
                    ? "text-8xl sm:text-9xl"
                    : "text-6xl sm:text-7xl"
                }`}
              />

              <p className="relative mt-3 text-sm font-bold text-white/55">
                {l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================
          ARCHIVE
      ================================================= */}

      <section className="bg-[#02040a] px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            PICK A <span className="text-blue-500">FORMAT</span>
          </Title>

          <div className="mt-10 flex flex-wrap gap-3">
            {["International", "IPL"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setFmt("All");
                }}
                className={`${display.className} ${chip(
                  tab === t
                )} text-2xl tracking-wide`}
              >
                {t}
              </button>
            ))}
          </div>

          <div key={tab} className="swap mt-8">
            {tab === "International" ? (
              <>
                <div className="mb-5 flex flex-wrap gap-2">
                  {[
                    "All",
                    "Tests",
                    "ODIs",
                    "T20Is",
                  ].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFmt(f)}
                      className={chip(fmt === f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <Table
                  columns={intl.columns}
                  rows={rows}
                />
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
                  {iplCareer.map(([v, l]) => (
                    <div
                      key={l}
                      className="bg-black p-6 transition hover:bg-blue-950/60"
                    >
                      <Num
                        value={v}
                        className={`${display.className} block text-5xl text-blue-400`}
                      />

                      <p className="mt-1 text-xs font-bold text-white/50">
                        {l}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rail mt-5 flex gap-3 overflow-x-auto pb-3">
                  {iplSeasons.map(([y, team]) => {
                    const mi =
                      team === "Mumbai Indians";

                    return (
                      <div
                        key={y}
                        className={`w-44 shrink-0 snap-start rounded-2xl border p-5 transition hover:-translate-y-1 ${
                          mi
                            ? "border-blue-500/30 bg-blue-950/40"
                            : "border-white/15 bg-white/[0.05]"
                        }`}
                      >
                        <p
                          className={`${display.className} text-4xl`}
                        >
                          {y}
                        </p>

                        <p className="mt-2 text-xs font-bold text-white/55">
                          {team}
                        </p>

                        {iplSeasonRuns[y] && (
                          <p className="mt-2 text-xs font-black text-blue-300">
                            {iplSeasonRuns[y]} runs
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          BATTING
      ================================================= */}

      <section className="bg-black px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            THE <span className="outline-blue">BATTING</span>
          </Title>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {battingBreakdown.map(([v, l, n]) => (
              <div
                key={l}
                className="group bg-black p-8 transition duration-500 hover:bg-blue-950/60 lg:p-10"
              >
                <Num
                  value={v}
                  className={`${display.className} block text-7xl transition duration-500 group-hover:text-blue-400 lg:text-8xl`}
                />

                <p className="mt-2 font-bold">
                  {l}
                </p>

                <p className="text-xs text-white/35">
                  {n}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          BOWLING
      ================================================= */}

      <section className="bg-[#02040a] px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            AND THE <span className="outline">BOWLING</span>
          </Title>

          <div className="mt-14">
            <Table
              columns={bowlingCols}
              rows={bowling}
            />
          </div>
        </div>
      </section>

      {/* =================================================
          CAPTAINCY + WORLD CUP
      ================================================= */}

      <section className="bg-black px-5 py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/40 bg-gradient-to-br from-blue-600/40 via-blue-950/30 to-black p-8 sm:p-12">
            <p className="text-sm font-bold text-blue-300">
              Captaincy record
            </p>

            <h2
              className={`${display.className} mt-2 text-6xl`}
            >
              5 MI TITLES
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {titles.map((y) => (
                <span
                  key={y}
                  className={`${display.className} rounded-full border border-blue-400/50 px-4 py-1.5 text-xl`}
                >
                  {y}
                </span>
              ))}
            </div>

            <a
              href="/captaincy"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black tracking-wide text-black transition hover:scale-105"
            >
              CAPTAINCY
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
            <p className="text-sm font-bold text-blue-300">
              World Cup records
            </p>

            <h2
              className={`${display.className} mt-2 text-6xl`}
            >
              5 HUNDREDS
            </h2>

            <p className="mt-2 text-sm text-white/60">
              648 runs and five centuries at the 2019 ODI World Cup.
            </p>

            <a
              href="/world-cups"
              className="mt-8 inline-flex rounded-full border border-white/30 px-8 py-4 text-sm font-black tracking-wide transition hover:bg-white hover:text-black"
            >
              WORLD CUPS
            </a>
          </div>
        </div>
      </section>

      {/* =================================================
          CTA
      ================================================= */}

      <Cta
        title="MORE NUMBERS."
        links={[
          ["Stats", "/stats"],
          ["IPL", "/ipl"],
          ["Awards", "/awards"],
          ["Profile", "/profile"],
        ]}
      />
    </Page>
  );
}
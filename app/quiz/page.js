"use client";

import { useEffect, useState } from "react";

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

function Num({ value, className = "" }) {
  return <span className={className}>{value}</span>;
}

/* =========================================================
   QUESTIONS
========================================================= */

const questions = [
  {
    question:
      "Rohit Sharma ka ODI mein highest individual score kya hai?",
    options: ["244 runs", "264 runs", "254 runs", "274 runs"],
    answer: "264 runs",
  },
  {
    question:
      "Rohit Sharma ne 2019 ODI World Cup mein kitne centuries banaye the?",
    options: ["3", "4", "5", "6"],
    answer: "5",
  },
  {
    question:
      "Rohit Sharma ki famous 264-run ODI innings kis team ke against aayi thi?",
    options: [
      "Australia",
      "South Africa",
      "Sri Lanka",
      "New Zealand",
    ],
    answer: "Sri Lanka",
  },
  {
    question:
      "264 runs ki famous innings Rohit Sharma ne kis ground par banayi thi?",
    options: [
      "Wankhede Stadium",
      "Eden Gardens",
      "M. Chinnaswamy Stadium",
      "Rajiv Gandhi International Stadium",
    ],
    answer: "Eden Gardens",
  },
  {
    question:
      "Rohit Sharma ne ODI career mein kitni double centuries banayi hain?",
    options: ["2", "3", "4", "5"],
    answer: "3",
  },
  {
    question:
      "Rohit Sharma ne 2017 mein Sri Lanka ke against 208* runs kis city mein banaye?",
    options: ["Mumbai", "Mohali", "Pune", "Indore"],
    answer: "Mohali",
  },
  {
    question:
      "Rohit Sharma ki 264-run innings kitni balls mein bani thi?",
    options: [
      "163 balls",
      "173 balls",
      "183 balls",
      "153 balls",
    ],
    answer: "173 balls",
  },
  {
    question:
      "2024 T20 World Cup mein Rohit Sharma ne India ko kis role mein lead kiya?",
    options: [
      "Coach",
      "Captain",
      "Selector",
      "Vice-Captain",
    ],
    answer: "Captain",
  },
  {
    question:
      "Rohit Sharma ka famous nickname kya hai?",
    options: [
      "King",
      "Captain Cool",
      "Hitman",
      "Mr. 360",
    ],
    answer: "Hitman",
  },
  {
    question:
      "Rohit Sharma ne 2015 ODI World Cup mein India ke liye kis role mein participate kiya?",
    options: [
      "Captain",
      "Player",
      "Coach",
      "Selector",
    ],
    answer: "Player",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const last = current === questions.length - 1;

  /* -------------------------------------------------------
     ANSWER
  ------------------------------------------------------- */

  const answer = (opt) => {
    if (selected) return;

    setSelected(opt);

    if (opt === q.answer) {
      setScore((s) => s + 1);
    }
  };

  /* -------------------------------------------------------
     NEXT
  ------------------------------------------------------- */

  const next = () => {
    if (!selected) return;

    if (last) {
      setFinished(true);
      return;
    }

    setCurrent((c) => c + 1);
    setSelected(null);
  };

  /* -------------------------------------------------------
     RESTART
  ------------------------------------------------------- */

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  /* -------------------------------------------------------
     KEYBOARD
     A-D or 1-4 = answer
     Enter = next
  ------------------------------------------------------- */

  useEffect(() => {
    if (finished) return;

    const onKey = (e) => {
      const k = e.key.toLowerCase();

      const letterIndex =
        "abcd".indexOf(k);

      const numberIndex =
        ["1", "2", "3", "4"].indexOf(k);

      const i =
        letterIndex >= 0
          ? letterIndex
          : numberIndex;

      if (i >= 0 && q.options[i]) {
        answer(q.options[i]);
      }

      if (k === "enter") {
        next();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [finished, current, selected, q]);

  /* =======================================================
     RESULT
  ======================================================= */

  if (finished) {
    const pct = Math.round(
      (score / questions.length) * 100
    );

    return (
      <Page active="">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(47,107,255,.5),transparent_60%),linear-gradient(180deg,#02040a,#04102e_60%,#000)]" />

          <div
            className={`${display.className} outline-blue pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[55vw] leading-none opacity-30`}
            aria-hidden
          >
            45
          </div>

          <div className="relative text-center">
            <p className="text-sm font-bold text-blue-300">
              Quiz complete
            </p>

            <h1
              className={`${display.className} hero-in text-[32vw] leading-[0.9] sm:text-[18rem]`}
            >
              <Num value={String(score)} />
              <span className="outline">
                /{questions.length}
              </span>
            </h1>

            <div className="mx-auto mt-4 h-2 max-w-md overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-blue-500 shadow-[0_0_20px_rgba(47,107,255,.9)] transition-all duration-1000"
                style={{ width: `${pct}%` }}
              />
            </div>

            <p
              className={`${display.className} mt-6 text-4xl sm:text-5xl`}
            >
              {pct >= 80
                ? "YOU KNOW THE HITMAN."
                : pct >= 50
                ? "GOOD INNINGS."
                : "BACK TO THE NETS."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={restart}
                className="sweep rounded-full bg-blue-600 px-9 py-4 text-sm font-black tracking-wide shadow-[0_0_50px_rgba(47,107,255,.55)] transition hover:scale-105"
              >
                PLAY AGAIN
              </button>

              <a
                href="/stats"
                className="rounded-full border border-white/30 px-9 py-4 text-sm font-black tracking-wide transition hover:bg-white hover:text-black"
              >
                EXPLORE STATS
              </a>
            </div>
          </div>
        </section>
      </Page>
    );
  }

  /* =======================================================
     QUESTION
  ======================================================= */

  const progress =
    ((current + 1) / questions.length) * 100;

  const right = selected === q.answer;

  return (
    <Page active="">
      <section className="relative min-h-screen overflow-hidden px-5 pb-20 pt-32 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(47,107,255,.35),transparent_55%),linear-gradient(180deg,#02040a,#04102e_70%,#000)]" />

        <div
          className={`${display.className} outline-blue pointer-events-none absolute -right-[4%] top-[8%] select-none text-[40vw] leading-none opacity-30`}
          aria-hidden
        >
          {String(current + 1).padStart(2, "0")}
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* TOP INFO */}

          <div className="mb-8 flex items-center justify-between text-sm font-bold">
            <span className="text-white/60">
              Question {current + 1} of {questions.length}
            </span>

            <span className="text-blue-300">
              Score {score}
            </span>
          </div>

          {/* PROGRESS */}

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-blue-500 shadow-[0_0_20px_rgba(47,107,255,.9)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div key={current} className="swap">
            {/* QUESTION */}

            <h1
              className={`${display.className} mt-10 text-4xl leading-tight sm:text-6xl`}
            >
              {q.question.toUpperCase()}
            </h1>

            {/* OPTIONS */}

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {q.options.map((opt, i) => {
                const isSel = selected === opt;
                const isRight = opt === q.answer;

                let cls =
                  "border-white/15 bg-white/[0.04] hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-600/15";

                if (selected) {
                  cls = isRight
                    ? "border-green-400/70 bg-green-500/15 text-green-200"
                    : isSel
                    ? "border-red-400/70 bg-red-500/15 text-red-200"
                    : "border-white/10 bg-white/[0.02] text-white/30";
                }

                return (
                  <button
                    key={opt}
                    onClick={() => answer(opt)}
                    disabled={!!selected}
                    className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition duration-300 ${cls}`}
                  >
                    <span
                      className={`${display.className} flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xl`}
                    >
                      {"ABCD"[i]}
                    </span>

                    <span className="text-lg font-bold">
                      {opt}
                    </span>

                    {selected && isRight && (
                      <span className="ml-auto text-xl">
                        ✓
                      </span>
                    )}

                    {selected &&
                      isSel &&
                      !isRight && (
                        <span className="ml-auto text-xl">
                          ✕
                        </span>
                      )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FEEDBACK + NEXT */}

          <div className="mt-8 flex min-h-[4rem] items-center justify-between gap-4">
            <p
              className={`${display.className} text-3xl ${
                selected
                  ? right
                    ? "text-green-300"
                    : "text-red-300"
                  : "text-transparent"
              }`}
              aria-live="polite"
            >
              {selected
                ? right
                  ? "CORRECT! 🔥"
                  : `ANSWER: ${q.answer.toUpperCase()}`
                : "."}
            </p>

            <button
              onClick={next}
              disabled={!selected}
              className={`rounded-full px-9 py-4 text-sm font-black tracking-wide transition ${
                selected
                  ? "sweep bg-blue-600 shadow-[0_0_40px_rgba(47,107,255,.5)] hover:scale-105"
                  : "cursor-not-allowed bg-white/10 text-white/30"
              }`}
            >
              {last ? "FINISH" : "NEXT"}
            </button>
          </div>

          <p className="mt-6 hidden text-xs text-white/30 sm:block">
            Tip: press A–D to answer, Enter for next.
          </p>
        </div>
      </section>
    </Page>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   ROHIT SHARMA — BIRTHDAY EXPERIENCE
   Birthday: 30 April
   Timezone: India / IST
   ========================================================= */

const display = {
  className:
    "font-black tracking-[-0.045em] uppercase",
};

/* =========================================================
   DATE MATHS
   ========================================================= */

const IST = 19800000;
const DAY = 864e5;
const HOUR = 36e5;
const MINUTE = 6e4;
const SECOND = 1e3;

const BORN = Date.UTC(1987, 3, 30) - IST;

const birthdayTarget = (year) =>
  Date.UTC(year, 3, 30) - IST;

const pad = (n) => String(n).padStart(2, "0");

function getBirthdayPlan(now) {
  const indiaYear = new Date(now + IST).getUTCFullYear();

  let target = birthdayTarget(indiaYear);

  if (now >= target + DAY) {
    target = birthdayTarget(indiaYear + 1);
  }

  const targetYear = new Date(
    target + IST
  ).getUTCFullYear();

  return {
    target,
    age: targetYear - 1987,
    today: now >= target && now < target + DAY,
    previous: birthdayTarget(targetYear - 1),
  };
}

/* =========================================================
   FIREWORKS
   ONLY RENDERED ON BIRTHDAY
   ========================================================= */

const FIREWORK_COLORS = [
  [253, 224, 138],
  [255, 255, 255],
  [96, 165, 250],
  [34, 211, 238],
  [251, 191, 36],
  [244, 114, 182],
];

function Fireworks({ api }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const dpr = Math.min(
      2,
      window.devicePixelRatio || 1
    );

    let width = 0;
    let height = 0;

    let rockets = [];
    let sparks = [];

    let raf = 0;
    let lastAutoLaunch = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    resize();

    const burst = (x, y) => {
      const count =
        65 + Math.floor(Math.random() * 55);

      const color =
        FIREWORK_COLORS[
          Math.floor(
            Math.random() *
              FIREWORK_COLORS.length
          )
        ];

      for (let i = 0; i < count; i++) {
        const angle =
          (Math.PI * 2 * i) / count;

        const speed =
          1.8 + Math.random() * 3.8;

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay:
            0.009 +
            Math.random() * 0.012,
          color:
            Math.random() < 0.25
              ? FIREWORK_COLORS[0]
              : color,
        });
      }
    };

    const launch = (
      targetX,
      targetY
    ) => {
      rockets.push({
        x:
          targetX ??
          width * (0.1 + Math.random() * 0.8),
        y: height + 10,
        targetY:
          targetY ??
          height * (0.12 + Math.random() * 0.35),
        velocity: -(10 + Math.random() * 3),
      });
    };

    api.current = {
      launch,
      finale: () => {
        for (let i = 0; i < 12; i++) {
          setTimeout(
            () => launch(),
            i * 250
          );
        }
      },
    };

    const loop = (time) => {
      ctx.globalCompositeOperation =
        "destination-out";

      ctx.fillStyle =
        "rgba(0,0,0,.18)";

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      ctx.globalCompositeOperation =
        "lighter";

      /* Birthday-only automatic fireworks */

      if (time - lastAutoLaunch > 1800) {
        launch();
        lastAutoLaunch = time;
      }

      rockets = rockets.filter((rocket) => {
        rocket.y += rocket.velocity;
        rocket.velocity *= 0.985;

        ctx.fillStyle = "#fde68a";

        ctx.fillRect(
          rocket.x,
          rocket.y,
          2,
          8
        );

        if (
          rocket.y <= rocket.targetY ||
          rocket.velocity > -1.6
        ) {
          burst(
            rocket.x,
            rocket.y
          );

          return false;
        }

        return true;
      });

      sparks = sparks.filter((spark) => {
        spark.x += spark.vx;
        spark.y += spark.vy;

        spark.vx *= 0.985;

        spark.vy =
          spark.vy * 0.985 + 0.04;

        spark.life -= spark.decay;

        if (spark.life <= 0) {
          return false;
        }

        ctx.fillStyle = `rgba(
          ${spark.color[0]},
          ${spark.color[1]},
          ${spark.color[2]},
          ${spark.life}
        )`;

        ctx.beginPath();

        ctx.arc(
          spark.x,
          spark.y,
          1.8,
          0,
          Math.PI * 2
        );

        ctx.fill();

        return true;
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, [api]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[40]"
    />
  );
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function Navigation() {
  const links = [
    ["Home", "/"],
    ["Profile", "/profile"],
    ["Career", "/career"],
    ["Stats", "/stats"],
    ["Innings", "/innings"],
    ["Birthday", "/birthday"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[80] border-b border-white/[0.07] bg-[#03050a]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 lg:px-8">
        <a
          href="/"
          className={`${display.className} text-xl text-white sm:text-2xl`}
        >
          ROHIT
          <span className="text-[#f5d98b]">
            45
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`text-[10px] font-black uppercase tracking-[0.16em] transition ${
                label === "Birthday"
                  ? "text-[#f5d98b]"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="/profile"
          className="rounded-full border border-[#f5d98b]/30 bg-[#f5d98b]/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#f5d98b] transition hover:bg-[#f5d98b]/15"
        >
          45
        </a>
      </div>
    </header>
  );
}

/* =========================================================
   REVEAL
   ========================================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.12,
        }
      );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`reveal ${
        visible ? "reveal-visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   COUNTDOWN UNIT
   ========================================================= */

function CountdownUnit({
  value,
  label,
  index,
}) {
  return (
    <div
      className="countdown-card group"
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div className="countdown-card-inner">
        <div className="countdown-number-wrap">
          <span
            className={`${display.className} countdown-number`}
          >
            {value == null
              ? "--"
              : pad(value)}
          </span>
        </div>

        <div className="countdown-label">
          {label}
        </div>

        <div className="countdown-line" />
      </div>
    </div>
  );
}

/* =========================================================
   DATA
   ========================================================= */

const FACTS = [
  [
    "30 APR 1987",
    "Born in Nagpur, Maharashtra — the Hitman’s day.",
  ],
  [
    "264",
    "Highest ODI score — Eden Gardens, 2014.",
  ],
  [
    "3 × 200+",
    "Only batter with three ODI double hundreds.",
  ],
  [
    "5 IPL TITLES",
    "Lifted as captain of Mumbai Indians.",
  ],
  [
    "T20 WC 2024",
    "Led India to the T20 World Cup title.",
  ],
  [
    "5 TONS",
    "Hundreds in a single ODI World Cup — 2019.",
  ],
];

const TICKER = [
  "HAPPY BIRTHDAY HITMAN",
  "30 APRIL",
  "ROHIT SHARMA",
  "JERSEY 45",
  "THE HITMAN",
  "CAPTAIN · LEGEND",
];

/* =========================================================
   PAGE
   ========================================================= */

export default function BirthdayPage() {
  const [now, setNow] = useState(null);
  const [name, setName] = useState("");
  const [wishes, setWishes] = useState([]);

  const fireworksApi = useRef(null);

  /* Live clock */

  useEffect(() => {
    setNow(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const plan = now
    ? getBirthdayPlan(now)
    : null;

  const remaining = plan
    ? Math.max(0, plan.target - now)
    : null;

  const progress = plan
    ? Math.min(
        100,
        Math.max(
          0,
          ((now - plan.previous) /
            (plan.target -
              plan.previous)) *
            100
        )
      )
    : 0;

  const lived =
    now != null ? now - BORN : null;

  const days =
    remaining == null
      ? null
      : Math.floor(
          remaining / DAY
        );

  const hours =
    remaining == null
      ? null
      : Math.floor(
          (remaining % DAY) / HOUR
        );

  const minutes =
    remaining == null
      ? null
      : Math.floor(
          (remaining % HOUR) / MINUTE
        );

  const seconds =
    remaining == null
      ? null
      : Math.floor(
          (remaining % MINUTE) / SECOND
        );

  /* Wish */

  const sendWish = () => {
    const finalName =
      name.trim() || "A fan";

    setWishes((previous) => [
      {
        id: Date.now(),
        name: finalName,
      },
      ...previous,
    ].slice(0, 14));

    setName("");

    /*
      Fireworks ONLY on birthday.
    */

    if (plan?.today) {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          fireworksApi.current?.launch();
        }, i * 220);
      }
    }
  };

  return (
    <main className="birthday-page min-h-screen overflow-x-hidden bg-[#03050a] text-white selection:bg-[#f5d98b] selection:text-black">
      <Navigation />

      {/* ===================================================
          FIREWORKS
          IMPORTANT:
          They are not rendered at all before birthday.
      =================================================== */}

      {plan?.today && (
        <Fireworks api={fireworksApi} />
      )}

      <div className="relative z-10">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="birthday-hero relative overflow-hidden px-5 pb-20 pt-[115px] lg:min-h-[850px] lg:px-8 lg:pt-[150px]">
          {/* Ambient background */}

          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />

          <div className="hero-glow hero-glow-gold" />
          <div className="hero-glow hero-glow-blue" />

          <div className="hero-grid" />

          <div
            className={`${display.className} hero-45`}
            aria-hidden="true"
          >
            45
          </div>

          <div className="relative mx-auto max-w-[1250px] text-center">
            <div className="hero-badge">
              <span className="hero-badge-dot" />

              {plan?.today
                ? "30 APRIL · THE DAY"
                : "THE COUNTDOWN BEGINS"}
            </div>

            <h1 className={`${display.className} hero-title`}>
              <span className="hero-title-main">
                {plan?.today
                  ? "HAPPY BIRTHDAY"
                  : "ROHIT SHARMA"}
              </span>

              <span className="hero-title-outline">
                {plan?.today
                  ? "HITMAN"
                  : "BIRTHDAY COUNTDOWN"}
              </span>
            </h1>

            <p className="hero-description">
              {plan?.today
                ? "Today belongs to the Hitman."
                : `Counting every second until Rohit Sharma turns ${plan?.age ?? "—"}.`}
            </p>

            {/* =================================================
                COUNTDOWN
            ================================================= */}

            <div className="countdown-grid">
              <CountdownUnit
                value={days}
                label="Days"
                index={0}
              />

              <CountdownUnit
                value={hours}
                label="Hours"
                index={1}
              />

              <CountdownUnit
                value={minutes}
                label="Minutes"
                index={2}
              />

              <CountdownUnit
                value={seconds}
                label="Seconds"
                index={3}
              />
            </div>

            {/* =================================================
                PROGRESS
            ================================================= */}

            <div className="progress-wrap">
              <div className="progress-meta">
                <span>
                  LAST BIRTHDAY
                </span>

                <span>
                  {progress.toFixed(1)}%
                </span>

                <span>
                  30 APR
                </span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                />

                <div
                  className="progress-shine"
                  style={{
                    left: `${progress}%`,
                  }}
                />
              </div>
            </div>

            {/* =================================================
                BIRTHDAY ONLY CONTROLS
            ================================================= */}

            {plan?.today ? (
              <div className="birthday-controls">
                <button
                  type="button"
                  onClick={() =>
                    fireworksApi.current?.finale()
                  }
                  className="gold-button"
                >
                  <span>✦</span>
                  Launch Celebration
                </button>

                <a
                  href="#wish"
                  className="outline-button"
                >
                  Send a Wish
                </a>
              </div>
            ) : (
              <div className="birthday-controls">
                <a
                  href="#wish"
                  className="outline-button"
                >
                  Send a Wish
                </a>

                <a
                  href="#milestones"
                  className="outline-button"
                >
                  Explore Hitman
                </a>
              </div>
            )}

            {plan?.today && (
              <p className="firework-note">
                ✦ Celebration mode is live today
              </p>
            )}
          </div>
        </section>

        {/* =================================================
            TICKER
        ================================================= */}

        <div className="ticker-shell">
          <div className="ticker-track">
            {[
              ...TICKER,
              ...TICKER,
              ...TICKER,
              ...TICKER,
            ].map((item, index) => (
              <span
                key={index}
                className={`${display.className} ticker-item`}
              >
                {item}

                <b>◆</b>
              </span>
            ))}
          </div>
        </div>

        {/* =================================================
            LIFE IN NUMBERS
        ================================================= */}

        <section className="mx-auto max-w-[1250px] px-5 py-24 lg:px-8 lg:py-32">
          <Reveal>
            <div className="section-kicker">
              01 / LIFE IN NUMBERS
            </div>

            <h2
              className={`${display.className} section-title`}
            >
              LIFE IN{" "}
              <span className="gold-text">
                NUMBERS
              </span>
            </h2>

            <p className="section-description">
              Ticking live, every second, since
              30 April 1987.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [
                "DAYS LIVED",
                lived != null
                  ? Math.floor(
                      lived / DAY
                    )
                  : null,
              ],
              [
                "HOURS LIVED",
                lived != null
                  ? Math.floor(
                      lived / HOUR
                    )
                  : null,
              ],
              [
                "SECONDS LIVED",
                lived != null
                  ? Math.floor(
                      lived / SECOND
                    )
                  : null,
              ],
            ].map(([label, value], index) => (
              <Reveal
                key={label}
                delay={index * 100}
              >
                <div className="number-card">
                  <div className="number-card-index">
                    0{index + 1}
                  </div>

                  <p className="number-card-label">
                    {label}
                  </p>

                  <p
                    className={`${display.className} number-card-value`}
                  >
                    {value != null
                      ? value.toLocaleString(
                          "en-US"
                        )
                      : "—"}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =================================================
            MILESTONES
        ================================================= */}

        <section
          id="milestones"
          className="milestones-section"
        >
          <div className="mx-auto max-w-[1250px] px-5 py-24 lg:px-8 lg:py-32">
            <Reveal>
              <div className="section-kicker">
                02 / THE HITMAN
              </div>

              <h2
                className={`${display.className} section-title`}
              >
                HITMAN{" "}
                <span className="gold-text">
                  MILESTONES
                </span>
              </h2>

              <p className="section-description">
                Numbers, moments and achievements
                that shaped the journey.
              </p>
            </Reveal>

            <div className="milestone-grid">
              {FACTS.map(
                ([title, description], index) => (
                  <Reveal
                    key={title}
                    delay={(index % 3) * 100}
                  >
                    <article className="milestone-card">
                      <div className="milestone-number">
                        0{index + 1}
                      </div>

                      <div className="milestone-line" />

                      <h3
                        className={`${display.className} milestone-title`}
                      >
                        {title}
                      </h3>

                      <p className="milestone-description">
                        {description}
                      </p>
                    </article>
                  </Reveal>
                )
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            WISH WALL
        ================================================= */}

        <section
          id="wish"
          className="wish-section"
        >
          <div className="mx-auto max-w-4xl px-5 py-24 text-center lg:py-32">
            <Reveal>
              <div className="section-kicker justify-center">
                03 / FAN WALL
              </div>

              <h2
                className={`${display.className} section-title`}
              >
                SEND A{" "}
                <span className="gold-text">
                  WISH
                </span>
              </h2>

              <p className="section-description mx-auto">
                Add your name to the Hitman birthday
                wall.
              </p>

              <div className="wish-form">
                <input
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter"
                    ) {
                      sendWish();
                    }
                  }}
                  maxLength={30}
                  placeholder="Enter your name"
                  className="wish-input"
                />

                <button
                  type="button"
                  onClick={sendWish}
                  className="gold-button wish-button"
                >
                  Send Wish
                  <span>→</span>
                </button>
              </div>
            </Reveal>

            <div className="wish-list">
              {wishes.map((wish) => (
                <span
                  key={wish.id}
                  className="wish-pill"
                >
                  <span>🎂</span>
                  {wish.name}
                  <small>
                    Happy Birthday Hitman!
                  </small>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="birthday-footer">
          <div className="mx-auto flex max-w-[1250px] flex-col justify-between gap-6 px-5 py-12 md:flex-row md:items-end lg:px-8">
            <div>
              <div
                className={`${display.className} text-3xl`}
              >
                ROHIT
                <span className="text-[#f5d98b]">
                  45
                </span>
              </div>

              <p className="mt-2 text-xs text-white/30">
                An independent fan-made birthday
                experience.
              </p>
            </div>

            <a
              href="/"
              className="text-xs font-black uppercase tracking-[0.2em] text-white/40 transition hover:text-[#f5d98b]"
            >
              Back to Home ↑
            </a>
          </div>
        </footer>
      </div>

      {/* =================================================
          PREMIUM STYLES
      ================================================= */}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #03050a;
        }

        .birthday-page {
          --gold: #f5d98b;
          --gold-light: #fff4c7;
          --blue: #3b82f6;
        }

        /* -----------------------------------------------
           HERO
        ----------------------------------------------- */

        .birthday-hero {
          min-height: 820px;
          background:
            radial-gradient(
              circle at 50% 5%,
              rgba(245,217,139,.09),
              transparent 30%
            ),
            radial-gradient(
              circle at 10% 55%,
              rgba(37,99,235,.14),
              transparent 32%
            ),
            radial-gradient(
              circle at 90% 40%,
              rgba(37,99,235,.13),
              transparent 35%
            ),
            #03050a;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          opacity: .035;
          background-image:
            linear-gradient(
              rgba(255,255,255,.5) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.5) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 90%
          );
        }

        .hero-45 {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          font-size: min(55vw, 700px);
          line-height: .75;
          color: transparent;
          -webkit-text-stroke: 1px
            rgba(245,217,139,.07);
          pointer-events: none;
          user-select: none;
        }

        .hero-orbit {
          position: absolute;
          left: 50%;
          top: 38%;
          border: 1px solid
            rgba(245,217,139,.08);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-orbit-one {
          width: 900px;
          height: 330px;
          transform:
            translate(-50%, -50%)
            rotate(-18deg);
          animation: orbitFloat 12s
            ease-in-out infinite alternate;
        }

        .hero-orbit-two {
          width: 650px;
          height: 250px;
          transform:
            translate(-50%, -50%)
            rotate(25deg);
          border-color: rgba(59,130,246,.09);
          animation: orbitFloat 9s
            ease-in-out infinite alternate-reverse;
        }

        .hero-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
        }

        .hero-glow-gold {
          left: -150px;
          top: 180px;
          background: rgba(245,217,139,.10);
          animation: glowFloat 9s
            ease-in-out infinite alternate;
        }

        .hero-glow-blue {
          right: -130px;
          bottom: 40px;
          background: rgba(37,99,235,.14);
          animation: glowFloat 11s
            ease-in-out infinite alternate-reverse;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: 1px solid
            rgba(245,217,139,.18);
          border-radius: 999px;
          padding: 9px 16px;
          background: rgba(245,217,139,.035);
          color: rgba(255,244,199,.7);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .25em;
          animation: fadeUp .9s
            cubic-bezier(.16,1,.3,1) both;
        }

        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow:
            0 0 12px
              rgba(245,217,139,.8);
          animation: pulseDot 2s
            ease-in-out infinite;
        }

        .hero-title {
          margin-top: 28px;
          line-height: .82;
        }

        .hero-title-main {
          display: block;
          font-size: clamp(
            4.2rem,
            11vw,
            10rem
          );
          background:
            linear-gradient(
              115deg,
              #fff8dd 0%,
              #f5d98b 30%,
              #b8892b 65%,
              #fff5c9 100%
            );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation:
            fadeUp 1s
              cubic-bezier(.16,1,.3,1) both,
            goldMove 8s linear infinite;
        }

        .hero-title-outline {
          display: block;
          margin-top: 12px;
          font-size: clamp(
            2.8rem,
            7vw,
            6.5rem
          );
          color: transparent;
          -webkit-text-stroke: 1px
            rgba(255,255,255,.65);
          animation: fadeUp 1s
            .15s
            cubic-bezier(.16,1,.3,1)
            both;
        }

        .hero-description {
          margin: 30px auto 0;
          max-width: 600px;
          color: rgba(255,255,255,.45);
          font-size: 14px;
          line-height: 1.8;
          animation: fadeUp 1s
            .25s
            cubic-bezier(.16,1,.3,1)
            both;
        }

        /* -----------------------------------------------
           COUNTDOWN
        ----------------------------------------------- */

        .countdown-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin: 48px auto 0;
          max-width: 1050px;
        }

        .countdown-card {
          position: relative;
          min-width: 0;
          padding: 1px;
          overflow: hidden;
          border-radius: 26px;
          background:
            linear-gradient(
              145deg,
              rgba(245,217,139,.55),
              rgba(255,255,255,.08) 38%,
              rgba(59,130,246,.15)
            );
          animation: cardUp .8s
            cubic-bezier(.16,1,.3,1)
            both;
        }

        .countdown-card::before {
          content: "";
          position: absolute;
          inset: -80%;
          background:
            conic-gradient(
              from 0deg,
              transparent 0 70%,
              rgba(255,255,255,.7) 82%,
              transparent 94%
            );
          animation: cardSpin 7s
            linear infinite;
        }

        .countdown-card-inner {
          position: relative;
          z-index: 1;
          min-width: 0;
          min-height: 205px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 25px;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(245,217,139,.11),
              transparent 55%
            ),
            #070a10;
        }

        .countdown-number-wrap {
          width: 100%;
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 0 12px;
        }

        .countdown-number {
          display: block;
          max-width: 100%;
          color: transparent;
          background:
            linear-gradient(
              180deg,
              #fff9dd,
              #f5d98b 48%,
              #b8892b
            );
          -webkit-background-clip: text;
          background-clip: text;
          font-size: clamp(
            3.2rem,
            7vw,
            7rem
          );
          line-height: .85;
          white-space: nowrap;
          overflow: visible;
          text-align: center;
          font-variant-numeric:
            tabular-nums;
          animation: numberIn .45s
            cubic-bezier(.16,1,.3,1);
        }

        .countdown-label {
          margin-top: 20px;
          color: rgba(245,217,139,.58);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .32em;
          text-transform: uppercase;
        }

        .countdown-line {
          position: absolute;
          bottom: 0;
          left: 15%;
          width: 70%;
          height: 1px;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(245,217,139,.65),
              transparent
            );
        }

        /* -----------------------------------------------
           PROGRESS
        ----------------------------------------------- */

        .progress-wrap {
          max-width: 820px;
          margin: 35px auto 0;
        }

        .progress-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: rgba(245,217,139,.45);
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .22em;
        }

        .progress-track {
          position: relative;
          height: 5px;
          margin-top: 10px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255,255,255,.08);
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          background:
            linear-gradient(
              90deg,
              #8f681f,
              #f5d98b,
              #fff8d7
            );
          box-shadow:
            0 0 18px
              rgba(245,217,139,.45);
          transition: width 1s ease;
        }

        .progress-shine {
          position: absolute;
          top: -4px;
          width: 18px;
          height: 13px;
          border-radius: 50%;
          background: white;
          filter: blur(5px);
          opacity: .7;
          transition: left 1s ease;
        }

        /* -----------------------------------------------
           BUTTONS
        ----------------------------------------------- */

        .birthday-controls {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 30px;
        }

        .gold-button,
        .outline-button {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 999px;
          padding: 0 25px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
          transition:
            transform .25s ease,
            background .25s ease,
            border-color .25s ease,
            box-shadow .25s ease;
        }

        .gold-button {
          border: 0;
          color: #050608;
          background:
            linear-gradient(
              100deg,
              #b8892b,
              #fff1b8,
              #c9a24b
            );
          background-size: 200% 100%;
          box-shadow:
            0 0 35px
              rgba(245,217,139,.22);
        }

        .gold-button:hover {
          transform: translateY(-3px);
          background-position: 100% 0;
          box-shadow:
            0 0 45px
              rgba(245,217,139,.38);
        }

        .outline-button {
          border: 1px solid
            rgba(245,217,139,.25);
          color: rgba(255,255,255,.7);
          background: rgba(255,255,255,.025);
        }

        .outline-button:hover {
          transform: translateY(-3px);
          border-color:
            rgba(245,217,139,.65);
          color: white;
          background:
            rgba(245,217,139,.06);
        }

        .firework-note {
          margin-top: 14px;
          color: rgba(245,217,139,.42);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        /* -----------------------------------------------
           TICKER
        ----------------------------------------------- */

        .ticker-shell {
          overflow: hidden;
          border-top: 1px solid
            rgba(245,217,139,.1);
          border-bottom: 1px solid
            rgba(245,217,139,.1);
          background:
            linear-gradient(
              90deg,
              rgba(245,217,139,.025),
              rgba(59,130,246,.04),
              rgba(245,217,139,.025)
            );
          padding: 14px 0;
        }

        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 38s linear infinite;
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 28px;
          margin: 0 25px;
          color: rgba(245,217,139,.52);
          font-size: 11px;
          letter-spacing: .22em;
        }

        .ticker-item b {
          color: rgba(245,217,139,.65);
          font-size: 7px;
        }

        /* -----------------------------------------------
           SECTIONS
        ----------------------------------------------- */

        .section-kicker {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(245,217,139,.58);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .28em;
        }

        .section-kicker::before {
          content: "";
          width: 35px;
          height: 1px;
          background: rgba(245,217,139,.5);
        }

        .section-title {
          margin-top: 13px;
          font-size: clamp(
            3rem,
            7vw,
            6.5rem
          );
          line-height: .9;
        }

        .section-description {
          margin-top: 13px;
          color: rgba(255,255,255,.4);
          font-size: 14px;
          line-height: 1.8;
        }

        .gold-text {
          background:
            linear-gradient(
              100deg,
              #fff7d6,
              #f5d98b,
              #b8892b,
              #fff7d6
            );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: goldMove 7s linear infinite;
        }

        /* -----------------------------------------------
           NUMBER CARDS
        ----------------------------------------------- */

        .number-card {
          position: relative;
          min-height: 260px;
          overflow: hidden;
          border: 1px solid
            rgba(245,217,139,.13);
          border-radius: 28px;
          padding: 30px;
          background:
            radial-gradient(
              circle at 90% 10%,
              rgba(59,130,246,.1),
              transparent 45%
            ),
            rgba(255,255,255,.025);
          transition:
            transform .4s ease,
            border-color .4s ease,
            box-shadow .4s ease;
        }

        .number-card:hover {
          transform: translateY(-6px);
          border-color:
            rgba(245,217,139,.42);
          box-shadow:
            0 25px 70px
              rgba(0,0,0,.3);
        }

        .number-card-index {
          color: rgba(245,217,139,.3);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .2em;
        }

        .number-card-label {
          margin-top: 35px;
          color: rgba(245,217,139,.5);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .22em;
        }

        .number-card-value {
          margin-top: 10px;
          overflow-wrap: anywhere;
          color: transparent;
          background:
            linear-gradient(
              180deg,
              #fff8da,
              #d5ae50
            );
          -webkit-background-clip: text;
          background-clip: text;
          font-size: clamp(
            2.4rem,
            5vw,
            4.8rem
          );
          line-height: 1;
          font-variant-numeric:
            tabular-nums;
        }

        /* -----------------------------------------------
           MILESTONES
        ----------------------------------------------- */

        .milestones-section {
          border-top: 1px solid
            rgba(255,255,255,.06);
          border-bottom: 1px solid
            rgba(255,255,255,.06);
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(59,130,246,.1),
              transparent 42%
            ),
            #04060b;
        }

        .milestone-grid {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 15px;
          margin-top: 45px;
        }

        .milestone-card {
          position: relative;
          min-height: 270px;
          overflow: hidden;
          border: 1px solid
            rgba(255,255,255,.08);
          border-radius: 26px;
          padding: 28px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.035),
              rgba(255,255,255,.012)
            );
          transition:
            transform .4s ease,
            border-color .4s ease,
            background .4s ease;
        }

        .milestone-card:hover {
          transform: translateY(-7px);
          border-color:
            rgba(245,217,139,.35);
          background:
            linear-gradient(
              145deg,
              rgba(245,217,139,.07),
              rgba(255,255,255,.015)
            );
        }

        .milestone-number {
          color: rgba(245,217,139,.25);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .2em;
        }

        .milestone-line {
          width: 45px;
          height: 2px;
          margin-top: 35px;
          background:
            linear-gradient(
              90deg,
              #f5d98b,
              transparent
            );
        }

        .milestone-title {
          margin-top: 25px;
          color: transparent;
          background:
            linear-gradient(
              180deg,
              #fff9dd,
              #d6ae4f
            );
          -webkit-background-clip: text;
          background-clip: text;
          font-size: clamp(
            1.8rem,
            3vw,
            3rem
          );
          line-height: .95;
        }

        .milestone-description {
          max-width: 330px;
          margin-top: 18px;
          color: rgba(255,255,255,.43);
          font-size: 13px;
          line-height: 1.8;
        }

        /* -----------------------------------------------
           WISH WALL
        ----------------------------------------------- */

        .wish-section {
          background:
            radial-gradient(
              circle at 50% 30%,
              rgba(245,217,139,.07),
              transparent 40%
            ),
            #03050a;
        }

        .wish-form {
          display: flex;
          gap: 10px;
          max-width: 700px;
          margin: 40px auto 0;
        }

        .wish-input {
          min-width: 0;
          flex: 1;
          height: 55px;
          border: 1px solid
            rgba(245,217,139,.18);
          border-radius: 999px;
          background:
            rgba(255,255,255,.035);
          padding: 0 22px;
          color: white;
          font-size: 13px;
          font-weight: 700;
          outline: none;
          transition:
            border-color .25s ease,
            box-shadow .25s ease;
        }

        .wish-input::placeholder {
          color: rgba(255,255,255,.25);
        }

        .wish-input:focus {
          border-color:
            rgba(245,217,139,.6);
          box-shadow:
            0 0 35px
              rgba(245,217,139,.08);
        }

        .wish-button {
          min-width: 150px;
        }

        .wish-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 28px;
        }

        .wish-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid
            rgba(245,217,139,.14);
          border-radius: 999px;
          background:
            rgba(245,217,139,.04);
          padding: 9px 13px;
          color: rgba(255,255,255,.7);
          font-size: 11px;
          font-weight: 800;
          animation: wishIn .45s
            cubic-bezier(.16,1,.3,1);
        }

        .wish-pill small {
          color: rgba(245,217,139,.45);
          font-size: 9px;
        }

        /* -----------------------------------------------
           FOOTER
        ----------------------------------------------- */

        .birthday-footer {
          border-top: 1px solid
            rgba(255,255,255,.07);
          background: #020308;
        }

        /* -----------------------------------------------
           ANIMATIONS
        ----------------------------------------------- */

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: none;
          }
        }

        @keyframes cardUp {
          from {
            opacity: 0;
            transform: translateY(35px)
              scale(.97);
          }

          to {
            opacity: 1;
            transform: none;
          }
        }

        @keyframes numberIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }

          to {
            opacity: 1;
            transform: none;
          }
        }

        @keyframes cardSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbitFloat {
          from {
            transform:
              translate(-50%, -50%)
              rotate(-18deg)
              scale(1);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(-13deg)
              scale(1.06);
          }
        }

        @keyframes glowFloat {
          from {
            transform: translate(0, 0)
              scale(1);
          }

          to {
            transform: translate(45px, -30px)
              scale(1.2);
          }
        }

        @keyframes pulseDot {
          0%,
          100% {
            opacity: .45;
            transform: scale(.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes goldMove {
          to {
            background-position: -300% 0;
          }
        }

        @keyframes ticker {
          to {
            transform: translateX(-25%);
          }
        }

        @keyframes wishIn {
          from {
            opacity: 0;
            transform: translateY(10px)
              scale(.95);
          }

          to {
            opacity: 1;
            transform: none;
          }
        }

        .reveal {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity .8s
              cubic-bezier(.16,1,.3,1),
            transform .8s
              cubic-bezier(.16,1,.3,1);
        }

        .reveal-visible {
          opacity: 1;
          transform: none;
        }

        /* -----------------------------------------------
           TABLET
        ----------------------------------------------- */

        @media (max-width: 900px) {
          .countdown-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            max-width: 650px;
          }

          .countdown-card-inner {
            min-height: 185px;
          }

          .milestone-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .hero-orbit-one {
            width: 700px;
          }

          .hero-orbit-two {
            width: 500px;
          }
        }

        /* -----------------------------------------------
           MOBILE
        ----------------------------------------------- */

        @media (max-width: 640px) {
          .birthday-hero {
            min-height: auto;
            padding-top: 105px;
            padding-bottom: 65px;
          }

          .hero-45 {
            top: 90px;
            font-size: 75vw;
          }

          .hero-orbit-one {
            width: 480px;
            height: 190px;
          }

          .hero-orbit-two {
            width: 360px;
            height: 150px;
          }

          .hero-glow {
            width: 220px;
            height: 220px;
            filter: blur(80px);
          }

          .hero-title {
            margin-top: 22px;
          }

          .hero-title-main {
            font-size: clamp(
              3.25rem,
              15vw,
              5rem
            );
          }

          .hero-title-outline {
            margin-top: 9px;
            font-size: clamp(
              2.1rem,
              10vw,
              3.6rem
            );
            -webkit-text-stroke: 1px
              rgba(255,255,255,.5);
          }

          .hero-description {
            margin-top: 22px;
            font-size: 12px;
          }

          .countdown-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 9px;
            margin-top: 30px;
          }

          .countdown-card {
            border-radius: 20px;
          }

          .countdown-card-inner {
            min-height: 150px;
            border-radius: 19px;
          }

          .countdown-number-wrap {
            padding: 0 5px;
          }

          .countdown-number {
            font-size: clamp(
              3.1rem,
              15vw,
              4.5rem
            );
            letter-spacing: -.07em;
          }

          .countdown-label {
            margin-top: 14px;
            font-size: 7px;
            letter-spacing: .25em;
          }

          .progress-wrap {
            margin-top: 27px;
          }

          .progress-meta {
            font-size: 6.5px;
            letter-spacing: .15em;
          }

          .birthday-controls {
            flex-direction: column;
            width: 100%;
          }

          .gold-button,
          .outline-button {
            width: 100%;
            max-width: 320px;
          }

          .section-title {
            font-size: clamp(
              2.8rem,
              14vw,
              4.5rem
            );
          }

          .number-card {
            min-height: 220px;
            padding: 24px;
          }

          .milestone-grid {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .milestone-card {
            min-height: 235px;
          }

          .wish-form {
            flex-direction: column;
          }

          .wish-input {
            width: 100%;
          }

          .wish-button {
            width: 100%;
          }

          .wish-pill {
            max-width: 100%;
            flex-wrap: wrap;
            justify-content: center;
          }

          .wish-pill small {
            width: 100%;
          }
        }

        /* -----------------------------------------------
           VERY SMALL PHONES
        ----------------------------------------------- */

        @media (max-width: 380px) {
          .countdown-card-inner {
            min-height: 135px;
          }

          .countdown-number {
            font-size: 2.8rem;
          }

          .countdown-label {
            font-size: 6px;
          }

          .hero-title-main {
            font-size: 3rem;
          }

          .hero-title-outline {
            font-size: 1.9rem;
          }
        }

        /* -----------------------------------------------
           REDUCED MOTION
        ----------------------------------------------- */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }

          .reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}
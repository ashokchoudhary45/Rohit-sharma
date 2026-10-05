"use client";

import { useState } from "react";

/* =========================================================
   LOCAL SITE CHROME
   No ../site-chrome dependency
========================================================= */

const display = {
  className: "font-black tracking-[-0.04em] uppercase",
  style: {
    fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
  },
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

function Hero({ line1, line2, size = "" }) {
  return (
    <section className="relative overflow-hidden bg-black px-5 pb-24 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
      <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <p className="mb-6 text-xs font-black uppercase tracking-[0.35em] text-blue-400">
          ROHIT SHARMA • 45
        </p>

        <h1
          className={`font-black uppercase tracking-[-0.04em] leading-[0.78] text-[18vw] sm:text-[15vw] ${
            size || "lg:text-[12rem]"
          }`}
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
    <h2 className="font-black uppercase tracking-[-0.04em] text-5xl leading-none sm:text-7xl lg:text-8xl">
      {children}
    </h2>
  );
}

function Cta({ title, links = [] }) {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 lg:px-8 lg:py-32">
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <h2 className="font-black uppercase tracking-[-0.04em] text-6xl leading-none sm:text-8xl lg:text-[9rem]">
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

/* =========================================================
   WALLPAPER DATA
========================================================= */

const wallpapers = [
  {
    title: "Hitman",
    category: "Portrait",
    glyph: "45",
    hue: "#2f6bff",
  },
  {
    title: "Captain Rohit",
    category: "Captaincy",
    glyph: "C",
    hue: "#1e4fd8",
  },
  {
    title: "The Indian Opener",
    category: "Team India",
    glyph: "264",
    hue: "#3b82f6",
  },
  {
    title: "The Hitman",
    category: "Cricket",
    glyph: "6",
    hue: "#2563eb",
  },
  {
    title: "Stadium Lights",
    category: "Matchday",
    glyph: "45",
    hue: "#4f8bff",
  },
  {
    title: "Legacy",
    category: "Legend",
    glyph: "24",
    hue: "#1d4ed8",
  },
];

const SIZES = {
  Desktop: {
    w: 1920,
    h: 1080,
    aspect: "aspect-[16/10]",
  },
  Mobile: {
    w: 1080,
    h: 1920,
    aspect: "aspect-[9/14]",
  },
};

/* =========================================================
   CANVAS WALLPAPER GENERATOR
========================================================= */

async function renderWallpaper(wp, size) {
  const { w, h } = SIZES[size];

  const font =
    display.style.fontFamily;

  try {
    await document.fonts.load(
      `100px ${font}`
    );
  } catch {}

  const c =
    document.createElement("canvas");

  c.width = w;
  c.height = h;

  const ctx = c.getContext("2d");

  if (!ctx) {
    throw new Error(
      "Canvas is not supported."
    );
  }

  /* -------------------------------------------------------
     BACKGROUND
  ------------------------------------------------------- */

  const bg =
    ctx.createLinearGradient(
      0,
      0,
      0,
      h
    );

  bg.addColorStop(
    0,
    "#02040a"
  );

  bg.addColorStop(
    0.6,
    "#04102e"
  );

  bg.addColorStop(
    1,
    "#000"
  );

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  /* -------------------------------------------------------
     GLOW
  ------------------------------------------------------- */

  const g =
    ctx.createRadialGradient(
      w * 0.7,
      h * 0.3,
      0,
      w * 0.7,
      h * 0.3,
      Math.max(w, h) * 0.7
    );

  g.addColorStop(
    0,
    wp.hue + "99"
  );

  g.addColorStop(
    1,
    "transparent"
  );

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  /* -------------------------------------------------------
     FLOODLIGHT BEAMS
  ------------------------------------------------------- */

  [
    [0.18, 0.31, 0.22],
    [0.78, -0.25, 0.18],
  ].forEach(([x, rot, a]) => {
    ctx.save();

    ctx.translate(
      w * x,
      -h * 0.1
    );

    ctx.rotate(rot);

    const beam =
      ctx.createLinearGradient(
        0,
        0,
        0,
        h * 1.3
      );

    beam.addColorStop(
      0,
      `rgba(120,170,255,${a})`
    );

    beam.addColorStop(
      1,
      "rgba(120,170,255,0)"
    );

    ctx.fillStyle = beam;

    ctx.fillRect(
      -w * 0.05,
      0,
      w * 0.1,
      h * 1.3
    );

    ctx.restore();
  });

  /* -------------------------------------------------------
     GIANT OUTLINED GLYPH
  ------------------------------------------------------- */

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const size0 =
    Math.min(w, h) *
    (wp.glyph.length > 2
      ? 0.7
      : 1.0);

  ctx.font = `${size0}px ${font}`;

  ctx.lineWidth =
    Math.max(3, w / 450);

  ctx.strokeStyle =
    "rgba(255,255,255,.85)";

  ctx.strokeText(
    wp.glyph,
    w / 2,
    h * 0.45
  );

  /* -------------------------------------------------------
     TITLE BLOCK
  ------------------------------------------------------- */

  const pad =
    w * 0.06;

  ctx.textAlign = "left";
  ctx.textBaseline =
    "alphabetic";

  ctx.fillStyle =
    "#8fb3ff";

  ctx.font = `bold ${Math.round(
    Math.min(w, h) * 0.028
  )}px sans-serif`;

  ctx.fillText(
    wp.category.toUpperCase(),
    pad,
    h -
      pad -
      Math.min(w, h) * 0.12
  );

  ctx.fillStyle = "#fff";

  ctx.font = `${Math.round(
    Math.min(w, h) * 0.1
  )}px ${font}`;

  ctx.fillText(
    wp.title.toUpperCase(),
    pad,
    h - pad
  );

  /* -------------------------------------------------------
     BRAND
  ------------------------------------------------------- */

  ctx.textAlign = "right";

  ctx.fillStyle =
    "rgba(255,255,255,.5)";

  ctx.font = `${Math.round(
    Math.min(w, h) * 0.035
  )}px ${font}`;

  ctx.fillText(
    "ROHIT SHARMA",
    w - pad,
    pad +
      Math.min(w, h) *
        0.035
  );

  return c;
}

/* =========================================================
   PAGE
========================================================= */

export default function WallpapersPage() {
  const [size, setSize] =
    useState("Desktop");

  const [busy, setBusy] =
    useState(null);

  /* -------------------------------------------------------
     DOWNLOAD
  ------------------------------------------------------- */

  const download = async (
    wp,
    i
  ) => {
    setBusy(i);

    try {
      const canvas =
        await renderWallpaper(
          wp,
          size
        );

      const a =
        document.createElement(
          "a"
        );

      a.download = `rohit-sharma-${wp.title
        .toLowerCase()
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )}-${size.toLowerCase()}.png`;

      a.href =
        canvas.toDataURL(
          "image/png"
        );

      a.click();
    } finally {
      setBusy(null);
    }
  };

  return (
    <Page active="">
      <Hero
        line1="THE"
        line2="WALLPAPERS"
        size="lg:text-[11rem]"
      />

      {/* =================================================
          WALLPAPER SECTION
      ================================================= */}

      <section className="bg-black px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            PICK.{" "}
            <span className="text-blue-500">
              DOWNLOAD.
            </span>
          </Title>

          {/* SIZE SELECTOR */}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {Object.entries(SIZES).map(
              ([k, v]) => (
                <button
                  key={k}
                  onClick={() =>
                    setSize(k)
                  }
                  className={`rounded-full px-6 py-2.5 text-sm font-black transition duration-300 ${
                    size === k
                      ? "bg-blue-600 shadow-[0_0_40px_rgba(47,107,255,.6)]"
                      : "border border-white/20 text-white/55 hover:border-white hover:text-white"
                  }`}
                >
                  {k}{" "}
                  <span className="font-medium opacity-60">
                    {v.w}×{v.h}
                  </span>
                </button>
              )
            )}
          </div>

          {/* WALLPAPER GRID */}

          <div
            key={size}
            className="swap mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {wallpapers.map(
              (wp, i) => (
                <div
                  key={
                    wp.title + i
                  }
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:border-blue-400"
                >
                  {/* PREVIEW */}

                  <div
                    className={`relative ${SIZES[size].aspect} overflow-hidden`}
                    style={{
                      background: `radial-gradient(circle at 70% 30%, ${wp.hue}88, transparent 60%), linear-gradient(180deg,#02040a,#04102e 60%,#000)`,
                    }}
                  >
                    <div
                      className={`font-black uppercase tracking-[-0.04em] outline absolute inset-0 flex items-center justify-center leading-none opacity-80 transition duration-700 group-hover:scale-110 ${
                        wp.glyph
                          .length > 2
                          ? "text-[7rem]"
                          : "text-[11rem]"
                      }`}
                    >
                      {wp.glyph}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-xs font-bold text-blue-300">
                        {wp.category}
                      </p>

                      <h3 className="font-black uppercase tracking-[-0.04em] text-3xl">
                        {wp.title.toUpperCase()}
                      </h3>
                    </div>
                  </div>

                  {/* DOWNLOAD BAR */}

                  <div className="flex items-center justify-between p-5">
                    <span className="text-sm text-white/45">
                      {size} · PNG
                    </span>

                    <button
                      onClick={() =>
                        download(
                          wp,
                          i
                        )
                      }
                      disabled={
                        busy === i
                      }
                      className="sweep rounded-full bg-blue-600 px-6 py-2.5 text-sm font-black transition hover:scale-105 disabled:opacity-60"
                    >
                      {busy === i
                        ? "Preparing…"
                        : "Download"}
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          CTA
      ================================================= */}

      <Cta
        title="MORE TO SEE."
        links={[
          ["Gallery", "/gallery"],
          ["Videos", "/videos"],
          ["Quiz", "/quiz"],
          ["Career", "/career"],
        ]}
      />
    </Page>
  );
}
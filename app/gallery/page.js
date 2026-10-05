"use client";

import { useEffect, useState } from "react";

/* =========================================================
   ROHIT SHARMA — GALLERY
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
    ["Gallery", "/gallery"],
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

      <div className="absolute right-[-10%] top-[20%] h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-[110px]" />

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

/* ---------- GALLERY DATA ---------- */

const gallery = [
  {
    title: "The Hitman",
    category: "Portrait",
    src: "/images/rohit-profile.jpg",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "On The Field",
    category: "Cricket",
    src: null,
    span: "",
  },
  {
    title: "Match Day",
    category: "Action",
    src: null,
    span: "",
  },
  {
    title: "The Captain",
    category: "Leadership",
    src: null,
    span: "lg:row-span-2",
  },
  {
    title: "Cricket Stadium",
    category: "Stadium",
    src: null,
    span: "",
  },
  {
    title: "Game Face",
    category: "Match",
    src: null,
    span: "lg:col-span-2",
  },
];

const CATS = [
  "All",
  ...Array.from(new Set(gallery.map((g) => g.category))),
];

/* ---------- PAGE ---------- */

export default function GalleryPage() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);

  const shown = gallery.filter(
    (g) => cat === "All" || g.category === cat
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(null);
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const Visual = ({ g, big = false }) =>
    g.src ? (
      <img
        src={g.src}
        alt={g.title}
        className={`h-full w-full object-cover ${
          big
            ? ""
            : "transition duration-700 group-hover:scale-110"
        }`}
      />
    ) : (
      <div className="relative h-full w-full bg-[radial-gradient(circle_at_60%_30%,rgba(47,107,255,.5),transparent_60%),linear-gradient(180deg,#04102e,#000)]">
        <div
          className={`${display.className} absolute inset-0 flex items-center justify-center text-[10rem] leading-none opacity-30 transition duration-700 ${
            big
              ? ""
              : "group-hover:scale-125 group-hover:opacity-60"
          }`}
        >
          {g.title[0]}
        </div>
      </div>
    );

  return (
    <Page active="Gallery">
      <Hero line1="THE" line2="GALLERY" />

      {/* GALLERY */}
      <section className="bg-black px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Title>
            MOMENTS. <span className="text-blue-500">LEGACY.</span>
          </Title>

          <div className="mt-10 flex flex-wrap gap-3">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-6 py-2.5 text-sm font-black transition duration-300 ${
                  cat === c
                    ? "bg-blue-600 shadow-[0_0_40px_rgba(47,107,255,.6)]"
                    : "border border-white/20 text-white/55 hover:border-white hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div
            key={cat}
            className="swap mt-8 grid auto-rows-[18rem] gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {shown.map((g) => (
              <button
                key={g.title}
                onClick={() => setOpen(g)}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 text-left transition duration-300 hover:border-blue-400 ${
                  cat === "All" ? g.span : ""
                }`}
                aria-label={`Open ${g.title}`}
              >
                <Visual g={g} />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-bold text-blue-300">
                    {g.category}
                  </p>

                  <h3
                    className={`${display.className} text-4xl transition duration-500 group-hover:translate-x-2`}
                  >
                    {g.title.toUpperCase()}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {open && (
        <div
          className="swap fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-5 backdrop-blur-md"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-2xl transition hover:bg-white hover:text-black"
          >
            ×
          </button>

          <div
            className="relative h-[75vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Visual g={open} big />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-8 pt-24">
              <p className="text-sm font-bold text-blue-300">
                {open.category}
              </p>

              <h3
                className={`${display.className} text-5xl sm:text-7xl`}
              >
                {open.title.toUpperCase()}
              </h3>
            </div>
          </div>
        </div>
      )}

      <Cta
        title="WATCH IT LIVE."
        links={[
          ["Videos", "/videos"],
          ["Career", "/career"],
          ["Records", "/records"],
          ["News", "/news"],
        ]}
      />

      <style jsx global>{`
        .outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.75);
        }

        .swap {
          animation: galleryFade 0.35s ease both;
        }

        @keyframes galleryFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Page>
  );
}
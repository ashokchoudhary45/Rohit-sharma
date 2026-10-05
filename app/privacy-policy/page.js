"use client";

import Link from "next/link";

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

/* =========================================================
   REVEAL
========================================================= */

function Reveal({ children }) {
  return (
    <div className="animate-[fadeUp_.7s_ease-out_both]">
      {children}
    </div>
  );
}

/* =========================================================
   POLICY DATA
========================================================= */

const sections = [
  [
    "Introduction",
    [
      "Welcome to the Rohit Sharma Fan Website. This is an independent fan-made website created for informational and entertainment purposes. We respect your privacy and aim to be transparent about how this website handles information.",
    ],
  ],

  [
    "Information We Collect",
    [
      "This website does not intentionally collect sensitive personal information from visitors.",
      "If you contact the website creator by email, the information you voluntarily provide, such as your name and email address, may be used only to respond to your message.",
    ],
  ],

  [
    "Cookies",
    [
      "This website may use cookies or similar technologies if third-party services, analytics tools or other website functionality require them.",
      "Cookies may help improve website performance and understand general website usage.",
    ],
  ],

  [
    "Third-Party Links",
    [
      "This website may contain links to third-party websites and platforms, including YouTube, BCCI, ICC, cricket news websites and other external services.",
      "When you leave this website and visit an external platform, that platform's own privacy policy and terms may apply. We are not responsible for the privacy practices of third-party websites.",
    ],
  ],

  [
    "External Content",
    [
      "Some photographs, videos, articles and other materials may be displayed through or linked to external platforms. Such content remains subject to the rights and policies of its respective owners.",
    ],
  ],

  [
    "Data Security",
    [
      "Reasonable measures are taken to keep information submitted directly to the website creator secure. However, no method of transmitting or storing information online can be guaranteed to be completely secure.",
    ],
  ],

  [
    "Children's Privacy",
    [
      "This website is not intended to knowingly collect personal information from children. Visitors should avoid submitting unnecessary personal information through any contact method.",
    ],
  ],

  [
    "Changes to This Policy",
    [
      "This Privacy Policy may be updated from time to time to reflect changes to the website, services or applicable requirements. Any updated version will be published on this page.",
    ],
  ],

  [
    "Contact",
    [
      "If you have questions regarding this Privacy Policy or the website's handling of information, please contact the website creator.",
    ],
  ],
];

/* =========================================================
   HELPERS
========================================================= */

const slug = (t) =>
  t.toLowerCase().replace(/[^a-z]+/g, "-");

/* =========================================================
   PAGE
========================================================= */

export default function PrivacyPolicyPage() {
  return (
    <Page active="">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden pb-16 pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(47,107,255,.35),transparent_55%),linear-gradient(180deg,#02040a,#04102e_70%,#000)]" />

        <div
          className={`${display.className} outline-blue pointer-events-none absolute right-[-3%] top-[8%] select-none text-[34vw] leading-none opacity-50`}
          aria-hidden
        >
          45
        </div>

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <h1 className={`${display.className} leading-[0.85]`}>
            <span
              className="hero-in block text-[20vw] lg:text-[11rem]"
              style={{ animationDelay: ".1s" }}
            >
              PRIVACY
            </span>

            <span
              className="hero-in outline block text-[20vw] lg:text-[11rem]"
              style={{ animationDelay: ".25s" }}
            >
              POLICY
            </span>
          </h1>

          <p
            className="hero-in mt-6 text-sm font-bold text-white/45"
            style={{ animationDelay: ".45s" }}
          >
            Last updated: September 2026
          </p>
        </div>
      </section>

      {/* =================================================
          BODY
      ================================================= */}

      <section className="bg-black px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[16rem_1fr]">
          {/* =================================================
              INDEX
          ================================================= */}

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-sm font-bold text-blue-400">
              On this page
            </p>

            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-white/10 lg:pb-0">
              {sections.map(([t]) => (
                <li key={t} className="shrink-0">
                  <a
                    href={`#${slug(t)}`}
                    className="block rounded-full border border-white/15 px-4 py-2 text-sm text-white/55 transition hover:border-blue-400 hover:text-white lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:border-transparent lg:py-2.5 lg:hover:border-blue-500"
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* =================================================
              POLICY SECTIONS
          ================================================= */}

          <div className="max-w-3xl space-y-4">
            {sections.map(
              ([title, paras], i) => {
                const last =
                  i === sections.length - 1;

                return (
                  <Reveal key={title}>
                    <article
                      id={slug(title)}
                      className={`group relative scroll-mt-28 overflow-hidden rounded-3xl border p-7 transition duration-300 hover:border-blue-500/50 md:p-10 ${
                        last
                          ? "border-blue-500/40 bg-gradient-to-br from-blue-600/30 via-blue-950/20 to-black"
                          : "border-white/10 bg-white/[0.025]"
                      }`}
                    >
                      <div
                        className={`${display.className} outline absolute -right-2 -top-4 text-[7rem] leading-none opacity-15 transition duration-500 group-hover:opacity-35`}
                      >
                        {String(i + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <h2
                        className={`${display.className} relative text-4xl md:text-5xl`}
                      >
                        {title.toUpperCase()}
                      </h2>

                      {paras.map((p) => (
                        <p
                          key={p}
                          className="relative mt-5 leading-8 text-white/60"
                        >
                          {p}
                        </p>
                      ))}

                      {last && (
                        <Link
                          href="/contact"
                          className="sweep relative mt-7 inline-flex rounded-full bg-blue-600 px-8 py-4 text-sm font-black tracking-wide shadow-[0_0_40px_rgba(47,107,255,.5)] transition hover:scale-105"
                        >
                          CONTACT US
                        </Link>
                      )}
                    </article>
                  </Reveal>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          LOCAL ANIMATION
      ================================================= */}

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .outline {
          color: transparent;
          -webkit-text-stroke: 1px
            rgba(255, 255, 255, 0.28);
        }

        .outline-blue {
          color: transparent;
          -webkit-text-stroke: 1px
            rgba(47, 107, 255, 0.6);
        }

        .hero-in {
          animation: fadeUp 0.8s ease-out both;
        }

        .sweep {
          position: relative;
          overflow: hidden;
        }

        .sweep::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-110%);
          background: linear-gradient(
            110deg,
            transparent,
            rgba(255, 255, 255, 0.22),
            transparent
          );
          transition: transform 0.7s ease;
        }

        .sweep:hover::after {
          transform: translateX(110%);
        }
      `}</style>
    </Page>
  );
}
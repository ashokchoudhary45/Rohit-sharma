"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Anton } from "next/font/google";

const display = Anton({ weight: "400", subsets: ["latin"] });

// TODO: replace with your real email address
const EMAIL = "YOUR_EMAIL@example.com";

const topics = [
  { title: "Corrections", text: "Spotted a wrong stat?", icon: "✓", subject: "Correction" },
  { title: "Suggestions", text: "Want a new section?", icon: "+", subject: "Suggestion" },
  { title: "Broken links", text: "Something not working?", icon: "!", subject: "Broken link" },
];

const navLinks = [
  ["Home", "/"], ["Profile", "/profile"], ["Career", "/career"], ["Stats", "/stats"],
  ["Records", "/records"], ["IPL", "/ipl"], ["News", "/news"], ["Contact", "/contact"],
];

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-blue-500/40">
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .hero-in { opacity: 0; transform: translateY(60px) skewY(2deg); animation: heroIn 1s cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes heroIn { to { opacity: 1; transform: none; } }
        .outline { -webkit-text-stroke: 2px rgba(255,255,255,.9); color: transparent; }
        .outline-blue { -webkit-text-stroke: 2px #2f6bff; color: transparent; }
        .sweep { position: relative; overflow: hidden; }
        .sweep::after { content: ""; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.35) 50%, transparent 65%); transform: translateX(-120%); transition: transform .7s ease; }
        .sweep:hover::after { transform: translateX(120%); }
        :focus-visible { outline: 2px solid #5b8cff; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .hero-in { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className={`${display.className} text-2xl tracking-wide`}>
            ROHIT<span className="text-blue-500">SHARMA</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map(([t, h]) => (
              <Link key={t} href={h} className={`text-sm font-bold transition hover:text-white ${t === "Contact" ? "text-blue-400" : "text-white/55"}`}>
                {t}
              </Link>
            ))}
          </div>
          <Link href="/" className="rounded-full border border-white/25 px-5 py-2 text-xs font-bold transition hover:bg-white hover:text-black md:hidden">
            ← Home
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-[75vh] items-end overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(47,107,255,.45),transparent_55%),linear-gradient(180deg,#02040a,#04102e_60%,#000)]" />
        <div className="absolute -top-40 right-[18%] h-[120%] w-48 -rotate-[14deg] bg-gradient-to-b from-sky-300/20 to-transparent blur-3xl" />
        <div className={`${display.className} outline-blue pointer-events-none absolute right-[-3%] top-[10%] select-none text-[42vw] leading-none opacity-60`} aria-hidden>45</div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8">
          <h1 className={`${display.className} leading-[0.85]`}>
            <span className="hero-in block text-[22vw] lg:text-[13rem]" style={{ animationDelay: ".1s" }}>GET IN</span>
            <span className="hero-in outline block text-[22vw] lg:text-[13rem]" style={{ animationDelay: ".25s" }}>TOUCH</span>
          </h1>
        </div>
      </section>

      {/* EMAIL */}
      <section className="relative bg-black px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="group relative overflow-hidden rounded-3xl border border-blue-500/40 bg-gradient-to-br from-blue-600/40 via-blue-950/30 to-black p-8 sm:p-14">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl transition duration-700 group-hover:scale-150" />
            <p className="relative text-sm font-bold text-blue-300">Email the creator</p>
            <a
              href={`mailto:${EMAIL}`}
              className={`${display.className} relative mt-4 block break-all text-4xl leading-tight transition hover:text-blue-300 sm:text-7xl`}
            >
              {EMAIL}
            </a>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${EMAIL}`} className="sweep rounded-full bg-white px-8 py-4 text-sm font-black tracking-wide text-black transition hover:scale-105">
                SEND EMAIL
              </a>
              <button onClick={copy} className="rounded-full border border-white/30 px-8 py-4 text-sm font-black tracking-wide backdrop-blur transition hover:bg-white hover:text-black">
                {copied ? "COPIED ✓" : "COPY ADDRESS"}
              </button>
            </div>
          </div>

          {/* TOPICS */}
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {topics.map((t) => (
              <a
                key={t.title}
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Rohit Sharma site: ${t.subject}`)}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-400 hover:bg-blue-600/10"
              >
                <div className={`${display.className} outline absolute -right-2 -top-6 text-[9rem] leading-none opacity-20 transition duration-500 group-hover:scale-110 group-hover:opacity-50`}>
                  {t.icon}
                </div>
                <h2 className={`${display.className} relative mt-20 text-4xl`}>{t.title.toUpperCase()}</h2>
                <p className="relative mt-1 text-sm text-white/50">{t.text}</p>
                <p className="relative mt-5 text-sm font-black text-blue-400 transition group-hover:translate-x-2">Write to us →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#02040a] px-5 py-14 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className={`${display.className} text-3xl`}>ROHIT<span className="text-blue-500">SHARMA</span></div>
            <p className="mt-3 max-w-lg text-xs text-white/35">
              Independent fan-made site, not affiliated with Rohit Sharma, the BCCI, the ICC, Mumbai Indians or any other cricket organisation. © {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/50">
            {[["Profile", "/profile"], ["Career", "/career"], ["Stats", "/stats"], ["Records", "/records"], ["IPL", "/ipl"], ["Gallery", "/gallery"], ["Videos", "/videos"], ["News", "/news"], ["Privacy", "/privacy-policy"]].map(([t, h]) => (
              <Link key={t} href={h} className="transition hover:text-white">{t}</Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

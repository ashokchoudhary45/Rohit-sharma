"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=2200&q=90')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
        <div className="max-w-4xl">
          {/* Small Label */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              The Hitman • 45
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl font-black leading-[0.95] tracking-tight md:text-8xl lg:text-[110px]">
            ROHIT
            <span className="block text-blue-500">SHARMA</span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            Explore the journey of one of cricket's most celebrated
            batsmen — from his early days to record-breaking performances,
            captaincy, World Cups and an unforgettable legacy.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/profile"
              className="rounded-full bg-blue-600 px-7 py-4 text-center text-sm font-bold transition hover:bg-blue-500"
            >
              Explore Rohit →
            </Link>

            <Link
              href="/stats"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-center text-sm font-bold backdrop-blur-md transition hover:bg-white/10"
            >
              View Career Stats
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-14 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="border-l border-white/10 pl-4">
              <p className="text-2xl font-black md:text-3xl">45</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/35">
                Jersey
              </p>
            </div>

            <div className="border-l border-white/10 pl-4">
              <p className="text-2xl font-black md:text-3xl">264</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/35">
                ODI Best
              </p>
            </div>

            <div className="border-l border-white/10 pl-4">
              <p className="text-2xl font-black md:text-3xl">3</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/35">
                ODI 200s
              </p>
            </div>

            <div className="border-l border-white/10 pl-4">
              <p className="text-2xl font-black md:text-3xl">5</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/35">
                IPL Titles
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/30 md:flex">
        <span className="text-[10px] font-bold uppercase tracking-[0.35em]">
          Scroll to explore
        </span>

        <div className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/profile" },
    { name: "Career", href: "/career" },
    { name: "Stats", href: "/stats" },
    { name: "Records", href: "/records" },
    { name: "Captaincy", href: "/captaincy" },
    { name: "IPL", href: "/ipl" },
    { name: "World Cups", href: "/world-cups" },
    { name: "Centuries", href: "/centuries" },
    { name: "Awards", href: "/awards" },
    { name: "Gallery", href: "/gallery" },
    { name: "Videos", href: "/videos" },
    { name: "Wallpapers", href: "/wallpapers" },
    { name: "Quiz", href: "/quiz" },
    { name: "News", href: "/news" },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          ROHIT <span className="text-blue-500">SHARMA</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition hover:text-blue-400"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-5 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-blue-500/10 hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
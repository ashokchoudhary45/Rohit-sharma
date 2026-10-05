"use client";

import Link from "next/link";

export default function Footer() {
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
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-black tracking-tight"
            >
              ROHIT <span className="text-blue-500">SHARMA</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
              A fan-made digital tribute celebrating the career, records,
              achievements and legacy of Rohit Sharma.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400">
              The Hitman • 45
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-white/80">
              Explore
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/40 transition hover:text-blue-400"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-white/80">
              Information
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="text-sm text-white/40 transition hover:text-blue-400"
              >
                Contact
              </Link>

              <Link
                href="/privacy-policy"
                className="text-sm text-white/40 transition hover:text-blue-400"
              >
                Privacy Policy
              </Link>

              <p className="pt-3 text-xs leading-6 text-white/25">
                This is an independent fan-made website and is not officially
                affiliated with Rohit Sharma, BCCI, ICC, Mumbai Indians or any
                other cricket organisation.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-xs text-white/30 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Rohit Sharma Fan Website. All rights
            reserved.
          </p>

          <p>
            Made with ❤️ for the Hitman
          </p>
        </div>
      </div>
    </footer>
  );
}
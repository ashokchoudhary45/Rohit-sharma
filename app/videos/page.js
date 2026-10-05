"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const VIDEOS = [
  // =========================================================
  // BCCI
  // =========================================================
  {
    id: "bcci-2026-1",
    source: "BCCI",
    year: "2026",
    format: "ODI",
    category: "Highlights",
    title: "Rohit Sharma steadies the ship with a composed Fifty",
    date: "03 Oct 2026",
    url: "https://www.bcci.tv/videos/s-rohit-sharma-steadies-the-ship-with-a-composed-fifty-rj8m1v",
  },
  {
    id: "bcci-2026-2",
    source: "BCCI",
    year: "2026",
    format: "ODI",
    category: "Highlights",
    title: "4,6,4: Rohit Sharma starts the chase in top gear",
    date: "30 Sep 2026",
    url: "https://www.bcci.tv/videos/s-464-rohit-sharma-starts-the-chase-in-top-gear-mj8u7",
  },
  {
    id: "bcci-2026-3",
    source: "BCCI",
    year: "2026",
    format: "ODI",
    category: "Highlights",
    title: "IND vs WI 2026, 2nd ODI: Rohit Sharma Six",
    date: "30 Sep 2026",
    url: "https://www.bcci.tv/videos/s-ind-vs-wi-2026-2nd-odi-rohit-sharma-six-o0qmd",
  },
  {
    id: "bcci-2026-4",
    source: "BCCI",
    year: "2026",
    format: "ODI",
    category: "Highlights",
    title: "IND vs WI 2026, 2nd ODI: Rohit Sharma Six",
    date: "30 Sep 2026",
    url: "https://www.bcci.tv/videos/s-ind-vs-wi-2026-2nd-odi-rohit-sharma-six-3z48rq",
  },
  {
    id: "bcci-2026-5",
    source: "BCCI",
    year: "2026",
    format: "ODI",
    category: "Wicket",
    title: "IND vs WI 2026, 2nd ODI: Rohit Sharma Wicket",
    date: "30 Sep 2026",
    url: "https://www.bcci.tv/videos/s-ind-vs-wi-2026-2nd-odi-rohit-sharma-wicket-zguwd",
  },
  {
    id: "bcci-2026-6",
    source: "BCCI",
    year: "2026",
    format: "ODI",
    category: "Highlights",
    title: "IND vs WI 2026, 1st ODI: Rohit Sharma Six",
    date: "27 Sep 2026",
    url: "https://www.bcci.tv/videos/s-ind-vs-wi-2026-1st-odi-rohit-sharma-six-9cyzd",
  },
  {
    id: "bcci-2026-7",
    source: "BCCI",
    year: "2026",
    format: "ODI",
    category: "Interview",
    title: "Up and running in style, ft. Rohit Sharma",
    date: "27 Sep 2026",
    url: "https://www.bcci.tv/videos/s-up-and-running-in-style-ft-rohit-sharma-036oa9",
  },
  {
    id: "bcci-2026-8",
    source: "BCCI",
    year: "2026",
    format: "ODI",
    category: "Highlights",
    title: "IND vs AFG 2026, 1st ODI: Rohit Sharma Six",
    date: "13 Jun 2026",
    url: "https://www.bcci.tv/videos/s-ind-vs-afg-2026-1st-odi-rohit-sharma-six-6nz8ua",
  },
  {
    id: "bcci-2026-9",
    source: "BCCI",
    year: "2026",
    format: "Career",
    category: "Feature",
    title: "Rohit Sharma special! Handsome hits for SIX",
    date: "11 Jan 2026",
    url: "https://www.bcci.tv/videos/s-rohit-sharma-special-handsome-hits-for-six-2ircn",
  },

  {
    id: "bcci-2025-1",
    source: "BCCI",
    year: "2025",
    format: "ODI",
    category: "Interview",
    title:
      "Winning two consecutive ICC titles undefeated is a big achievement: Rohit Sharma",
    date: "10 Mar 2025",
    url: "https://www.bcci.tv/video/5566127",
  },
  {
    id: "bcci-2025-2",
    source: "BCCI",
    year: "2025",
    format: "ODI",
    category: "Interview",
    title: "Rohit Sharma: Mind Over Matter",
    date: "09 Feb 2025",
    url: "https://www.bcci.tv/videos/s-rohit-sharma-mind-over-matter-otbz8f",
  },
  {
    id: "bcci-2025-3",
    source: "BCCI",
    year: "2025",
    format: "ODI",
    category: "Highlights",
    title: "Stylish Maximums: All 7 sixes of Rohit Sharma",
    date: "09 Feb 2025",
    url: "https://www.bcci.tv/videos/s-stylish-maximums-all-7-sixes-of-rohit-sharma-cwk8y",
  },
  {
    id: "bcci-2025-4",
    source: "BCCI",
    year: "2025",
    format: "ODI",
    category: "Highlights",
    title: "IND vs ENG 2025, 2nd ODI: Rohit Sharma Six",
    date: "09 Feb 2025",
    url: "https://www.bcci.tv/video/5565867",
  },
  {
    id: "bcci-2025-5",
    source: "BCCI",
    year: "2025",
    format: "ODI",
    category: "Wicket",
    title: "IND vs ENG 2025, 2nd ODI: Rohit Sharma Wicket",
    date: "09 Feb 2025",
    url: "https://www.bcci.tv/video/5565889",
  },
  {
    id: "bcci-2025-6",
    source: "BCCI",
    year: "2025",
    format: "Career",
    category: "Feature",
    title: "The Day After ft. Captain Rohit Sharma",
    date: "10 Mar 2025",
    url: "https://www.bcci.tv/bccilink/videos/CpFojfO3",
  },
  {
    id: "bcci-2025-7",
    source: "BCCI",
    year: "2025",
    format: "T20I",
    category: "Feature",
    title: "Reliving historic T20 World Cup win ft. captain Rohit Sharma",
    date: "01 Feb 2025",
    url: "https://www.bcci.tv/",
  },

  {
    id: "bcci-2024-1",
    source: "BCCI",
    year: "2024",
    format: "Test",
    category: "Wicket",
    title: "IND vs NZ 2024, 1ST Test: Rohit Sharma Wicket",
    date: "18 Oct 2024",
    url: "https://www.bcci.tv/videos/s-ind-vs-nz-2024-1st-test-rohit-sharma-wicket-y8hznb",
  },
  {
    id: "bcci-2024-2",
    source: "BCCI",
    year: "2024",
    format: "Test",
    category: "Highlights",
    title: "IND vs ENG 2024, 5TH Test: Rohit Sharma Six",
    date: "07 Mar 2024",
    url: "https://www.bcci.tv/videos/s-ind-vs-eng-2024-5th-test-rohit-sharma-six-our5rj",
  },
  {
    id: "bcci-2024-3",
    source: "BCCI",
    year: "2024",
    format: "Test",
    category: "Highlights",
    title: "IND vs ENG 2024, 3RD Test: Rohit Sharma Six",
    date: "15 Feb 2024",
    url: "https://www.bcci.tv/videos/s-ind-vs-eng-2024-3rd-test-rohit-sharma-six-nfnjn",
  },
  {
    id: "bcci-2024-4",
    source: "BCCI",
    year: "2024",
    format: "T20I",
    category: "Highlights",
    title: "IND vs AFG 2024, 3RD T20I: Rohit Sharma Six",
    date: "17 Jan 2024",
    url: "https://www.bcci.tv/videos/s-ind-vs-afg-2024-3rd-t20i-rohit-sharma-six-5r1zqp",
  },
  {
    id: "bcci-2024-5",
    source: "BCCI",
    year: "2024",
    format: "Test",
    category: "Wicket",
    title: "IND vs ENG 2024, 2ND Test: Rohit Sharma Wicket",
    date: "02 Feb 2024",
    url: "https://www.bcci.tv/videos/s-ind-vs-eng-2024-2nd-test-rohit-sharma-wicket-nppo86",
  },
  {
    id: "bcci-2024-6",
    source: "BCCI",
    year: "2024",
    format: "Test",
    category: "Wicket",
    title: "IND vs ENG 2024, 1ST Test: Rohit Sharma Wicket",
    date: "28 Jan 2024",
    url: "https://www.bcci.tv/video/5561916",
  },
  {
    id: "bcci-2024-7",
    source: "BCCI",
    year: "2024",
    format: "Test",
    category: "Interview",
    title:
      "We will try and see how we can be a good team in all kinds of conditions: Rohit Sharma",
    date: "08 Aug 2024",
    url: "https://www.bcci.tv/video/5563203",
  },
  {
    id: "bcci-2024-8",
    source: "BCCI",
    year: "2024",
    format: "ODI",
    category: "Interview",
    title:
      "We have to look forward and see how we can correct ourselves: Rohit Sharma",
    date: "03 Nov 2024",
    url: "https://www.bcci.tv/video/5564338",
  },
  {
    id: "bcci-2024-9",
    source: "BCCI",
    year: "2024",
    format: "Test",
    category: "Wicket",
    title: "IND vs ENG 2024, 5TH Test: Rohit Sharma Wicket",
    date: "08 Mar 2024",
    url: "https://www.bcci.tv/video/5562564/ind-vs-eng-2024-5th-test-rohit-sharma-wicket",
  },

  // =========================================================
  // IPL
  // =========================================================
  {
    id: "ipl-2025-1",
    source: "IPL",
    year: "2025",
    format: "IPL",
    category: "Six",
    title: "IPL 2025 M33: MI vs SRH - Rohit Sharma Six",
    date: "17 Apr 2025",
    url: "https://www.iplt20.com/video/61110",
  },

  // =========================================================
  // ICC
  // =========================================================
  {
    id: "icc-2026-1",
    source: "ICC",
    year: "2026",
    format: "T20 World Cup",
    category: "Feature",
    title: "Up close behind-the-scenes with Rohit at India v Pakistan",
    date: "02 Mar 2026",
    url: "https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026/videos/rohit-reveals-his-fondest-memories-of-past-t20-world-cups-rohit-sharma-the-ambassador",
  },
  {
    id: "icc-2026-2",
    source: "ICC",
    year: "2026",
    format: "T20 World Cup",
    category: "Interview",
    title: "Rohit Sharma named as Men's T20 World Cup tournament ambassador",
    date: "25 Nov 2025",
    url: "https://www.icc-cricket.com/videos/categories/player-3852",
  },
  {
    id: "icc-2025-1",
    source: "ICC",
    year: "2025",
    format: "Champions Trophy",
    category: "Feature",
    title:
      "Rohit Sharma dives into India's Champions Trophy 2025 triumph",
    date: "10 Mar 2025",
    url: "https://www.icc-cricket.com/tournaments/champions-trophy-2025/videos",
  },
  {
    id: "icc-2025-2",
    source: "ICC",
    year: "2025",
    format: "Champions Trophy",
    category: "Wicket",
    title: "Rohit Sharma - Wicket vs New Zealand",
    date: "09 Mar 2025",
    url: "https://www.icc-cricket.com/videos/categories/player-3852",
  },
  {
    id: "icc-2025-3",
    source: "ICC",
    year: "2025",
    format: "Champions Trophy",
    category: "Wicket",
    title: "Rohit Sharma - Wicket vs Australia",
    date: "04 Mar 2025",
    url: "https://www.icc-cricket.com/videos/categories/player-3852",
  },
  {
    id: "icc-2025-4",
    source: "ICC",
    year: "2025",
    format: "Champions Trophy",
    category: "Wicket",
    title: "Rohit Sharma - Wicket vs New Zealand",
    date: "02 Mar 2025",
    url: "https://www.icc-cricket.com/videos/categories/player-3852",
  },
  {
    id: "icc-2025-5",
    source: "ICC",
    year: "2025",
    format: "Champions Trophy",
    category: "Highlights",
    title: "Shaheen cleans up Rohit - PAK v IND",
    date: "23 Feb 2025",
    url: "https://www.icc-cricket.com/videos/categories/player-3852",
  },
  {
    id: "icc-2024-1",
    source: "ICC",
    year: "2024",
    format: "T20 World Cup",
    category: "Highlights",
    title: "The Rohit Sharma show - POTM Highlights",
    date: "24 Jun 2024",
    url: "https://www.icc-cricket.com/videos/categories/icc-men-s-t20-world-cup-2024",
  },
  {
    id: "icc-2024-2",
    source: "ICC",
    year: "2024",
    format: "T20 World Cup",
    category: "Highlights",
    title: "Rohit Sharma stars as India confirm semi-final spot",
    date: "24 Jun 2024",
    url: "https://www.icc-cricket.com/videos/categories/icc-men-s-t20-world-cup-2024",
  },
  {
    id: "icc-2024-3",
    source: "ICC",
    year: "2024",
    format: "T20 World Cup",
    category: "Highlights",
    title: "Every Rohit Sharma boundary at T20 World Cup 2024",
    date: "12 Jul 2024",
    url: "https://www.icc-cricket.com/videos/categories/t20-icc-men-s-cricket-wc-2024",
  },
  {
    id: "icc-2024-4",
    source: "ICC",
    year: "2024",
    format: "T20 World Cup",
    category: "Highlights",
    title: "Rohit Sharma's raw emotions after final win",
    date: "02 Jul 2024",
    url: "https://www.icc-cricket.com/videos/categories/t20-icc-men-s-cricket-wc-2024",
  },
  {
    id: "icc-2021-1",
    source: "ICC",
    year: "2021",
    format: "T20 World Cup",
    category: "Highlights",
    title:
      "Rohit Sharma's explosive 74 sets up India win against Afghanistan",
    date: "01 Jul 2024",
    url: "https://www.icc-cricket.com/videos/categories/india",
  },
  {
    id: "icc-2019-1",
    source: "ICC",
    year: "2019",
    format: "World Cup",
    category: "Match Highlights",
    title: "Rohit Sharma Hits 140! India v Pakistan",
    date: "16 Jun 2019",
    url: "https://www.icc-cricket.com/videos/categories/player-3852",
  },
  {
    id: "icc-2014-1",
    source: "ICC",
    year: "2014",
    format: "T20 World Cup",
    category: "Highlights",
    title: "Rohit Sharma's brilliant 62* leads India chase",
    date: "01 Jul 2024",
    url: "https://www.icc-cricket.com/videos/categories/india",
  },
  {
    id: "icc-2007-1",
    source: "ICC",
    year: "2007",
    format: "T20 World Cup",
    category: "Highlights",
    title: "Rohit's crucial 50 against South Africa",
    date: "01 Jul 2024",
    url: "https://www.icc-cricket.com/videos/categories/india",
  },
  {
    id: "icc-2023-1",
    source: "ICC",
    year: "2023",
    format: "ODI World Cup",
    category: "Feature",
    title:
      "Rohit Sharma | ICC Men's ODI Cricketer of the Decade nominee",
    date: "11 Nov 2023",
    url: "https://www.icc-cricket.com/videos/rohit-sharma-icc-men-s-odi-cricketer-of-the-decade-nominee",
  },
];

const SOURCE_META = {
  ALL: {
    label: "ALL",
    accent: "ALL SOURCES",
  },
  BCCI: {
    label: "BCCI",
    accent: "INDIA",
  },
  IPL: {
    label: "IPL",
    accent: "TATA IPL",
  },
  ICC: {
    label: "ICC",
    accent: "INTERNATIONAL",
  },
};

function SourceBadge({ source }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black tracking-[0.2em] ${
        source === "BCCI"
          ? "border-blue-400/30 bg-blue-400/10 text-blue-300"
          : source === "IPL"
            ? "border-orange-400/30 bg-orange-400/10 text-orange-300"
            : "border-white/15 bg-white/[0.06] text-white"
      }`}
    >
      {source}
    </span>
  );
}

function VideoCard({ video, featured = false }) {
  const [opened, setOpened] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);

  const handleOpen = () => {
    setOpened(true);
  };

  return (
    <article
      className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-blue-500/30 ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-video overflow-hidden bg-[#080b10]">
        {!opened ? (
          <button
            type="button"
            onClick={handleOpen}
            className="absolute inset-0 flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(37,99,235,.20),transparent_55%)] text-center"
            aria-label={`Play ${video.title}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="relative z-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-blue-500 text-2xl shadow-[0_0_50px_rgba(37,99,235,.35)] transition duration-300 group-hover:scale-110 group-hover:bg-blue-400">
                <span className="ml-1">▶</span>
              </div>

              <p className="mt-5 text-xs font-black tracking-[0.25em] text-white">
                CLICK TO WATCH
              </p>

              <p className="mt-2 text-[10px] font-bold tracking-[0.18em] text-gray-500">
                OFFICIAL {video.source} VIDEO
              </p>
            </div>
          </button>
        ) : iframeFailed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(37,99,235,.18),transparent_55%)] p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl">
              ▶
            </div>

            <p className="text-xs font-black tracking-[0.25em] text-blue-300">
              OFFICIAL {video.source} VIDEO
            </p>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              This official player does not allow third-party embedding.
            </p>

            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 rounded-full bg-white px-5 py-2.5 text-xs font-black text-black transition hover:bg-blue-400"
            >
              OPEN OFFICIAL VIDEO ↗
            </a>
          </div>
        ) : (
          <iframe
            src={video.url}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onError={() => setIframeFailed(true)}
          />
        )}

        <div className="pointer-events-none absolute left-4 top-4 z-20">
          <SourceBadge source={video.source} />
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 z-20 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-black tracking-[0.18em] text-gray-300 backdrop-blur-xl">
          {video.year}
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black tracking-[0.2em] text-blue-400">
            {video.category}
          </span>

          <span className="text-gray-700">•</span>

          <span className="text-[10px] font-bold tracking-[0.15em] text-gray-500">
            {video.format}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-black leading-tight text-white md:text-2xl">
          {video.title}
        </h3>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-xs font-medium text-gray-600">
            {video.date}
          </span>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-black tracking-[0.08em] text-white transition hover:text-blue-400"
            onClick={(e) => e.stopPropagation()}
          >
            OFFICIAL ↗
          </a>
        </div>
      </div>
    </article>
  );
}

export default function VideosPage() {
  const [source, setSource] = useState("ALL");
  const [year, setYear] = useState("ALL");
  const [format, setFormat] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [query, setQuery] = useState("");

  const years = useMemo(
    () =>
      [...new Set(VIDEOS.map((video) => video.year))].sort(
        (a, b) => Number(b) - Number(a)
      ),
    []
  );

  const formats = useMemo(
    () => [...new Set(VIDEOS.map((video) => video.format))].sort(),
    []
  );

  const categories = useMemo(
    () => [...new Set(VIDEOS.map((video) => video.category))].sort(),
    []
  );

  const filteredVideos = useMemo(() => {
    const q = query.trim().toLowerCase();

    return VIDEOS.filter((video) => {
      const matchesSource =
        source === "ALL" || video.source === source;

      const matchesYear =
        year === "ALL" || video.year === year;

      const matchesFormat =
        format === "ALL" || video.format === format;

      const matchesCategory =
        category === "ALL" || video.category === category;

      const matchesSearch =
        !q ||
        video.title.toLowerCase().includes(q) ||
        video.source.toLowerCase().includes(q) ||
        video.category.toLowerCase().includes(q) ||
        video.format.toLowerCase().includes(q);

      return (
        matchesSource &&
        matchesYear &&
        matchesFormat &&
        matchesCategory &&
        matchesSearch
      );
    });
  }, [source, year, format, category, query]);

  const featured = filteredVideos[0];

  const resetFilters = () => {
    setSource("ALL");
    setYear("ALL");
    setFormat("ALL");
    setCategory("ALL");
    setQuery("");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#030507] text-white">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #030507;
        }

        .video-scrollbar::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }

        .video-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .video-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 999px;
        }

        select option {
          background: #080b10;
          color: white;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="fixed left-0 right-0 top-0 z-[100] border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="text-lg font-black tracking-[0.2em] md:text-xl"
          >
            ROHIT<span className="text-blue-500">SHARMA</span>
          </Link>

          <div className="hidden items-center gap-6 text-xs font-bold text-gray-400 lg:flex">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <Link
              href="/profile"
              className="transition hover:text-white"
            >
              Profile
            </Link>

            <Link
              href="/career"
              className="transition hover:text-white"
            >
              Career
            </Link>

            <Link
              href="/stats"
              className="transition hover:text-white"
            >
              Stats
            </Link>

            <Link
              href="/records"
              className="transition hover:text-white"
            >
              Records
            </Link>

            <Link
              href="/captaincy"
              className="transition hover:text-white"
            >
              Captaincy
            </Link>

            <Link
              href="/ipl"
              className="transition hover:text-white"
            >
              IPL
            </Link>

            <Link
              href="/world-cups"
              className="transition hover:text-white"
            >
              World Cups
            </Link>

            <Link
              href="/gallery"
              className="transition hover:text-white"
            >
              Gallery
            </Link>

            <Link href="/videos" className="text-blue-400">
              Videos
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[72vh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(37,99,235,.25),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(29,78,216,.12),transparent_30%),linear-gradient(135deg,#030507,#080b10_50%,#020304)]" />

        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:70px_70px]" />

        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-[1500px] items-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <div className="max-w-5xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-14 bg-blue-500" />

              <p className="text-xs font-black tracking-[0.4em] text-blue-400">
                THE HITMAN VIDEO VAULT
              </p>
            </div>

            <h1 className="text-[17vw] font-black leading-[0.78] tracking-[-0.07em] md:text-[10rem]">
              ROHIT
              <br />
              <span className="text-blue-500">IN MOTION.</span>
            </h1>

            <p className="mt-10 max-w-2xl text-base leading-7 text-gray-400 md:text-xl md:leading-9">
              Rohit Sharma ke official cricket videos — BCCI, IPL aur
              ICC sources se — ek premium searchable archive mein.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["BCCI", "IPL", "ICC"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSource(item)}
                  className={`rounded-full border px-5 py-2.5 text-xs font-black tracking-[0.15em] transition ${
                    source === item
                      ? "border-blue-500 bg-blue-500/20 text-white"
                      : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVE STATS */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 md:grid-cols-4">
          <div className="border-r border-white/10 p-6 md:p-10">
            <p className="text-3xl font-black md:text-5xl">
              {VIDEOS.length}
            </p>

            <p className="mt-2 text-[10px] font-black tracking-[0.25em] text-gray-600">
              INDEXED VIDEOS
            </p>
          </div>

          <div className="border-r border-white/10 p-6 md:p-10">
            <p className="text-3xl font-black md:text-5xl">
              03
            </p>

            <p className="mt-2 text-[10px] font-black tracking-[0.25em] text-gray-600">
              OFFICIAL SOURCES
            </p>
          </div>

          <div className="border-r border-white/10 p-6 md:p-10">
            <p className="text-3xl font-black md:text-5xl">
              2007+
            </p>

            <p className="mt-2 text-[10px] font-black tracking-[0.25em] text-gray-600">
              ERA COVERAGE
            </p>
          </div>

          <div className="p-6 md:p-10">
            <p className="text-3xl font-black md:text-5xl">
              CLICK
            </p>

            <p className="mt-2 text-[10px] font-black tracking-[0.25em] text-gray-600">
              PLAY ON DEMAND
            </p>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-[65px] z-50 border-b border-white/10 bg-[#030507]/90 backdrop-blur-2xl">
        <div className="video-scrollbar mx-auto flex max-w-[1500px] gap-3 overflow-x-auto px-5 py-4 md:px-8">
          <div className="relative min-w-[220px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Rohit videos..."
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500/50"
            />
          </div>

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="h-11 min-w-[130px] rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-bold text-white outline-none"
          >
            <option value="ALL">All Sources</option>
            <option value="BCCI">BCCI</option>
            <option value="IPL">IPL</option>
            <option value="ICC">ICC</option>
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="h-11 min-w-[120px] rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-bold text-white outline-none"
          >
            <option value="ALL">All Years</option>

            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="h-11 min-w-[145px] rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-bold text-white outline-none"
          >
            <option value="ALL">All Formats</option>

            {formats.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 min-w-[150px] rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-bold text-white outline-none"
          >
            <option value="ALL">All Categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="h-11 whitespace-nowrap rounded-xl border border-white/10 px-5 text-xs font-black text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            RESET
          </button>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-8 md:py-28">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black tracking-[0.3em] text-blue-400">
              OFFICIAL ARCHIVE
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
              Watch Rohit.
            </h2>
          </div>

          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-black text-gray-300">
              {filteredVideos.length}
            </span>{" "}
            videos
          </p>
        </div>

        {featured ? (
          <>
            <div className="mb-6">
              <VideoCard video={featured} featured />
            </div>

            {filteredVideos.length > 1 && (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredVideos.slice(1).map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-24 text-center">
            <p className="text-4xl font-black">NO VIDEOS</p>

            <p className="mt-4 text-gray-600">
              Try another source, year, format or search.
            </p>
          </div>
        )}
      </section>

      {/* OFFICIAL SOURCES */}
      <section className="border-y border-white/10 bg-white/[0.018]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 md:px-8 md:py-28">
          <p className="text-xs font-black tracking-[0.3em] text-blue-400">
            OFFICIAL SOURCES
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-black md:text-6xl">
            Original video platforms.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <a
              href="https://www.bcci.tv/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition hover:-translate-y-1 hover:border-blue-500/40"
            >
              <p className="text-xs font-black tracking-[0.25em] text-blue-400">
                INDIA
              </p>

              <h3 className="mt-3 text-3xl font-black">
                BCCI
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                Official BCCI video archive and Rohit Sharma match
                clips, interviews and features.
              </p>

              <span className="mt-8 inline-block text-sm font-black">
                OPEN BCCI ↗
              </span>
            </a>

            <a
              href="https://www.iplt20.com/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition hover:-translate-y-1 hover:border-orange-500/40"
            >
              <p className="text-xs font-black tracking-[0.25em] text-orange-400">
                IPL
              </p>

              <h3 className="mt-3 text-3xl font-black">
                IPLT20
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                Official IPL video archive including Mumbai Indians
                and Rohit Sharma moments.
              </p>

              <span className="mt-8 inline-block text-sm font-black">
                OPEN IPL ↗
              </span>
            </a>

            <a
              href="https://www.icc-cricket.com/videos/categories/player-3852"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition hover:-translate-y-1 hover:border-blue-500/40"
            >
              <p className="text-xs font-black tracking-[0.25em] text-gray-400">
                INTERNATIONAL
              </p>

              <h3 className="mt-3 text-3xl font-black">
                ICC
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                Dedicated official ICC Rohit Sharma video archive.
              </p>

              <span className="mt-8 inline-block text-sm font-black">
                OPEN ICC ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* NOTE */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 md:p-10">
          <p className="text-xs font-black tracking-[0.25em] text-gray-500">
            SOURCE & EMBEDDING NOTE
          </p>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-gray-600">
            This page references official BCCI, IPL and ICC video
            pages. The player is loaded only after the visitor clicks
            the video. If an official provider blocks third-party
            embedding, the original official page is provided instead.
          </p>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[1500px] px-5 py-20 md:px-8">
          <p className="text-xs font-black tracking-[0.3em] text-blue-400">
            EXPLORE MORE
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Link
              href="/gallery"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-lg font-black transition hover:border-blue-500/40"
            >
              Gallery →
            </Link>

            <Link
              href="/world-cups"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-lg font-black transition hover:border-blue-500/40"
            >
              World Cups →
            </Link>

            <Link
              href="/records"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-lg font-black transition hover:border-blue-500/40"
            >
              Records →
            </Link>

            <Link
              href="/captaincy"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-lg font-black transition hover:border-blue-500/40"
            >
              Captaincy →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <div className="text-xl font-black tracking-[0.2em]">
              ROHIT<span className="text-blue-500">SHARMA</span>
            </div>

            <p className="mt-2 text-xs text-gray-600">
              Independent fan-made website.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-xs font-bold text-gray-600">
            <Link href="/profile">Profile</Link>
            <Link href="/career">Career</Link>
            <Link href="/stats">Stats</Link>
            <Link href="/records">Records</Link>
            <Link href="/ipl">IPL</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/innings">Innings</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
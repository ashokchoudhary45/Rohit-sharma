import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rohit Sharma 45 | The Hitman",
    template: "%s | Rohit Sharma 45",
  },

  description:
    "The ultimate Rohit Sharma fan website — career, stats, records, innings, IPL, World Cups, videos, birthday countdown and more.",

  applicationName: "Rohit Sharma 45",

  keywords: [
    "Rohit Sharma",
    "Rohit Sharma 45",
    "Hitman",
    "Rohit Sharma stats",
    "Rohit Sharma records",
    "Rohit Sharma innings",
    "Rohit Sharma birthday",
    "Rohit Sharma fan website",
  ],

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "Rohit Sharma 45 | The Hitman",
    description:
      "The ultimate Rohit Sharma fan website.",
    type: "website",
    siteName: "Rohit Sharma 45",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rohit Sharma 45 | The Hitman",
    description:
      "The ultimate Rohit Sharma fan website.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05070b",
};

/* -------------------------------------------------------
   BOOT
   Applies saved theme before first paint.
   Skips intro if already seen in this session.
------------------------------------------------------- */

const boot = `
try {
  var d = document.documentElement;

  d.dataset.theme =
    localStorage.getItem("rs-theme") || "royal";

  if (sessionStorage.getItem("rs-intro")) {
    d.dataset.seen = "1";
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: boot,
          }}
        />
      </head>

      <body
        className={`${inter.variable} ${playfair.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
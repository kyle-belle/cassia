import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playwrite_NO } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playwriteNo = Playwrite_NO({
  variable: "--font-playwrite-no",
});

// app/layout.tsx or app/page.tsx

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const BASE_URL = "https://kyle-belle.github.io/cassia";

export const metadata: Metadata = {
  icons: `${BASE_URL}/icon.png`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  title:
    "Villa Cassia | Luxury Villa in Holetown, St. James | Barbados Vacation Rental",
  description:
    "Book a private villa in Holetown, St. James, Barbados. Steps from beaches, dining, and shopping. Perfect for families, couples, and long-term stays.",
  keywords: [
    "Barbados villa",
    "Holetown vacation rental",
    "St. James Barbados",
    "Barbados accommodation",
    "Luxury villa Barbados",
    "West Coast Barbados",
  ],
  openGraph: {
    title:
      "Villa Cassia | Private Luxury Villa in Holetown, St. James, Barbados",
    description:
      "Experience island comfort on the Barbados West Coast. This Holetown villa offers spacious living, modern amenities, and easy access to beaches, shops, and restaurants.",
    url: `${BASE_URL}`,
    siteName: "Holetown Barbados Villa",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/1200/IMG_0521.jpg`,
        secureUrl: `${BASE_URL}/images/1200/IMG_0521.jpg`,
        width: 1200,
        height: 900,
        alt: "Caribbean-style villa in Holetown, St. James, Barbados",
      },
      {
        url: `${BASE_URL}/images/1200/IMG_0536.jpg`,
        secureUrl: `${BASE_URL}/images/1200/IMG_0536.jpg`,
        width: 1200,
        height: 900,
        alt: "Caribbean-style villa in Holetown, St. James, Barbados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Cassia | Luxury Villa in Holetown, St. James | Barbados",
    description:
      "Private Caribbean villa in Holetown, St. James, close to beaches, dining, and shopping.",
    images: [
      `${BASE_URL}/images/1200/IMG_0521.jpg`,
      `${BASE_URL}/images/1200/IMG_0536.jpg`,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-zinc-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playwriteNo.variable} antialiased scroll-smooth bg-zinc-950`}
      >
        <main className="min-h-screen bg-zinc-950 text-zinc-50">
          {/* Top bar */}
          <header className="fixed w-full top-0 z-50 border-b border-white/10 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold tracking-tight ${playwriteNo.className}`}
                >
                  Villa Cassia
                </span>
              </div>
              <nav className="flex items-center gap-3 text-sm">
                <a className="text-zinc-300 hover:text-white" href="#gallery">
                  Gallery
                </a>
                <a className="text-zinc-300 hover:text-white" href="#details">
                  Details
                </a>
                <a
                  className="rounded-xl bg-white px-3 py-2 text-zinc-950 hover:bg-zinc-100"
                  href="#contact"
                >
                  Contact
                </a>
              </nav>
            </div>
          </header>
          {children}
          <footer className="my-6 text-xs flex justify-center text-zinc-500">
            © {new Date().getFullYear()} Villa Cassia • All rights reserved
          </footer>
        </main>
      </body>
    </html>
  );
}

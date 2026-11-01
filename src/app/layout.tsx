import "./globals.css";
import type {Metadata} from "next";
import {Plus_Jakarta_Sans, Geist_Mono, Instrument_Serif} from "next/font/google";
import Motion from "@/components/Motion";
import Splash from "@/components/Splash";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "optional",
  variable: "--font-sans"
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-mono"
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "Argya Sabih | Portfolio",
  description:
    "Portfolio website of Argya Sabih - Web Developer, Data Analyst, Computer Vision & Artificial Intelligence Enthusiast."
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`no-js ${sans.variable} ${mono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove("no-js")`
          }}
        />
      </head>
      <body className="bg-ink font-sans text-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>

        <Splash />
        <Motion />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

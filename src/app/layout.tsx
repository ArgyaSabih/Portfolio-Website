import type {Metadata} from "next";
import {Kanit} from "next/font/google";
import AOSInit from "@/components/AOSInit";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-kanit"
});

export const metadata: Metadata = {
  title: "Argya Sabih | Portfolio",
  description: "Portfolio website of Argya Sabih - Web Developer & Data Analyst"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${kanit.variable} font-kanit bg-primary`}>
        <AOSInit />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

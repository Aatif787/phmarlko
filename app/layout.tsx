import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { Navbar } from "../components/Navbar";
import { CustomCursor } from "../components/CustomCursor";
import { Footer } from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "MedExpress – Prescription Medicine Delivery for Domariyaganj",
  description:
    "Upload your prescription and get genuine medicines delivered from Lucknow to Domariyaganj and nearby towns with MedExpress."
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen cursor-none">
        <div className="relative flex min-h-screen flex-col">
          <CustomCursor />
          <Navbar />
          <main className="flex-1 theme-main">
            {props.children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { Navbar } from "../components/Navbar";
import { CustomCursor } from "../components/CustomCursor";
import { Footer } from "../components/Footer";
import { SmoothScroll } from "../components/SmoothScroll";

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
  title: {
    default: "MedExpress – Genuine Medicine Delivery in Domariyaganj",
    template: "%s | MedExpress"
  },
  description: "Get genuine medicines delivered from Lucknow to Domariyaganj, Basti, Siddharthnagar, and nearby towns. Upload prescription online for fast home delivery.",
  keywords: [
    "medicine delivery domariyaganj",
    "online pharmacy siddharthnagar",
    "medicine home delivery basti",
    "upload prescription online",
    "genuine medicines lucknow",
    "pharmacy delivery app",
    "discount medicines india",
    "fastest medicine delivery",
    "healthcare services domariyaganj",
    "chemist shop near me"
  ],
  authors: [{ name: "MedExpress Team" }],
  creator: "MedExpress",
  publisher: "MedExpress",
  metadataBase: new URL("https://phmarlko.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MedExpress – Fast & Genuine Medicine Delivery",
    description: "Upload prescription and get medicines delivered to your doorstep in Domariyaganj and nearby areas.",
    url: "https://phmarlko.vercel.app",
    siteName: "MedExpress",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MedExpress – Medicine Delivery",
    description: "Genuine medicines delivered from Lucknow to Domariyaganj.",
    creator: "@medexpress",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  "name": "MedExpress",
  "image": "https://phmarlko.vercel.app/og-image.jpg",
  "description": "Fast and genuine medicine delivery service in Domariyaganj, Siddharthnagar, and Basti.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Main Market",
    "addressLocality": "Domariyaganj",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "272189",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.2063,
    "longitude": 82.6841
  },
  "url": "https://phmarlko.vercel.app",
  "telephone": "+919876543210",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    }
  ],
  "priceRange": "$$"
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen cursor-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
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

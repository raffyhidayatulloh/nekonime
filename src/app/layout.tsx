import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import { Metadata, Viewport } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Nekonime", template: "%s | Nekonime" },
  description: "Anime list app",
  openGraph: {
    type: "website",
    siteName: "AnimeList",
  },
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
  colorScheme: "dark light",
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

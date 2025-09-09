import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import { headers } from "next/headers";

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

export const metadata = {
  title: "NekoNime",
  description: "Anime list app",
};

export default async function RootLayout({ children, }: { children: React.ReactNode; }) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? "";

  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`} nonce={nonce}>
        {children}
      </body>
    </html>
  );
}

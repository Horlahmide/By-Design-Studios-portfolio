import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Playfair_Display, Open_Sans, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "By Design Studio | Video Editing Portfolio",
  description:
    "Creative video editing for YouTubers and content creators, shaped by intentional storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${openSans.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}

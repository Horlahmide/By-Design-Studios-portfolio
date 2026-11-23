import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Playfair_Display, Open_Sans, JetBrains_Mono } from "next/font/google";

import ClientEnhancements from "@/components/ClientEnhancements";

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://by-design-studios.vercel.app"
  ),
  title: "By Design Studio | Creative Video Editing & Post-Production",
  description:
    "By Design Studio is a creative video editing studio helping YouTubers and content creators bring their ideas to life through intentional storytelling and clean, engaging edits.",
  keywords: [
    "By Design Studio",
    "YouTube Video Editor",
    "Vlog Editing",
    "Creative Direction",
    "Short-Form Video Editing",
    "Instagram Reels Editor",
    "TikTok Editor",
    "YouTube Thumbnail Design",
  ],
  openGraph: {
    title: "By Design Studio | Thoughtful Creativity. Intentional Storytelling.",
    description:
      "Creative video editing, vlog creative direction, short-form reels, and thumbnail packaging for YouTubers and content creators.",
    type: "website",
    images: [
      {
        url: "/thumbnails/thumbnail-01.jpg",
        width: 1920,
        height: 1080,
        alt: "By Design Studio — Creative Video Editing Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "By Design Studio | Creative Video Editing Portfolio",
    description:
      "Thoughtful creativity. Intentional storytelling. Video editing and creative direction for YouTubers and creators.",
    images: ["/thumbnails/thumbnail-01.jpg"],
  },
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
      suppressHydrationWarning
    >
      <head>
        {/* Cheap DNS lookups only; full preconnect happens on hover/touch of a video card */}
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        {/* Enable scroll-reveal before first paint (skipped for reduced-motion users) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){document.documentElement.classList.add('reveal-ready')}}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <ClientEnhancements />
      </body>
    </html>
  );
}

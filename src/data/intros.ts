export interface IntroItem {
  id: string;
  number: string;
  title: string;
  badge: string;
  specTag: string;
  runtime: string;
  posterUrl: string;
  youtubeId?: string;          // Populated with verified YouTube intro video IDs
}

export const introItems: IntroItem[] = [
  {
    id: "intro-01",
    number: "01",
    title: "Becca Smith — A Cozy Night in the Rain",
    badge: "INTRO 01 // COZY LIFESTYLE VLOG",
    specTag: "TYPOGRAPHIC COLD OPEN // 00:20",
    runtime: "00:20",
    posterUrl: "/posters/cozy-night-in-the-rain.jpg",
    youtubeId: "e7ERnbsATGU", // copy_63E6390D-E229-4099-AA95-B4D6CBDBE633.mov (1920x1080, 00:20)
  },
  {
    id: "intro-02",
    number: "02",
    title: "5 AM: Slowly Into Fall (Episode 01)",
    badge: "INTRO 02 // EPISODIC SERIES OPENER",
    specTag: "MORNING ROUTINE SLATE // 00:21",
    runtime: "00:21",
    posterUrl: "/posters/slowly-into-fall.jpg",
    youtubeId: "80bEVzTeeY8", // copy_991103CF-7A77-4DCC-AADF-962C0DF7F22F.mov (1920x1080, 00:21)
  },
  {
    id: "intro-03",
    number: "03",
    title: "My Life in Cape Town — Travel Opener",
    badge: "INTRO 03 // TRAVEL VLOG IDENT",
    specTag: "SCRIPT TITLE SEQUENCE // 13:11",
    runtime: "13:11",
    posterUrl: "/posters/cape-town-lounge.jpg",
    youtubeId: "WD0sd0b_p_0", // copy_EDAE85D0-995D-429A-8141-5D1248C598C7.mov (1920x1080, 13:11)
  },
];

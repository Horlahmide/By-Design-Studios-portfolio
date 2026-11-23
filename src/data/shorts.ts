export interface ShortFormProject {
  id: string;
  number: string;
  title: string;
  category: string;
  metrics: string;
  handleTag: string;
  posterUrl: string;
  slateTag: string;
  youtubeId?: string;          // Populated with verified YouTube Short/video IDs
  isHero?: boolean;
}

export const shortFormProjects: ShortFormProject[] = [
  {
    id: "short-01",
    number: "01",
    title: "Marvèle — Atelier & Craft",
    category: "BRAND REEL",
    metrics: "00:11 • 9:16 Vertical Cut",
    handleTag: "MARVÈLE // BRAND SHORT",
    slateTag: "01 // MONOCHROME REEL • 00:11",
    posterUrl: "/posters/short-marvele.png",
    youtubeId: "2O_xzBt-Fnc", // copy_50ED5FA2-B36E-49EC-BB88-18B416E15F4A.mov (1080x1920, 00:11)
    isHero: false,
  },
  {
    id: "short-02",
    number: "02",
    title: "Romanticizing The Little Things",
    category: "AESTHETIC REEL",
    metrics: "00:24 • 9:16 Master Cut",
    handleTag: "FEATURED LIFESTYLE REEL",
    slateTag: "02 // AESTHETIC REEL • 00:24",
    posterUrl: "/posters/short-little-things.png",
    youtubeId: "2NuF1Pwu7B4", // copy_E0196534-80EE-47DB-AB7E-772E3AC21955.mov (1080x1920, 00:24)
    isHero: true,
  },
  {
    id: "short-03",
    number: "03",
    title: "Day in My Life: Post-Grad Era",
    category: "DAILY VLOG REEL",
    metrics: "00:37 • 9:16 Vertical Cut",
    handleTag: "POST-GRAD LIFE // REEL",
    slateTag: "03 // DAY IN MY LIFE • 00:37",
    posterUrl: "/posters/short-day-in-my-life.jpg",
    youtubeId: "AMdXr4I9ilc", // IMG_0976.mov (1080x1920, 00:37)
    isHero: false,
  },
];

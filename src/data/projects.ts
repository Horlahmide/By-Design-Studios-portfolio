export interface Project {
  id: string;
  slug: string;
  number: string;              // e.g. "01"
  title: string;
  category: string;            // e.g. "BRAND FILM", "DOCUMENTARY", "COMMERCIAL"
  client: string;              // e.g. "VANTAGE ARCHIVE"
  runtime: string;             // e.g. "02:45"
  aspectRatio: "16:9" | "2.39:1" | "21:9";
  editSlate: string;           // Editor-focused slate: e.g. "2.39:1 // 4K PRORES LOG"
  synopsis: string;
  posterUrl: string;
  youtubeId?: string;          // Populated when client delivers videos
  isFeatured: boolean;         // true = Section 2 Featured; false = Section 3 Rail
  awardOrTag?: string;         // e.g. "VIMEO BEST OF MONTH", "LEAD EDITOR"
}

export const projects: Project[] = [
  {
    id: "proj-01",
    slug: "the-art-of-storytelling",
    number: "01",
    title: "The Art of Storytelling",
    category: "BRAND FILM",
    client: "VANTAGE ARCHIVE",
    runtime: "02:45",
    aspectRatio: "16:9",
    editSlate: "2.39:1 // 4K PRORES LOG",
    synopsis: "An editorial study in rhythm, pacing, and visual tension. Cut from 40+ hours of raw automotive manufacturing footage into an intense 165-second narrative.",
    posterUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    isFeatured: true,
  },
  {
    id: "proj-02",
    slug: "echoes-in-the-mist",
    number: "02",
    title: "Echoes in the Mist",
    category: "DOCUMENTARY",
    client: "PACIFIC EXPEDITIONS",
    runtime: "06:12",
    aspectRatio: "16:9",
    editSlate: "COLOR GRADE // SOUND DESIGN",
    synopsis: "An intimate documentary cut built around silence, environmental acoustic textures, and delicate pacing across high-altitude coastal bluffs.",
    posterUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    awardOrTag: "VIMEO BEST OF MONTH",
    isFeatured: true,
  },
  {
    id: "proj-03",
    slug: "kinetic-precision",
    number: "03",
    title: "Kinetic Precision",
    category: "COMMERCIAL",
    client: "CHRONO MOTORS",
    runtime: "01:30",
    aspectRatio: "21:9",
    editSlate: "03 / COMMERCIAL / CHRONO MOTORS",
    synopsis: "Hyper-synchronized visual editing uniting mechanical clockwork velocity, precision sound design hits, and rapid-fire match cuts.",
    posterUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop",
    isFeatured: true,
  },
  {
    id: "proj-04",
    slug: "midnight-reverie",
    number: "04",
    title: "Midnight Reverie",
    category: "MUSIC VIDEO",
    client: "L'AURORE",
    runtime: "03:40",
    aspectRatio: "16:9",
    editSlate: "RETENTION PACING // 24FPS",
    synopsis: "Non-linear music video edit combining light flares, rhythmic sound-sync cuts, and intense color grading.",
    posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    isFeatured: false,
  },
  {
    id: "proj-05",
    slug: "sartorial-shadows",
    number: "05",
    title: "Sartorial Shadows",
    category: "FASHION EDITORIAL",
    client: "ATELIER NORDIC",
    runtime: "02:15",
    aspectRatio: "16:9",
    editSlate: "EDITORIAL ASSEMBLY & GRADE",
    synopsis: "Slow-burn pacing and atmospheric contrast grading tailored for minimalist European runway storytelling.",
    posterUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    isFeatured: false,
  },
  {
    id: "proj-06",
    slug: "brutalist-silence",
    number: "06",
    title: "Brutalist Silence",
    category: "ARCHITECTURE",
    client: "ARCHIVE MONO",
    runtime: "04:50",
    aspectRatio: "16:9",
    editSlate: "LONG-FORM NARRATIVE CUT",
    synopsis: "Contemplative architecture documentary cut highlighting structural symmetry, ambient reverb, and monolithic presence.",
    posterUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    isFeatured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.isFeatured);
export const railProjects = projects.filter((p) => !p.isFeatured);


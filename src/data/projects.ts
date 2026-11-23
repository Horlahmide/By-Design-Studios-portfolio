export interface Project {
  id: string;
  slug: string;
  number: string;              // e.g. "01"
  title: string;
  category: string;            // e.g. "YOUTUBE VLOG & CREATIVE DIRECTION"
  client: string;              // e.g. "CASSEY FRUITS"
  runtime: string;             // e.g. "13:11"
  aspectRatio: "16:9" | "2.39:1" | "21:9";
  editSlate: string;           // Editor-focused slate: e.g. "16:9 // 13:11 FULL-LENGTH VLOG"
  synopsis: string;
  posterUrl: string;
  youtubeId?: string;          // Populated with verified YouTube IDs
  isFeatured: boolean;         // true = Section 2 Featured; false = Section 3 Rail
  awardOrTag?: string;         // e.g. "LEAD EDITOR & COLOR"
  creativeApproach?: string;   // Optional case-study narrative for /work/[slug]
  editingHighlights?: string[]; // Optional timeline & post-production highlights
  deliverables?: string[];     // Optional master deliverables list
}

export const projects: Project[] = [
  {
    id: "proj-01",
    slug: "my-life-in-cape-town",
    number: "01",
    title: "My Life in Cape Town",
    category: "YOUTUBE VLOG & CREATIVE DIRECTION",
    client: "CASSEY FRUITS",
    runtime: "13:11",
    aspectRatio: "16:9",
    editSlate: "16:9 // 13:11 FULL-LENGTH VLOG",
    synopsis:
      "A full-length 13-minute travel and lifestyle vlog capturing Cape Town from flight arrival and open-top wine-tasting bus tours to yacht celebrations—shaped through custom script title cards, chapter transitions, and high-retention storytelling.",
    posterUrl: "/posters/cape-town-yacht.jpg",
    youtubeId: "WD0sd0b_p_0", // copy_EDAE85D0-995D-429A-8141-5D1248C598C7.mov (1920x1080, 13:11)
    isFeatured: true,
    creativeApproach:
      "Multi-day travel vlogs can easily feel overwhelming on the timeline without a clear narrative thread. For 'My Life in Cape Town,' we shaped over 13 minutes of travel footage—spanning airport check-ins, the Cape Town sightseeing and wine-tasting tour, evening lounge scenes, and a yacht celebration—into an effortless, personality-driven story. Custom script typography cards ('My Life in Cape Town', 'Wine Tasting Tour') introduce each chapter while upbeat music beds and clean dialogue cuts keep viewer energy high from start to finish.",
    editingHighlights: [
      "Full 13:11 long-form travel vlog assembly structured around distinct Cape Town chapter beats",
      "Custom-designed script title overlays ('My Life in Cape Town', 'Wine Tasting Tour') integrated directly into the footage",
      "Dynamic audio balancing between outdoor wind/crowd environments, candid creator dialogue, and background music",
      "Warm, vibrant color treatment preserving skin tones across bright coastal sunlight and indoor lounge lighting",
    ],
    deliverables: [
      "16:9 Full-Length YouTube Vlog (13:11)",
      "Custom Script Chapter & Title Typography",
      "Multi-Scene Audio & Color Polish",
    ],
  },
  {
    id: "proj-02",
    slug: "spec-edit-maya-graves",
    number: "02",
    title: "Spec Edit | Maya Graves",
    category: "LONG-FORM SPEC EDIT",
    client: "MAYA GRAVES (SPEC EDIT)",
    runtime: "00:42",
    aspectRatio: "16:9",
    editSlate: "SPEC EDIT // MAYA GRAVES • 00:42",
    synopsis:
      "A creative spec edit inspired by one of my favourite YouTubers, Maya Graves. I wanted to capture her warm, laid-back personality while bringing the cosy fall atmosphere to life through intentional pacing, visuals, sound design and storytelling. The goal? An intro that feels just like her.",
    posterUrl: "/posters/maya-graves-spec-edit.jpg",
    youtubeId: "WY8ciZW2Q4o", // IMG 0542 (16:9, 00:42)
    awardOrTag: "SPEC EDIT // MAYA GRAVES",
    isFeatured: true,
    creativeApproach:
      "A creative spec edit inspired by one of my favourite YouTubers, Maya Graves. I wanted to capture her warm, laid-back personality while bringing the cosy fall atmosphere to life through intentional pacing, visuals, sound design and storytelling. The goal? An intro that feels just like her.",
    editingHighlights: [
      "Intentional narrative pacing tailored to Maya Graves' warm, laid-back on-camera personality",
      "Cozy fall atmosphere crafted through warm tonal balance, organic B-roll selection, and room-tone layering",
      "Seamless dialogue assembly and subtle acoustic sound design transitions across 42 seconds",
      "Personality-first storytelling designed to hook viewers while feeling completely authentic to the creator",
    ],
    deliverables: [
      "16:9 Long-Form Spec Edit (00:42)",
      "Cozy Autumn Sound Design & Mix",
      "Warm Personality-Driven Assembly",
    ],
  },
  {
    id: "proj-03",
    slug: "pole-dancing-class-with-cassy",
    number: "03",
    title: "Pole Dancing Class — With Cassy",
    category: "LIFESTYLE VLOG SEQUENCE",
    client: "WITH CASSY",
    runtime: "00:36",
    aspectRatio: "21:9",
    editSlate: "03 / LIFESTYLE SEQUENCE / 00:36",
    synopsis:
      "An atmospheric 36-second lifestyle montage inside Femme Flow Studio—pairing magenta neon lighting, beat-synced choreography cuts, and custom 'With Cassy' script branding.",
    posterUrl: "/posters/pole-dancing-class.jpg",
    youtubeId: "ruMBnX4eC7s", // IMG_1164.mov (1920x1080, 00:36)
    awardOrTag: "VLOG MONTAGE & BRANDING",
    isFeatured: true,
    creativeApproach:
      "Designed as a signature lifestyle segment for 'With Cassy,' this 36-second cut turns a studio pole-dancing session at Femme Flow Studio into an engaging visual montage. We paced the choreography across wide mirror reflections and silhouette shots, anchoring the opener with a centered script title card ('Poll dancing Class') and a persistent lower-right creator signature ('With Cassy').",
    editingHighlights: [
      "Beat-synced movement cuts matching choreography flow across multiple studio angles",
      "Centered editorial script opener paired with custom 'With Cassy' lower-third watermark",
      "Neon magenta contrast preservation to keep mirror reflections crisp and free of sensor noise",
    ],
    deliverables: [
      "16:9 Lifestyle Showcase Cut (00:36)",
      "Custom Script Title & Lower-Third Branding",
      "Beat-Synced Audio Edit",
    ],
  },
  {
    id: "proj-04",
    slug: "a-cozy-night-in-the-rain",
    number: "04",
    title: "A Cozy Night in the Rain — Becca Smith",
    category: "VLOG INTRO & TITLE SEQUENCE",
    client: "BECCA SMITH",
    runtime: "00:20",
    aspectRatio: "16:9",
    editSlate: "VLOG INTRO // 00:20",
    synopsis:
      "A warm, cinematic 20-second YouTube vlog opener for Becca Smith—blending rainy window textures, evening self-care routines, and mixed sans-serif/script title typography.",
    posterUrl: "/posters/cozy-night-in-the-rain.jpg",
    youtubeId: "e7ERnbsATGU", // copy_63E6390D-E229-4099-AA95-B4D6CBDBE633.mov (1920x1080, 00:20)
    isFeatured: false,
    creativeApproach:
      "The first 20 seconds of a lifestyle vlog set the emotional tone for the entire episode. For Becca Smith's 'A Cozy Night in the Rain,' we opened on warm amber raindrops against a window pane before cutting through intimate evening routine and hair-care details, uniting clean sans-serif ('BECCA SMITH / A COZY') and expressive script ('Night') typography to immediately draw viewers into the cozy aesthetic.",
    editingHighlights: [
      "20-second atmospheric cold open designed for cozy lifestyle and evening routine vlogs",
      "Mixed sans-serif and script title lockup ('BECCA SMITH / A COZY Night IN THE RAIN') timed to gentle acoustic transitions",
      "Warm amber and soft highlight color grading for an inviting indoor evening mood",
    ],
    deliverables: [
      "16:9 YouTube Vlog Intro (00:20)",
      "Custom Title Card Lockup",
      "Warm Evening Color Grade",
    ],
  },
  {
    id: "proj-05",
    slug: "slowly-into-fall-episode-01",
    number: "05",
    title: "5 AM: Slowly Into Fall (Episode 01)",
    category: "EPISODIC VLOG OPENER",
    client: "MORNING ROUTINE SERIES",
    runtime: "00:21",
    aspectRatio: "16:9",
    editSlate: "5 AM ROUTINE // 00:21",
    synopsis:
      "An intentional 21-second episodic cold open for '5 AM: Slowly Into Fall (Episode 01)'—capturing quiet early-morning rituals, autumn textures, and three-tier editorial title pacing.",
    posterUrl: "/posters/slowly-into-fall.jpg",
    youtubeId: "80bEVzTeeY8", // copy_991103CF-7A77-4DCC-AADF-962C0DF7F22F.mov (1920x1080, 00:21)
    isFeatured: false,
    creativeApproach:
      "Episodic lifestyle content thrives on recognizable visual branding. For '5 AM: Slowly Into Fall — Episode 01,' we crafted a 21-second title sequence that pairs overhead morning routine shots and cozy autumn details with a three-tier typographic lockup ('5 AM / Slowly Into Fall / EPISODE 01'), giving the creator's series a polished, magazine-like identity.",
    editingHighlights: [
      "21-second episodic cold open establishing the 5 AM autumn morning aesthetic",
      "Three-tier typographic hierarchy combining clean sans-serif episode markers with italic script",
      "Golden-brown autumn color palette across kitchen, candlelit, and morning prep shots",
    ],
    deliverables: [
      "16:9 Episodic Vlog Opener (00:21)",
      "Series Typography Package ('Episode 01')",
      "Autumn Tone Grade",
    ],
  },
  {
    id: "proj-06",
    slug: "fitness-date-mind-movement-strength",
    number: "06",
    title: "Fitness Date: Mind, Movement & Strength",
    category: "WORKOUT & LIFESTYLE CUT",
    client: "FITNESS & LIFESTYLE VLOG",
    runtime: "00:37",
    aspectRatio: "16:9",
    editSlate: "GYM SEQUENCE // 00:37",
    synopsis:
      "A dynamic 37-second gym and partner training sequence anchored by the 'Fitness Date — Mind. Movement. Strength' title overlay and energetic movement cuts.",
    posterUrl: "/posters/fitness-date.jpg",
    youtubeId: "AMdXr4I9ilc", // IMG_0976.mov (00:37)
    isFeatured: false,
    creativeApproach:
      "Workout segments inside lifestyle vlogs need brisk momentum so they inspire rather than drag. We cut this 37-second gym session around key strength movements and partner training moments, pairing bold script typography ('Fitness Date') with a clean tagline ('Mind. Movement. Strength') to elevate raw gym footage into a cohesive brand segment.",
    editingHighlights: [
      "37-second rhythmic workout assembly cutting on peak movement and rep transitions",
      "Custom left-aligned 'Fitness Date / Mind. Movement. Strength' graphic overlay",
      "Balanced gym lighting contrast and clean energetic pacing",
    ],
    deliverables: [
      "Workout Showcase Sequence (00:37)",
      "Custom Title Graphic Overlay",
      "Rhythmic Action Assembly",
    ],
  },
  {
    id: "proj-07",
    slug: "in-todays-video-event-lifestyle-cut",
    number: "07",
    title: "In Today's Video — Event & Lifestyle Cut",
    category: "LIFESTYLE & EVENT VLOG",
    client: "LIFESTYLE CREATOR",
    runtime: "00:50",
    aspectRatio: "16:9",
    editSlate: "EVENT VLOG // 00:50",
    synopsis:
      "A 50-second lifestyle and brand-event vlog edit anchored by a custom script opener ('In today's video'), crisp dialogue pacing, warm natural skin tones, and upbeat narrative flow.",
    posterUrl: "/posters/in-todays-video.jpg",
    youtubeId: "nnQrrvXAt0A",
    isFeatured: false,
    creativeApproach:
      "Event and lifestyle vlogs shine when the edit feels effortless and personal rather than over-produced. Across 50 seconds, we shaped candid brand-event moments into a cohesive story—opening with clean script typography ('In today's video'), balancing ambient room audio with clear creator dialogue, and grading for warm, flattering natural light.",
    editingHighlights: [
      "50-second narrative lifestyle assembly with tight hook pacing and natural energy",
      "Custom script title card ('In today's video') integrated cleanly into the opening frame",
      "Warm daylight color polish and balanced dialogue/ambient audio mix",
    ],
    deliverables: [
      "16:9 Lifestyle & Event Cut (00:50)",
      "Custom Script Opening Title",
      "Color Polish & Audio Balance",
    ],
  },
  {
    id: "proj-08",
    slug: "short-form-social-cut",
    number: "08",
    title: "Short-Form Social Cut — High-Retention Edit",
    category: "SHORT-FORM SOCIAL EDIT",
    client: "CREATOR SOCIAL ARCHIVE",
    runtime: "SHORT CUT",
    aspectRatio: "16:9",
    editSlate: "SOCIAL CUT // HIGH-RETENTION",
    synopsis:
      "A fast-paced, retention-focused short-form edit engineered to capture attention in the opening frame through sharp rhythm, intentional cut timing, and clean visual finishing.",
    posterUrl: "https://i.ytimg.com/vi/ddnh59hSiEg/hqdefault.jpg",
    youtubeId: "ddnh59hSiEg",
    isFeatured: false,
    creativeApproach:
      "Short-form social edits live or die in the first two seconds. We stripped away every unnecessary pause, tightened visual transitions to match the natural cadence of the footage, and finished the cut with cohesive color and crisp audio presence so viewers stay locked through the final frame.",
    editingHighlights: [
      "Immediate opening visual hook designed to stop the scroll and hold watch time",
      "Tight rhythmic cutting eliminating dead air while preserving authentic creator energy",
      "Clean audio leveling and cohesive color finishing for mobile and desktop playback",
    ],
    deliverables: [
      "High-Retention Short-Form Master",
      "Rhythmic Pacing & Audio Polish",
      "Color-Finished Social Export",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.isFeatured);
export const railProjects = projects.filter((p) => !p.isFeatured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project;
  next: Project;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  const safeIndex = index === -1 ? 0 : index;
  const prevIndex = (safeIndex - 1 + projects.length) % projects.length;
  const nextIndex = (safeIndex + 1) % projects.length;
  return {
    prev: projects[prevIndex],
    next: projects[nextIndex],
  };
}

export function getRelatedProjects(slug: string, count = 3): Project[] {
  return projects.filter((p) => p.slug !== slug).slice(0, count);
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    id: "service-01",
    number: "01",
    title: "YouTube Vlog Editing & Creative Direction",
    description:
      "End-to-end creative direction and post-production for YouTubers—covering content planning, video ideation, intentional narrative storytelling, retention pacing, and clean, personality-driven edits.",
  },
  {
    id: "service-02",
    number: "02",
    title: "Short-Form Video Editing",
    description:
      "High-retention vertical edits (9:16) crafted for Instagram Reels, TikTok, and YouTube Shorts—combining scroll-stopping opening hooks, dynamic captions, rhythmic cuts, and punchy sound design.",
  },
  {
    id: "service-03",
    number: "03",
    title: "Talking Head Video Editing & Podcast",
    description:
      "Crisp multi-camera synchronization, dialogue cleanup, audio leveling, visual B-roll callouts, and seamless pacing that keeps educational, commentary, and video podcast audiences engaged.",
  },
  {
    id: "service-04",
    number: "04",
    title: "Thumbnail Design & Channel Packaging",
    description:
      "Scroll-stopping YouTube thumbnail design, custom opening title sequences, and cohesive visual packaging engineered to earn the click and reinforce your recognizable creator identity.",
  },
];

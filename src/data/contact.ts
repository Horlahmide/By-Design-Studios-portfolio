export interface SocialChannel {
  id: string;
  label: string;
  handle: string;
  url: string;
}

// 1. Update this single email address (used everywhere across the site):
const STUDIO_EMAIL = "ayoolaadedolapo2021@gmail.com";

// 2. For 1-click automatic background email delivery (100% Free Forever):
// Enter STUDIO_EMAIL at https://web3forms.com to receive a free Access Key in your Gmail,
// then paste it below (or in .env.local as NEXT_PUBLIC_WEB3FORMS_KEY):
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  "9bbc0e00-ff93-4f07-ab22-b22d8d26f683";

export const contactConfig = {
  studioName: "BY DESIGN STUDIO",
  tagline: "Thoughtful creativity. Intentional storytelling.",
  studioEmail: STUDIO_EMAIL,
  web3FormsAccessKey: WEB3FORMS_ACCESS_KEY,

  // Official brand transmission channels & handles:
  socialChannels: [
    {
      id: "instagram",
      label: "INSTAGRAM",
      handle: "@by_designstudio__",
      url: "https://www.instagram.com/by_designstudio__/",
    },
    {
      id: "tiktok",
      label: "TIKTOK",
      handle: "@bydesignstudio",
      url: "https://www.tiktok.com/@bydesignstudio",
    },
    {
      id: "youtube",
      label: "YOUTUBE ARCHIVE",
      handle: "[FINISHED CUTS]",
      url: "https://youtube.com",
    },
    {
      id: "email",
      label: "EMAIL DISPATCH",
      handle: STUDIO_EMAIL.toUpperCase(),
      url: `mailto:${STUDIO_EMAIL}`,
    },
  ] as SocialChannel[],

  // Section 2, Question 1: Services Interested In (Multiple Choice)
  inquiryServices: [
    "YouTube vlog Editing & Creative Direction (content planning, video ideas, storytelling and editing).",
    "Short-form Video Editing (Instagram Reels, TikTok, YouTube Shorts).",
    "Talking head video editing and podcast",
    "Thumbnail Design.",
    "Other (please specify).",
  ],

  // Section 3, Question 1: Collaboration Types
  collaborationTypes: [
    "One-time project.",
    "Monthly collaboration.",
    "Long-term partnership.",
    "Not sure yet.",
  ],

  // Section 3, Question 3: Start Timeline Options
  startTimelines: [
    "Immediately.",
    "Within the next 2 weeks.",
    "Within the next month.",
    "Just exploring my options.",
  ],
};

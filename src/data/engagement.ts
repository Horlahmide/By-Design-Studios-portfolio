export interface EngagementModel {
  id: string;
  modelNumber: string;
  badge: string;
  title: string;
  description: string;
  suitableFor: string;
  isPopular?: boolean;
}

export const engagementModels: EngagementModel[] = [
  {
    id: "model-01",
    modelNumber: "MODEL 01",
    badge: "[FLEXIBLE SCOPE]",
    title: "One-Time Project",
    description:
      "Dedicated editing, storytelling, or thumbnail packaging for a single flagship YouTube video, pilot episode, or standalone campaign.",
    suitableFor:
      "Special uploads, channel relaunches, or creators testing a first collaboration together.",
    isPopular: false,
  },
  {
    id: "model-02",
    modelNumber: "MODEL 02",
    badge: "[MOST POPULAR]",
    title: "Monthly Collaboration",
    description:
      "Consistent weekly or bi-weekly video editing turnaround, ongoing creative direction, and reliable delivery built around your upload schedule.",
    suitableFor:
      "Active YouTubers and content creators publishing regular long-form or short-form content every month.",
    isPopular: true,
  },
  {
    id: "model-03",
    modelNumber: "MODEL 03",
    badge: "[CREATIVE PARTNER]",
    title: "Long-Term Partnership",
    description:
      "Deep, ongoing creative partnership combining content planning, video ideation, full-channel editing (vlogs, talking head, Shorts), and thumbnail packaging.",
    suitableFor:
      "Growing creator brands looking for a dedicated post-production partner to scale their channel long-term.",
    isPopular: false,
  },
];

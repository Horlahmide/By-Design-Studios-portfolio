export interface ProcessStage {
  stage: string;
  title: string;
  description: string;
}

export const processStages: ProcessStage[] = [
  {
    stage: "STAGE 01",
    title: "Ingest & Creative Alignment",
    description:
      "Reviewing raw footage archives, establishing the narrative arc, and aligning on pacing references and target retention goals.",
  },
  {
    stage: "STAGE 02",
    title: "Assembly & Narrative Cut",
    description:
      "Trimming dead space, building the storyline spine, and shaping the emotional rhythm of the video from first hook to resolution.",
  },
  {
    stage: "STAGE 03",
    title: "Sound Design & Foley",
    description:
      "Multi-track audio layers, ambient room tone, tension risers, impactful hits, and surgical dialogue leveling.",
  },
  {
    stage: "STAGE 04",
    title: "Color Grade & Finishing",
    description:
      "Calibrated DaVinci Resolve color grading, contrast curve matching, film grain halation, and graphic overlays.",
  },
  {
    stage: "STAGE 05",
    title: "Review & Final Delivery",
    description:
      "Frame-by-frame review via Frame.io, collaborative revision rounds, and delivering full-res ProRes 4444 and YouTube streaming master exports.",
  },
];


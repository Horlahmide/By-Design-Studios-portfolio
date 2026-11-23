export interface CutComparisonSide {
  youtubeId: string;
  posterUrl: string;
  badge: string;
  meta: string;
  title: string;
}

export interface CutComparisonData {
  raw: CutComparisonSide;
  graded: CutComparisonSide;
}

export interface CreativePrinciple {
  number: string;
  label: string;
  headline: string;
  description: string;
}

export const cutComparison: CutComparisonData = {
  raw: {
    youtubeId: "G08SC6ULnLc",
    posterUrl: "https://i.ytimg.com/vi/G08SC6ULnLc/hqdefault.jpg",
    badge: "THE RAW FOOTAGE // BEFORE",
    meta: "UNGRADED • ORIGINAL CAMERA AUDIO & ASSEMBLY",
    title: "Raw Unedited Footage",
  },
  graded: {
    youtubeId: "yxobnCFusXg",
    posterUrl: "https://i.ytimg.com/vi/yxobnCFusXg/hqdefault.jpg",
    badge: "THE FINAL CUT // AFTER",
    meta: "COLOR GRADED • PACING, SOUND & FINISHING",
    title: "Color-Corrected & Edited Master",
  },
};

export const creativePrinciples: CreativePrinciple[] = [
  {
    number: "01",
    label: "STORY BEFORE EFFECTS",
    headline: "Narrative Purpose",
    description:
      "Every cut should serve the story. Motion and transitions should support the message instead of distracting from it.",
  },
  {
    number: "02",
    label: "THE DETAILS MATTER",
    headline: "Obsessive Craft",
    description:
      "Framing, colour, timing, sound, and composition work together to shape how the final film feels.",
  },
  {
    number: "03",
    label: "THE VISION STAYS YOURS",
    headline: "Collaborative Clarity",
    description:
      "The goal is to strengthen the creator's creative direction without erasing the personality that makes the work distinctive.",
  },
];

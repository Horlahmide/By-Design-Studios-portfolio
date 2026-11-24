export interface ThumbnailItem {
  id: string;
  title: string;
  series: string;
  ctrBadge?: string;
  coverTag?: string;
  imageUrl: string;
  fullResUrl: string;
  colSpan: "hero" | "stacked";
}

export const thumbnailItems: ThumbnailItem[] = [
  {
    id: "thumb-01",
    title: "Weekly Vlog — Cassey Fruits",
    series: "4-PANEL LIFESTYLE COLLAGE • WINE DINING | PHOTO SHOOT | PILATES | EVENING ROUTINES",
    ctrBadge: "HERO VLOG PACKAGING",
    imageUrl: "/thumbnails/thumbnail-01.jpg",
    fullResUrl: "/thumbnails/thumbnail-01.jpg",
    colSpan: "hero",
  },
  {
    id: "thumb-07",
    title: "Cozy Fall Night Routine",
    series: "LAYERED AUTUMN COLLAGE • CANDLELIT BATH | FALL LEAVES | SCRIPT & BOLD LOCKUP",
    ctrBadge: "SEASONAL VLOG PACKAGING",
    imageUrl: "/thumbnails/thumbnail-07.jpg",
    fullResUrl: "/thumbnails/thumbnail-07.jpg",
    colSpan: "hero",
  },
  {
    id: "thumb-02",
    title: "Cape Town Trip — Travel Vlog Episode 1",
    series: "SUBJECT CUTOUT & BOLD EDITORIAL DISPLAY TYPOGRAPHY",
    coverTag: "COVER 03 // TRAVEL",
    imageUrl: "/thumbnails/thumbnail-02.jpg",
    fullResUrl: "/thumbnails/thumbnail-02.jpg",
    colSpan: "stacked",
  },
  {
    id: "thumb-03",
    title: "Travel Vlog: Cape Town Highlights",
    series: "STORY-STRIP PACKAGING • BOAT BIRTHDAY | WINE TASTING | WATERFRONT LUNCH",
    coverTag: "COVER 04 // TRAVEL",
    imageUrl: "/thumbnails/thumbnail-03.png",
    fullResUrl: "/thumbnails/thumbnail-03.png",
    colSpan: "stacked",
  },
  {
    id: "thumb-04",
    title: "Adulting — Reality of Growing Up",
    series: "3-FRAME COLLAGE & EXPRESSIVE SCRIPT OVERLAY",
    coverTag: "COVER 05 // LIFESTYLE",
    imageUrl: "/thumbnails/thumbnail-04.jpg",
    fullResUrl: "/thumbnails/thumbnail-04.jpg",
    colSpan: "stacked",
  },
  {
    id: "thumb-05",
    title: "Home Updates — DIY Artwork & Market Finds",
    series: "INTERIOR VLOG PACKAGING • DIY TEXTURED ART | NEW FRIENDS | NEW MIRROR",
    coverTag: "COVER 06 // HOME VLOG",
    imageUrl: "/thumbnails/thumbnail-05.jpg",
    fullResUrl: "/thumbnails/thumbnail-05.jpg",
    colSpan: "stacked",
  },
  {
    id: "thumb-06",
    title: "My Life in Cape Town — Yacht Edition",
    series: "CUSTOM SCRIPT TITLE CARD & GROUP FRAME PACKAGING",
    coverTag: "COVER 07 // VLOG SERIES",
    imageUrl: "/posters/cape-town-yacht.jpg",
    fullResUrl: "/posters/cape-town-yacht.jpg",
    colSpan: "stacked",
  },
  {
    id: "thumb-08",
    title: "What I Eat in a Day — Wellness Transformation",
    series: "4-PANEL BEFORE & AFTER COLLAGE • BOLD HIGH-CONTRAST DISPLAY TYPOGRAPHY",
    coverTag: "COVER 08 // WELLNESS",
    imageUrl: "/posters/what-i-eat-in-a-day.jpg",
    fullResUrl: "/posters/what-i-eat-in-a-day.jpg",
    colSpan: "stacked",
  },
];

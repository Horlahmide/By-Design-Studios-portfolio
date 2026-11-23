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
    id: "thumb-02",
    title: "Cape Town Trip — Travel Vlog Episode 1",
    series: "SUBJECT CUTOUT & BOLD EDITORIAL DISPLAY TYPOGRAPHY",
    coverTag: "COVER 02 // TRAVEL",
    imageUrl: "/thumbnails/thumbnail-02.jpg",
    fullResUrl: "/thumbnails/thumbnail-02.jpg",
    colSpan: "stacked",
  },
  {
    id: "thumb-03",
    title: "Travel Vlog: Cape Town Highlights",
    series: "STORY-STRIP PACKAGING • BOAT BIRTHDAY | WINE TASTING | WATERFRONT LUNCH",
    coverTag: "COVER 03 // TRAVEL",
    imageUrl: "/thumbnails/thumbnail-03.png",
    fullResUrl: "/thumbnails/thumbnail-03.png",
    colSpan: "stacked",
  },
  {
    id: "thumb-04",
    title: "Adulting — Reality of Growing Up",
    series: "3-FRAME COLLAGE & EXPRESSIVE SCRIPT OVERLAY",
    coverTag: "COVER 04 // LIFESTYLE",
    imageUrl: "/thumbnails/thumbnail-04.jpg",
    fullResUrl: "/thumbnails/thumbnail-04.jpg",
    colSpan: "stacked",
  },
  {
    id: "thumb-05",
    title: "Home Updates — DIY Artwork & Market Finds",
    series: "INTERIOR VLOG PACKAGING • DIY TEXTURED ART | NEW FRIENDS | NEW MIRROR",
    coverTag: "COVER 05 // HOME VLOG",
    imageUrl: "/thumbnails/thumbnail-05.jpg",
    fullResUrl: "/thumbnails/thumbnail-05.jpg",
    colSpan: "stacked",
  },
  {
    id: "thumb-06",
    title: "My Life in Cape Town — Yacht Edition",
    series: "CUSTOM SCRIPT TITLE CARD & GROUP FRAME PACKAGING",
    coverTag: "COVER 06 // VLOG SERIES",
    imageUrl: "/posters/cape-town-yacht.jpg",
    fullResUrl: "/posters/cape-town-yacht.jpg",
    colSpan: "stacked",
  },
];

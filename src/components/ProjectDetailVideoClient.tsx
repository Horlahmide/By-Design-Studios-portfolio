"use client";

import { useState } from "react";
import { Project } from "@/data/projects";
import VideoPlayerFrame from "@/components/VideoPlayerFrame";
import VideoTheaterModal, { TheaterMediaItem } from "@/components/VideoTheaterModal";

interface ProjectDetailVideoClientProps {
  project: Project;
}

export default function ProjectDetailVideoClient({
  project,
}: ProjectDetailVideoClientProps) {
  const [theaterOpen, setTheaterOpen] = useState(false);

  const theaterItem: TheaterMediaItem | null = theaterOpen
    ? {
        id: project.id,
        title: project.title,
        category: project.category,
        runtime: project.runtime,
        editSlate: project.editSlate,
        posterUrl: project.posterUrl,
        youtubeId: project.youtubeId,
        aspectRatio: project.aspectRatio,
      }
    : null;

  return (
    <>
      <VideoPlayerFrame
        id={`detail-${project.id}`}
        title={project.title}
        posterUrl={project.posterUrl}
        youtubeId={project.youtubeId}
        editSlate={project.editSlate}
        runtime={project.runtime}
        category={project.category}
        aspectClassName={
          project.aspectRatio === "21:9"
            ? "aspect-[16/9] lg:aspect-[21/9]"
            : "aspect-[16/9]"
        }
        slatePosition="top-left"
        triggerLabel="PLAY MASTER CUT"
        triggerVariant="accent"
        sizes="(max-width: 1400px) 100vw, 1400px"
        onOpenTheater={() => setTheaterOpen(true)}
      />

      <VideoTheaterModal
        item={theaterItem}
        onClose={() => setTheaterOpen(false)}
      />
    </>
  );
}


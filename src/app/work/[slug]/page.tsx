import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ProjectDetailVideoClient from "@/components/ProjectDetailVideoClient";
import {
  projects,
  getProjectBySlug,
  getAdjacentProjects,
  getRelatedProjects,
} from "@/data/projects";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — By Design Studio",
    };
  }

  return {
    title: `${project.title} — By Design Studio`,
    description: project.synopsis,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(project.slug);
  const relatedProjects = getRelatedProjects(project.slug, 3);

  const defaultApproach =
    "Every frame in this edit was structured around narrative clarity, intentional pacing, and viewer retention. By combining clean assembly cuts with balanced sound design and cohesive color finishing, the final master amplifies the creator's voice without distracting from the story.";

  const defaultHighlights = [
    "High-retention narrative assembly and story pacing",
    "Multi-track dialogue polish, EQ balancing, and sound design",
    "Rec.709 color grading and shot-to-shot tonal consistency",
  ];

  const defaultDeliverables = [
    `${project.aspectRatio} Master Cut (${project.runtime})`,
    "Broadcast Stereo Mix",
    "Graded Archive Export",
  ];

  const approachText = project.creativeApproach || defaultApproach;
  const highlightsList = project.editingHighlights || defaultHighlights;
  const deliverablesList = project.deliverables || defaultDeliverables;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Editorial Header */}
      <Navbar />

      <main className="pt-24 lg:pt-28">
        {/* Top Return & Breadcrumb Bar */}
        <div className="w-full border-b border-border-light bg-surface-container/30">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-foreground hover:text-accent transition-colors font-medium min-h-[40px]"
            >
              <span>←</span>
              <span>BACK TO SELECTED WORK</span>
            </Link>

            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
              {`ARCHIVE // ${project.number} // ${project.category}`}
            </div>
          </div>
        </div>

        {/* Project Header & Technical Metadata Ledger */}
        <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 lg:pt-16 pb-10 lg:pb-14">
          <div className="max-w-4xl">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-3">
              {`PROJECT ${project.number} // ${project.category}`}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[56px] text-foreground font-normal leading-[1.08] tracking-tight mb-5">
              {project.title}
            </h1>
            <p className="font-sans text-base sm:text-lg text-text-subtle leading-relaxed max-w-[58ch]">
              {project.synopsis}
            </p>
          </div>

          {/* 4-Column Technical Specification Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-border-light">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted block mb-1">
                CLIENT / ARCHIVE
              </span>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.06em] text-foreground font-medium">
                {project.client}
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted block mb-1">
                MASTER RUNTIME
              </span>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.06em] text-foreground font-medium">
                {project.runtime}
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted block mb-1">
                ASPECT & FORMAT
              </span>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.06em] text-foreground font-medium">
                {`${project.aspectRatio} MASTER`}
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted block mb-1">
                POST-PRODUCTION ROLE
              </span>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.06em] text-accent font-medium">
                {project.awardOrTag || "LEAD EDIT • COLOR • SOUND"}
              </span>
            </div>
          </div>
        </section>

        {/* Large Letterboxed Cinema Viewing Area (Click-to-Load Player) */}
        <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 lg:pb-24">
          <ProjectDetailVideoClient project={project} />
        </section>

        {/* Editorial Case Study: Creative Approach & Post-Production Breakdown */}
        <section data-reveal className="w-full border-t border-b border-border-light bg-surface-container/25 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 7 Columns: Creative Approach Narrative */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-3">
                {"01 // THE EDITORIAL APPROACH"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground font-normal leading-tight mb-6 max-w-[26ch]">
                Shaping rhythm, clarity, and viewer retention in the cut.
              </h2>
              <p className="font-sans text-sm sm:text-base text-text-subtle leading-relaxed max-w-[58ch] mb-8">
                {approachText}
              </p>

              {/* Deliverables Strip */}
              <div className="pt-6 border-t border-border-subtle">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-semibold block mb-3">
                  MASTER DELIVERABLES:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {deliverablesList.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[11px] uppercase tracking-[0.06em] bg-background border border-border-light px-3 py-1.5 text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Timeline & Finishing Highlights */}
            <div className="lg:col-span-5 bg-background border border-border-light p-6 sm:p-8">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-2">
                {"02 // TIMELINE & FINISHING"}
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-foreground font-normal mb-6 pb-4 border-b border-border-subtle">
                Post-Production Breakdown
              </h3>

              <ul className="space-y-4">
                {highlightsList.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-accent font-semibold pt-0.5 shrink-0">
                      {`0${idx + 1}`}
                    </span>
                    <span className="font-sans text-sm text-text-subtle leading-relaxed">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-5 border-t border-border-subtle flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted">
                  {project.editSlate}
                </span>
                <Link
                  href="/contact"
                  className="font-mono text-xs uppercase tracking-[0.08em] text-foreground hover:text-accent transition-colors font-medium"
                >
                  INQUIRE SIMILAR CUT ↗
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Previous / Next Project Stepper */}
        <section data-reveal className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12 lg:py-16 border-b border-border-light">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href={`/work/${prev.slug}`}
              className="group border border-border-light p-6 hover:border-foreground transition-colors flex flex-col justify-between"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted group-hover:text-accent transition-colors mb-2">
                ← PREVIOUS PROJECT
              </span>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl sm:text-2xl text-foreground font-normal">
                  {prev.title}
                </h3>
                <span className="font-mono text-xs text-text-muted shrink-0">
                  {prev.runtime}
                </span>
              </div>
            </Link>

            <Link
              href={`/work/${next.slug}`}
              className="group border border-border-light p-6 hover:border-foreground transition-colors flex flex-col justify-between sm:text-right"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted group-hover:text-accent transition-colors mb-2">
                NEXT PROJECT →
              </span>
              <div className="flex sm:flex-row-reverse items-baseline justify-between gap-4">
                <h3 className="font-display text-xl sm:text-2xl text-foreground font-normal">
                  {next.title}
                </h3>
                <span className="font-mono text-xs text-text-muted shrink-0">
                  {next.runtime}
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Related Projects Archive */}
        <section data-reveal className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16 lg:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-2">
                {"03 // RELATED WORK"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
                More from the Editing Suite.
              </h2>
            </div>
            <Link
              href="/#work"
              className="font-mono text-xs uppercase tracking-[0.08em] text-foreground hover:text-accent transition-colors"
            >
              VIEW ALL PROJECTS →
            </Link>
          </div>

          <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {relatedProjects.map((item) => (
              <article
                key={item.id}
                data-yt={item.youtubeId}
                className="border border-border-light bg-background p-4 flex flex-col group hover:border-foreground/40 transition-colors"
              >
                <Link
                  href={`/work/${item.slug}`}
                  className="relative aspect-[16/9] w-full overflow-hidden mb-4 bg-surface-container border border-border-subtle block"
                >
                  <Image
                    src={item.posterUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-2.5 left-2.5 font-mono text-[10px] uppercase tracking-[0.08em] bg-charcoal/85 text-background px-2.5 py-0.5">
                    {item.editSlate}
                  </div>
                </Link>

                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted mb-1">
                  {`${item.number} // ${item.category}`}
                </span>
                <h3 className="font-display text-xl text-foreground font-normal mb-2 group-hover:text-accent transition-colors">
                  <Link href={`/work/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="font-sans text-xs text-text-subtle leading-relaxed mb-4 line-clamp-2">
                  {item.synopsis}
                </p>

                <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted">
                    {`RUNTIME: ${item.runtime}`}
                  </span>
                  <Link
                    href={`/work/${item.slug}`}
                    className="font-mono text-xs uppercase tracking-[0.06em] text-foreground group-hover:text-accent transition-colors"
                  >
                    OPEN PROJECT ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Conversion Banner */}
        <FinalCTA />
      </main>

      {/* Broadsheet Technical Footer */}
      <Footer />
    </div>
  );
}


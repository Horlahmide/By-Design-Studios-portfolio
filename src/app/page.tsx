import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import ProjectRail from "@/components/ProjectRail";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Editorial Sticky Header */}
      <Navbar />

      <main>
        {/* Section 1: Two-Column Editorial Hero */}
        <Hero />

        {/* Section 2: Featured Work (Alternating Spreads) */}
        <FeaturedWork />

        {/* Section 3: Additional Work (Horizontal Snapping Project Rail) */}
        <ProjectRail />

        {/* Section 4 Anchor Placeholder: Short-Form Content (Coming in Phase 3) */}
        <div id="shorts" className="sr-only">Short-Form Content</div>

        {/* Section 5 Anchor Placeholder: Thumbnails (Coming in Phase 3) */}
        <div id="thumbnails" className="sr-only">Thumbnail Design</div>

        {/* Section 7 Anchor Placeholder: About (Coming in Phase 4) */}
        <div id="about" className="sr-only">About By Design Studio</div>

        {/* Section 9 Anchor Placeholder: Services (Coming in Phase 5) */}
        <div id="services" className="sr-only">Services</div>

        {/* Section 12 Anchor Placeholder: Contact (Coming in Phase 8) */}
        <div id="contact" className="sr-only">Contact</div>
      </main>
    </div>
  );
}

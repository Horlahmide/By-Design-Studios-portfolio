import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import ProjectRail from "@/components/ProjectRail";
import ShortFormShowcase from "@/components/ShortFormShowcase";
import ThumbnailGallery from "@/components/ThumbnailGallery";
import IntroShowcase from "@/components/IntroShowcase";
import AboutSection from "@/components/AboutSection";
import WhyHireMe from "@/components/WhyHireMe";
import ServicesSection from "@/components/ServicesSection";
import WorkingProcess from "@/components/WorkingProcess";
import EngagementModels from "@/components/EngagementModels";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

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

        {/* Section 4: Short-Form Video Showcase (Dark Cinema Canvas) */}
        <ShortFormShowcase />

        {/* Section 5: Thumbnail Design Gallery (with Lightbox Modal) */}
        <ThumbnailGallery />

        {/* Section 6: YouTube Intro Showcase (Motion Title Sequences) */}
        <IntroShowcase />

        {/* Section 7: About By Design Studio (Static Brand Philosophy) */}
        <AboutSection />

        {/* Section 8: Why Hire Me / Creative Approach (Dark Canvas + Raw vs Graded) */}
        <WhyHireMe />

        {/* Section 9: Services Ledger (5 Post-Production Offerings) */}
        <ServicesSection />

        {/* Section 10: Working Process (5-Stage Sequential Pipeline) */}
        <WorkingProcess />

        {/* Section 11: Engagement Models (3 Collaboration Structures) */}
        <EngagementModels />

        {/* Section 12: Final Call To Action (Cinema Dark Conversion Banner) */}
        <FinalCTA />
      </main>

      {/* Section 13: Technical Broadsheet Footer */}
      <Footer />
    </div>
  );
}

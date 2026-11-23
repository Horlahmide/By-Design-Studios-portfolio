import Link from "next/link";
import { contactConfig } from "@/data/contact";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="w-full bg-charcoal text-background py-20 lg:py-28 overflow-hidden border-b border-border-dark"
    >
      <div data-reveal className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Category Kicker */}
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent mb-4 block font-medium">
          {"12 // HAVE A PROJECT IN MIND?"}
        </span>

        {/* Display Headline */}
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-background leading-[1.08] mb-5 font-normal tracking-tight">
          LET&apos;S MAKE IT WORTH WATCHING.
        </h2>

        {/* Studio Tagline */}
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent/90 mb-4 block">
          {contactConfig.tagline}
        </span>

        {/* Narrative Copy */}
        <p className="font-sans text-base sm:text-lg text-[#8E8B82] max-w-[52ch] mb-10 leading-relaxed">
          Tell us about your brand and what you&apos;re looking to create. Complete our brief project inquiry form so we can understand your needs and explore how we can work together.
        </p>

        {/* Primary CTA Trigger -> Opens Dedicated /contact Project Inquiry Form */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-[0.08em] font-semibold bg-accent text-background px-8 py-4 hover:bg-background hover:text-foreground transition-all duration-150 rounded-none shadow-xl group cursor-pointer"
          >
            <span>OPEN PROJECT INQUIRY FORM</span>
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>

          <a
            href={`mailto:${contactConfig.studioEmail}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.08em] border border-white/20 text-background px-6 py-4 hover:bg-background hover:text-foreground transition-all duration-150 rounded-none"
          >
            <span>DIRECT EMAIL DISPATCH</span>
          </a>
        </div>

        {/* Transmission Channels Strip */}
        <div className="w-full pt-8 border-t border-border-dark/40 flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-mono text-[11px] uppercase tracking-[0.08em] text-[#8E8B82]">
          {contactConfig.socialChannels.map((channel) => (
            <a
              key={channel.id}
              href={channel.url}
              target={channel.url.startsWith("http") ? "_blank" : undefined}
              rel={
                channel.url.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="hover:text-background transition-colors flex items-center gap-1.5"
            >
              <span className="text-accent">•</span>
              <span>{`${channel.label}: ${channel.handle}`}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

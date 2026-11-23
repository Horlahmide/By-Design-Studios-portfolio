import Link from "next/link";
import { engagementModels } from "@/data/engagement";

export default function EngagementModels() {
  return (
    <section id="engagement" className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 lg:py-28 border-b border-border-light">
      {/* Section Header */}
      <div data-reveal className="max-w-2xl mb-14 lg:mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-2">
          11 // ENGAGEMENT OPTIONS
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-foreground font-normal mb-3">
          Ways to Work Together.
        </h2>
        <p className="font-sans text-sm text-text-subtle leading-relaxed max-w-[54ch]">
          Choose the type of collaboration that best fits your channel schedule, production volume, and creative goals.
        </p>
      </div>

      {/* 3 Collaboration Cards Grid */}
      <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {engagementModels.map((model) => (
          <article
            key={model.id}
            className={`p-6 lg:p-8 flex flex-col transition-colors ${
              model.isPopular
                ? "border-2 border-accent/60 bg-surface-container/40 shadow-md"
                : "border border-border-light bg-background hover:border-foreground/40"
            }`}
          >
            {/* Card Header Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
              <span className="font-mono text-xs uppercase text-accent font-semibold tracking-[0.08em]">
                {model.modelNumber}
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 ${
                  model.isPopular
                    ? "bg-accent text-background font-medium"
                    : "text-text-muted border border-border-subtle"
                }`}
              >
                {model.badge}
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="font-display text-2xl text-foreground font-normal mb-3">
              {model.title}
            </h3>
            <p className="font-sans text-sm text-text-subtle mb-8 flex-grow leading-relaxed">
              {model.description}
            </p>

            {/* Suitable For Footer */}
            <div className="pt-4 border-t border-border-subtle mt-auto">
              <span className="font-mono text-[10px] uppercase text-foreground font-semibold block mb-1">
                SUITABLE FOR:
              </span>
              <span className="font-sans text-xs text-text-subtle leading-relaxed block">
                {model.suitableFor}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Direct Quote Request Trigger */}
      <div data-reveal className="w-full flex justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 font-sans text-xs uppercase font-semibold tracking-[0.06em] bg-foreground text-background px-8 py-3.5 hover:bg-accent transition-colors duration-150 rounded-none group cursor-pointer"
        >
          <span>REQUEST A QUOTE</span>
          <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}


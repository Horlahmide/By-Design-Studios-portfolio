import { creativePrinciples, cutComparison } from "@/data/approach";
import CutComparisonPlayer from "@/components/CutComparisonPlayer";

export default function WhyHireMe() {
  return (
    <section id="why-hire-me" className="w-full bg-charcoal text-background py-20 lg:py-28 border-b border-border-dark overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div data-reveal className="max-w-3xl mb-12 lg:mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-2">
            08 // WHY WORK WITH US / CREATIVE APPROACH
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] text-background font-normal leading-[1.12] mb-4">
            The Difference is in the Cut.
          </h2>
          <p className="font-sans text-sm md:text-[15px] text-[#8E8B82] max-w-[58ch] leading-relaxed">
            From raw ungraded footage to the final master cut—watch both side by side to see how pacing, color correction, and sound finishing transform the story.
          </p>
        </div>

        {/* Visual Demonstration: Viewport-Gated Side-by-Side Raw vs. Edited Comparison */}
        <CutComparisonPlayer comparison={cutComparison} />

        {/* Three Numbered Creative Principles */}
        <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {creativePrinciples.map((principle) => (
            <article
              key={principle.number}
              className="border-t border-border-dark/60 pt-6 flex flex-col"
            >
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent block mb-2 font-medium">
                {`${principle.number} // ${principle.label}`}
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-background font-normal mb-3">
                {principle.headline}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#8E8B82] leading-relaxed max-w-[42ch]">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

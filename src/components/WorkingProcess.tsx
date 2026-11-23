import { processStages } from "@/data/process";

export default function WorkingProcess() {
  return (
    <section id="process" className="w-full bg-surface-container/30 py-20 lg:py-28 border-b border-border-light">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div data-reveal className="max-w-2xl mb-14 lg:mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-2">
            10 // WORKING PROCESS / HOW IT WORKS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground font-normal mb-3">
            A Simple Process. A Thoughtful Result.
          </h2>
          <p className="font-sans text-sm text-text-subtle leading-relaxed max-w-[54ch]">
            A clear, collaborative post-production pipeline that takes your footage from rough transfer to finished master.
          </p>
        </div>

        {/* 5-Stage Responsive Sequence */}
        <div data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {processStages.map((stage) => (
            <article
              key={stage.stage}
              className="flex flex-col border-t-2 border-foreground pt-4"
            >
              <span className="font-mono text-xs text-accent uppercase block mb-1.5 font-medium tracking-[0.08em]">
                {stage.stage}
              </span>
              <h3 className="font-display text-lg sm:text-xl text-foreground font-normal mb-2.5">
                {stage.title}
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-text-subtle leading-relaxed">
                {stage.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


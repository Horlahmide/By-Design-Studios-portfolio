import Link from "next/link";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section id="services" className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 lg:py-28 border-b border-border-light">
      {/* Section Header */}
      <div data-reveal className="mb-12 lg:mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-3">
          09 // SERVICES / POST-PRODUCTION
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[48px] font-normal leading-[1.12] text-foreground tracking-tight max-w-[22ch]">
            From the first cut to the final master.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 bg-foreground hover:bg-accent text-background px-6 py-3 font-mono text-xs uppercase tracking-[0.06em] transition-colors shrink-0 self-start md:self-auto rounded-none group cursor-pointer"
          >
            <span>DISCUSS A PROJECT</span>
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* Service Rows Ledger */}
      <div data-reveal-stagger className="border-t border-border-light">
        {services.map((service) => (
          <div
            key={service.id}
            className="py-8 lg:py-10 border-b border-border-subtle grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group transition-colors hover:bg-surface-container/20 px-2 sm:px-4"
          >
            {/* Service Number & Title */}
            <div className="lg:col-span-5 flex items-start gap-4 sm:gap-6">
              <span className="font-mono text-sm text-accent font-medium pt-1 shrink-0">
                {`${service.number} //`}
              </span>
              <h3 className="font-display text-2xl sm:text-[28px] text-foreground font-normal leading-tight group-hover:text-accent transition-colors">
                {service.title}
              </h3>
            </div>

            {/* Service Scope Description */}
            <div className="lg:col-span-5">
              <p className="font-sans text-sm text-text-subtle leading-relaxed max-w-[50ch]">
                {service.description}
              </p>
            </div>

            {/* Direct Inquire Action */}
            <div className="lg:col-span-2 text-left lg:text-right">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 font-mono text-xs tracking-wider text-foreground hover:text-accent uppercase transition-colors font-medium group-hover:translate-x-1 duration-150"
              >
                <span>DISPATCH</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


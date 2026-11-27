import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactInquiryForm from "@/components/ContactInquiryForm";
import { ArrowBackIcon, ArrowOutwardIcon } from "@/components/Icons";
import { contactConfig } from "@/data/contact";

export const metadata: Metadata = {
  title: "Project Inquiry Form — By Design Studio",
  description:
    "Thank you for considering By Design Studio. Complete our project inquiry form to tell us about your brand and creative video editing needs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Editorial Sticky Header */}
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* Top Return & Breadcrumb Bar */}
        <div className="w-full border-b border-border-light bg-surface-container/30">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-foreground hover:text-accent transition-colors font-medium min-h-[40px]"
            >
              <ArrowBackIcon className="w-3.5 h-3.5" />
              <span>BACK TO PORTFOLIO</span>
            </Link>

            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
              {"BY DESIGN STUDIO // PROJECT INQUIRY"}
            </div>
          </div>
        </div>

        {/* Client Verbatim Intro Header */}
        <section
          data-reveal
          className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 lg:pt-16 pb-10 border-b border-border-light"
        >
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-3">
              {"BY DESIGN STUDIO // ONBOARDING & DISCOVERY"}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] text-foreground font-normal leading-[1.08] tracking-tight mb-5">
              Project Inquiry Form
            </h1>
            <div className="space-y-3 font-sans text-base sm:text-lg text-text-subtle leading-relaxed max-w-[58ch]">
              <p>
                Thank you for considering By Design Studio. We&apos;d love to
                learn more about you, your brand and what you&apos;re looking to
                create.
              </p>
              <p>
                Please take a few minutes to complete this form so we can
                understand your needs and explore how we can work together.
              </p>
            </div>
          </div>
        </section>

        {/* Main 12-Column Form & Direct Channels Layout */}
        <section
          data-reveal
          className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12 lg:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 8 Columns: 3-Section, 13-Question Inquiry Form */}
            <div className="lg:col-span-8">
              <ContactInquiryForm />
            </div>

            {/* Right 4 Columns: Editorial Dispatch Sidebar & Social Channels */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Studio Philosophy Card */}
              <div className="rounded-2xl border border-border-light bg-surface-container/30 p-6 sm:p-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent font-medium block mb-2">
                  {"STUDIO ETHOS"}
                </span>
                <h2 className="font-display text-2xl text-foreground font-normal mb-2">
                  {contactConfig.studioName}
                </h2>
                <p className="font-sans text-sm text-text-subtle leading-relaxed mb-6">
                  {contactConfig.tagline}
                </p>

                <div className="pt-5 border-t border-border-subtle space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted block">
                    WHAT HAPPENS NEXT:
                  </span>
                  <div className="font-sans text-xs text-text-subtle space-y-2 leading-relaxed">
                    <p>
                      <strong className="font-mono text-foreground">01.</strong>{" "}
                      Complete the 3-section discovery brief.
                    </p>
                    <p>
                      <strong className="font-mono text-foreground">02.</strong>{" "}
                      We review your channel, content style, and goals.
                    </p>
                    <p>
                      <strong className="font-mono text-foreground">03.</strong>{" "}
                      We get back to you via email to discuss the next steps.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Social Media & Email Channels Card */}
              <div className="rounded-2xl border border-border-light bg-background p-6 sm:p-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted font-medium block mb-4">
                  {"DIRECT CHANNELS & HANDLES"}
                </span>
                <div className="space-y-3">
                  {contactConfig.socialChannels.map((channel) => (
                    <a
                      key={channel.id}
                      href={channel.url}
                      target={
                        channel.url.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        channel.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center justify-between rounded-xl border border-border-subtle p-3.5 hover:border-accent transition-colors group"
                    >
                      <span className="font-sans text-xs uppercase font-semibold tracking-[0.06em] text-foreground group-hover:text-accent transition-colors">
                        {channel.label}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-text-muted uppercase">
                        <span>{channel.handle}</span>
                        <ArrowOutwardIcon className="w-3 h-3" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* Broadsheet Technical Footer */}
      <Footer />
    </div>
  );
}

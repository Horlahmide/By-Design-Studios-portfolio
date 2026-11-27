import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowBackIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 md:px-12 pt-28 pb-20">
        <div className="max-w-xl w-full rounded-2xl border border-border-light bg-surface-container/30 p-8 sm:p-12 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-accent font-medium block mb-3">
            {"404 // ARCHIVE ENTRY NOT FOUND"}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-normal leading-tight mb-4">
            Frame Missing From Timeline.
          </h1>
          <p className="font-sans text-sm sm:text-base text-text-subtle leading-relaxed mb-8 max-w-[44ch] mx-auto">
            The project or page you requested could not be located in the By Design Studio archive.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.08em] bg-foreground text-background hover:bg-accent px-7 py-3.5 transition-colors rounded-full"
            >
              <ArrowBackIcon className="w-3.5 h-3.5" />
              <span>BACK TO SELECTED WORK</span>
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.08em] border border-border-light text-foreground hover:border-foreground px-7 py-3.5 transition-colors rounded-full"
            >
              <span>RETURN HOME</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


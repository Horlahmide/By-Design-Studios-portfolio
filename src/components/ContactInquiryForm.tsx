"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { contactConfig } from "@/data/contact";

interface InquiryFormState {
  fullName: string;
  email: string;
  brandName: string;
  socialLinks: string;
  selectedServices: string[];
  otherServiceText: string;
  brandAndContent: string;
  biggestChallenge: string;
  goalsToAchieve: string;
  collaborationType: string;
  videoFrequency: string;
  startTimeline: string;
  estimatedBudget: string;
  additionalNotes: string;
}

const initialFormState: InquiryFormState = {
  fullName: "",
  email: "",
  brandName: "",
  socialLinks: "",
  selectedServices: [],
  otherServiceText: "",
  brandAndContent: "",
  biggestChallenge: "",
  goalsToAchieve: "",
  collaborationType: "",
  videoFrequency: "",
  startTimeline: "",
  estimatedBudget: "",
  additionalNotes: "",
};

export default function ContactInquiryForm() {
  const [form, setForm] = useState<InquiryFormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const toggleService = (service: string) => {
    setForm((prev) => {
      const exists = prev.selectedServices.includes(service);
      const nextServices = exists
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service];
      return { ...prev, selectedServices: nextServices };
    });
    if (errors.selectedServices) {
      setErrors((prev) => ({ ...prev, selectedServices: "" }));
    }
  };

  const isOtherSelected = form.selectedServices.includes(
    "Other (please specify)."
  );

  const getServicesSummary = () => {
    return form.selectedServices
      .map((s) =>
        s === "Other (please specify)." && form.otherServiceText.trim()
          ? `Other: ${form.otherServiceText.trim()}`
          : s
      )
      .join(", ");
  };

  const buildFormattedBrief = () => {
    const servicesList = form.selectedServices
      .map((s) =>
        s === "Other (please specify)." && form.otherServiceText.trim()
          ? `Other: ${form.otherServiceText.trim()}`
          : s
      )
      .join("\n  - ");

    return [
      "BY DESIGN STUDIO — PROJECT INQUIRY BRIEF",
      "==========================================",
      "",
      "SECTION 1: A LITTLE ABOUT YOU",
      `1. Full Name: ${form.fullName}`,
      `2. Email Address: ${form.email}`,
      `3. Brand, Business or Creator Name: ${form.brandName || "N/A"}`,
      `4. Social Media or Website Links: ${form.socialLinks || "N/A"}`,
      "",
      "SECTION 2: YOUR CREATIVE NEEDS",
      `1. Services Interested In:\n  - ${servicesList}`,
      `2. About Your Brand & Content: ${form.brandAndContent}`,
      `3. Biggest Content Challenge: ${form.biggestChallenge}`,
      `4. Goals to Achieve with By Design Studio: ${form.goalsToAchieve}`,
      "",
      "SECTION 3: PROJECT DETAILS",
      `1. Collaboration Type: ${form.collaborationType}`,
      `2. Videos Needed Per Week/Month: ${form.videoFrequency}`,
      `3. Target Start Timeline: ${form.startTimeline}`,
      `4. Estimated Budget: ${form.estimatedBudget}`,
      `5. Additional Notes / Expectations: ${form.additionalNotes || "None"}`,
    ].join("\n");
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.brandName.trim()) {
      newErrors.brandName = "Please enter your brand, business, or creator name.";
    }
    if (form.selectedServices.length === 0) {
      newErrors.selectedServices = "Please select at least one service.";
    }
    if (isOtherSelected && !form.otherServiceText.trim()) {
      newErrors.otherServiceText = "Please specify the other service you need.";
    }
    if (!form.brandAndContent.trim()) {
      newErrors.brandAndContent = "Please tell us a little about your brand and content.";
    }
    if (!form.biggestChallenge.trim()) {
      newErrors.biggestChallenge = "Please share your biggest content challenge right now.";
    }
    if (!form.goalsToAchieve.trim()) {
      newErrors.goalsToAchieve = "Please share what you would like us to help you achieve.";
    }
    if (!form.collaborationType) {
      newErrors.collaborationType = "Please select a collaboration type.";
    }
    if (!form.videoFrequency.trim()) {
      newErrors.videoFrequency = "Please let us know how many videos you typically need.";
    }
    if (!form.startTimeline) {
      newErrors.startTimeline = "Please select when you would like to start.";
    }
    if (!form.estimatedBudget.trim()) {
      newErrors.estimatedBudget = "Please share your estimated budget for this project.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const subjectLine = `Project Inquiry — ${form.brandName || form.fullName} (By Design Studio)`;
  const formattedBriefText = buildFormattedBrief();

  const mailtoHref = `mailto:${
    contactConfig.studioEmail
  }?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(
    formattedBriefText
  )}`;

  const gmailWebHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    contactConfig.studioEmail
  )}&su=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(
    formattedBriefText
  )}`;

  // Official Web3Forms React / Next.js FormData Implementation (https://docs.web3forms.com)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Build standard browser FormData per official Web3Forms documentation
      const formData = new FormData();

      // 1. Required Web3Forms Core Fields (name, email, message, access_key)
      formData.append("access_key", contactConfig.web3FormsAccessKey);
      formData.append("subject", subjectLine);
      formData.append("from_name", "By Design Studio Portfolio");
      formData.append("name", form.fullName.trim());
      formData.append("email", form.email.trim());
      formData.append("replyto", form.email.trim());

      // 2. Clean Custom Fields (No dots or slashes in field names)
      formData.append("brand_or_creator_name", form.brandName.trim());
      formData.append(
        "social_or_website_links",
        form.socialLinks.trim() || "Not provided"
      );
      formData.append("services_interested_in", getServicesSummary());
      formData.append("brand_and_content_overview", form.brandAndContent.trim());
      formData.append("biggest_content_challenge", form.biggestChallenge.trim());
      formData.append("goals_to_achieve", form.goalsToAchieve.trim());
      formData.append("collaboration_type", form.collaborationType);
      formData.append("videos_per_week_or_month", form.videoFrequency.trim());
      formData.append("desired_start_timeline", form.startTimeline);
      formData.append("estimated_budget", form.estimatedBudget.trim());
      formData.append(
        "additional_notes",
        form.additionalNotes.trim() || "None"
      );

      // 3. Complete Formatted Message Body (Ensures Web3Forms never flags as empty)
      formData.append("message", formattedBriefText);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError(
          data.message ||
            "Web3Forms could not process the request. Please check the message below or use the direct Gmail button."
        );
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? `Network error: ${error.message}. You can send your completed brief directly via Gmail below.`
          : "Network error while contacting Web3Forms. You can send your completed brief directly via Gmail below."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(formattedBriefText);
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 3000);
    } catch {
      setCopiedBrief(false);
    }
  };

  // THANK YOU CONFIRMATION STATE (Only shown when data.success === true)
  if (isSubmitted) {
    return (
      <div className="w-full border border-border-light bg-background p-8 sm:p-12 lg:p-16">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-accent font-medium block mb-3">
            {`INQUIRY DELIVERED // SENT TO ${contactConfig.studioEmail.toUpperCase()}`}
          </span>

          <h2 className="font-display text-3xl sm:text-5xl text-foreground font-normal leading-tight mb-6">
            THANK YOU
          </h2>

          <div className="space-y-4 font-sans text-base sm:text-lg text-text-subtle leading-relaxed mb-8">
            <p>
              Thank you for taking the time to tell us about your creative needs.
            </p>
            <p>
              We&apos;ll review your inquiry and get back to you via email to discuss the next steps.
            </p>
            <p className="text-foreground font-medium">
              We look forward to creating something meaningful together!
            </p>
          </div>

          {/* Brand Sign-Off Slate */}
          <div className="pt-6 pb-6 border-t border-b border-border-light mb-8">
            <span className="font-display text-2xl sm:text-3xl text-foreground font-semibold block mb-1">
              BY DESIGN STUDIO
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent">
              Thoughtful creativity. Intentional storytelling.
            </span>
          </div>

          {/* Optional Backup Actions */}
          <div className="bg-surface-container/40 border border-border-subtle p-5 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-semibold block mb-2">
              ✓ WEB3FORMS EMAIL DELIVERY CONFIRMED
            </span>
            <p className="font-sans text-xs text-text-subtle leading-relaxed mb-4">
              Your inquiry has been sent to <strong>{contactConfig.studioEmail}</strong> (check Promotions/Spam if testing from the same email address). You can also copy your brief below:
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyBrief}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] bg-foreground text-background hover:bg-accent px-5 py-2.5 transition-colors cursor-pointer rounded-none"
              >
                <span>
                  {copiedBrief ? "✓ COPIED TO CLIPBOARD" : "COPY INQUIRY BRIEF"}
                </span>
              </button>
              <a
                href={gmailWebHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] border border-border-light bg-background text-foreground hover:border-foreground px-5 py-2.5 transition-colors rounded-none"
              >
                <span>OPEN IN GMAIL (BROWSER) ↗</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-foreground hover:text-accent transition-colors font-medium"
            >
              <span>← RETURN TO PORTFOLIO</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setForm(initialFormState);
              }}
              className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              [SUBMIT ANOTHER INQUIRY]
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full border border-border-light bg-background p-6 sm:p-10 lg:p-12 space-y-12"
    >
      {/* Hidden Honeypot Spam Protection per Web3Forms Docs */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* =========================================================
          SECTION 1: A LITTLE ABOUT YOU
      ========================================================= */}
      <fieldset className="space-y-7">
        <div className="pb-4 border-b border-border-light">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-1">
            {"SECTION 01 // DISCOVERY"}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
            A Little About You
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1.1 Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-2"
            >
              1. Full Name <span className="text-accent">*</span>
            </label>
            <input
              id="fullName"
              name="name"
              type="text"
              value={form.fullName}
              onChange={(e) => {
                setForm({ ...form, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: "" });
              }}
              placeholder="Your full name"
              aria-invalid={!!errors.fullName}
              className="w-full bg-transparent border border-border-light px-4 py-3 font-sans text-base sm:text-[15px] text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-accent rounded-none transition-colors"
            />
            {errors.fullName && (
              <p className="font-mono text-[11px] text-accent mt-1.5">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* 1.2 Email Address */}
          <div>
            <label
              htmlFor="email"
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-2"
            >
              2. Email Address <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              className="w-full bg-transparent border border-border-light px-4 py-3 font-sans text-base sm:text-[15px] text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-accent rounded-none transition-colors"
            />
            {errors.email && (
              <p className="font-mono text-[11px] text-accent mt-1.5">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1.3 Brand, Business or Creator Name */}
          <div>
            <label
              htmlFor="brandName"
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-2"
            >
              3. Brand, Business or Creator Name <span className="text-accent">*</span>
            </label>
            <input
              id="brandName"
              name="brand_or_creator_name"
              type="text"
              value={form.brandName}
              onChange={(e) => {
                setForm({ ...form, brandName: e.target.value });
                if (errors.brandName) setErrors({ ...errors, brandName: "" });
              }}
              placeholder="Your YouTube channel or brand name"
              aria-invalid={!!errors.brandName}
              className="w-full bg-transparent border border-border-light px-4 py-3 font-sans text-base sm:text-[15px] text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-accent rounded-none transition-colors"
            />
            {errors.brandName && (
              <p className="font-mono text-[11px] text-accent mt-1.5">
                {errors.brandName}
              </p>
            )}
          </div>

          {/* 1.4 Share your social media or website links */}
          <div>
            <label
              htmlFor="socialLinks"
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-2"
            >
              4. Share your social media or website links
            </label>
            <input
              id="socialLinks"
              name="social_or_website_links"
              type="text"
              value={form.socialLinks}
              onChange={(e) =>
                setForm({ ...form, socialLinks: e.target.value })
              }
              placeholder="youtube.com/@channel, instagram.com/..."
              className="w-full bg-transparent border border-border-light px-4 py-3 font-sans text-base sm:text-[15px] text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-accent rounded-none transition-colors"
            />
          </div>
        </div>
      </fieldset>

      {/* =========================================================
          SECTION 2: YOUR CREATIVE NEEDS
      ========================================================= */}
      <fieldset className="space-y-7">
        <div className="pb-4 border-b border-border-light">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-1">
            {"SECTION 02 // CREATIVE SCOPE"}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
            Your Creative Needs
          </h3>
        </div>

        {/* 2.1 What service are you interested in? (Multiple Choice Checkboxes) */}
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-1.5">
            1. What service are you interested in? <span className="text-accent">*</span>
          </span>
          <span className="font-sans text-xs text-text-muted block mb-3">
            Select all that apply:
          </span>

          <div className="space-y-2.5">
            {contactConfig.inquiryServices.map((service) => {
              const checked = form.selectedServices.includes(service);
              return (
                <label
                  key={service}
                  className={`flex items-start gap-3.5 p-3.5 border cursor-pointer transition-colors ${
                    checked
                      ? "border-accent bg-accent/[0.06]"
                      : "border-border-light hover:border-foreground/40 bg-surface-container/15"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleService(service)}
                    className="mt-1 h-4 w-4 accent-[#4263d8] rounded-none shrink-0 cursor-pointer"
                  />
                  <span className="font-sans text-sm text-foreground leading-relaxed">
                    {service}
                  </span>
                </label>
              );
            })}
          </div>

          {errors.selectedServices && (
            <p className="font-mono text-[11px] text-accent mt-2">
              {errors.selectedServices}
            </p>
          )}

          {/* Conditional "Other (please specify)" Input */}
          {isOtherSelected && (
            <div className="mt-3 pl-4 border-l-2 border-accent">
              <label
                htmlFor="otherServiceText"
                className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent font-medium block mb-1.5"
              >
                Please specify the service you are looking for: *
              </label>
              <input
                id="otherServiceText"
                name="other_service_specified"
                type="text"
                value={form.otherServiceText}
                onChange={(e) => {
                  setForm({ ...form, otherServiceText: e.target.value });
                  if (errors.otherServiceText)
                    setErrors({ ...errors, otherServiceText: "" });
                }}
                placeholder="Describe what you need edited or designed..."
                className="w-full bg-transparent border border-border-light px-4 py-2.5 font-sans text-base sm:text-sm text-foreground focus:outline-none focus:border-accent rounded-none"
              />
              {errors.otherServiceText && (
                <p className="font-mono text-[11px] text-accent mt-1">
                  {errors.otherServiceText}
                </p>
              )}
            </div>
          )}
        </div>

        {/* 2.2 Tell us a little about your brand and the type of content you create */}
        <div>
          <label
            htmlFor="brandAndContent"
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-2"
          >
            2. Tell us a little about your brand and the type of content you create.{" "}
            <span className="text-accent">*</span>
          </label>
          <textarea
            id="brandAndContent"
            name="brand_and_content_overview"
            rows={3}
            value={form.brandAndContent}
            onChange={(e) => {
              setForm({ ...form, brandAndContent: e.target.value });
              if (errors.brandAndContent)
                setErrors({ ...errors, brandAndContent: "" });
            }}
            placeholder="Share your niche, audience, and content style..."
            aria-invalid={!!errors.brandAndContent}
            className="w-full bg-transparent border border-border-light p-4 font-sans text-base sm:text-[15px] text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-accent rounded-none transition-colors resize-y"
          />
          {errors.brandAndContent && (
            <p className="font-mono text-[11px] text-accent mt-1.5">
              {errors.brandAndContent}
            </p>
          )}
        </div>

        {/* 2.3 What’s your biggest challenge with creating content right now? */}
        <div>
          <label
            htmlFor="biggestChallenge"
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-2"
          >
            3. What&apos;s your biggest challenge with creating content right now?{" "}
            <span className="text-accent">*</span>
          </label>
          <textarea
            id="biggestChallenge"
            name="biggest_content_challenge"
            rows={3}
            value={form.biggestChallenge}
            onChange={(e) => {
              setForm({ ...form, biggestChallenge: e.target.value });
              if (errors.biggestChallenge)
                setErrors({ ...errors, biggestChallenge: "" });
            }}
            placeholder="e.g., Editing takes too much time, keeping viewer retention high, consistent upload schedule..."
            aria-invalid={!!errors.biggestChallenge}
            className="w-full bg-transparent border border-border-light p-4 font-sans text-base sm:text-[15px] text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-accent rounded-none transition-colors resize-y"
          />
          {errors.biggestChallenge && (
            <p className="font-mono text-[11px] text-accent mt-1.5">
              {errors.biggestChallenge}
            </p>
          )}
        </div>

        {/* 2.4 What would you like By Design Studio to help you achieve? */}
        <div>
          <label
            htmlFor="goalsToAchieve"
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-2"
          >
            4. What would you like By Design Studio to help you achieve?{" "}
            <span className="text-accent">*</span>
          </label>
          <textarea
            id="goalsToAchieve"
            name="goals_to_achieve"
            rows={3}
            value={form.goalsToAchieve}
            onChange={(e) => {
              setForm({ ...form, goalsToAchieve: e.target.value });
              if (errors.goalsToAchieve)
                setErrors({ ...errors, goalsToAchieve: "" });
            }}
            placeholder="Share your vision and goals for your channel or brand..."
            aria-invalid={!!errors.goalsToAchieve}
            className="w-full bg-transparent border border-border-light p-4 font-sans text-base sm:text-[15px] text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-accent rounded-none transition-colors resize-y"
          />
          {errors.goalsToAchieve && (
            <p className="font-mono text-[11px] text-accent mt-1.5">
              {errors.goalsToAchieve}
            </p>
          )}
        </div>
      </fieldset>

      {/* =========================================================
          SECTION 3: PROJECT DETAILS
      ========================================================= */}
      <fieldset className="space-y-7">
        <div className="pb-4 border-b border-border-light">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-1">
            {"SECTION 03 // PRODUCTION LOGISTICS"}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
            Project Details
          </h3>
        </div>

        {/* 3.1 What type of collaboration are you looking for? */}
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-3">
            1. What type of collaboration are you looking for?{" "}
            <span className="text-accent">*</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contactConfig.collaborationTypes.map((option) => {
              const selected = form.collaborationType === option;
              return (
                <label
                  key={option}
                  className={`flex items-center gap-3 p-3.5 border cursor-pointer transition-colors ${
                    selected
                      ? "border-accent bg-accent/[0.06]"
                      : "border-border-light hover:border-foreground/40 bg-surface-container/15"
                  }`}
                >
                  <input
                    type="radio"
                    name="collaboration_type"
                    value={option}
                    checked={selected}
                    onChange={() => {
                      setForm({ ...form, collaborationType: option });
                      if (errors.collaborationType)
                        setErrors({ ...errors, collaborationType: "" });
                    }}
                    className="h-4 w-4 accent-[#4263d8] cursor-pointer shrink-0"
                  />
                  <span className="font-sans text-sm text-foreground">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.collaborationType && (
            <p className="font-mono text-[11px] text-accent mt-1.5">
              {errors.collaborationType}
            </p>
          )}
        </div>

        {/* 3.2 How many videos would you typically need edited per week or month? */}
        <div>
          <label
            htmlFor="videoFrequency"
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-2"
          >
            2. How many videos would you typically need edited per week or month?{" "}
            <span className="text-accent">*</span>
          </label>
          <input
            id="videoFrequency"
            name="videos_per_week_or_month"
            type="text"
            value={form.videoFrequency}
            onChange={(e) => {
              setForm({ ...form, videoFrequency: e.target.value });
              if (errors.videoFrequency)
                setErrors({ ...errors, videoFrequency: "" });
            }}
            placeholder="e.g., 1 long-form video per week + 4 Shorts per month"
            aria-invalid={!!errors.videoFrequency}
            className="w-full bg-transparent border border-border-light px-4 py-3 font-sans text-base sm:text-[15px] text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-accent rounded-none transition-colors"
          />
          {errors.videoFrequency && (
            <p className="font-mono text-[11px] text-accent mt-1.5">
              {errors.videoFrequency}
            </p>
          )}
        </div>

        {/* 3.3 When would you like to start working with us? */}
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-3">
            3. When would you like to start working with us?{" "}
            <span className="text-accent">*</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contactConfig.startTimelines.map((option) => {
              const selected = form.startTimeline === option;
              return (
                <label
                  key={option}
                  className={`flex items-center gap-3 p-3.5 border cursor-pointer transition-colors ${
                    selected
                      ? "border-accent bg-accent/[0.06]"
                      : "border-border-light hover:border-foreground/40 bg-surface-container/15"
                  }`}
                >
                  <input
                    type="radio"
                    name="desired_start_timeline"
                    value={option}
                    checked={selected}
                    onChange={() => {
                      setForm({ ...form, startTimeline: option });
                      if (errors.startTimeline)
                        setErrors({ ...errors, startTimeline: "" });
                    }}
                    className="h-4 w-4 accent-[#4263d8] cursor-pointer shrink-0"
                  />
                  <span className="font-sans text-sm text-foreground">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.startTimeline && (
            <p className="font-mono text-[11px] text-accent mt-1.5">
              {errors.startTimeline}
            </p>
          )}
        </div>

        {/* 3.4 What’s your estimated budget for this project? */}
        <div>
          <label
            htmlFor="estimatedBudget"
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-2"
          >
            4. What&apos;s your estimated budget for this project?{" "}
            <span className="text-accent">*</span>
          </label>
          <input
            id="estimatedBudget"
            name="estimated_budget"
            type="text"
            value={form.estimatedBudget}
            onChange={(e) => {
              setForm({ ...form, estimatedBudget: e.target.value });
              if (errors.estimatedBudget)
                setErrors({ ...errors, estimatedBudget: "" });
            }}
            placeholder="Share your target per-project or monthly budget range"
            aria-invalid={!!errors.estimatedBudget}
            className="w-full bg-transparent border border-border-light px-4 py-3 font-sans text-base sm:text-[15px] text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-accent rounded-none transition-colors"
          />
          {errors.estimatedBudget && (
            <p className="font-mono text-[11px] text-accent mt-1.5">
              {errors.estimatedBudget}
            </p>
          )}
        </div>

        {/* 3.5 Is there anything else you’d like us to know about your project or expectations? */}
        <div>
          <label
            htmlFor="additionalNotes"
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground font-medium block mb-2"
          >
            5. Is there anything else you&apos;d like us to know about your project or expectations?
          </label>
          <textarea
            id="additionalNotes"
            name="additional_notes"
            rows={3}
            value={form.additionalNotes}
            onChange={(e) =>
              setForm({ ...form, additionalNotes: e.target.value })
            }
            placeholder="Reference channels, turnaround preferences, or any questions for us..."
            className="w-full bg-transparent border border-border-light p-4 font-sans text-base sm:text-[15px] text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-accent rounded-none transition-colors resize-y"
          />
        </div>
      </fieldset>

      {/* Visible Error Alert if Web3Forms Returns an Error */}
      {submitError && (
        <div className="border-2 border-accent bg-accent/[0.06] p-5 space-y-3">
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-accent font-semibold">
            {"DELIVERY NOTICE // "}{submitError}
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={gmailWebHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] bg-accent text-background hover:bg-foreground px-4 py-2.5 transition-colors rounded-none"
            >
              <span>SEND VIA GMAIL (BROWSER) ↗</span>
            </a>
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] border border-border-light bg-background text-foreground hover:border-foreground px-4 py-2.5 transition-colors rounded-none"
            >
              <span>OPEN MAIL APP ↗</span>
            </a>
          </div>
        </div>
      )}

      {/* Form Submit Footer */}
      <div className="pt-6 border-t border-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
          {"* REQUIRED FIELDS // DIRECT STUDIO DISPATCH"}
        </span>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 font-sans text-xs uppercase font-semibold tracking-[0.08em] bg-foreground text-background hover:bg-accent px-8 py-4 transition-colors duration-150 rounded-none cursor-pointer disabled:opacity-50"
        >
          <span>
            {isSubmitting ? "SENDING INQUIRY..." : "SUBMIT PROJECT INQUIRY"}
          </span>
          <span>→</span>
        </button>
      </div>
    </form>
  );
}

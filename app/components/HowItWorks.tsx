/**
 * HowItWorks.tsx — LocalLab.pro
 *
 * Explains the four-step process for getting a website built through
 * LocalLab's Website-as-a-Service (WaaS) model.
 *
 * Layout decisions:
 * - NO card wrapper — sits directly on the sky-blue canvas to break
 *   the visual rhythm of cream cards (cream → blue → cream = depth).
 * - 2x2 hover-effect grid with border separators, gradient reveals,
 *   animated left-bar indicators, and large teal step numbers.
 * - Responsive: 1 column (mobile) → 2 columns (md+).
 * - max-w-4xl matches the Pricing grid width for visual consistency.
 * - Header sizing matches Pricing: mb-16, text-3xl → md:4xl → lg:5xl.
 *
 * Step numbers replace icons — the numerals serve as both the visual
 * anchor and the sequential context. Bricolage Grotesque at text-5xl
 * in teal creates a bold, editorial feel that rhymes with the $30/$40
 * price display in the Pricing section above.
 */

import { SectionWrapper } from "./ui/SectionWrapper";
import { ProcessStep } from "./ui/StepCard";

/* ─── Steps data ─────────────────────────────────────────────────────────── */

/**
 * Border classes encode responsive grid dividers per position:
 *
 *   Mobile (1 col):     border-bottom between stacked items
 *   MD+ (2 cols, 2x2):  border-right on left column,
 *                        border-bottom on top row
 *
 *   ┌──────────┬──────────┐
 *   │  step 1  │  step 2  │  ← top row: border-bottom
 *   ├──────────┼──────────┤
 *   │  step 3  │  step 4  │  ← bottom row: no border-bottom
 *   └──────────┴──────────┘
 *        ↑ left col: border-right
 *
 * All borders use border-white/20 — translucent white separators
 * on the sky-blue canvas.
 */
const steps = [
  {
    title: "Tell Me What You Need",
    description:
      "Send your business info, photos, and services. No lengthy forms — just a quick conversation.",
    borders: "border-b border-white/20 md:border-r",
  },
  {
    title: "I Build It",
    description:
      "I design and build your website from scratch, tailored to your business.",
    borders: "border-b border-white/20",
  },
  {
    title: "You Review It",
    description:
      "No payment required before you see it. If you don't love it, we iterate.",
    borders: "border-b border-white/20 md:border-b-0 md:border-r",
  },
  {
    title: "Simple Monthly Fee",
    description:
      "Your site stays live for one affordable monthly cost. No surprise bills.",
    borders: "",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works">

      {/* ── Section header ──────────────────────────────────────────────── */}
      {/*
       * Sizing matches Pricing section: mb-16, eyebrow mb-3 text-sm,
       * heading scales text-3xl → md:text-4xl → lg:text-5xl.
       */}
      <div className="mb-16 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal">
          The Process
        </p>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          How It Works
        </h2>
      </div>

      {/* ── 2x2 process steps grid ──────────────────────────────────────── */}
      {/*
       * max-w-4xl matches the Pricing grid width for visual consistency.
       * md:grid-cols-2 creates the 2x2 layout at tablet+.
       * Each ProcessStep handles its own hover effects and border classes.
       */}
      <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-2">
        {steps.map((step, i) => (
          <ProcessStep
            key={step.title}
            stepNumber={i + 1}
            title={step.title}
            description={step.description}
            index={i}
            borderClasses={step.borders}
          />
        ))}
      </div>

      {/* ── WaaS disclaimer ─────────────────────────────────────────────── */}
      <p className="mt-14 text-center text-sm italic leading-relaxed text-text-muted">
        This is a Website-as-a-Service model. If you cancel, the website is
        taken offline.
      </p>

    </SectionWrapper>
  );
}

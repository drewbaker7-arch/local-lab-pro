/**
 * Pricing.tsx — LocalLab.pro
 *
 * Presents the two subscription tiers (Core and Growth) with a playful
 * "creative pricing" design — slightly rotated cards with hard box shadows,
 * hover-lift effects, and hand-placed badges.
 *
 * Layout decisions:
 * - SectionWrapper card={true} gives us the cream rounded card on blue canvas.
 * - Two PricingCards sit side-by-side at md+ via a 2-column grid. On mobile
 *   they stack vertically. Extra pt on the grid accounts for the "Popular!"
 *   badge that overflows above the highlighted card.
 * - Each card gets a slight CSS rotation (-1deg, +1deg) for an organic,
 *   not-too-perfect workshop feel.
 * - The money-back guarantee callout below is a trust signal for hesitant
 *   readers — brief and personal.
 *
 * Typography:
 * - Section header uses the playful eyebrow + heading pattern with a soft
 *   blur underline accent beneath the heading for visual warmth.
 */

import { BOOKING_URL } from "../lib/constants";
import { PricingCard } from "./ui/PricingCard";
import { SectionWrapper } from "./ui/SectionWrapper";
import { RiskFreeGuarantee } from "./ui/RiskFreeGuarantee";

/* ─── Icon components ──────────────────────────────────────────────────── */

/**
 * RocketIcon — represents the Core plan's "launch your business online" idea.
 * Stroked at 1.75 weight to match the icon density across the site.
 */
function RocketIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

/**
 * StarIcon — represents the Growth plan's "level up / stand out" idea.
 * Slightly larger visual weight signals "premium" relative to RocketIcon.
 */
function StarIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ─── Feature lists ────────────────────────────────────────────────────── */

const corePlanFeatures = [
  "Full website built for your business",
  "Custom domain (yourbusiness.com)",
  "Hosting included",
  "Mobile-friendly design",
  "Contact form",
  "2 revisions on initial design",
  "1 monthly ongoing edit",
  "Ongoing support",
];

const growthPlanFeatures = [
  "Everything in Core, plus:",
  "Branded business email",
  "Basic SEO setup",
  "Google Maps integration",
  "AI chatbot to capture leads",
  "Google Business Profile setup",
  "Lead forms to your inbox",
];

/* ─── Component ────────────────────────────────────────────────────────── */

export function Pricing() {
  return (
    <SectionWrapper id="pricing" card={true}>

      {/* ── Section header ──────────────────────────────────────────── */}
      <div className="mb-16 text-center">
        {/* Eyebrow label */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal">
          Simple Pricing
        </p>

        {/* Heading with soft blur underline accent */}
        <div className="relative inline-block">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Everything You Need &mdash; Nothing You Don&apos;t
          </h2>
          {/*
           * Soft blur underline — a teal-tinted glow beneath the heading
           * that adds warmth without being as heavy as a solid underline.
           * Matches the playful energy of the rotated cards below.
           */}
          <div
            className="absolute -bottom-3 left-1/2 h-3 w-48 -translate-x-1/2 rounded-full bg-teal/15 blur-sm"
            aria-hidden="true"
          />
        </div>

        <p className="mx-auto mt-6 max-w-md text-base text-text-muted md:text-lg">
          Affordable plans that grow with your business
        </p>
      </div>

      {/* ── Pricing card grid ───────────────────────────────────────── */}
      {/*
       * pt-4 on the grid accommodates the "Popular!" badge that overflows
       * above the highlighted card. gap-10 gives rotated cards breathing
       * room so their corners don't overlap.
       */}
      <div className="mx-auto grid max-w-4xl gap-10 pt-4 md:grid-cols-2">

        <PricingCard
          name="Core Plan"
          icon={<RocketIcon />}
          price="$30"
          period="/month"
          description="Everything a local business needs to get online."
          features={corePlanFeatures}
          ctaText="Get Started"
          ctaHref={BOOKING_URL}
          rotation={-1}
        />

        <PricingCard
          name="Growth Plan"
          icon={<StarIcon />}
          price="$40"
          period="/month"
          description="For businesses ready to attract more customers."
          features={growthPlanFeatures}
          highlighted
          ctaText="Get Started"
          ctaHref={BOOKING_URL}
          rotation={1}
        />
      </div>

      {/* ── No-contracts notice ─────────────────────────────────────── */}
      <p className="mt-12 text-center text-base text-text-muted">
        No contracts. Cancel anytime.
      </p>

      {/* ── Risk-free guarantee — animated hand-drawn circle ────────── */}
      <RiskFreeGuarantee />

    </SectionWrapper>
  );
}

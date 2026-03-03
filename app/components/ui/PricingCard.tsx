import { CheckItem } from "./CheckItem";
import { Button } from "./Button";

/**
 * PricingCard — LocalLab.pro UI Primitive
 *
 * Adapted from a "creative pricing" pattern with playful rotated cards,
 * hard box shadows, and interactive hover effects. Tailored to the
 * LocalLab.pro design system (cream surfaces, charcoal borders, teal accents).
 *
 * Visual anatomy:
 *   ┌──────────────────────────────────────┐
 *   │  [Popular! badge — rotated, if highlighted]
 *   │                                      │
 *   │  [Icon circle]                       │  ← teal icon on bordered circle
 *   │  Plan Name                           │  ← font-heading, bold
 *   │  Short description                   │  ← text-muted
 *   │                                      │
 *   │  $30 /month                          │  ← large display price
 *   │                                      │
 *   │  ✓ Feature 1                         │
 *   │  ✓ Feature 2                         │
 *   │  ...                                 │
 *   │                                      │
 *   │  [ Get Started button ]              │  ← full-width, hard shadow
 *   └──────────────────────────────────────┘
 *
 * Design decisions:
 * - Hard shadow (shadow-[4px_4px_0px_0px]) instead of soft blur — gives
 *   the cards a hand-drawn, crafty quality that matches the workshop vibe.
 * - On hover, shadow grows to 8px and card translates -4px — creates a
 *   satisfying "lift" effect.
 * - border-2 border-charcoal: bold borders feel confident and intentional.
 * - The card accepts a `rotation` prop for slight CSS rotation, adding
 *   an organic, not-too-perfect layout feel.
 * - The CTA button inside also has a hard shadow + hover translate for
 *   consistency with the card's personality.
 */

interface PricingCardProps {
  /** Tier name, e.g. "Core Plan", "Growth Plan". */
  name: string;
  /** Formatted price string, e.g. "$30". */
  price: string;
  /** Billing period label, e.g. "/month". */
  period: string;
  /** Short description of who this tier is for. */
  description: string;
  /** List of feature strings rendered as CheckItems. */
  features: string[];
  /** Icon element (SVG) rendered in the icon circle. */
  icon: React.ReactNode;
  /** When true, renders the highlighted variant with "Popular!" badge. */
  highlighted?: boolean;
  /** CTA button label. */
  ctaText: string;
  /** CTA button href destination. */
  ctaHref: string;
  /** Slight CSS rotation in degrees for a playful, organic feel. */
  rotation?: number;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  icon,
  highlighted = false,
  ctaText,
  ctaHref,
  rotation = 0,
}: PricingCardProps) {
  return (
    /*
     * Outer wrapper — applies the playful rotation and groups hover state.
     * transition-all enables smooth rotation-to-neutral on hover if desired.
     */
    <div
      className="group relative transition-all duration-300"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/*
       * Hard shadow background layer — sits behind the card content.
       * Uses an absolute-positioned div so we can animate the shadow
       * independently of the content. On hover, shadow grows from
       * 4px to 8px and the card translates up-left by 4px.
       */}
      <div
        className={`
          absolute inset-0 rounded-2xl bg-white
          border-2
          transition-all duration-300
          ${
            highlighted
              ? "border-teal shadow-[4px_4px_0px_0px] shadow-teal group-hover:shadow-[8px_8px_0px_0px] group-hover:shadow-teal"
              : "border-charcoal shadow-[4px_4px_0px_0px] shadow-charcoal group-hover:shadow-[8px_8px_0px_0px] group-hover:shadow-charcoal"
          }
        `}
      />

      {/*
       * Content layer — translates on hover to match the growing shadow,
       * creating the "card lifts off the page" effect.
       */}
      <div className="relative p-8 transition-transform duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]">

        {/* ── "Popular!" badge ─────────────────────────────────────────── */}
        {/*
         * Only on highlighted cards. Rotated 12deg and positioned top-right
         * for a hand-placed, sticker-like feel. Uses cream-yellow bg with
         * charcoal border + text for maximum legibility.
         */}
        {highlighted && (
          <div
            className="absolute -top-3 -right-3 rounded-full border-2 border-charcoal bg-cream-yellow px-3 py-1 font-heading text-sm font-bold text-text-primary"
            style={{ transform: "rotate(12deg)" }}
            role="status"
            aria-label="Most popular plan"
          >
            Popular!
          </div>
        )}

        {/* ── Icon circle ──────────────────────────────────────────────── */}
        {/*
         * Circular bordered container for the plan icon.
         * text-teal so the SVG icon inherits the accent colour.
         * border-2 border-charcoal keeps it bold and consistent with the card.
         */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-charcoal text-teal">
          {icon}
        </div>

        {/* ── Tier name + description ──────────────────────────────────── */}
        <h3 className="font-heading text-xl font-bold text-text-primary md:text-2xl">
          {name}
        </h3>
        <p className="mt-1 text-sm text-text-muted">{description}</p>

        {/* ── Price display ────────────────────────────────────────────── */}
        <div className="mt-6 mb-6">
          <span className="font-heading text-5xl font-bold tracking-tight text-text-primary">
            {price}
          </span>
          <span className="text-text-muted">{period}</span>
        </div>

        {/* ── Feature list ─────────────────────────────────────────────── */}
        <ul className="mb-8 space-y-3">
          {features.map((feature) => (
            <CheckItem key={feature}>{feature}</CheckItem>
          ))}
        </ul>

        {/* ── CTA button with hard shadow ──────────────────────────────── */}
        {/*
         * The button mirrors the card's hard-shadow personality.
         * Uses an inline style for the box-shadow + translate on hover
         * applied via the parent group. The base Button handles colours.
         */}
        <Button
          variant={highlighted ? "accent" : "primary"}
          href={ctaHref}
          className="w-full justify-center border-2 border-charcoal shadow-[4px_4px_0px_0px_#121212] transition-all duration-300 hover:shadow-[6px_6px_0px_0px_#121212] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
}

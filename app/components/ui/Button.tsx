"use client";

/**
 * Button — LocalLab.pro UI Primitive
 *
 * A pill-shaped button with three variants:
 *
 * "primary"    — dark near-black (#121212) with off-white text.
 *                Used for the main CTA. Sits confidently on both the
 *                cream card background and the blue page canvas.
 *
 * "accent"     — teal (#2a9d8f) with white text.
 *                Used for secondary calls-to-action and highlighted
 *                pricing card CTAs. Teal is the only true action color
 *                in the palette — using it sparingly preserves its impact.
 *
 * "secondary"  — transparent with border and dark text.
 *                Used alongside a primary button as a softer alternative
 *                action. Subtle cream fill on hover for tactile feedback.
 *
 * All variants use a rounded-full shape (pill) which reads as
 * friendly and approachable — consistent with the workshop aesthetic.
 *
 * Booking integration:
 * When href matches BOOKING_URL ("#book"), the button opens the
 * BookingProvider modal instead of navigating away. This keeps
 * visitors on the site while they schedule a call.
 */

import { BOOKING_URL } from "../../lib/constants";
import { useBooking } from "../BookingProvider";

interface ButtonProps {
  /** Visual treatment. Defaults to "primary". */
  variant?: "primary" | "accent" | "secondary";
  /** Destination URL — renders as a native <a> tag for SEO and accessibility. */
  href: string;
  children: React.ReactNode;
  /** Additional Tailwind classes for layout overrides (e.g. w-full). */
  className?: string;
}

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
}: ButtonProps) {
  const { openBooking } = useBooking();

  /*
   * Base styles shared by all variants:
   * - inline-flex + items-center: horizontally centers icon + text combos
   * - rounded-full: the signature pill shape
   * - font-heading: uses Bricolage Grotesque for a distinctive CTA voice
   * - font-semibold: confident weight without being heavy
   * - transition-colors: smooth bg change on hover, no layout shift
   */
  const base =
    "inline-flex items-center justify-center rounded-full px-8 py-3.5 " +
    "text-base font-semibold font-heading tracking-wide " +
    "transition-colors duration-200 cursor-pointer";

  /*
   * Variant-specific color pairs.
   * Hover states shift by one step — predictable, accessible feedback.
   */
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-charcoal text-text-on-dark hover:bg-[#1e1e1e]",
    accent: "bg-teal text-white hover:bg-teal-hover",
    secondary:
      "border-2 border-charcoal/20 text-text-primary bg-white/60 backdrop-blur-sm hover:bg-cream hover:border-charcoal/30",
  };

  /**
   * If this button points to the booking URL, intercept the click
   * and open the booking modal instead of navigating.
   */
  const isBooking = href === BOOKING_URL;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (isBooking) {
      e.preventDefault();
      openBooking();
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

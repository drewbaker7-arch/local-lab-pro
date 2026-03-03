"use client";

/**
 * Navbar — LocalLab.pro
 *
 * A fixed top navigation bar that sits above the sky-blue page canvas.
 * Uses a warm cream background (bg-cream/80) with backdrop blur so the
 * blue canvas shows faintly through it — connecting the nav visually to
 * the page rather than feeling like a cold white strip.
 *
 * Design decisions:
 * - bg-cream/80 + backdrop-blur-md: keeps the nav warm and glassy;
 *   does not compete with the cream card sections below.
 * - border-b border-border: the lightest possible separator between nav
 *   and page content; uses the cream-tone border, not a harsh dark line.
 * - Logo uses font-heading (Bricolage Grotesque): gives the wordmark its
 *   own typographic voice distinct from the body copy.
 * - CTA button uses the "primary" variant (dark pill) — the same treatment
 *   used in the hero, so repeated exposure builds pattern recognition.
 *
 * Mobile hamburger:
 * - Three bar spans animate into an × using translate + rotate transforms.
 * - The middle bar fades out (opacity-0) rather than collapsing, which
 *   avoids layout jitter during the transition.
 * - Mobile menu slides in via max-h transition (max-h-0 → max-h-96),
 *   which is the CSS-only approach that avoids JS height measurement.
 * - Menu links hover to bg-cream-dark — a step darker than the menu
 *   surface, consistent with how the design system handles hover states
 *   on cream backgrounds.
 */

import { useState } from "react";
import { BOOKING_URL, SITE_NAME } from "../lib/constants";
import { Button } from "./ui/Button";

/** Navigation links shown in both desktop and mobile menus. */
const navLinks = [
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Custom", href: "#custom" },
] as const;

export function Navbar() {
  /*
   * isOpen controls the mobile menu visibility.
   * false by default — the menu is collapsed on initial render.
   */
  const [isOpen, setIsOpen] = useState(false);

  return (
    /*
     * Outer nav:
     * - fixed top-0 left-0 right-0: locks to the top of the viewport,
     *   always visible while scrolling.
     * - z-50: ensures the nav layers above all page sections and modals.
     * - bg-cream/80 backdrop-blur-md: warm glassy cream panel; the
     *   sky-blue canvas is subtly visible through the translucency.
     * - border-b border-border: uses the cream-toned border token
     *   so the separator reads as texture, not a hard line.
     */
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-cream/80 backdrop-blur-md">
      {/* ── Desktop bar ─────────────────────────────────────────────────── */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">

        {/*
         * Logo — renders as an anchor to the page root.
         * font-heading (Bricolage Grotesque) + font-bold gives the wordmark
         * a slightly distinctive, crafted character versus the body copy.
         * text-text-primary is near-black (#0d0d0d) for maximum contrast
         * on the cream navbar background.
         */}
        <a
          href="#"
          className="font-heading text-xl font-bold tracking-tight text-text-primary"
        >
          {SITE_NAME}
        </a>

        {/* ── Desktop navigation links (hidden on mobile) ────────────────── */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            /*
             * Each link starts in text-text-muted (#454545) — visible but not
             * dominant — and transitions to text-text-primary on hover.
             * transition-colors + duration-200 keeps the interaction snappy
             * without feeling mechanical.
             */
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}

          {/*
           * Desktop CTA — uses the "primary" variant (dark pill).
           * Slightly smaller than the hero CTA (px-6 py-2.5 text-sm)
           * so it does not overpower the nav bar proportions.
           */}
          <Button href={BOOKING_URL} variant="primary" className="px-6 py-2.5 text-sm">
            Book 30 Minutes
          </Button>
        </div>

        {/* ── Mobile hamburger button (visible only below md) ─────────────── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 cursor-pointer items-center justify-center md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {/*
           * Three bar spans that morph into an × when the menu is open.
           * All bars share: h-0.5 (2px height), w-full, bg-text-primary,
           * rounded-full, and a smooth transition-all duration-300.
           *
           * Bar 1 (top):   translateY(8px) + rotate(45deg) → top arm of ×
           * Bar 2 (middle):opacity-0 → disappears cleanly
           * Bar 3 (bottom):translateY(-8px) + rotate(-45deg) → bottom arm of ×
           */}
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full rounded-full bg-text-primary transition-all duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-text-primary transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-text-primary transition-all duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* ── Mobile dropdown menu ─────────────────────────────────────────── */}
      {/*
       * max-h transition: slides from max-h-0 (collapsed, invisible) to
       * max-h-96 (fully open) with a 300ms ease. This avoids JavaScript
       * height measurement while still producing a smooth reveal.
       *
       * opacity transition adds a fade alongside the height animation —
       * the combination feels more polished than height alone.
       *
       * bg-cream/95: near-opaque warm cream, consistent with the navbar
       * background but slightly more solid so links are fully legible.
       */}
      <div
        className={`overflow-hidden bg-cream/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 border-b border-border opacity-100" : "max-h-0 border-none opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 pb-6 pt-2">
          {navLinks.map((link) => (
            /*
             * Mobile menu link items:
             * - Generous py-3 touch target for thumb accessibility.
             * - hover:bg-cream-dark (#f0eeeb): one step darker than the cream
             *   surface — consistent hover treatment for cream backgrounds.
             * - rounded-lg: softer radius than the section cards (rounded-3xl)
             *   since these are small interactive items.
             * - onClick closes the menu so the page anchors to the section
             *   without the nav overlay staying open.
             */
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-medium text-text-muted transition-colors hover:bg-cream-dark hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}

          {/*
           * Mobile CTA — full-width so it fills the menu drawer confidently.
           * mt-3 adds a small visual separation from the nav link list.
           */}
          <div className="mt-3">
            <Button
              href={BOOKING_URL}
              variant="primary"
              className="w-full text-center"
            >
              Book 30 Minutes
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

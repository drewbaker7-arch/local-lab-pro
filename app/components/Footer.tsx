/**
 * Footer — LocalLab.pro
 *
 * Two distinct zones rendered inside a single <footer> element:
 *
 * 1. Pre-footer CTA band
 *    Adapted from a CTA-4 pattern: side-by-side layout with heading,
 *    description, and CTA button on the left, and a confidence-building
 *    checklist on the right. Cream card floating on the gradient canvas.
 *
 * 2. Dark footer strip
 *    bg-charcoal (#121212) full-width bar at the very bottom of the page.
 *    Contains logo, copyright, email link, and LinkedIn placeholder.
 */

import { BOOKING_URL, SITE_NAME, CONTACT_EMAIL } from "../lib/constants";
import { Button } from "./ui/Button";

/** Confidence-building checklist items for the CTA section. */
const CTA_ITEMS = [
  "Free 20-minute consultation",
  "No contracts — cancel anytime",
  "Sites live in under 2 weeks",
  "Affordable monthly plans",
  "Money-back guarantee",
];

/** Minimal SVG check icon — teal stroke, rounded. */
function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 flex-shrink-0 text-teal"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

/** Minimal SVG envelope for the email link. */
function EnvelopeIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

/** Filled SVG LinkedIn logo. */
function LinkedInIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer>

      {/* ── Zone 1: Pre-footer CTA band (CTA-4 pattern) ───────────────────── */}
      <section className="px-4 py-5 md:px-6 md:py-8">
        <div className="noise-overlay relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-cream px-8 py-14 shadow-sm md:px-16 md:py-20">

          {/* Warm tint layer */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(251,245,188,0.45) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Side-by-side content: CTA left, checklist right */}
          <div className="relative z-10 flex flex-col items-start justify-between gap-10 md:flex-row md:gap-16">

            {/* Left: heading + description + button */}
            <div className="md:w-1/2">
              <h2 className="mb-3 font-heading text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-4xl">
                Ready to get started?
              </h2>
              <p className="mb-8 max-w-md font-body text-lg leading-relaxed text-text-muted">
                Book a free 20-minute call. No pressure, no pitch — just a
                conversation about what you need.
              </p>
              <Button variant="accent" href={BOOKING_URL} className="px-10 py-4 text-base">
                Book 20 Minutes With Me
              </Button>
            </div>

            {/* Right: confidence checklist */}
            <div className="md:w-1/2 md:pt-2">
              <ul className="flex flex-col space-y-4">
                {CTA_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 font-body text-base font-medium text-text-primary"
                  >
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Zone 2: Dark footer strip ──────────────────────────────────────── */}
      <div className="bg-charcoal">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:px-8">

          {/* Logo + copyright */}
          <div className="flex flex-col items-center gap-1 md:items-start">
            <span className="font-heading text-lg font-bold text-text-on-dark">
              {SITE_NAME}
            </span>
            <span className="font-body text-sm text-text-on-dark/50">
              &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </span>
          </div>

          {/* Contact + social links */}
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-center gap-2 font-body text-sm text-text-on-dark/60 transition-colors duration-200 hover:text-text-on-dark"
              aria-label={`Email ${CONTACT_EMAIL}`}
            >
              <EnvelopeIcon />
              <span className="hidden sm:inline">{CONTACT_EMAIL}</span>
            </a>
            <a
              href="#"
              className="text-text-on-dark/60 transition-colors duration-200 hover:text-text-on-dark"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}

/**
 * Hero — LocalLab.pro
 *
 * Closely follows the andreaskruszakin.com reference layout with added
 * polish from a shadcn-style entrance animation system:
 *
 *   1. Personal photo (placeholder) — rounded with white border + shadow
 *   2. Friendly intro line — "Hi, I'm Drew"
 *   3. Large italic display headline — the value proposition
 *   4. Body copy — centered, constrained width
 *   5. Dashed divider — visual breath before the CTA
 *   6. Single dark CTA button
 *
 * Decorative layers (from the shadcn hero pattern):
 *   - Radial gradient top shade for depth
 *   - Vertical faded border lines framing the content
 *   - noise-overlay grain texture
 *   - Staggered heroEntrance animations on each content element
 *
 * The hero sits directly on the sky-blue canvas (#a5dbff) — no card
 * wrapper — so the cream sections below feel like they float up
 * from beneath it.
 */

import { BOOKING_URL } from "../lib/constants";
import { Button } from "./ui/Button";

export function Hero() {
  return (
    /*
     * Outer section:
     * - noise-overlay + relative: grain texture + positioning context.
     * - overflow-hidden: clips gradient and decorative lines.
     * - pt-36 md:pt-44: clears fixed navbar (64px) plus breathing room.
     * - pb-20 md:pb-28: transitions cleanly into the first cream card.
     */
    <section className="noise-overlay relative overflow-hidden pt-44 pb-20 md:pt-52 md:pb-28">

      {/* ── Decorative: radial gradient top shade ──────────────────────── */}
      {/*
       * A soft radial gradient from the top center adds depth to the
       * flat blue canvas and draws the eye toward the headline.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -top-14"
        style={{
          background:
            "radial-gradient(35% 60% at 50% 0%, rgba(13,13,13,0.06), transparent)",
        }}
      />

      {/* ── Decorative: vertical faded border lines ────────────────────── */}
      {/*
       * Four vertical lines (two outer, two inner) that fade from
       * transparent at the top to a subtle border colour at the bottom.
       * Creates a structural grid feel that frames the content.
       * Hidden on mobile (too narrow to look good).
       */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <div
          className="absolute inset-y-0 left-6 w-px lg:left-8"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(13,13,13,0.08), rgba(13,13,13,0.08))" }}
        />
        <div
          className="absolute inset-y-0 right-6 w-px lg:right-8"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(13,13,13,0.08), rgba(13,13,13,0.08))" }}
        />
        <div
          className="absolute inset-y-0 left-10 w-px lg:left-14"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(13,13,13,0.04), rgba(13,13,13,0.04))" }}
        />
        <div
          className="absolute inset-y-0 right-10 w-px lg:right-14"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(13,13,13,0.04), rgba(13,13,13,0.04))" }}
        />
      </div>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-8">

        {/* ── Personal photo placeholder ─────────────────────────────── */}
        {/*
         * Centered rounded photo with white border and soft shadow.
         * Replace with an <Image> when a real photo is available.
         */}
        <div className="animate-hero-enter hero-delay-1 mb-6 inline-block">
          <div className="mx-auto h-32 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-[0_8px_40px_rgba(13,13,13,0.12)] md:h-40 md:w-40">
            <img
              src="/images/drew.webp"
              alt="Drew Baker — founder of LocalLab.pro"
              className="h-full w-full object-cover brightness-110 contrast-[1.05]"
            />
          </div>
        </div>

        {/* ── Friendly intro line ────────────────────────────────────── */}
        <p className="animate-hero-enter hero-delay-2 mb-4 font-body text-base text-text-muted md:text-lg">
          Hi, I&apos;m Drew
        </p>

        {/* ── Display headline ───────────────────────────────────────── */}
        {/*
         * Large, italic, centered — matches the reference's distinctive
         * headline treatment. Subtle text shadow lifts the text off the
         * blue canvas.
         */}
        <h1
          className="animate-hero-enter hero-delay-3 mb-6 font-heading text-4xl font-bold italic leading-[1.15] tracking-tight text-text-primary md:text-5xl lg:text-6xl"
          style={{ textShadow: "0 0 50px rgba(13,13,13,0.15)" }}
        >
          I help local businesses get the tech they actually need.
        </h1>

        {/* ── Body copy ──────────────────────────────────────────────── */}
        <p className="animate-hero-enter hero-delay-4 mx-auto mb-10 max-w-xl font-body text-base leading-relaxed text-text-secondary md:text-lg">
          I simplify technology so you can focus on what matters — running
          your business. Websites, tools, and automations at prices that
          make sense. 15 years of experience, now focused entirely on
          helping you.
        </p>

        {/* ── Dashed divider ─────────────────────────────────────────── */}
        <div
          className="animate-hero-enter hero-delay-4 mx-auto mb-10 max-w-sm border-t-2 border-dashed border-text-subtle/30"
          aria-hidden="true"
        />

        {/* ── CTA button ─────────────────────────────────────────────── */}
        <div className="animate-hero-enter hero-delay-5">
          <Button href={BOOKING_URL} variant="primary">
            Book a 20-min chat
          </Button>
        </div>
      </div>
    </section>
  );
}

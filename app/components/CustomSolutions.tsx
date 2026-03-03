"use client";

/**
 * CustomSolutions — LocalLab.pro
 *
 * A scroll-triggered section showcasing custom digital tools and automations
 * available beyond standard websites. Each feature line types out left-to-right
 * with a staggered start delay, creating a cascading typewriter effect.
 *
 * Design decisions:
 * - SectionWrapper card={false}: sits on the gradient canvas, no cream card.
 * - Emojis are used inline as friendly, recognisable visual markers —
 *   no icon library needed, universally supported.
 * - font-heading (Bricolage Grotesque) at text-xl for the feature
 *   lines gives them editorial weight, not just a boring bullet list.
 * - useInView (framer-motion) detects when the section scrolls into the
 *   viewport. Only then do the Typewriter components mount, ensuring the
 *   typing animation plays while the text is visible — not while it's
 *   offscreen and invisible.
 * - Each line's Typewriter has a staggered startDelay (i * 400ms) so
 *   they cascade one after another rather than all typing at once.
 * - Cursor hides after each line finishes typing so it doesn't clutter.
 * - The headline and label use Framer Motion slide-up animations for
 *   a polished entrance before the typewriter cascade begins.
 */

import { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { BOOKING_URL } from "../lib/constants";
import { Button } from "./ui/Button";
import { SectionWrapper } from "./ui/SectionWrapper";
import { Typewriter } from "./ui/typewriter-text";

/* ─── Animation variants (for label, headline, and CTA) ───────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

/* ─── Feature lines ─────────────────────────────────────────────────────── */

const FEATURES = [
  "Book appointments 📅 on your site.",
  "Take orders 🛒 right from your page.",
  "Set up subscription orders 🔄",
  "Automate your emails 📬",
  "Add a loyalty program 🎁 for your regulars.",
  "Send invoices ⚡ automatically.",
  "Let customers pay 💳 online.",
  "Request & track reviews ⭐ automatically.",
  "Automate a repetitive task ⚙️ and never do it manually again.",
];

/**
 * Delay between each feature line starting to type (ms).
 * 400ms creates a fast cascade where multiple lines can be
 * typing simultaneously — feels energetic and dynamic.
 */
const LINE_STAGGER_MS = 400;

/** Characters per second for each Typewriter line. */
const TYPING_SPEED_MS = 40;

/* ─── Component ─────────────────────────────────────────────────────────── */

export function CustomSolutions() {
  /*
   * useInView tracks whether the feature list container has entered the
   * viewport. We use this to conditionally render the Typewriter components
   * so they only start typing when actually visible on screen.
   *
   * once: true — after the section enters view, it stays "in view" forever.
   * This prevents the typewriters from re-mounting on subsequent scrolls.
   *
   * margin: "-80px" — triggers slightly before the element reaches the
   * viewport edge, so the typing starts as the user is scrolling toward it.
   */
  const featureListRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featureListRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="custom" card={false}>
      <motion.div
        className="mx-auto max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >

        {/* Section label */}
        <motion.p
          variants={itemVariants}
          className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-teal"
        >
          Beyond Websites
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={itemVariants}
          className="mb-10 font-heading text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-4xl"
        >
          Want to do something more custom?
        </motion.h2>

        {/* Feature list — each line types out left-to-right when the section
         * scrolls into view. Typewriter components only mount after isInView
         * becomes true, so their startDelay stagger works from that moment.
         * Before the section is in view, static placeholder text is hidden
         * so the layout height is reserved. */}
        <div ref={featureListRef} className="mb-12 flex flex-col space-y-3">
          {FEATURES.map((feature, i) => (
            <p
              key={i}
              className="font-heading text-lg font-medium leading-relaxed text-text-secondary md:text-xl"
            >
              {isInView ? (
                <Typewriter
                  text={feature}
                  speed={TYPING_SPEED_MS}
                  startDelay={i * LINE_STAGGER_MS}
                  hideCursorOnComplete={true}
                  cursor="|"
                />
              ) : (
                /* Invisible placeholder to reserve line height before typing starts */
                <span className="invisible">{feature}</span>
              )}
            </p>
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants}>
          <Button variant="accent" href={BOOKING_URL}>
            Request a Custom Quote
          </Button>
        </motion.div>

      </motion.div>
    </SectionWrapper>
  );
}

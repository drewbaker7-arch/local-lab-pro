"use client";

/**
 * CustomSolutions — LocalLab.pro
 *
 * A staggered scroll-reveal section showcasing custom digital tools
 * and automations available beyond standard websites.
 *
 * Adapted from a FeatureHighlight pattern: each feature line animates
 * in sequentially with a spring-based slide-up + fade, creating an
 * engaging "typing out a list" feel as the section scrolls into view.
 *
 * Design decisions:
 * - SectionWrapper card={true}: cream card on the gradient canvas.
 * - Emojis are used inline as friendly, recognisable visual markers —
 *   no icon library needed, universally supported.
 * - font-heading (Bricolage Grotesque) at text-2xl for the feature
 *   lines gives them editorial weight, not just a boring bullet list.
 * - Stagger delay of 0.08s keeps the cascade feeling fast and fluid
 *   rather than sluggish.
 * - whileInView trigger with once:true — animates on first scroll
 *   into view, doesn't re-trigger.
 */

import { motion, Variants } from "framer-motion";
import { BOOKING_URL } from "../lib/constants";
import { Button } from "./ui/Button";
import { SectionWrapper } from "./ui/SectionWrapper";

/* ─── Animation variants ────────────────────────────────────────────────── */

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

/* ─── Component ─────────────────────────────────────────────────────────── */

export function CustomSolutions() {
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

        {/* Feature list — each line staggers in */}
        <div className="mb-12 flex flex-col space-y-3">
          {FEATURES.map((feature, i) => (
            <motion.p
              key={i}
              variants={itemVariants}
              className="font-heading text-lg font-medium leading-relaxed text-text-secondary md:text-xl"
            >
              {feature}
            </motion.p>
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

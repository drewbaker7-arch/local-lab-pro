"use client";

/**
 * Portfolio — LocalLab.pro
 *
 * Single large image carousel showcasing past projects.
 * Inspired by a "Gateway to artist people" hero-image layout.
 *
 * Features:
 * - Eyebrow "Explore" + heading "Things we can build" top-left
 * - One large rounded image at a time (desktop hero screenshots)
 * - Left/right arrows in the lower-right corner of the image
 * - Short project description in the lower-left corner of the image
 * - Continuous loop — wraps around in both directions
 * - Smooth crossfade transition between slides
 * - Click image to open lightbox
 */

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

/* ─── Animation variants ──────────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ─── Project data ────────────────────────────────────────────────────── */

interface PortfolioItem {
  title: string;
  description: string;
  image: string;
}

const PROJECTS: PortfolioItem[] = [
  {
    title: "Restaurant",
    description: "Menu, online ordering & reservations",
    image: "/images/portfolio/restaurant.webp",
  },
  {
    title: "Contractor",
    description: "Full business site with quote requests",
    image: "/images/portfolio/contractor.webp",
  },
  {
    title: "E-Commerce",
    description: "Online storefront with product catalog",
    image: "/images/portfolio/e-commerce.webp",
  },
  {
    title: "Lead Generation",
    description: "High-converting landing page & funnel",
    image: "/images/portfolio/lead-generation.webp",
  },
  {
    title: "Dr Office",
    description: "Patient portal with appointment booking",
    image: "/images/portfolio/dr-office.webp",
  },
  {
    title: "Professional Agent",
    description: "Agent portfolio with client dashboard",
    image: "/images/portfolio/professional-agent.webp",
  },
  {
    title: "Sales Landing Page",
    description: "Conversion-optimized product launch page",
    image: "/images/portfolio/sales-landing-page.webp",
  },
];

/* ─── Arrow icons ─────────────────────────────────────────────────────── */

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <polyline points="13,4 7,10 13,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <polyline points="7,4 13,10 7,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Lightbox ────────────────────────────────────────────────────────── */

function Lightbox({
  project,
  onClose,
}: {
  project: PortfolioItem;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close preview"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={project.image}
            alt={`${project.title} — full preview`}
            className="w-full object-cover object-top"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-white">
            {project.title}
          </h3>
          <p className="mt-1 font-body text-sm text-white/70">
            {project.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Component ───────────────────────────────────────────────────────── */

/** Auto-scroll interval in milliseconds. */
const AUTO_SCROLL_MS = 5000;

export function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxProject, setLightboxProject] = useState<PortfolioItem | null>(null);

  /* Timer ref — cleared on manual interaction, restarted after pause. */
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const closeLightbox = useCallback(() => setLightboxProject(null), []);

  const project = PROJECTS[currentIndex];

  /** Start (or restart) the auto-scroll interval. */
  const startAutoScroll = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    }, AUTO_SCROLL_MS);
  }, []);

  /** Stop auto-scroll (called on manual navigation). */
  const stopAutoScroll = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /* Kick off auto-scroll on mount, clean up on unmount. */
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  /**
   * Manual navigation — advances the carousel and resets the auto-scroll
   * timer so the 5-second countdown restarts from the moment of interaction.
   */
  function navigate(dir: number) {
    setDirection(dir);
    setCurrentIndex((prev) => {
      const len = PROJECTS.length;
      return (prev + dir + len) % len;
    });
    /* Reset the timer so we don't auto-advance immediately after a click. */
    startAutoScroll();
  }

  return (
    <>
      <section id="explore" className="scroll-mt-20 py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-6xl px-6 md:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* ── Header ──────────────────────────────────────────────────── */}
          <motion.p
            variants={itemVariants}
            className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Explore
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mb-10 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text-primary md:mb-12 md:text-5xl lg:text-6xl"
          >
            Things we
            <br />
            can build.
          </motion.h2>

          {/* ── Image carousel — fixed 2:1 ratio ────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="relative aspect-[2/1] overflow-hidden rounded-3xl"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 cursor-pointer"
                onClick={() => setLightboxProject(project)}
              >
                <img
                  src={project.image}
                  alt={`${project.title} — example project`}
                  className="h-full w-full object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>

            {/* ── Gradient overlay at bottom ─────────────────────────────── */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

            {/* ── Description — bottom left ──────────────────────────────── */}
            <div className="absolute bottom-5 left-5 z-10 md:bottom-7 md:left-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-heading text-lg font-bold text-white md:text-xl">
                    {project.title}
                  </p>
                  <p className="mt-0.5 font-body text-sm text-white/70 md:text-base">
                    {project.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Arrows — bottom right ──────────────────────────────────── */}
            <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2 md:bottom-7 md:right-7">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                aria-label="Previous project"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(1);
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                aria-label="Next project"
              >
                <ChevronRight />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Lightbox overlay ───────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxProject && (
          <Lightbox project={lightboxProject} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </>
  );
}

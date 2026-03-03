"use client";

import { motion, Variants } from "framer-motion";

const pathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" },
  },
};

const textVariants: Variants = {
  hidden: { y: -12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.6, duration: 0.5 } },
};

export function RiskFreeGuarantee() {
  return (
    <motion.div
      className="mx-auto mt-10 flex max-w-lg flex-col items-center text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="relative inline-block">
        <motion.h3
          variants={textVariants}
          className="font-heading text-2xl font-bold tracking-tight text-teal md:text-3xl"
        >
          Risk Free Guarantee
        </motion.h3>

        {/* Animated wavy underline */}
        <motion.svg
          width="100%"
          height="14"
          viewBox="0 0 300 14"
          className="absolute -bottom-2 left-0 text-teal"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0,7 Q 50,0 100,7 Q 150,14 200,7 Q 250,0 300,7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            variants={pathVariants}
          />
        </motion.svg>
      </div>

      <motion.p
        variants={subtitleVariants}
        className="mt-5 max-w-sm font-body text-base leading-relaxed text-text-muted"
      >
        If you don&apos;t like it after the first 2 designs, I won&apos;t
        charge you. Simple as that.
      </motion.p>
    </motion.div>
  );
}

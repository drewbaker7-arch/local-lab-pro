"use client";

/**
 * Marquee — LocalLab.pro
 *
 * A scroll-velocity marquee divider that sits between the Hero and
 * the Problem section. Two lines of text scroll in opposite directions,
 * accelerating when the user scrolls.
 *
 * Line 1 (→ right): "you run your business"
 * Line 2 (← left):  "i'll do the tech"
 *
 * Uses a single VelocityScroll which renders two ParallaxText rows
 * (one per direction). The first row scrolls right, the second left.
 *
 * Design decisions:
 * - Sits directly on the animated gradient canvas (no card wrapper).
 * - font-heading (Bricolage Grotesque) at large display size for impact.
 * - text-charcoal/10: very faint, reads as textural background element.
 * - py-4: tight vertical padding keeps it as a separator, not a section.
 */

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/** Wrap a value within a range (for seamless looping). */
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function MarqueeRow({
  children,
  baseVelocity,
  className,
}: {
  children: string;
  baseVelocity: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;
        const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
        setRepetitions(newRepetitions);
      }
    };

    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [children]);

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);
  const directionFactor = React.useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="w-full overflow-hidden whitespace-nowrap"
      ref={containerRef}
    >
      <motion.div className={`inline-block ${className ?? ""}`} style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span key={i} ref={i === 0 ? textRef : undefined}>
            {children}{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const textClasses =
  "font-heading text-5xl font-bold tracking-tight text-charcoal/10 md:text-7xl lg:text-8xl";

export function Marquee() {
  return (
    <div className="overflow-hidden py-4" aria-hidden="true">
      <MarqueeRow baseVelocity={2.25} className={textClasses}>
        {"you run your business — i'll do the tech —"}
      </MarqueeRow>
      <MarqueeRow baseVelocity={-2.25} className={textClasses}>
        {"you run your business — i'll do the tech —"}
      </MarqueeRow>
    </div>
  );
}

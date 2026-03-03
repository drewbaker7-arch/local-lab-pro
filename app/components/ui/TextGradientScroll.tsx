"use client";

/**
 * TextGradientScroll — LocalLab.pro UI Primitive
 *
 * A scroll-triggered text reveal effect. As the user scrolls through
 * the text, each letter/word transitions from faint to fully opaque,
 * creating a "reading along" animation driven by scroll position.
 *
 * Adapted from a shadcn text-gradient-scroll pattern.
 * Uses framer-motion for scroll-linked opacity transforms.
 *
 * Props:
 * - text: the string to render
 * - type: "letter" (per-character reveal) or "word" (per-word reveal)
 * - textOpacity: "none" | "soft" | "medium" — base opacity of unrevealed text
 * - className: additional Tailwind classes on the <p> wrapper
 */

import React, { createContext, useContext, useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type TextOpacityEnum = "none" | "soft" | "medium";
type ViewTypeEnum = "word" | "letter";

interface TextGradientScrollProps {
  text: string;
  type?: ViewTypeEnum;
  className?: string;
  textOpacity?: TextOpacityEnum;
}

/* ─── Context ────────────────────────────────────────────────────────────── */

const TextGradientScrollContext = createContext<{
  textOpacity?: TextOpacityEnum;
}>({});

function useGradientScroll() {
  return useContext(TextGradientScrollContext);
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function TextGradientScroll({
  text,
  className,
  type = "letter",
  textOpacity = "soft",
}: TextGradientScrollProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const words = text.split(" ");

  return (
    <TextGradientScrollContext.Provider value={{ textOpacity }}>
      <p
        ref={ref}
        className={`relative m-0 flex flex-wrap ${className ?? ""}`}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return type === "word" ? (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          ) : (
            <Letter key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Letter>
          );
        })}
      </p>
    </TextGradientScrollContext.Provider>
  );
}

/* ─── Word-level reveal ──────────────────────────────────────────────────── */

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const { textOpacity } = useGradientScroll();

  const baseOpacityClass =
    textOpacity === "none"
      ? "opacity-0"
      : textOpacity === "medium"
        ? "opacity-30"
        : "opacity-10";

  return (
    <span className="relative me-2 mt-2">
      <span className={`absolute ${baseOpacityClass}`}>{children}</span>
      <motion.span style={{ transition: "all .5s", opacity }}>
        {children}
      </motion.span>
    </span>
  );
}

/* ─── Letter-level reveal ────────────────────────────────────────────────── */

function Letter({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
}) {
  if (typeof children !== "string") return null;

  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className="relative me-2 mt-2">
      {children.split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Char key={i} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
}

/* ─── Single character reveal ────────────────────────────────────────────── */

function Char({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const { textOpacity } = useGradientScroll();

  const baseOpacityClass =
    textOpacity === "none"
      ? "opacity-0"
      : textOpacity === "medium"
        ? "opacity-30"
        : "opacity-10";

  return (
    <span>
      <span className={`absolute ${baseOpacityClass}`}>{children}</span>
      <motion.span style={{ transition: "all .5s", opacity }}>
        {children}
      </motion.span>
    </span>
  );
}

"use client";

/**
 * Typewriter — LocalLab.pro UI Primitive
 *
 * A text animation component that types out strings character-by-character
 * from left to right, optionally cycling through an array of strings.
 *
 * Based on HextaUI's Typewriter pattern, adapted for LocalLab.pro:
 *
 * How it works:
 * - Accepts a single string or array of strings via the `text` prop.
 * - Characters are revealed one at a time using a setTimeout chain.
 * - When `loop` is true, the text deletes character-by-character (at
 *   `deleteSpeed`) then advances to the next string in the array.
 * - A blinking cursor (default "|") follows the typing position.
 *
 * Props:
 * - text:        string | string[] — the text(s) to type out.
 * - speed:       number (ms)       — delay between each typed character.
 * - deleteSpeed: number (ms)       — delay between each deleted character.
 * - delay:       number (ms)       — pause before deleting starts.
 * - cursor:      string            — the cursor character shown after text.
 * - loop:        boolean           — whether to cycle through the text array.
 * - className:   string            — Tailwind classes for the outer <span>.
 *
 * Usage:
 *   <Typewriter
 *     text={["Line one", "Line two", "Line three"]}
 *     speed={80}
 *     loop={true}
 *     className="text-xl font-medium"
 *   />
 */

import * as React from "react";
import { useEffect, useState } from "react";

export interface TypewriterProps {
  /** The text string(s) to type out. Pass an array to cycle through multiple. */
  text: string | string[];
  /** Milliseconds between each character being typed. Default: 100. */
  speed?: number;
  /** The cursor character displayed after the typed text. Default: "|". */
  cursor?: string;
  /** Whether to loop through the text array after typing completes. */
  loop?: boolean;
  /** Milliseconds between each character being deleted (when looping). Default: 50. */
  deleteSpeed?: number;
  /** Milliseconds to pause after finishing a string before deleting. Default: 1500. */
  delay?: number;
  /** Additional Tailwind classes for the outer <span> wrapper. */
  className?: string;
  /**
   * Milliseconds to wait before the very first character starts typing.
   * Useful for staggering multiple Typewriters so they type sequentially.
   * Default: 0 (start immediately).
   */
  startDelay?: number;
  /** Hide the blinking cursor after typing finishes (no loop). Default: false. */
  hideCursorOnComplete?: boolean;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
  startDelay = 0,
  hideCursorOnComplete = false,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);
  /** Whether the initial startDelay has elapsed and typing can begin. */
  const [started, setStarted] = useState(startDelay === 0);
  /** Whether typing has completed (only relevant when loop=false). */
  const [done, setDone] = useState(false);

  /* Normalize to array so the logic always iterates over string[] */
  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  /* ── Handle startDelay — wait before typing begins ── */
  useEffect(() => {
    if (startDelay <= 0) return;
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started || !currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          /* ── Typing phase: add one character at a time (left → right) ── */
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            /* Finished typing — wait `delay` ms then start deleting */
            setTimeout(() => setIsDeleting(true), delay);
          } else {
            /* Not looping — mark as done so we can hide the cursor */
            setDone(true);
          }
        } else {
          /* ── Deleting phase: remove one character at a time ── */
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            /* All characters deleted — advance to the next string */
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    started,
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
  ]);

  /** Whether to show the blinking cursor */
  const showCursor = !(done && hideCursorOnComplete);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-pulse">{cursor}</span>}
    </span>
  );
}

"use client";

/**
 * Problem — LocalLab.pro
 *
 * A scroll-reveal section that presents the core pain point and
 * value proposition through a structured hierarchy of text blocks.
 * Each block fades in word-by-word as the user scrolls, creating
 * a cinematic "reading along" experience on the animated gradient canvas.
 *
 * Uses multiple TextGradientScroll instances with descending typographic
 * scale to establish clear visual hierarchy:
 *   1. Headline  — large, bold, commanding
 *   2. Two body paragraphs — medium, conversational
 *   3. Closing line — bold, teal-accented, signals the pivot to solution
 *
 * Design decisions:
 * - SectionWrapper card={false}: sits directly on the animated gradient
 *   canvas — no cream card box. Text uses cream color for contrast.
 * - Teal decorative dash above the headline maintains visual rhythm.
 * - Generous vertical spacing (space-y) between blocks gives each
 *   its own moment during the scroll reveal.
 * - The closing line uses teal text to visually signal the transition
 *   from "problem" framing to "I'm your solution" framing.
 */

import { SectionWrapper } from "./ui/SectionWrapper";
import { TextGradientScroll } from "./ui/TextGradientScroll";

const HEADLINE = "The world is moving fast — your business should too";

const PARA_1 =
  "Every day there's a new tool, a new platform, a new thing you're supposed to be doing online. Meanwhile, you're busy running your actual business — the one that pays the bills and serves real people.";

const PARA_2 =
  "The problem isn't that you don't care about technology. It's that nobody's made it simple or affordable enough to just get it handled. You shouldn't need a $5,000 budget and a three-month timeline just to have a website that works.";

const CLOSING =
  "That's exactly where I come in. I build what you need, at a price that makes sense, on a timeline that respects your time.";

export function Problem() {
  return (
    <SectionWrapper id="problem" card={true}>
      <div className="mx-auto max-w-4xl">

        {/* Decorative teal dash — visual entry point */}
        <div className="mb-12">
          <div
            className="h-1 w-12 rounded-full bg-teal/60"
            aria-hidden="true"
          />
        </div>

        {/* Stacked scroll-reveal blocks with clear hierarchy */}
        <div className="space-y-10 md:space-y-14">

          {/* Headline — large, bold, commanding */}
          <TextGradientScroll
            text={HEADLINE}
            type="word"
            textOpacity="medium"
            className="font-heading text-3xl font-bold leading-tight tracking-tight text-charcoal md:text-4xl"
          />

          {/* Paragraph 1 — conversational body */}
          <TextGradientScroll
            text={PARA_1}
            type="word"
            textOpacity="medium"
            className="font-heading text-lg font-medium leading-relaxed text-charcoal/80 md:text-xl"
          />

          {/* Paragraph 2 — deepening the pain point */}
          <TextGradientScroll
            text={PARA_2}
            type="word"
            textOpacity="medium"
            className="font-heading text-lg font-medium leading-relaxed text-charcoal/80 md:text-xl"
          />

          {/* Closing line — bold pivot to solution */}
          <TextGradientScroll
            text={CLOSING}
            type="word"
            textOpacity="medium"
            className="font-heading text-lg font-bold leading-snug tracking-tight text-charcoal md:text-xl"
          />

        </div>
      </div>
    </SectionWrapper>
  );
}

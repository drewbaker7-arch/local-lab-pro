/**
 * page.tsx — LocalLab.pro home page
 *
 * Root page component for the Next.js App Router.
 * Composes every visible section in reading order:
 *
 *   Navbar          → sticky top navigation
 *   Hero            → above-the-fold headline + primary CTA (sits on blue canvas)
 *   Problem         → pain points addressed (cream card)
 *   Pricing         → plans and pricing (cream card)
 *   HowItWorks      → process explanation (cream card)
 *   CustomSolutions → bespoke tooling offer (cream card)
 *   Footer          → pre-footer CTA band + dark footer strip
 *
 * This file is intentionally minimal — all layout, styling, and
 * content decisions live inside the individual section components.
 * Adding or reordering sections means editing only this file.
 */

import { AnnouncementTicker } from "./components/AnnouncementTicker";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Problem } from "./components/Problem";
import { Pricing } from "./components/Pricing";
import { HowItWorks } from "./components/HowItWorks";
import { CustomSolutions } from "./components/CustomSolutions";
import { Portfolio } from "./components/Portfolio";
import { Footer } from "./components/Footer";
import { StickyBookCTA } from "./components/StickyBookCTA";

export default function Home() {
  return (
    <>
      {/* Announcement ticker — fixed at the very top, above the navbar */}
      <AnnouncementTicker />

      {/* Sticky mobile CTA — slides up from bottom when hero CTA scrolls out of view */}
      <StickyBookCTA />

      {/* Sticky navigation — rendered outside <main> so it overlays all sections */}
      <Navbar />

      {/*
       * <main> wraps every content section for landmark semantics.
       * The sky-blue body background (set in globals.css) shows through the
       * gaps between cream card sections, creating the "papers on a wall" effect.
       */}
      <main>
        {/* Full-bleed hero — sits directly on the blue canvas (no card wrapper) */}
        <Hero />

        {/* Scroll-velocity marquee divider between hero and content sections */}
        <Marquee />

        {/* Cream card sections — each floats on the blue canvas via SectionWrapper card={true} */}
        <Problem />
        <HowItWorks />
        <Pricing />
        <CustomSolutions />
        <Portfolio />
      </main>

      {/*
       * Footer sits outside <main>:
       * - Pre-footer CTA band is a standalone cream card on the blue canvas
       * - Dark strip is a full-width bg-dark ground plane at the page bottom
       */}
      <Footer />
    </>
  );
}

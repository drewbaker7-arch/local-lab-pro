"use client";

/**
 * StickyBookCTA — LocalLab.pro
 *
 * A mobile-only sticky booking bar fixed to the bottom of the viewport.
 * Its sole purpose is to keep the primary CTA visible to mobile users
 * who have scrolled past the hero section and no longer see the main
 * "Book a 20-min chat" button.
 *
 * ─── Visibility Logic ───────────────────────────────────────────────────────
 *
 * We use the IntersectionObserver API to watch a sentinel element in the
 * hero section: `<div id="hero-cta">` (added directly to Hero.tsx around
 * the CTA button). When that element is:
 *
 *   - VISIBLE  → hero CTA is on screen → sticky bar slides OUT (translateY 100%)
 *   - INVISIBLE → hero CTA has scrolled off screen → sticky bar slides IN (translateY 0)
 *
 * This is more robust than scroll position (`window.scrollY`) because:
 *   1. It's layout-agnostic — works regardless of hero section height.
 *   2. No scroll event polling — browser-native, paint-efficient.
 *   3. Handles edge cases (e.g. user resizes viewport, orientation change)
 *      automatically since IntersectionObserver re-evaluates on layout change.
 *
 * threshold: 0 means the callback fires as soon as any pixel of the sentinel
 * enters or leaves the viewport — the most sensitive possible trigger.
 *
 * ─── Z-Index Layering ───────────────────────────────────────────────────────
 *
 * The site has three fixed layers:
 *   z-[100]  — BookingProvider modal (must sit above everything)
 *   z-[60]   — AnnouncementTicker (top banner)
 *   z-50     — Navbar
 *   z-[55]   — StickyBookCTA ← this component
 *   z-10     — Normal page content
 *
 * z-[55] places this bar above the navbar (z-50) but well below the
 * booking modal (z-[100]) so the modal can always be dismissed cleanly.
 *
 * ─── Why a standalone <button>, not <Button> ────────────────────────────────
 *
 * The Button component in ui/Button.tsx renders an <a> element (correct for
 * navigation CTAs). Here we are invoking `openBooking()` directly via
 * onClick, so a semantic <button> element is more appropriate — it conveys
 * the correct role to assistive technology and avoids misusing <a> for a
 * non-navigation action.
 *
 * ─── iOS Safe Area ──────────────────────────────────────────────────────────
 *
 * `pb-[env(safe-area-inset-bottom)]` uses the CSS environment variable that
 * iOS/Safari sets to the height of the home indicator bar. Without this,
 * the button would sit underneath the home indicator on modern iPhones and
 * be partially obscured. The env() value is 0 on non-notched devices, so
 * this is safe to apply universally.
 */

import { useState, useEffect } from "react";
import { useBooking } from "./BookingProvider";

export function StickyBookCTA() {
  /*
   * visible: whether the sticky bar should be translated into view.
   * Starts false — we never want to flash the bar before the observer
   * has had a chance to evaluate whether the hero CTA is on screen.
   */
  const [visible, setVisible] = useState(false);

  const { openBooking } = useBooking();

  useEffect(() => {
    /*
     * Look up the sentinel element. This is a DOM element in the Hero
     * section (id="hero-cta") that wraps the primary CTA button.
     * If it doesn't exist (e.g. on pages without a hero), bail early —
     * the sticky bar will simply never appear, which is correct behaviour.
     */
    const sentinel = document.getElementById("hero-cta");
    if (!sentinel) return;

    /*
     * IntersectionObserver fires our callback whenever the sentinel's
     * intersection state changes relative to the root (the viewport).
     *
     * entry.isIntersecting === true  → sentinel is visible → hide bar
     * entry.isIntersecting === false → sentinel is off screen → show bar
     *
     * threshold: 0 — fire as soon as any part of the sentinel enters or
     * leaves the viewport boundary. This gives an instant response and
     * avoids the user seeing the bar a moment after the CTA disappears.
     */
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    /*
     * Cleanup: disconnect the observer when the component unmounts.
     * This prevents memory leaks and stale callbacks on route changes.
     */
    return () => observer.disconnect();
  }, []);

  return (
    /*
     * Outer container:
     * - fixed bottom-0 left-0 right-0: locks to the bottom of the viewport.
     * - z-[55]: above navbar (z-50) and page content (z-10), below the
     *   booking modal (z-[100]) and announcement ticker (z-[60]).
     * - md:hidden: this element is display:none at the md breakpoint and
     *   above. Desktop users always have the navbar CTA in view, so the
     *   sticky bar would be redundant and potentially intrusive on larger
     *   screens.
     * - translate-y transform: the slide-up/down animation. translateY(100%)
     *   pushes the entire bar off the bottom edge of the viewport (invisible);
     *   translateY(0) restores it to its natural fixed position.
     * - transition-transform duration-300 ease-out: smooth, snappy reveal.
     *   ease-out means the bar decelerates as it arrives — feels physical.
     *   300ms is long enough to be perceptible but short enough to not
     *   feel sluggish on repeated scroll interactions.
     * - will-change-transform: hints to the browser to promote this element
     *   to its own compositor layer, enabling GPU-accelerated transforms and
     *   avoiding layout/paint work during the animation.
     */
    <div
      aria-hidden={!visible}
      className={[
        "fixed bottom-0 left-0 right-0 z-[55]",
        "md:hidden",
        "border-t border-border",
        "bg-white/90 backdrop-blur-lg",
        "px-5 py-3",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        "transition-transform duration-300 ease-out will-change-transform",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      {/*
       * The booking button:
       * - w-full: fills the bar so the tap target is as large as possible —
       *   critical on mobile where thumbs are the input device.
       * - rounded-full: pill shape consistent with the Button component's
       *   primary variant and the site's "friendly, approachable" aesthetic.
       * - bg-charcoal text-text-on-dark hover:bg-[#1e1e1e]: exact colours
       *   from the primary variant in ui/Button.tsx — visual consistency
       *   means users immediately recognise this as the same action.
       * - font-heading font-semibold: Bricolage Grotesque, matching all
       *   other CTA buttons on the page.
       * - tracking-wide: slight letterspacing keeps the text crisp at
       *   mobile font sizes on varied screen densities.
       * - py-3: compact vertical padding — keeps the bar slim so it doesn't
       *   consume too much of the viewport.
       * - transition-colors duration-200: fast hover feedback.
       * - cursor-pointer: explicit in case UA resets <button> cursors.
       * - focus-visible:outline-none focus-visible:ring-2: accessible focus
       *   ring using the teal accent colour, visible to keyboard/switch users
       *   without polluting mouse interactions.
       */}
      <button
        type="button"
        onClick={openBooking}
        className={[
          "w-full rounded-full",
          "bg-charcoal text-text-on-dark hover:bg-[#1e1e1e]",
          "font-heading font-semibold tracking-wide",
          "px-8 py-3 text-base",
          "transition-colors duration-200 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
        ].join(" ")}
        aria-label="Book a free 20-minute call with Drew"
      >
        Book 20 Minutes With Me
      </button>
    </div>
  );
}

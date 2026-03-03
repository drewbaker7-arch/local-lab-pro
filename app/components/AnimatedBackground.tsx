"use client";

/**
 * AnimatedBackground — LocalLab.pro
 *
 * A fixed full-viewport MeshGradient that replaces the flat sky-blue
 * (#a5dbff) page canvas with a subtly animated gradient. The body's
 * background-color is kept as a fallback for the brief moment before
 * this client component hydrates and the WebGL canvas initialises.
 *
 * Architecture:
 * - "use client" because MeshGradient renders a <canvas> via WebGL.
 * - Uses a `mounted` flag to only render the canvas client-side
 *   (WebGL cannot initialise during SSR).
 * - fixed inset-0 z-0: covers the viewport, sits behind all content.
 * - Z-stacking: gradient (z-0) < page content (default) < navbar (z-50).
 *
 * Color palette:
 * 6 colors drawn from the design system to create rich, organic blending.
 * Dominant blues with warm cream and teal accents.
 */

import { useState, useEffect } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

export function AnimatedBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-screen h-screen" aria-hidden="true">
      {mounted && (
        <MeshGradient
          width={dimensions.width}
          height={dimensions.height}
          colors={[
            "#a5dbff", // Sky blue — dominant, matches page-bg
            "#8ad0ff", // Soft blue — brighter variation
            "#fbf9f5", // Cream — warm accent from card surfaces
            "#c8e6f7", // Light blue-cream — bridging tone
            "#94c5e5", // Muted blue — softer blue-gray
            "#d4f0ff", // Pale blue — light airy highlight
          ]}
          speed={0.4}
          distortion={0.8}
          swirl={0.6}
          offsetX={0.08}
          grainMixer={0}
          grainOverlay={0}
        />
      )}
    </div>
  );
}

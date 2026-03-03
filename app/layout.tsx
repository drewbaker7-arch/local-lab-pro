import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AnimatedBackground } from "./components/AnimatedBackground";

/**
 * Typography System — LocalLab.pro
 *
 * Two complementary Google Fonts chosen to match the warm, personal,
 * workshop-like feel of the reference site (andreaskruszakin.com):
 *
 * Bricolage Grotesque  — headings (--font-heading)
 *   Warm, slightly irregular grotesque. Has a handcrafted, distinctive
 *   character without being quirky. Feels personal and modern simultaneously.
 *   Variable weight 200–800 loaded for full creative flexibility.
 *
 * Plus Jakarta Sans    — body (--font-body)
 *   Clean, friendly, highly legible. Slightly rounded terminals keep it
 *   approachable. Pairs naturally with Bricolage without competing with it.
 *   Variable weight 200–800 loaded for fine typographic control.
 *
 * Both fonts use CSS variables so they can be referenced anywhere:
 *   font-heading  →  var(--font-bricolage)  (mapped in @theme inline)
 *   font-body     →  var(--font-jakarta)    (mapped in @theme inline)
 */

const bricolageGrotesque = Bricolage_Grotesque({
  // Variable weight range — allows fluid weight control via CSS
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  // Include all weights for heading variety (e.g. light intros, bold CTAs)
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LocalLab.pro — Fast & Affordable Tech for Local Businesses",
  description:
    "I help local businesses catch up with modern technology. Websites, tools, and automations at prices that make sense.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * scroll-smooth enables anchor-link scrolling for the nav
     * and the "how it works" section CTAs.
     */
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${bricolageGrotesque.variable}
          ${plusJakartaSans.variable}
          font-body
          antialiased
        `}
      >
        <AnimatedBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

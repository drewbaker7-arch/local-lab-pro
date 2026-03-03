import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { BookingProvider } from "./components/BookingProvider";

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

/**
 * Site-wide metadata — populates <head> tags for SEO and social sharing.
 *
 * Open Graph (og:*) tags control how the link appears in iMessage, Facebook,
 * LinkedIn, Slack, etc. Twitter card tags provide the same for X/Twitter.
 *
 * The OG image (public/images/og-image.png) is a 1440×756 screenshot of the
 * hero section — Drew's photo + headline on the sky-blue canvas.
 *
 * metadataBase tells Next.js the production origin so relative image paths
 * resolve to absolute URLs in the rendered meta tags.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://locallab.pro"),
  title: "LocalLab.pro — Fast & Affordable Tech for Local Businesses",
  description:
    "I help local businesses get the tech they actually need. Websites, tools, and automations at prices that make sense. 15 years of experience, now focused entirely on helping you.",
  openGraph: {
    title: "LocalLab.pro — Fast & Affordable Tech for Local Businesses",
    description:
      "I help local businesses get the tech they actually need. Websites, tools, and automations at prices that make sense.",
    url: "https://locallab.pro",
    siteName: "LocalLab.pro",
    images: [
      {
        url: "/images/og-image.png",
        width: 1440,
        height: 756,
        alt: "LocalLab.pro — I help local businesses get the tech they actually need.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalLab.pro — Fast & Affordable Tech for Local Businesses",
    description:
      "I help local businesses get the tech they actually need. Websites, tools, and automations at prices that make sense.",
    images: ["/images/og-image.png"],
  },
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
        <BookingProvider>
          <AnimatedBackground />
          <div className="relative z-10">{children}</div>
        </BookingProvider>
      </body>
    </html>
  );
}

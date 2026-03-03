"use client";

/**
 * BookingProvider — LocalLab.pro
 *
 * Global context + modal for the Google Calendar booking flow.
 *
 * How it works:
 * - Wraps the app in layout.tsx so every component can call `useBooking()`.
 * - Any Button with href matching BOOKING_URL automatically opens this modal
 *   instead of navigating away (handled inside Button.tsx).
 * - The modal renders a Google Calendar appointment scheduling iframe so
 *   visitors can book without leaving the site.
 * - Escape key and backdrop click close the modal.
 * - Body scroll is locked while the modal is open.
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CALENDAR_EMBED_URL } from "../lib/constants";

/* ─── Context ──────────────────────────────────────────────────────────── */

interface BookingContextValue {
  openBooking: () => void;
}

const BookingContext = createContext<BookingContextValue>({
  openBooking: () => {},
});

/** Hook to open the booking modal from any component. */
export function useBooking() {
  return useContext(BookingContext);
}

/* ─── Provider + Modal ─────────────────────────────────────────────────── */

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = useCallback(() => setIsOpen(true), []);
  const closeBooking = useCallback(() => setIsOpen(false), []);

  /* Lock body scroll and listen for Escape key while modal is open */
  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeBooking();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeBooking]);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}

      {/* ── Booking modal overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
              onClick={closeBooking}
            />

            {/* Modal container */}
            <motion.div
              className="relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ maxHeight: "90vh" }}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Book a Free 20-Minute Call
                </h3>
                <button
                  onClick={closeBooking}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-cream hover:text-text-primary"
                  aria-label="Close booking modal"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <line
                      x1="4"
                      y1="4"
                      x2="16"
                      y2="16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="16"
                      y1="4"
                      x2="4"
                      y2="16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Google Calendar iframe */}
              <div className="flex-1 overflow-y-auto">
                <iframe
                  src={CALENDAR_EMBED_URL}
                  title="Book an appointment with Drew"
                  className="h-[600px] w-full border-0"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}

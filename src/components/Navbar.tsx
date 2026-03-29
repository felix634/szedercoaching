"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { href: "#start", label: "Start" },
  { href: "#geschichte", label: "Geschichte" },
  { href: "#über-mich", label: "Über mich" },
  { href: "#angebote", label: "Angebote" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-water-950/95 backdrop-blur-xl shadow-2xl shadow-water-950/50 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#start" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Szeder Coaching Logo"
              width={48}
              height={48}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-heading font-semibold text-cream leading-tight">
                Szeder
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-water-400 font-medium">
                Coaching
              </span>
            </div>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-cream/70 hover:text-cream transition-colors duration-300 text-sm tracking-wide font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-water-400 to-water-500 transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 relative z-50"
            aria-label="Menü"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-cream origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="block w-6 h-[2px] bg-cream"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-cream origin-center"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-water-950/98 backdrop-blur-2xl border-t border-water-800/30 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setTimeout(() => {
                      window.location.hash = link.href;
                    }, 400);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block text-cream/80 hover:text-cream transition-colors py-3 text-lg font-heading border-b border-water-800/20 last:border-0"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const themes = [
  { id: "default", label: "Default" },
  { id: "classic", label: "Classic B&W" },
  { id: "liam", label: "Liam Green" }
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(themes[0].id);

  useEffect(() => {
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (savedTheme && themes.some((item) => item.id === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const currentTheme = themes.find((item) => item.id === theme) ?? themes[0];
  const cycleTheme = () => {
    const index = themes.findIndex((item) => item.id === theme);
    const nextTheme = themes[(index + 1) % themes.length]?.id ?? themes[0].id;
    setTheme(nextTheme);
  };

  return (
    <>
      <motion.header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/60 bg-white/80 backdrop-blur-xl py-3"
            : "border-transparent bg-transparent py-4 sm:py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-med-primary to-med-emerald text-white shadow-soft"
            >
              <span className="text-lg font-semibold">M</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-slate-900 leading-tight">
                MedExpress
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                Domariyaganj
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <Link href="/#how-it-works" className="relative group hover:text-med-primary transition-colors">
              How it works
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-med-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/upload-prescription" className="relative group hover:text-med-primary transition-colors">
              Upload Prescription
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-med-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/track-order" className="relative group hover:text-med-primary transition-colors">
              Track Order
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-med-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/admin" className="relative group hover:text-med-primary transition-colors">
              Admin
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-med-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/918601439557"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-sm font-bold text-slate-900 hover:text-med-primary lg:flex"
            >
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              +91 86014 39557
            </a>
          <button
            type="button"
            onClick={cycleTheme}
            className="hidden items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors sm:flex theme-toggle"
            aria-label={`Switch theme. Current theme: ${currentTheme.label}`}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--theme-accent)" }} />
            {currentTheme.label}
          </button>
            <Link href="/upload-prescription" className="hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 hover:shadow-xl"
              >
                Upload Now
              </motion.button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-slate-900 md:hidden hover:bg-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 top-[72px] z-30 overflow-hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200/30 md:hidden shadow-2xl shadow-slate-900/10"
          >
            <nav className="flex flex-col p-4 gap-2 text-base font-medium text-slate-800">
              <Link href="/#how-it-works" onClick={toggleMenu} className="py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors">
                How it works
              </Link>
              <Link href="/upload-prescription" onClick={toggleMenu} className="py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors">
                Upload Prescription
              </Link>
              <Link href="/track-order" onClick={toggleMenu} className="py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors">
                Track Order
              </Link>
              <Link href="/admin" onClick={toggleMenu} className="py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors">
                Admin Dashboard
              </Link>
              <a
                href="https://wa.me/918601439557"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors text-emerald-600 font-semibold"
              >
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                WhatsApp Support
              </a>
              <button
                type="button"
                onClick={cycleTheme}
                className="flex items-center justify-between gap-2 py-3 px-4 rounded-xl border text-sm font-semibold theme-toggle"
                aria-label={`Switch theme. Current theme: ${currentTheme.label}`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--theme-accent)" }} />
                  Theme
                </span>
                <span className="text-xs">{currentTheme.label}</span>
              </button>
              <Link href="/upload-prescription" onClick={toggleMenu} className="mt-2 px-4">
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-slate-800 transition-colors"
                >
                  Upload Prescription Now
                </motion.button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

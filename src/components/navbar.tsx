"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

export default function Navbar() {
  const { t, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="site-container">
          <nav
            className={`flex items-center justify-between px-5 sm:px-6 py-3 rounded-full transition-all duration-500 ${
              scrolled
                ? "glass-card shadow-[0_8px_32px_-8px_rgba(184,115,51,0.25)] !rounded-full"
                : "bg-transparent border border-transparent"
            }`}
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 group"
            >
              <span className="font-display text-xl font-semibold text-brand-text tracking-tight">
                {t.nav.brand}
              </span>
              <span className="hidden sm:inline text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-accent/80 group-hover:text-brand-accent transition-colors">
                {t.nav.brandSub}
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              <button onClick={() => scrollTo("services")} className="btn-ghost">
                {t.nav.services}
              </button>
              <button onClick={() => scrollTo("process")} className="btn-ghost">
                {t.nav.process}
              </button>
              <button onClick={toggleLang} className="btn-ghost">
                <Globe className="w-4 h-4" />
                {t.nav.langSwitch}
              </button>
              <button
                onClick={() => scrollTo("request")}
                className="btn-primary !py-2.5 !px-5 !text-xs ml-2"
              >
                {t.nav.request}
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-brand-muted hover:text-brand-accent rounded-full"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-20 left-4 right-4 z-50 md:hidden glass-card p-4 space-y-1"
          >
            <button
              onClick={() => scrollTo("services")}
              className="block w-full text-start px-4 py-3 text-sm font-medium text-brand-text rounded-xl hover:bg-brand-accent-soft"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => scrollTo("process")}
              className="block w-full text-start px-4 py-3 text-sm font-medium text-brand-text rounded-xl hover:bg-brand-accent-soft"
            >
              {t.nav.process}
            </button>
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-brand-text rounded-xl hover:bg-brand-accent-soft"
            >
              <Globe className="w-4 h-4" />
              {t.nav.langSwitch}
            </button>
            <button
              onClick={() => scrollTo("request")}
              className="w-full btn-primary mt-2 justify-center"
            >
              {t.nav.request}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

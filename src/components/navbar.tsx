"use client";

import { useLanguage } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";

const CONTACT_EMAIL = "Hasnibachiri25@gmail.com";
const CONTACT_PHONE = "+971 50 778 3497";
const WHATSAPP_LINK = "https://wa.me/971507783497";

export default function Navbar() {
  const { t, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 24);

      if (current <= 64) {
        setNavVisible(true);
      } else if (current > lastScrollY.current + 4) {
        setNavVisible(false);
        setMobileOpen(false);
      } else if (current < lastScrollY.current - 4) {
        setNavVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="contact-bar">
        <div className="contact-bar-inner">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex min-w-0 items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span dir="ltr" className="truncate">
              {CONTACT_EMAIL}
            </span>
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span dir="ltr">{CONTACT_PHONE}</span>
          </a>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ y: navVisible ? 0 : "-110%" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`site-nav-shell fixed inset-x-0 z-50 transition-[padding] duration-500 ${
          scrolled ? "pt-3" : "pt-4 sm:pt-5"
        }`}
      >
        <div className="site-container">
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <nav
              className={`site-nav ${
                scrolled
                  ? "glass-card shadow-[0_8px_32px_-8px_rgba(184,115,51,0.25)] !rounded-full"
                  : "bg-transparent border border-transparent"
              }`}
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group shrink-0"
              >
                <Logo />
              </button>

              <div className="hidden md:flex items-center gap-1">
                <button
                  onClick={() => scrollTo("services")}
                  className="btn-ghost"
                >
                  {t.nav.services}
                </button>
                <button
                  onClick={() => scrollTo("process")}
                  className="btn-ghost"
                >
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
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </nav>
          </motion.header>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && navVisible && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-[6.75rem] sm:top-[7.25rem] left-4 right-4 z-50 md:hidden glass-card p-4 space-y-1"
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

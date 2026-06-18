"use client";

import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80";

export default function HeroSection() {
  const { t, isRTL } = useLanguage();

  const scrollToForm = () => {
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { value: t.about.stat1Value, label: t.about.stat1Label },
    { value: t.about.stat2Value, label: t.about.stat2Label },
    { value: t.about.stat3Value, label: t.about.stat3Label },
  ];

  return (
    <section className="pt-36 sm:pt-40 pb-8 sm:pb-12">
      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 section-label !mb-6">
              <Sparkles className="w-3 h-3" />
              {t.hero.tagline}
            </div>

            <h1 className="hero-title font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-brand-text leading-[1.12] tracking-tight">
              <span className="italic font-normal">{t.hero.headline1}</span>{" "}
              <span className="gradient-text not-italic font-semibold">
                {t.hero.headline2}
              </span>
              <br />
              {t.hero.headline3}
            </h1>

            <p className="hero-description mt-6 text-base sm:text-lg leading-relaxed text-brand-muted max-w-lg">
              {t.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button onClick={scrollToForm} className="btn-primary">
                {t.hero.cta}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </button>
              <span className="text-sm text-brand-subtle italic">
                {t.hero.ctaSub}
              </span>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-brand-surface-solid/80 border border-brand-border-light"
                >
                  <p className="stat-value font-display text-2xl font-semibold gradient-text">
                    {stat.value}
                  </p>
                  <p className="stat-label text-[10px] sm:text-xs text-brand-muted mt-1 leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-sage/20 rounded-[2rem] blur-2xl" />
            <div className="relative glass-card overflow-hidden p-2">
              <div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-[1.25rem] overflow-hidden">
                <img
                  src={HERO_IMG}
                  alt="Global logistics"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d3630]/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

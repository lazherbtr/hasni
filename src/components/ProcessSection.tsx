"use client";

import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ProcessSection() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" ref={ref} className="section-block">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-header"
        >
          <p className="section-label">{t.process.label}</p>
          <h2 className="section-title">{t.process.title}</h2>
          <p className="section-subtitle">{t.process.subtitle}</p>
        </motion.div>

        <div className="relative">
          <div
            className="hidden lg:block absolute top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-brand-accent/30 to-transparent"
            style={{ [isRTL ? "right" : "left"]: "1.75rem" }}
          />

          <div className="grid gap-4">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="soft-card p-6 sm:p-7 flex gap-5 sm:gap-6 items-start"
              >
                <div className="shrink-0 relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-accent to-[#d4956a] flex items-center justify-center shadow-[0_4px_16px_-2px_rgba(184,115,51,0.45)]">
                    <span className="font-display text-lg font-semibold text-white">
                      {step.num}
                    </span>
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="card-title font-display text-lg sm:text-xl font-semibold text-brand-text mb-2">
                    {step.title}
                  </h3>
                  <p className="card-body text-sm sm:text-base leading-relaxed text-brand-muted">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

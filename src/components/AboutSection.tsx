"use client";

import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-block">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 sm:p-12 lg:p-14"
        >
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-2">
              <p className="section-label !mb-0">{t.about.label}</p>
              <div className="divider-ornament lg:!justify-start lg:mt-6 lg:mb-0">
                <span className="w-2 h-2 rounded-full bg-brand-accent/40" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brand-text leading-snug mt-4 lg:mt-6">
                {t.about.title}
              </h2>
            </div>
            <div className="lg:col-span-3 space-y-5">
              <p className="text-base leading-[1.85] text-brand-muted">{t.about.p1}</p>
              <p className="text-base leading-[1.85] text-brand-muted">{t.about.p2}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

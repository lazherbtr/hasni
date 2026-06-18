"use client";

import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const INDUSTRY_IMAGES = [
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
];

export default function IndustriesSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-block">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-label">{t.industries.label}</p>
          <h2 className="section-title">{t.industries.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {t.industries.items.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group soft-card overflow-hidden p-0"
            >
              <div className="px-6 sm:px-7 py-5 sm:py-6 border-b border-brand-border-light bg-brand-accent-soft/60">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-brand-accent leading-snug">
                  {item.title}
                </h3>
              </div>
              <div className="relative aspect-[16/10] sm:aspect-[5/3] overflow-hidden">
                <img
                  src={INDUSTRY_IMAGES[i]}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-text/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 sm:mt-12 max-w-3xl mx-auto text-center text-sm sm:text-base leading-relaxed text-brand-muted"
        >
          {t.industries.subtitle}
        </motion.p>
      </div>
    </section>
  );
}

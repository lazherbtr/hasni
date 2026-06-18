"use client";

import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import { User } from "lucide-react";
import { useRef, useState } from "react";

// Replace by adding your photo at: public/images/about.jpg
const ABOUT_IMAGE = "/images/about.jpg";

export default function AboutSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [imageError, setImageError] = useState(false);

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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-8 relative"
              >
                <div className="absolute -inset-3 bg-gradient-to-br from-brand-accent/15 via-transparent to-brand-sage/15 rounded-[1.75rem] blur-xl" />
                <div className="relative overflow-hidden rounded-2xl border border-brand-border-light shadow-[0_12px_40px_-16px_rgba(61,54,48,0.2)] aspect-[4/5] sm:aspect-[5/6] bg-brand-accent-soft/40">
                  {!imageError ? (
                    <img
                      src={ABOUT_IMAGE}
                      alt={t.about.imageAlt}
                      className="h-full w-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent-light text-brand-accent">
                        <User className="h-7 w-7" />
                      </div>
                      <p className="text-sm text-brand-muted leading-relaxed">
                        {t.about.imagePlaceholder}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-3 space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-brand-border bg-gradient-to-br from-brand-accent-soft/80 to-brand-sage-light/30 p-6 sm:p-7"
              >
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-brand-accent mb-3">
                  {t.about.experienceTitle}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-brand-text">
                  {t.about.experienceText}
                </p>
              </motion.div>
              <p className="text-base leading-[1.85] text-brand-muted">{t.about.p1}</p>
              <p className="text-base leading-[1.85] text-brand-muted">{t.about.p2}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

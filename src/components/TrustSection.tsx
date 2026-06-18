"use client";

import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import { Award, Eye, FileCheck, Globe, ImageIcon } from "lucide-react";
import { useRef, useState } from "react";

const TRUST_ICONS = [Award, Globe, FileCheck, Eye];

// Add your photos at: public/images/trust/1.jpg ... public/images/trust/8.jpg
const TRUST_GALLERY = Array.from(
  { length: 8 },
  (_, i) => `/images/trust/${i + 1}.jpg`,
);

export default function TrustSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const markImageFailed = (index: number) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section ref={ref} className="section-block pb-8">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-header"
        >
          <p className="section-label">{t.trust.label}</p>
          <h2 className="section-title">{t.trust.title}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.trust.items.map((item, i) => {
            const Icon = TRUST_ICONS[i] || Award;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="soft-card p-6 text-center group"
              >
                <div className="icon-ring mx-auto mb-5 group-hover:rotate-3 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="card-title font-display text-base font-semibold text-brand-text mb-2">
                  {item.title}
                </h3>
                <p className="card-body text-xs sm:text-sm leading-relaxed text-brand-muted">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 sm:mt-12 glass-card p-5 sm:p-6"
        >
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-5">
            {TRUST_GALLERY.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.4 + i * 0.05 }}
                className="mb-4 sm:mb-5 break-inside-avoid"
              >
                <div className="overflow-hidden rounded-xl border border-brand-border-light bg-brand-accent-soft/30 shadow-[0_8px_24px_-12px_rgba(61,54,48,0.15)]">
                  {!failedImages[i] ? (
                    <img
                      src={src}
                      alt={`${t.trust.galleryAlt} ${i + 1}`}
                      className="block w-full h-auto object-cover"
                      onError={() => markImageFailed(i)}
                    />
                  ) : (
                    <div className="flex min-h-28 flex-col items-center justify-center gap-2 px-4 py-8 text-center">
                      <ImageIcon className="h-5 w-5 text-brand-accent/70" />
                      <p className="text-xs text-brand-muted">
                        {t.trust.galleryPlaceholder} {i + 1}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

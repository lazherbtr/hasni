"use client";

import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import { Award, Eye, FileCheck, Globe } from "lucide-react";
import { useRef } from "react";

const TRUST_ICONS = [Award, Globe, FileCheck, Eye];

export default function TrustSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
      </div>
    </section>
  );
}

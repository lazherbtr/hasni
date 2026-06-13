"use client";

import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import {
  BarChart3,
  GitCompare,
  PackageSearch,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useRef } from "react";

const SERVICE_ICONS = [
  PackageSearch,
  Search,
  BarChart3,
  GitCompare,
  ShieldCheck,
];

export default function ServicesSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="section-block">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-header"
        >
          <p className="section-label">{t.services.label}</p>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.services.items.map((item, i) => {
            const Icon = SERVICE_ICONS[i] || PackageSearch;
            const featured = i === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`soft-card p-6 sm:p-7 group ${
                  featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="icon-ring group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-brand-subtle/70">
                    {item.num}
                  </span>
                </div>
                <h3
                  className={`card-title font-display font-semibold text-brand-text mb-3 ${
                    featured ? "text-xl sm:text-2xl" : "text-lg"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`card-body leading-relaxed text-brand-muted ${
                    featured ? "text-sm sm:text-base" : "text-sm"
                  }`}
                >
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

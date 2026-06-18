"use client";

import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import { Award, ChevronDown, ChevronLeft, ChevronRight, Eye, FileCheck, Globe, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const TRUST_ICONS = [Award, Globe, FileCheck, Eye];

// Images live in public/ as 1.jpeg, 2.jpeg, ... 33.jpeg
const TRUST_GALLERY = Array.from(
  { length: 33 },
  (_, i) => `/${i + 1}.jpeg`,
);

export default function TrustSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const markImageFailed = (index: number) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  const galleryItems = useMemo(
    () =>
      TRUST_GALLERY.map((src, i) => ({ src, index: i })).filter(
        (item) => !failedImages[item.index],
      ),
    [failedImages],
  );

  const activeItem =
    activeGalleryIndex !== null
      ? galleryItems.find((item) => item.index === activeGalleryIndex)
      : null;

  const activePosition = activeItem
    ? galleryItems.findIndex((item) => item.index === activeItem.index)
    : -1;

  const showPrev = activePosition > 0;
  const showNext =
    activePosition >= 0 && activePosition < galleryItems.length - 1;

  const goToPrev = () => {
    if (!showPrev) return;
    setActiveGalleryIndex(galleryItems[activePosition - 1].index);
  };

  const goToNext = () => {
    if (!showNext) return;
    setActiveGalleryIndex(galleryItems[activePosition + 1].index);
  };

  useEffect(() => {
    if (activeGalleryIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveGalleryIndex(null);
        return;
      }

      const position = galleryItems.findIndex(
        (item) => item.index === activeGalleryIndex,
      );
      if (position < 0) return;

      if (event.key === "ArrowLeft" && position > 0) {
        setActiveGalleryIndex(galleryItems[position - 1].index);
      }
      if (event.key === "ArrowRight" && position < galleryItems.length - 1) {
        setActiveGalleryIndex(galleryItems[position + 1].index);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeGalleryIndex, galleryItems]);

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

        {galleryItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 sm:mt-12 glass-card p-5 sm:p-6"
          >
            <div className="relative">
              <div className="trust-gallery-scroll max-h-[22rem] sm:max-h-[26rem] lg:max-h-[28rem] overflow-y-auto overflow-x-hidden pr-1 scroll-smooth">
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-5">
                  {TRUST_GALLERY.map((src, i) => {
                    if (failedImages[i]) return null;

                    return (
                      <div key={src} className="mb-4 sm:mb-5 break-inside-avoid">
                        <button
                          type="button"
                          onClick={() => setActiveGalleryIndex(i)}
                          className="block w-full overflow-hidden rounded-xl border border-brand-border-light bg-brand-accent-soft/30 shadow-[0_8px_24px_-12px_rgba(61,54,48,0.15)] cursor-zoom-in"
                        >
                          <img
                            src={src}
                            alt={`${t.trust.galleryAlt} ${i + 1}`}
                            className="block w-full h-auto object-cover"
                            loading="lazy"
                            decoding="async"
                            onError={() => markImageFailed(i)}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {galleryItems.length > 8 && (
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-surface via-brand-surface/80 to-transparent"
                  aria-hidden
                />
              )}
            </div>

            {galleryItems.length > 8 && (
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-brand-subtle">
                <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
                {t.trust.galleryScrollHint}
              </p>
            )}
          </motion.div>
        )}
      </div>

      {mounted &&
        activeItem &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-text/90 p-4 sm:p-8"
            onClick={() => setActiveGalleryIndex(null)}
          >
            <button
              type="button"
              onClick={() => setActiveGalleryIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              aria-label={t.trust.galleryClose}
            >
              <X className="h-5 w-5" />
            </button>

            {showPrev && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-3 sm:left-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
                aria-label={t.trust.galleryPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {showNext && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                className="absolute right-3 sm:right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
                aria-label={t.trust.galleryNext}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeItem.src}
              alt={`${t.trust.galleryAlt} ${activeItem.index + 1}`}
              className="max-h-[88vh] max-w-[92vw] w-auto rounded-xl object-contain"
              decoding="async"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </section>
  );
}

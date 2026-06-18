"use client";

import { useLanguage } from "@/lib/i18n";

type LogoProps = {
  size?: "sm" | "lg";
  className?: string;
};

export default function Logo({ size = "sm", className = "" }: LogoProps) {
  const { t } = useLanguage();
  const isLarge = size === "lg";

  if (isLarge) {
    return (
      <span
        className={`inline-flex items-center gap-3 group/logo ${className}`}
        aria-label={`${t.nav.brand} ${t.nav.brandSub}`}
      >
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent to-[#d4956a] text-xl font-display font-bold tracking-tighter text-white shadow-[0_4px_16px_-4px_rgba(184,115,51,0.55)] ring-1 ring-white/25">
          HB
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-[0.12em] text-brand-text">
            {t.nav.brand}
          </span>
          <span className="mt-1 font-display text-sm italic tracking-[0.28em] text-brand-accent sm:text-base">
            {t.nav.brandSub}
          </span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 group/logo ${className}`}
      aria-label={`${t.nav.brand} ${t.nav.brandSub}`}
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-accent to-[#d4956a] text-[10px] font-display font-bold tracking-tighter text-white shadow-[0_3px_12px_-3px_rgba(184,115,51,0.5)] ring-1 ring-white/25 transition-transform duration-300 group-hover/logo:scale-[1.03]">
        HB
      </span>
      <span className="inline-flex items-baseline gap-1.5 leading-none">
        <span className="nav-logo-brand font-display">{t.nav.brand}</span>
        <span className="nav-logo-sub font-display transition-colors group-hover/logo:text-brand-accent-hover">
          {t.nav.brandSub}
        </span>
      </span>
    </span>
  );
}

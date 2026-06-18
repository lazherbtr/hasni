"use client";

import { useLanguage } from "@/lib/i18n";
import Logo from "@/components/Logo";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-brand-border-light py-12 sm:py-14">
      <div className="site-container">
        <div className="glass-card p-8 sm:p-10 text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed mb-6">
            {t.footer.desc}
          </p>
          <div className="flex justify-center gap-8 text-sm text-brand-subtle mb-4">
            <span className="hover:text-brand-accent cursor-pointer transition-colors">
              {t.footer.privacy}
            </span>
            <span className="hover:text-brand-accent cursor-pointer transition-colors">
              {t.footer.terms}
            </span>
          </div>
          <p className="text-xs text-brand-subtle/80">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

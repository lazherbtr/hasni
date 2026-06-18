"use client";

import { useLanguage } from "@/lib/i18n";
import Logo from "@/components/Logo";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_UAE_DISPLAY,
  WHATSAPP_LINK,
  WHATSAPP_LINK_UAE,
} from "@/lib/contact";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const quickLinks = [
    { label: t.nav.services, id: "services" },
    { label: t.nav.process, id: "process" },
    { label: t.nav.request, id: "request" },
  ];

  return (
    <footer className="border-t border-brand-border-light py-12 sm:py-16">
      <div className="site-container">
        <div className="glass-card p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Logo size="lg" />
              <p className="mt-5 text-sm sm:text-base text-brand-muted leading-relaxed max-w-sm">
                {t.footer.desc}
              </p>
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-4">
                {t.footer.quickLinks}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className="text-sm text-brand-muted hover:text-brand-accent transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-4">
                {t.footer.contactTitle}
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-3 text-sm text-brand-muted hover:text-brand-accent transition-colors group"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-accent-soft text-brand-accent group-hover:bg-brand-accent-light transition-colors">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span dir="ltr">{CONTACT_EMAIL}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm text-brand-muted hover:text-brand-accent transition-colors group"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-accent-soft text-brand-accent group-hover:bg-brand-accent-light transition-colors">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span dir="ltr">{CONTACT_PHONE_DISPLAY}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_LINK_UAE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm text-brand-muted hover:text-brand-accent transition-colors group"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-accent-soft text-brand-accent group-hover:bg-brand-accent-light transition-colors">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span dir="ltr">{CONTACT_PHONE_UAE_DISPLAY}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-brand-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-brand-subtle/80">{t.footer.rights}</p>
            <div className="flex gap-6 text-xs text-brand-subtle">
              <span className="hover:text-brand-accent cursor-pointer transition-colors">
                {t.footer.privacy}
              </span>
              <span className="hover:text-brand-accent cursor-pointer transition-colors">
                {t.footer.terms}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

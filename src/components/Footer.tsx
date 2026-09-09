'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CONTACT } from '@/data/site';
import { useLanguage } from '@/context/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { openCookieSettings } from '@/lib/cookie-consent';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-brand-dark text-white overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <Image
              src="/images/cropped-FRAXPLORER-scaled-1-113x68.png"
              alt="Fraxplorer Peru"
              width={113}
              height={68}
              className="mb-5 brightness-0 invert"
            />
            <p className="text-sm text-white/60 leading-relaxed">
              {CONTACT.company} — {t.footer.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
              {t.footer.navigation}
            </h3>
            <ul className="space-y-2.5">
              {t.footer.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-brand-gold transition-colors inline-flex items-center gap-1 group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
              {t.footer.contacts}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><a href={`tel:+${CONTACT.whatsapp1}`} className="hover:text-brand-gold transition">✆ +51 931 536 444</a></li>
              <li><a href={`tel:+${CONTACT.whatsapp2}`} className="hover:text-brand-gold transition">✆ +51 900 567 224</a></li>
              <li>⚲ {CONTACT.address}</li>
              <li><a href={`mailto:${CONTACT.email}`} className="hover:text-brand-gold transition">✉ {CONTACT.email}</a></li>
              <li>√ RUC: {CONTACT.ruc}</li>
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
              {t.footer.schedule}
            </h3>
            <p className="text-sm text-white/60 mb-6">{t.footer.officeHours}</p>
            <p className="text-xs text-brand-gold mb-3 uppercase tracking-wider">{t.footer.paymentMethods}</p>
            <Image src="/images/pagos-1-1536x473-4-1024x315.png" alt="Pagos" width={220} height={68} className="rounded-xl opacity-80" />
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-xs text-white/40">
            © Fraxplorer Peru {new Date().getFullYear()} · {t.footer.rights} ·{' '}
            <button
              type="button"
              onClick={openCookieSettings}
              className="underline underline-offset-4 hover:text-brand-gold transition-colors"
            >
              {t.cookies.settingsLabel}
            </button>
          </p>
          <div className="flex gap-3">
            {[CONTACT.facebook, CONTACT.instagram, CONTACT.youtube, CONTACT.tiktok].map((href, i) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/60 hover:bg-brand-accent hover:text-white transition-colors"
              >
                {['f', 'ig', 'yt', 'tk'][i]}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

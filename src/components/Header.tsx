'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT } from '@/data/site';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import GoogleAuthMenu from '@/components/ui/GoogleAuthMenu';
import MagneticButton from '@/components/ui/MagneticButton';

const NAV_IMAGES: (string | null)[] = [
  null,
  '/images/lagunaab-768x1024.jpg',
  '/images/frax3-768x1024.jpg',
  '/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg',
  '/images/pexels-marcio-arias-811024542-19988408-819x1024.jpg',
  '/images/hucachina6-819x1024.jpg',
  '/images/Siitulo-2-922x1024.jpg',
];

export default function Header() {
  const { t } = useLanguage();
  const navItems = t.nav.items;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className="fixed top-[3px] left-0 right-0 z-50 px-3 md:px-6 pt-3">
      {/* Top utility bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`hidden md:block mx-auto max-w-7xl rounded-2xl mb-2 transition-all duration-500 ${
          scrolled ? 'glass-dark text-white' : 'bg-brand-teal text-white shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-2 text-xs">
          <div className="flex items-center gap-5">
            <a href={`https://wa.me/${CONTACT.whatsapp1}`} className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <WhatsAppIcon /> +51 931 536 444
            </a>
            <a href={`https://wa.me/${CONTACT.whatsapp2}`} className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <WhatsAppIcon /> +51 900 567 224
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <EmailIcon /> {CONTACT.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <MagneticButton
              href={`https://wa.me/${CONTACT.whatsapp1}`}
              className="rounded-full bg-white px-5 py-1.5 text-xs font-bold uppercase text-brand-teal shadow-md"
              strength={0.2}
            >
              {t.nav.askNow}
            </MagneticButton>
            <GoogleAuthMenu compact className="text-white" />
            <LanguageSwitcher compact />
            <div className="flex items-center gap-2.5">
              <SocialIcon href={CONTACT.facebook} label="Facebook"><FacebookIcon /></SocialIcon>
              <SocialIcon href={CONTACT.instagram} label="Instagram"><InstagramIcon /></SocialIcon>
              <SocialIcon href={CONTACT.youtube} label="YouTube"><YouTubeIcon /></SocialIcon>
              <SocialIcon href={CONTACT.tiktok} label="TikTok"><TikTokIcon /></SocialIcon>
              <SocialIcon href={`https://wa.me/${CONTACT.whatsapp1}`} label="WhatsApp"><WhatsAppIcon /></SocialIcon>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'glass shadow-xl shadow-brand-dark/5'
            : 'bg-white shadow-lg shadow-brand-dark/10'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 lg:px-6">
          <Link href="/" className="relative shrink-0 group">
            <Image
              src="/images/cropped-FRAXPLORER-scaled-1-113x68.png"
              alt="Fraxplorer Peru"
              width={113}
              height={68}
              priority
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop mega menu */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item, navIdx) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href === '#' ? '/' : item.href}
                  className={`relative px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors rounded-xl ${
                    activeMenu === item.label
                      ? 'text-white bg-brand-teal'
                      : 'text-brand-dark hover:text-brand-accent hover:bg-brand-accent/5'
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <motion.span
                      animate={{ rotate: activeMenu === item.label ? 180 : 0 }}
                      className="inline-block ml-0.5 text-[8px]"
                    >
                      ▾
                    </motion.span>
                  )}
                </Link>

                <AnimatePresence>
                  {item.children && activeMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
                    >
                      <div className="flex overflow-hidden rounded-2xl glass shadow-2xl shadow-brand-dark/20 min-w-[520px]">
                        {NAV_IMAGES[navIdx] && (
                          <div className="relative w-44 shrink-0 hidden xl:block">
                            <Image
                              src={NAV_IMAGES[navIdx]!}
                              alt={item.label}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/90" />
                          </div>
                        )}
                        <div className="flex-1 p-3 max-h-[380px] overflow-y-auto">
                          <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent mb-1">
                            {item.label}
                          </p>
                          {item.children.map((child, i) => (
                            <motion.a
                              key={child.label}
                              href={child.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.03 }}
                              className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:bg-brand-teal/10 hover:text-brand-teal transition-all"
                            >
                              <span className="h-1 w-1 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                              {child.label}
                              <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-brand-accent">→</span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <GoogleAuthMenu compact />
            </div>
            <LanguageSwitcher />
            <Link
              href="/sobre-nosotros/"
              className="hidden md:inline-flex text-xs font-semibold text-brand-dark hover:text-brand-accent transition px-3"
            >
              {t.nav.about}
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition"
              onClick={() => setMobileOpen(true)}
              aria-label={t.nav.openMenu}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[70] lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Image src="/images/cropped-FRAXPLORER-scaled-1-113x68.png" alt="Logo" width={90} height={54} />
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-gray-100" aria-label={t.nav.closeMenu}>
                  <CloseIcon />
                </button>
              </div>
              <div className="p-4 space-y-1">
                {navItems.map((item) => (
                  <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
                ))}
                <Link
                  href="/sobre-nosotros/"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-bold uppercase text-brand-accent border-t border-gray-100 mt-2"
                >
                  {t.nav.about}
                </Link>
              </div>
              <div className="p-4 border-t mt-4 space-y-3">
                <div className="flex justify-center">
                  <GoogleAuthMenu />
                </div>
                <div className="flex justify-center">
                  <LanguageSwitcher />
                </div>
                <a href={`https://wa.me/${CONTACT.whatsapp1}`} className="btn-primary w-full text-center">
                  {t.nav.askNow}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

import type { NavItem } from '@/i18n/types';

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="flex w-full items-center justify-between py-3 text-sm font-bold uppercase text-brand-dark"
        onClick={() => item.children ? setOpen(!open) : onClose()}
      >
        {item.label}
        {item.children && <span className={`transition ${open ? 'rotate-180' : ''}`}>▾</span>}
      </button>
      <AnimatePresence>
        {open && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pb-2"
          >
            {item.children.map((child) => (
              <a
                key={child.label}
                href={child.href}
                onClick={onClose}
                className="block py-2 pl-4 text-sm text-gray-600 hover:text-brand-accent"
              >
                {child.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="opacity-80 hover:opacity-100 hover:scale-110 transition-all">
      {children}
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function FacebookIcon() {
  return <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" /></svg>;
}

function InstagramIcon() {
  return <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>;
}

function YouTubeIcon() {
  return <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>;
}

function TikTokIcon() {
  return <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512"><path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a123.24 123.24 0 0 0 1.86 22.17A122.65 122.65 0 0 0 381 102.39a121.81 121.81 0 0 0 67 20.14z" /></svg>;
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6 text-brand-dark" fill="currentColor" viewBox="0 0 24 28">
      <path d="M24 21v2c0 0.547-0.453 1-1 1h-22c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h22c0.547 0 1 0.453 1 1zM24 13v2c0 0.547-0.453 1-1 1h-22c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h22c0.547 0 1 0.453 1 1zM24 5v2c0 0.547-0.453 1-1 1h-22c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h22c0.547 0 1 0.453 1 1z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z" />
    </svg>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CONTACT } from '@/data/site';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { isLeadFormEnabled, sendLead, type LeadChannel } from '@/lib/leads';
import Reveal from '@/components/ui/Reveal';
import type { BookingBenefitIconId } from '@/i18n/types';

function BookingBenefitIcon({ id }: { id: BookingBenefitIconId }) {
  const cls = 'h-5 w-5';
  const stroke = { strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (id) {
    case 'experts':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" {...stroke} />
        </svg>
      );
    case 'schedule':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <rect x="3" y="5" width="18" height="16" rx="2" {...stroke} />
          <path d="M8 3v4M16 3v4M3 11h18" {...stroke} />
        </svg>
      );
    case 'personal':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" {...stroke} />
          <circle cx="9.5" cy="7" r="3.5" {...stroke} />
          <path d="M22 21v-2a3 3 0 0 0-2.2-2.9M16 3.1a3.5 3.5 0 0 1 0 6.8" {...stroke} />
        </svg>
      );
    case 'price':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path d="M12 3v18" {...stroke} />
          <path d="M8 7.5c0-1.7 1.8-3 4-3s4 1.3 4 3-1.8 3-4 3-4 1.3-4 3 1.8 3 4 3 4 1.3 4 3-1.8 3-4 3-4-1.3-4-3" {...stroke} />
        </svg>
      );
    case 'transport':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path d="M4 6h11v8H4z" {...stroke} />
          <path d="M15 8h3l2 3v3h-5V8z" {...stroke} />
          <circle cx="7.5" cy="17.5" r="1.5" {...stroke} />
          <circle cx="17.5" cy="17.5" r="1.5" {...stroke} />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a9.9 9.9 0 0 0-8.6 14.9L2 22l5.3-1.4A9.9 9.9 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 20zm4.5-5.8c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.5.1-.6.7-.7.9-.3.2-.5.1a6 6 0 0 1-1.8-1.1 6.6 6.6 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.3-.3.2-.3c.1-.1 0-.2 0-.3l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.4a9.2 9.2 0 0 0 3.5 3.1c.5.2.8.4 1.1.5.5.2 1 .2 1.4.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1s-.2-.1-.4-.2z" />
        </svg>
      );
    case 'guides':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path d="M4 7h16M4 12h10M4 17h14" {...stroke} />
          <path d="M18 10l2 2-2 2" {...stroke} />
        </svg>
      );
    default:
      return null;
  }
}

type Props = {
  tourTitle: string;
  tourPrice?: string | null;
  whyImages: string[];
  backgroundImage?: string;
};

export default function TourBookingSection({
  tourTitle,
  tourPrice,
  whyImages,
  backgroundImage = '/images/portada.jpg',
}: Props) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const b = t.booking;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  // Ambos botones son submit para reusar la validación nativa; esto decide por dónde sale.
  const channelRef = useRef<LeadChannel>('whatsapp');

  useEffect(() => {
    if (!user) return;
    if (user.givenName) setFirstName((v) => v || user.givenName!);
    if (user.familyName) setLastName((v) => v || user.familyName!);
    if (user.email) setEmail((v) => v || user.email);
  }, [user]);

  const slides = whyImages.filter(Boolean);
  const activeSlide = slides[carouselIndex] ?? slides[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!whatsapp.trim()) return;

    const channel = channelRef.current;
    setStatus('sending');
    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');
    const lines = [
      b.whatsappGreeting,
      `${b.tourLabel}: ${tourTitle}`,
      tourPrice ? `${b.priceLabel}: ${tourPrice}` : '',
      fullName ? `${b.nameLabel}: ${fullName}` : '',
      `${b.whatsappFieldLabel}: ${whatsapp.trim()}`,
      email.trim() ? `${b.emailLabel}: ${email.trim()}` : '',
      message.trim() ? `${b.messageLabel}: ${message.trim()}` : '',
    ].filter(Boolean);
    const body = lines.join('\n');

    // Debe abrirse antes de cualquier await o el navegador bloquea la ventana emergente.
    if (channel === 'email') {
      const subject = `${b.emailSubject}: ${tourTitle}`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      const url = `https://wa.me/${CONTACT.whatsapp1}?text=${encodeURIComponent(body)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    if (!isLeadFormEnabled()) {
      setStatus('idle');
      return;
    }

    const saved = await sendLead({
      channel,
      tour: tourTitle,
      price: tourPrice,
      firstName,
      lastName,
      whatsapp,
      email,
      message,
    });
    setStatus(saved ? 'sent' : 'error');
  }

  return (
    <section className="mt-20 -mx-4 sm:mx-0">
      <Reveal>
        <div className="text-center mb-10">
          <a
            href={`https://wa.me/${CONTACT.whatsapp1}?text=${encodeURIComponent(`${b.whatsappGreeting} ${tourTitle}${tourPrice ? ` (${tourPrice})` : ''}`)}`}
            className="inline-block rounded-2xl bg-brand-teal px-10 py-4 font-heading text-lg font-bold uppercase tracking-wider text-white shadow-lg hover:bg-brand-accent transition"
          >
            {b.reserveBtn}
          </a>
        </div>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-start">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-brand-teal/15 shadow-[0_20px_60px_-20px_rgba(0,99,114,0.25)]">
            <div className="absolute inset-0 opacity-15">
              <Image src={backgroundImage} alt="" fill className="object-cover" aria-hidden />
            </div>
            <form onSubmit={handleSubmit} className="relative z-10 p-6 md:p-8 space-y-4 bg-white/95 backdrop-blur-sm">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-brand-dark leading-snug">
                {b.formTitle}
              </h2>
              <p className="text-xs text-gray-500">{b.requiredNote}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-medium text-brand-dark">{b.firstName}</span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none"
                    autoComplete="given-name"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-brand-dark">{b.lastName}</span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none"
                    autoComplete="family-name"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="font-medium text-brand-dark">
                  {b.whatsappFieldLabel} <span className="text-red-500">*</span>
                </span>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+51 999 999 999"
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none"
                  autoComplete="tel"
                />
              </label>

              <label className="block text-sm">
                <span className="font-medium text-brand-dark">{b.emailLabel}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none"
                  autoComplete="email"
                />
              </label>

              <label className="block text-sm">
                <span className="font-medium text-brand-dark">{b.messageLabel}</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm resize-y focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none"
                />
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  onClick={() => (channelRef.current = 'whatsapp')}
                  disabled={status === 'sending'}
                  className="rounded-xl bg-brand-teal px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-accent transition disabled:opacity-60"
                >
                  {status === 'sending' ? b.sending : b.sendBtn}
                </button>
                <button
                  type="submit"
                  onClick={() => (channelRef.current = 'email')}
                  disabled={status === 'sending'}
                  className="rounded-xl border-2 border-brand-teal px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-teal hover:bg-brand-teal hover:text-white transition disabled:opacity-60"
                >
                  {b.sendEmailBtn}
                </button>
              </div>

              {status === 'sent' && (
                <p role="status" className="text-sm font-medium text-brand-teal">
                  {b.leadSent}
                </p>
              )}
              {status === 'error' && (
                <p role="status" className="text-sm font-medium text-red-600">
                  {b.leadError}
                </p>
              )}
            </form>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-brand-dark mb-6 leading-snug">
              {b.whyTitle}
            </h2>

            {slides.length > 0 && (
              <div className="relative mb-6 overflow-hidden rounded-2xl bg-[#eef4f1] aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] max-h-[520px]">
                <Image
                  src={activeSlide}
                  alt={b.whyCarouselAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {slides.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setCarouselIndex((i) => (i - 1 + slides.length) % slides.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
                      aria-label={b.prevPhoto}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => setCarouselIndex((i) => (i + 1) % slides.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
                      aria-label={b.nextPhoto}
                    >
                      ›
                    </button>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCarouselIndex(i)}
                          className={`h-2 w-2 rounded-full transition ${i === carouselIndex ? 'bg-brand-gold scale-125' : 'bg-white/70'}`}
                          aria-label={`${b.photo} ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <ul className="space-y-3">
              {b.benefits.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start rounded-xl bg-[#f4f9f6] border border-brand-teal/10 px-4 py-3.5"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-teal/10 to-brand-accent/10 text-brand-teal shadow-sm border border-brand-teal/15"
                    aria-hidden
                  >
                    <BookingBenefitIcon id={item.icon} />
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-sm font-bold text-brand-dark leading-snug">{item.title}</strong>
                    <span className="mt-1 block text-sm text-gray-600 leading-relaxed">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

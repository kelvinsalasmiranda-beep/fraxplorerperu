'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TourPage, getRelatedTours, tourHref } from '@/data/tours';
import { CONTACT, TESTIMONIALS } from '@/data/site';
import { useLanguage } from '@/context/LanguageContext';
import { localizeTour, tourLabelFromNav, isSuperPackageCategory } from '@/i18n/tours';
import Reveal from '@/components/ui/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';
import SectionBadge from '@/components/ui/SectionBadge';
import TourBookingSection from '@/components/TourBookingSection';
import { getTourWhyBookImages } from '@/data/tour-booking-images';

export default function TourDetail({ tour: rawTour }: { tour: TourPage }) {
  const { t, locale } = useLanguage();
  let tour = localizeTour(rawTour, locale);
  const navTitle = tourLabelFromNav(`/tours/${tour.slug}/`);
  if (navTitle && locale === 'en') tour = { ...tour, title: navTitle };
  const related = getRelatedTours(rawTour).map((r) => localizeTour(r, locale));
  const filtered = tour.images.filter(
    (img) => img !== tour.heroImage && !/pagos|logo|cropped-LOGO|cropped-FRAX/i.test(img)
  );
  const gallery = (filtered.length > 0 ? filtered : [tour.heroImage]).slice(0, 12);
  const whyBookImages = getTourWhyBookImages(tour.slug);
  const [openDay, setOpenDay] = useState<number | null>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) => (i !== null ? (i - 1 + gallery.length) % gallery.length : null));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) => (i !== null ? (i + 1) % gallery.length : null));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, gallery.length]);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-28">
        {isSuperPackageCategory(tour.category) ? (
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover scale-105">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image src={tour.heroImage} alt={tour.title} fill className="object-cover object-center" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/30" />
        <div className="relative z-10 mx-auto max-w-6xl w-full px-4 pb-14 pt-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <SectionBadge>{tour.category}</SectionBadge>
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4 leading-[1.1] max-w-4xl">
              {tour.title}
            </h1>
            {tour.subtitle && tour.subtitle !== tour.title && (
              <p className="mt-3 text-xl text-brand-gold font-medium">{tour.subtitle}</p>
            )}
            {tour.description && (
              <p className="mt-5 text-base md:text-lg text-white/85 max-w-3xl leading-relaxed">{tour.description}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Info ribbon */}
      <section className="bg-brand-teal border-y border-brand-accent/20">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-wrap gap-x-8 gap-y-3 justify-center text-sm text-white">
          {tour.price && <InfoPill icon="💵" label={t.tour.from} value={tour.price} />}
          {tour.duration && <InfoPill icon="🕒" label={t.tour.duration} value={tour.duration} />}
          {tour.tourType && <InfoPill icon="🌍" label={t.tour.type} value={tour.tourType} />}
          {tour.difficulty && <InfoPill icon="💪" label={t.tour.difficulty} value={tour.difficulty} />}
          <InfoPill icon="📅" label={t.tour.availability} value={t.tour.allYear} />
        </div>
      </section>

      {/* Gallery strip — solo fotos del tour */}
      {gallery.length >= 2 && (
        <section className="bg-brand-dark py-4 overflow-hidden">
          <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
            {gallery.map((img, i) => (
              <GalleryThumb key={i} src={img} alt={`${tour.title} — ${t.tour.photo} ${i + 1}`} enlargeLabel={t.tour.enlarge} onClick={() => setLightboxIndex(i)} />
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-14">

            {/* Intro */}
            {(tour.intro.length > 0 || tour.detailParagraphs.length > 0) && (
              <Reveal>
                <SectionHeading title={t.tour.details} />
                <div className="rounded-2xl bg-[#f4f9f6] border border-brand-teal/10 p-6 md:p-8 space-y-4 text-gray-600 leading-relaxed text-base shadow-[0_6px_28px_-8px_rgba(0,99,114,0.12)]">
                  {[...tour.intro, ...tour.detailParagraphs].filter((p, i, arr) => arr.indexOf(p) === i).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Highlights */}
            {tour.highlights.length > 0 && (
              <Reveal delay={0.05}>
                <SectionHeading title={t.tour.highlights} />
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tour.highlights.map((item, i) => (
                    <li key={i} className="flex gap-3 rounded-2xl bg-gradient-to-br from-brand-teal/5 to-brand-accent/5 p-4 border border-brand-accent/10">
                      <span className="text-brand-accent font-bold shrink-0">✓</span>
                      <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* Itinerary accordion */}
            {tour.itinerary.length > 0 && (
              <Reveal delay={0.1}>
                <SectionHeading title={t.tour.itinerary} />
                <div className="space-y-3">
                  {tour.itinerary.map((day, i) => (
                    <div key={i} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition"
                        onClick={() => setOpenDay(openDay === i ? null : i)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white text-xs font-bold">
                            {i + 1}
                          </span>
                          <span className="font-semibold text-brand-dark text-sm md:text-base">{day.title}</span>
                        </div>
                        <span className={`text-brand-accent text-xl transition-transform ${openDay === i ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      <AnimatePresence>
                        {openDay === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-gray-100 px-5 py-4 text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                              {day.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Includes / Excludes */}
            {(tour.includes.length > 0 || tour.excludes.length > 0) && (
            <div className="grid gap-5 md:grid-cols-2">
              {tour.includes.length > 0 && (
                <Reveal delay={0.15}>
                  <div className="rounded-2xl bg-[#cce8da] border border-[#9fcfb5]/80 p-5 md:p-6 h-full shadow-[0_12px_40px_-10px_rgba(0,99,114,0.25)]">
                    <h3 className="font-heading text-lg font-bold text-brand-dark mb-4 px-1">
                      {t.tour.includes}
                    </h3>
                    <ul className="space-y-2.5">
                      {tour.includes.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 rounded-xl bg-white/75 backdrop-blur-sm px-4 py-3 text-sm text-gray-800 leading-relaxed shadow-[0_4px_16px_-4px_rgba(0,99,114,0.2)] border border-white/80 transition-shadow duration-300 hover:shadow-[0_6px_20px_-4px_rgba(0,99,114,0.28)]"
                        >
                          <span className="shrink-0 text-brand-teal font-semibold">+</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
              {tour.excludes.length > 0 && (
                <Reveal delay={0.2}>
                  <div className="rounded-2xl bg-[#f8fbf9] border border-gray-200/80 p-5 md:p-6 h-full shadow-[0_8px_28px_-10px_rgba(0,0,0,0.1)]">
                    <h3 className="font-heading text-lg font-bold text-brand-dark mb-4 px-1">
                      {t.tour.excludes}
                    </h3>
                    <ul className="space-y-2.5">
                      {tour.excludes.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 rounded-xl bg-white px-4 py-3 text-sm text-gray-600 leading-relaxed shadow-[0_3px_14px_-4px_rgba(0,0,0,0.08)] border border-gray-100 transition-shadow duration-300 hover:shadow-[0_5px_18px_-4px_rgba(0,0,0,0.12)]"
                        >
                          <span className="shrink-0 text-gray-400 font-semibold">–</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
            )}

            {/* Recommendations */}
            {tour.recommendations.length > 0 && (
              <Reveal delay={0.25}>
                <SectionHeading title={t.tour.recommendations} />
                <ul className="space-y-3">
                  {tour.recommendations.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 rounded-2xl bg-[#e3f0ea] border border-[#b5d4c4]/70 px-5 py-4 text-sm text-gray-700 leading-relaxed shadow-[0_6px_22px_-6px_rgba(0,99,114,0.18)] transition-all duration-300 hover:shadow-[0_10px_28px_-8px_rgba(0,99,114,0.24)] hover:-translate-y-0.5"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* Full gallery */}
            {gallery.length > 0 && (
              <Reveal delay={0.3}>
                <SectionHeading title={t.tour.gallery} />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className={`relative rounded-2xl overflow-hidden group text-left focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 ${i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}
                      aria-label={`${t.tour.photo} ${i + 1} — ${t.tour.enlarge}`}
                    >
                      <Image src={img} alt={`${tour.title} — ${t.tour.photo} ${i + 1}`} fill className="object-cover group-hover:scale-105 transition duration-500" sizes="25vw" />
                      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-white text-2xl drop-shadow-lg">🔍</span>
                      </span>
                    </button>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-5">
              <Reveal>
                <div className="rounded-3xl bg-gradient-to-br from-brand-dark via-brand-teal to-brand-accent p-6 text-white shadow-2xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-gold mb-2">{t.tour.bookNow}</p>
                  <h3 className="font-heading text-xl font-bold mb-3">{t.tour.interested}</h3>
                  {tour.price && (
                    <p className="text-4xl font-black text-brand-gold mb-1">{tour.price}</p>
                  )}
                  {tour.priceNote && (
                    <p className="text-xs text-white/60 mb-5">{tour.priceNote}</p>
                  )}
                  <MagneticButton
                    href={`https://wa.me/${CONTACT.whatsapp1}?text=${encodeURIComponent(`Hola FraXplorer, me interesa: ${tour.title}${tour.price ? ` (${tour.price})` : ''}`)}`}
                    className="btn-gold w-full text-center !text-sm"
                  >
                    {t.tour.bookWhatsapp}
                  </MagneticButton>
                  <a href={`mailto:${CONTACT.email}`} className="mt-3 block text-center text-xs text-white/60 hover:text-brand-gold transition">
                    {CONTACT.email}
                  </a>
                  <a
                    href={`${CONTACT.facebook}/videos`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#1877F2]/20 border border-[#1877F2]/30 px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1877F2]/30 transition"
                  >
                    ▶ {t.tour.watchVideos}
                  </a>
                </div>
              </Reveal>

              <div className="rounded-2xl glass p-5 space-y-2 text-sm text-gray-600">
                <p className="font-bold text-brand-dark mb-3">FraXplorer Perú</p>
                <p>✓ {t.tour.certified}</p>
                <p>✓ {t.tour.transport}</p>
                <p>✓ {t.tour.smallGroups}</p>
                <p>✓ MINCETUR · RUC {CONTACT.ruc}</p>
                <p>✓ {t.tour.deposit}</p>
              </div>
            </div>
          </div>
        </div>

        <TourBookingSection
          tourTitle={tour.title}
          tourPrice={tour.price}
          whyImages={whyBookImages}
          backgroundImage={tour.heroImage}
        />

        {/* Testimonials strip */}
        <Reveal className="mt-20">
          <SectionHeading title={t.tour.testimonials} center />
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {TESTIMONIALS.map((img, i) => (
              <div key={i} className="w-[200px] shrink-0 sm:w-[220px]">
                <div className="rounded-[1.5rem] bg-[#f7f4ee] p-2 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.3)] ring-1 ring-black/5">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[1.15rem] bg-white">
                    <Image
                      src={img}
                      alt={`${t.testimonialsUi.altPrefix} ${i + 1}`}
                      fill
                      className="object-contain object-top"
                      sizes="220px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Related */}
        {related.length > 0 && (
          <Reveal className="mt-16">
            <SectionHeading title={t.tour.related} center />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link key={r.slug} href={tourHref(r.slug)} className="group rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 card-hover">
                  <div className="relative h-36 overflow-hidden">
                    <Image src={r.heroImage} alt={r.title} fill className="object-cover group-hover:scale-110 transition duration-500" sizes="25vw" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold text-brand-dark line-clamp-2 group-hover:text-brand-accent transition">{r.title}</p>
                    {r.price && <p className="text-brand-accent font-bold text-sm mt-1">{r.price}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        )}

        <div className="mt-12 text-center">
          <Link href="/" className="text-brand-accent hover:underline text-sm">{t.tour.backHome}</Link>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            images={gallery}
            index={lightboxIndex}
            title={tour.title}
            labels={t.tour}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => (i !== null ? (i - 1 + gallery.length) % gallery.length : null))}
            onNext={() => setLightboxIndex((i) => (i !== null ? (i + 1) % gallery.length : null))}
            onSelect={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function SectionHeading({ title, center }: { title: string; center?: boolean }) {
  return (
    <h2 className={`font-heading text-2xl md:text-3xl font-bold text-brand-dark mb-6 ${center ? 'text-center' : ''}`}>
      {title}
    </h2>
  );
}

function GalleryThumb({ src, alt, onClick, enlargeLabel }: { src: string; alt: string; onClick: () => void; enlargeLabel: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-28 w-44 shrink-0 rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-brand-gold"
      aria-label={`${alt} — ${enlargeLabel}`}
    >
      <Image src={src} alt={alt} fill className="object-cover group-hover:scale-110 transition duration-500" sizes="176px" />
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 text-white text-xl drop-shadow">🔍</span>
      </span>
    </button>
  );
}

function GalleryLightbox({
  images,
  index,
  title,
  labels,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: {
  images: string[];
  index: number;
  title: string;
  labels: {
    closeGallery: string;
    prevPhoto: string;
    nextPhoto: string;
    photo: string;
    enlarge: string;
  };
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
}) {
  const src = images[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={labels.closeGallery}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" aria-hidden="true" />

      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 mb-3 px-1">
          <p className="text-white/80 text-sm truncate">
            {title} · {index + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            aria-label={labels.closeGallery}
          >
            ✕
          </button>
        </div>

        <div className="relative w-full max-h-[75vh] aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
          <Image
            src={src}
            alt={`${title} — ${labels.photo} ${index + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-14 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-white/25 transition backdrop-blur-sm"
              aria-label={labels.prevPhoto}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={onNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-14 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-white/25 transition backdrop-blur-sm"
              aria-label={labels.nextPhoto}
            >
              ›
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="mt-4 flex gap-2 justify-center overflow-x-auto pb-1 scrollbar-hide px-2">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(i)}
                className={`relative h-14 w-20 shrink-0 rounded-lg overflow-hidden ring-2 transition ${
                  i === index ? 'ring-brand-gold opacity-100' : 'ring-transparent opacity-60 hover:opacity-90'
                }`}
                aria-label={`${labels.photo} ${i + 1}`}
                aria-current={i === index}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function InfoPill({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <span className="text-white/60">{label}:</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

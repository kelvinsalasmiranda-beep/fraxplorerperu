import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TourDetail from '@/components/TourDetail';
import { TOUR_PAGES, getTourBySlug } from '@/data/tours';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return TOUR_PAGES.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tour = getTourBySlug(params.slug);
  if (!tour) return { title: 'Tour no encontrado' };
  return {
    title: `${tour.title} | Fraxplorer Peru`,
    description: tour.description || `Reserva ${tour.title} con FraXplorer Perú.`,
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: [tour.heroImage],
    },
  };
}

export default function TourPage({ params }: Props) {
  const tour = getTourBySlug(params.slug);
  if (!tour) notFound();
  return <TourDetail tour={tour} />;
}

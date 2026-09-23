import { CONTACT } from '@/data/site';

export function buildWhatsAppUrl(text: string, phone = CONTACT.whatsapp1): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(text: string, phone = CONTACT.whatsapp1) {
  window.open(buildWhatsAppUrl(text, phone), '_blank', 'noopener,noreferrer');
}

export function bookingWhatsAppText(
  intro: string,
  ask: string,
  fields: { label: string; value: string }[]
): string {
  const lines = [intro, ...fields.map((field) => `${field.label}: ${field.value}`), ask];
  return lines.filter(Boolean).join('\n');
}

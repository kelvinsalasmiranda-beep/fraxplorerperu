import { es } from './es';
import { en } from './en';
import type { Dictionary, Locale } from './types';

export const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary, Locale };

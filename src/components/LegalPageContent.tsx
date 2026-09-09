'use client';

import { CONTACT } from '@/data/site';
import { useLanguage } from '@/context/LanguageContext';

export default function LegalPageContent({ type }: { type: 'privacy' | 'terms' }) {
  const { t } = useLanguage();
  const page = t.pages[type];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 prose prose-gray">
      <h1 className="font-heading text-4xl font-bold text-brand-dark mb-8">{page.title}</h1>
      <p className="text-gray-600 mb-4">{page.intro}</p>
      {page.sections.map((section) => (
        <div key={section.heading}>
          <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">{section.heading}</h2>
          <p className="text-gray-600 mb-4">
            {section.body}
            {section.heading === 'Contacto' || section.heading === 'Contact' ? (
              <>
                {' '}
                <a href={`mailto:${CONTACT.email}`} className="text-brand-accent hover:underline">
                  {CONTACT.email}
                </a>
              </>
            ) : null}
          </p>
        </div>
      ))}
    </article>
  );
}

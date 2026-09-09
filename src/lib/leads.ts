export type LeadChannel = 'whatsapp' | 'email';

export type Lead = {
  channel: LeadChannel;
  tour: string;
  price?: string | null;
  firstName: string;
  lastName: string;
  whatsapp: string;
  email: string;
  message: string;
};

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export function getLeadFormKey(): string {
  return process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim() ?? '';
}

export function isLeadFormEnabled(): boolean {
  return getLeadFormKey().length > 0;
}

export async function sendLead(lead: Lead): Promise<boolean> {
  const accessKey = getLeadFormKey();
  if (!accessKey) return false;

  const fullName = [lead.firstName.trim(), lead.lastName.trim()].filter(Boolean).join(' ');
  const email = lead.email.trim();

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Nueva consulta web: ${lead.tour}`,
        from_name: 'Web FraXplorer Perú',
        ...(email ? { replyto: email } : {}),
        Canal: lead.channel === 'email' ? 'Correo' : 'WhatsApp',
        Tour: lead.tour,
        Precio: lead.price?.trim() || '—',
        Nombre: fullName || '—',
        WhatsApp: lead.whatsapp.trim(),
        Correo: email || '—',
        Consulta: lead.message.trim() || '—',
        Pagina: typeof window === 'undefined' ? '—' : window.location.href,
      }),
    });

    const data = (await res.json()) as { success?: boolean };
    return res.ok && data.success === true;
  } catch {
    return false;
  }
}

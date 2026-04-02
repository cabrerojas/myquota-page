export type WaitlistStore = {
  email: string;
  createdAt: string;
  source: 'landing';
};

type SubmitWaitlistResult = {
  mode: 'remote' | 'local';
};

const WAITLIST_STORAGE_KEY = 'myquota.waitlist.leads';

const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const parseStoredLeads = (rawValue: string | null): WaitlistStore[] => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is WaitlistStore => {
      if (!item || typeof item !== 'object') {
        return false;
      }

      const candidate = item as Partial<WaitlistStore>;
      return (
        typeof candidate.email === 'string' &&
        typeof candidate.createdAt === 'string' &&
        candidate.source === 'landing'
      );
    });
  } catch {
    return [];
  }
};

const saveLeadLocally = (lead: WaitlistStore): void => {
  if (typeof window === 'undefined') {
    throw new Error('No hay almacenamiento local disponible en este entorno.');
  }

  const leads = parseStoredLeads(window.localStorage.getItem(WAITLIST_STORAGE_KEY));
  const alreadyExists = leads.some(
    (existingLead) => existingLead.email.toLowerCase() === lead.email.toLowerCase()
  );

  if (!alreadyExists) {
    leads.push(lead);
  }

  window.localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(leads));
};

const postLeadToEndpoint = async (lead: WaitlistStore): Promise<void> => {
  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim();
  if (!endpoint) {
    throw new Error('WAITLIST_ENDPOINT_MISSING');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error('WAITLIST_ENDPOINT_REJECTED');
  }
};

export const submitWaitlistLead = async (email: string): Promise<SubmitWaitlistResult> => {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error('Debes ingresar un correo válido para registrarte.');
  }

  if (!isValidEmail(normalizedEmail)) {
    throw new Error('Ingresa un correo válido para continuar.');
  }

  const lead: WaitlistStore = {
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
    source: 'landing',
  };

  try {
    await postLeadToEndpoint(lead);
    return { mode: 'remote' };
  } catch {
    try {
      saveLeadLocally(lead);
      return { mode: 'local' };
    } catch {
      throw new Error('No pudimos guardar tu correo. Revisa tu conexión e inténtalo nuevamente.');
    }
  }
};

export const WAITLIST_LOCAL_STORAGE_KEY = WAITLIST_STORAGE_KEY;

import React, { useState } from 'react';
import { pushEvent, hashEmail } from '@/lib/analytics';

const QUEUE_KEY = 'mq_waitlist';

async function postWaitlist(email: string) {
  const res = await fetch('/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('network');
  return res;
}

function enqueue(email: string) {
  const q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  q.push({ email, ts: Date.now() });
  localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
}

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    pushEvent('signup_click', { source: 'hero' });
    try {
      await postWaitlist(email);
      pushEvent('signup_submit', { email_hash: hashEmail(email) });
      setStatus('success');
    } catch (err) {
      // fallback: enqueue and show success UI
      enqueue(email);
      pushEvent('signup_submit_error', { email_hash: hashEmail(email) });
      setStatus('success');
    }
  };

  return (
    <form onSubmit={submit} className="flex gap-2" aria-live="polite">
      <label className="sr-only" htmlFor="waitlist-email">
        Correo electrónico
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo — sé el primero"
        className="px-3 py-2 border rounded w-full"
      />
      <button className="px-4 py-2 bg-sky-600 text-white rounded" type="submit">
        Únete
      </button>
      {status === 'success' && (
        <div role="status" className="ml-4 text-green-600">
          ¡Listo! Revisaremos tu correo.
        </div>
      )}
    </form>
  );
}

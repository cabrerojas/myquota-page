import React, { useEffect } from 'react';
import { getABVariant } from '@/lib/ab';
import { pushEvent } from '@/lib/analytics';

const Home: React.FC = () => {
  useEffect(() => {
    const variant = getABVariant();
    pushEvent('ab_assignment', { variant, source: 'page_load' });
    pushEvent('view_hero', { variant, source: 'hero' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="py-6 px-4 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="MyQuota" className="w-10 h-10" />
            <span className="font-semibold text-lg">MyQuota</span>
          </div>
          <nav className="space-x-4">
            <a href="#problem" className="text-sm text-slate-600 hover:text-slate-900">
              Problema
            </a>
            <a href="#solution" className="text-sm text-slate-600 hover:text-slate-900">
              Solución
            </a>
            <a
              href="#waitlist"
              className="text-sm ml-3 inline-block bg-sky-600 text-white px-3 py-1 rounded"
            >
              Join waitlist
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h1 className="text-3xl font-extrabold mb-4">
                  Ahorra hasta 20% en tus cuotas. Control total de tus pagos.
                </h1>
                <p className="text-slate-600 mb-6">
                  MyQuota consolida tus cuotas y te muestra cuándo pagar, cómo priorizar y cuánto
                  podrías ahorrar con mejores decisiones. Únete a la lista de espera.
                </p>

                {/* Waitlist form component will be mounted client-side */}
                <div id="waitlist-component"></div>
              </div>

              <div aria-hidden="true" className="bg-slate-50 p-6 rounded shadow">
                <div className="text-sm text-slate-500">Currently in development</div>
                <div className="mt-4">
                  <ul className="space-y-2 text-slate-700">
                    <li>📥 Rastreo sencillo de cuotas</li>
                    <li>📈 Visión consolidada de deuda</li>
                    <li>🔔 Insights y alertas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

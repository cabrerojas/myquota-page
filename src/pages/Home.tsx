import React from 'react';

const Home: React.FC = () => {
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
              Quiero acceso anticipado
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
                  Todas tus cuotas en un solo lugar, sin sorpresas a fin de mes.
                </h1>
                <p className="text-slate-600 mb-6">
                  MyQuota te muestra cuánto debes realmente, qué vence primero y cómo impacta cada
                  cuota en tu presupuesto para que decidas con claridad.
                </p>

                <a
                  href="#solution"
                  className="inline-block mb-4 text-sky-700 font-medium hover:text-sky-800"
                >
                  Ver cómo funciona
                </a>

                <form id="waitlist" className="flex gap-2" action="/waitlist" method="POST">
                  <input
                    aria-label="Correo electrónico"
                    name="email"
                    type="email"
                    required
                    placeholder="Tu correo — sé el primero"
                    className="px-3 py-2 border rounded w-full"
                  />
                  <button className="px-4 py-2 bg-sky-600 text-white rounded">
                    Quiero acceso anticipado
                  </button>
                </form>
              </div>

              <div aria-hidden="true" className="bg-slate-50 p-6 rounded shadow">
                <div className="text-sm text-slate-500">En desarrollo actualmente</div>
                <div className="mt-4">
                  <ul className="space-y-2 text-slate-700">
                    <li>
                      Sin fórmulas ni mantenimiento manual: MyQuota organiza tus cuotas
                      automáticamente en una vista accionable.
                    </li>
                    <li>
                      Todo queda centralizado y ordenado; no dependes de memoria ni de múltiples
                      apps desconectadas.
                    </li>
                    <li>
                      No te limita a una sola entidad: MyQuota te da una visión unificada de todas
                      tus cuotas y deuda total.
                    </li>
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

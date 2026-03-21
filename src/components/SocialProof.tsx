import React from 'react';

export default function SocialProof() {
  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <blockquote className="text-lg italic text-slate-800">
          “MyQuota nos ayudó a encontrar gastos ocultos y ahorrar.”
        </blockquote>
        <div className="mt-6 flex items-center justify-center gap-6">
          {/* Placeholder logos - replace with real assets in /assets/logos/ */}
          <img src="/assets/logo1.svg" alt="Logo 1" className="h-8 w-auto opacity-80" />
          <img src="/assets/logo2.svg" alt="Logo 2" className="h-8 w-auto opacity-80" />
          <img src="/assets/logo3.svg" alt="Logo 3" className="h-8 w-auto opacity-80" />
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Search, HandCoins, BarChart2 } from "lucide-react";
import { trackButtonClick, trackSectionView } from "../Analytics";

const ComoFunciona = () => {
  // Función para hacer scroll a CTA
  const scrollToCTA = () => {
    trackButtonClick('como_funciona_start_now', 'como-funciona', {
      target_section: 'cta'
    });

    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const steps = [
    {
      title: "Explora fundaciones",
      desc: "Navega entre organizaciones verificadas y elige la causa que más te inspire.",
      color: {
        bg: "bg-emerald-100",
        text: "text-emerald-600",
        ring: "ring-emerald-200",
      },
      Icon: Search,
    },
    {
      title: "Dona en dos clics",
      desc: "Selecciona el monto o artículos en especie y completa tu aporte de forma segura.",
      color: {
        bg: "bg-teal-100",
        text: "text-teal-600",
        ring: "ring-teal-200",
      },
      Icon: HandCoins,
    },
    {
      title: "Sigue el impacto",
      desc: "Recibe historias, fotos y métricas auditadas que muestran el cambio generado.",
      color: {
        bg: "bg-emerald-100",
        text: "text-emerald-600",
        ring: "ring-emerald-200",
      },
      Icon: BarChart2,
    },
  ];

  return (
    <section id="como-funciona" className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 py-16 sm:py-20 lg:py-24">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse" style={{ animationDelay: "2s" }}></div>
      
      {/* Decorative connector for desktop */}
      <div
        aria-hidden
        className="absolute left-1/2 top-60 hidden h-0.5 w-[65%] max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300 to-transparent lg:block"
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Proceso simple
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            ¿Cómo funciona?
          </h2>
          <p className="mt-4 text-lg text-gray-600 sm:mt-4">
            Hacer el bien nunca fue tan <span className="font-semibold text-emerald-700">simple y transparente</span>
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative mt-16 sm:mt-20 lg:mt-24">
          <div className="grid gap-12 sm:gap-16 lg:grid-cols-3 lg:gap-8">
            {steps.map(({ title, desc, color, Icon }, idx) => (
              <div
                key={title}
                className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none group"
                onClick={() => {
                  trackSectionView(`como_funciona_step_${idx + 1}`);
                }}
              >
                {/* Vertical connector for mobile/tablet */}
                {idx < steps.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-20 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-300 to-transparent lg:hidden"
                  />
                )}
                
                {/* Step Content */}
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <span
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-full ring-4 ring-offset-2 ${color.bg} ${color.text} ${color.ring} shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20`}
                    >
                      <Icon className="h-7 w-7 sm:h-9 sm:w-9" />
                    </span>
                    
                    {/* Step Number */}
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white sm:h-7 sm:w-7">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 sm:text-xl">
                      {title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-600 lg:max-w-xs xl:max-w-sm">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Únete a nuestra lista de espera y sé de los primeros en transformar vidas
            </p>
            <button 
              onClick={scrollToCTA}
              className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-300 hover:scale-105 transform shadow-lg"
            >
              Empezar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFunciona;
import React from "react";
import { trackButtonClick } from "../Analytics";

const Hero = () => {
  // Función para hacer scroll suave a una sección
  const scrollToSection = (sectionId, buttonName) => {
    // Trackear el clic en analytics
    trackButtonClick(buttonName, 'hero', {
      target_section: sectionId
    });

    // Hacer scroll suave
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 pt-28 pb-24 md:pt-36 lg:pb-32"
    >
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_40%_0%,rgba(52,211,153,0.15),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute top-20 right-20 -z-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 left-20 -z-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div className="container mx-auto flex flex-col-reverse gap-12 px-6 md:flex-row md:items-center md:justify-between lg:gap-20">
        {/* Content */}
        <div className="w-full md:w-6/12 animate-fadeInUp">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Conecta con causas{" "}
            <br className="hidden sm:inline" />
            <span className="text-emerald-600">que transforman vidas</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-700">
            Descubre fundaciones{" "}
            <span className="font-semibold text-emerald-700 relative">
              verificadas
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-300"></span>
            </span>
            , dona en{" "}
            <span className="font-semibold text-emerald-700">dos clics</span> y sigue el impacto 
            en tiempo real.
          </p>

          {/* CTA buttons - Con navegación */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection('cta', 'hero_unite_now')}
              className="group inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-base font-medium text-white shadow-lg ring-emerald-600 transition hover:scale-105 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2"
            >
              Únete ahora
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              onClick={() => scrollToSection('como-funciona', 'hero_how_it_works')}
              className="inline-block rounded-full border-2 border-emerald-600 bg-white px-8 py-3 text-base font-medium text-emerald-600 transition hover:bg-emerald-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              Ver cómo funciona
            </button>
          </div>

          {/* Quick stats - Con interacciones */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center md:text-left">
            {[
              { 
                label: "Meta donantes", 
                value: "100K+",
                onClick: () => scrollToSection('que-es', 'hero_stat_donantes')
              },
              { 
                label: "Fundaciones objetivo", 
                value: "1,000+",
                onClick: () => scrollToSection('impacto', 'hero_stat_fundaciones')
              },
              { 
                label: "Transparencia", 
                value: "100%",
                onClick: () => scrollToSection('trazabilidad', 'hero_stat_transparency')
              },
            ].map(({ label, value, onClick }, index) => (
              <div 
                key={label} 
                className="flex flex-col items-center md:items-start group cursor-pointer"
                onClick={onClick}
              >
                <span className="text-2xl font-bold text-gray-900 lg:text-3xl group-hover:text-emerald-600 transition-colors">
                  {value}
                </span>
                <span className="text-sm text-gray-600 mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-6/12 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-teal-400 rounded-full opacity-30 animate-bounce" style={{ animationDelay: "1s" }}></div>
            
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Manos extendidas en círculo simbolizando comunidad y apoyo mutuo"
                className="h-auto w-full object-cover"
              />
              
              {/* Floating elements - Con interacciones */}
              <div 
                className="absolute top-6 right-6 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                onClick={() => scrollToSection('trazabilidad', 'hero_verified_badge')}
              >
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div 
                className="absolute bottom-6 left-6 bg-white rounded-lg p-3 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                onClick={() => scrollToSection('impacto', 'hero_realtime_badge')}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">En tiempo real</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
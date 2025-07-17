import React from 'react';
import { trackButtonClick } from '../analitycs';

const QueEs = () => {
  // Función para hacer scroll suave a una sección
  const scrollToSection = (sectionId, buttonName) => {
    trackButtonClick(buttonName, 'que-es', {
      target_section: sectionId
    });

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const benefits = [
    {
      icon: "🔍",
      title: "Transparencia Total",
      desc: "Cada peso rastreado en tiempo real"
    },
    {
      icon: "🤝",
      title: "Conexión Auténtica", 
      desc: "Vínculos directos entre donantes y beneficiarios"
    },
    {
      icon: "📊",
      title: "Impacto Medible",
      desc: "Reportes multimedia verificados"
    }
  ];

  return (
    <section id="que-es" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements - más sutiles */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Texto */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                ¿Qué es Fundatio?
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Más que donaciones,
                <br />
                <span className="text-emerald-600">comunidad con propósito</span>
              </h2>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Somos el puente entre <span className="font-semibold text-emerald-700">corazones solidarios</span> y 
              <span className="font-semibold text-emerald-700"> causas reales</span> en Colombia. 
              Conecta con fundaciones comprometidas, apoya con donaciones transparentes, 
              y sigue el impacto de tu generosidad en tiempo real.
            </p>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md hover:bg-white transition-all duration-300">
                  <div className="text-2xl mb-2">{benefit.icon}</div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{benefit.title}</h4>
                  <p className="text-gray-600 text-xs">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('como-funciona', 'que_es_how_it_works')}
                className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-300"
              >
                Ver cómo funciona
              </button>
              <button 
                onClick={() => scrollToSection('cta', 'que_es_join_now')}
                className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors duration-300"
              >
                Únete ahora
              </button>
            </div>
          </div>

          {/* Imagen de voluntario */}
          <div className="w-full lg:w-1/2 h-full flex">
            <div className="relative w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-10 blur-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Voluntario ayudando en actividades comunitarias"
                className="rounded-2xl shadow-2xl object-cover w-full h-auto lg:h-96 relative z-10"
              />
              
              {/* Floating elements */}
              <div 
                className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg z-20 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => scrollToSection('impacto', 'que_es_live_impact')}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">Impacto en vivo</span>
                </div>
              </div>
              <div 
                className="absolute bottom-4 left-4 bg-white rounded-full p-3 shadow-lg z-20 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => scrollToSection('trazabilidad', 'que_es_verified')}
              >
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QueEs;
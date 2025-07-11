import React from 'react';

const QueEs = () => {
  return (
    <section id="que-es" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Ilustración */}
          <div className="w-full lg:w-1/2">
            <img 
              src="https://placehold.co/600x400?text=Ilustración+explicativa" 
              alt="Ilustración explicativa de la plataforma"
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Texto */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ¿Qué es la plataforma?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Somos más que una red social. Somos un puente entre corazones solidarios y causas reales en Colombia.
              Aquí puedes conectar con fundaciones comprometidas, apoyarlas con donaciones mensuales o únicas, 
              y ver cómo tu ayuda llega directamente a quienes lo necesitan.
              <br /><br />
              Cada acción tiene impacto visible: fotos, historias y reportes en tiempo real te mantienen conectado al cambio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QueEs;

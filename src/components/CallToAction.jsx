import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para hacer la diferencia?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Únete a miles de personas que ya están transformando vidas a través de donaciones transparentes y efectivas.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
            Comenzar a Donar
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
            Registrar Fundación
          </button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">100%</div>
            <p className="text-sm opacity-90">Transparencia Garantizada</p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">0%</div>
            <p className="text-sm opacity-90">Comisiones Ocultas</p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <p className="text-sm opacity-90">Soporte Disponible</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

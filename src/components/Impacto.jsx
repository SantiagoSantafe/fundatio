import React from 'react';
import { trackButtonClick, trackSectionView } from '../analytics';

const Impacto = () => {
  // Función para hacer scroll a CTA
  const scrollToCTA = () => {
    trackButtonClick('impacto_join_community', 'impacto', {
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

  return (
    <section id="impacto" className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Nuestro propósito
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            El Impacto que <span className="text-emerald-600">Queremos Crear</span>
          </h2>
          <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
            Nuestra misión es transformar la manera en que las personas se conectan con las causas que más les importan, creando un mundo más <span className="font-semibold text-emerald-700">solidario y transparente</span>.
          </p>
        </div>

        {/* Objetivos de Impacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { 
              valor: "$10M+", 
              texto: "Meta de Donaciones Anuales", 
              color: "text-emerald-600", 
              descripcion: "Facilitar millones en donaciones",
              metric: "donations_goal"
            },
            { 
              valor: "1,000+", 
              texto: "Fundaciones Verificadas", 
              color: "text-teal-600", 
              descripcion: "Red confiable de organizaciones",
              metric: "foundations_goal"
            },
            { 
              valor: "100K+", 
              texto: "Donantes Conectados", 
              color: "text-emerald-600", 
              descripcion: "Comunidad comprometida",
              metric: "donors_goal"
            },
            { 
              valor: "5,000+", 
              texto: "Proyectos Impulsados", 
              color: "text-teal-600", 
              descripcion: "Iniciativas que cambien vidas",
              metric: "projects_goal"
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-lg transition-all duration-300 hover:scale-105 text-center group cursor-pointer"
              onClick={() => {
                trackSectionView(`impacto_metric_${item.metric}`);
              }}
            >
              <div className={`text-5xl font-bold mb-2 ${item.color} group-hover:scale-110 transition-transform`}>
                {item.valor}
              </div>
              <p className="text-gray-800 font-semibold mb-2">{item.texto}</p>
              <p className="text-gray-600 text-sm">{item.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Visión de Futuro */}
        <div className="bg-white rounded-2xl shadow-lg p-10 border border-emerald-100">
          <h3 className="text-3xl font-semibold text-center mb-10 text-gray-800">
            Nuestra Visión de <span className="text-emerald-600">Impacto</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                titulo: "Transparencia Total",
                descripcion: "Crear un ecosistema donde cada donación sea rastreada en tiempo real, mostrando exactamente cómo se usa cada peso para maximizar el impacto social.",
                icono: "🔍",
                id: "transparency_vision"
              },
              {
                titulo: "Conectar Corazones",
                descripcion: "Eliminar la distancia entre donantes y beneficiarios, creando vínculos auténticos que inspiren una cultura de generosidad sostenible.",
                icono: "💝",
                id: "connection_vision"
              },
              {
                titulo: "Democratizar la Filantropía",
                descripcion: "Hacer que donar sea tan simple como enviar un mensaje, permitiendo que cualquier persona pueda contribuir a causas significativas sin barreras.",
                icono: "🌍",
                id: "democratize_vision"
              },
              {
                titulo: "Amplificar el Bien",
                descripcion: "Potenciar el trabajo de fundaciones verificadas, ayudándolas a llegar a más personas y multiplicar su impacto en las comunidades.",
                icono: "🚀",
                id: "amplify_vision"
              },
            ].map((vision, i) => (
              <div 
                key={i} 
                className="bg-emerald-50 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:scale-105 border border-emerald-100 cursor-pointer"
                onClick={() => {
                  trackSectionView(`impacto_vision_${vision.id}`);
                }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{vision.icono}</span>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {vision.titulo}
                  </h4>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{vision.descripcion}</p>
                <div className="flex items-center text-emerald-600 font-medium">
                  <span className="mr-2">Próximamente</span>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">
                ¿Quieres ser parte de este impacto?
              </h4>
              <p className="text-lg mb-6 opacity-90">
                Únete a nuestra comunidad y ayúdanos a transformar el futuro de las donaciones en Colombia
              </p>
              <button 
                onClick={scrollToCTA}
                className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform shadow-lg"
              >
                Formar parte de la comunidad
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impacto;
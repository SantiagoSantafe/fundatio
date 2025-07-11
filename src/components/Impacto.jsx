import React from 'react';

const Impacto = () => {
  return (
    <section className="py-20 bg-sky-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Nuestro Impacto
        </h2>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { valor: "$2.5M", texto: "Donaciones Procesadas", color: "text-blue-600" },
            { valor: "150+", texto: "Fundaciones Registradas", color: "text-green-600" },
            { valor: "25K", texto: "Donantes Activos", color: "text-purple-600" },
            { valor: "500+", texto: "Proyectos Financiados", color: "text-orange-600" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow text-center"
            >
              <div className={`text-5xl font-bold mb-2 ${item.color}`}>{item.valor}</div>
              <p className="text-gray-700">{item.texto}</p>
            </div>
          ))}
        </div>

        {/* Historias de Éxito */}
        <div className="mt-20 bg-white rounded-xl shadow-lg p-10">
          <h3 className="text-3xl font-semibold text-center mb-10 text-gray-800">
            Historias de Éxito
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                titulo: "Educación para Todos",
                descripcion:
                  "Gracias a las donaciones, hemos construido 15 escuelas en comunidades rurales, beneficiando a más de 3,000 niños.",
              },
              {
                titulo: "Agua Limpia",
                descripcion:
                  "Instalamos sistemas de agua potable en 50 comunidades, proporcionando acceso a agua limpia para 20,000 personas.",
              },
            ].map((historia, i) => (
              <div key={i} className="bg-sky-50 rounded-lg p-6 hover:shadow transition-shadow">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  {historia.titulo}
                </h4>
                <p className="text-gray-600 mb-4">{historia.descripcion}</p>
                <button className="text-blue-600 font-medium hover:underline">
                  Ver más →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impacto;

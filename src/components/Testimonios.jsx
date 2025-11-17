import React from 'react';

const testimonios = [
  {
    name: "María González, Bogotá",
    role: "Donante",
    quote:
      "Me encanta la transparencia de la plataforma. Ver cómo mi aporte llega a quienes lo necesitan me llena de esperanza y propósito.",
    avatar: "https://i.pravatar.cc/200?img=4",
  },
  {
    name: "Carlos Mendoza, Medellín",
    role: "Director de Fundación",
    quote:
      "Gracias a esta plataforma, hemos conectado con más donantes y visibilizado el impacto de nuestro trabajo en comunidades vulnerables.",
    avatar: "https://i.pravatar.cc/200?img=5",
  },
  {
    name: "Ana Rodríguez, Cali",
    role: "Beneficiaria",
    quote:
      "Esta comunidad me inspiró a terminar mis estudios universitarios. Hoy, gracias al apoyo recibido, devuelvo el favor ayudando a otros.",
    avatar: "https://i.pravatar.cc/200?img=6",
  },
];

const Testimonios = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Lo que dicen nuestros usuarios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonios.map((t, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-center"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover shadow"
              />
              <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
              <div className="font-semibold text-gray-900">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
              <div className="mt-3 text-yellow-400">★★★★★</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
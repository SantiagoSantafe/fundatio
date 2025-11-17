import React from "react";
import { motion } from "framer-motion";

const foundations = [
  {
    nombre: "Manos Unidas por los Niños",
    descripcion: "Apoya educación y alimentación infantil en zonas rurales de Colombia.",
    impacto: "+2,000 niños escolarizados",
    logo: "https://placehold.co/160x160?text=MU",
    causa: "Educación",
  },
  {
    nombre: "Verdes Sueños Ambientales",
    descripcion: "Trabaja en reforestación y concientización ambiental en la Amazonía colombiana.",
    impacto: "+15 comunidades beneficiadas",
    logo: "https://placehold.co/160x160?text=VS",
    causa: "Medio ambiente",
  },
  {
    nombre: "Mujeres con Futuro",
    descripcion: "Impulsa emprendimiento femenino en contextos vulnerables.",
    impacto: "+500 mujeres capacitadas",
    logo: "https://placehold.co/160x160?text=MF",
    causa: "Empoderamiento",
  },
];

const Fundaciones = () => {
  return (
    <section
      id="fundaciones"
      className="relative bg-gray-50 py-20 lg:py-24"
      aria-labelledby="fundaciones-heading"
    >
      <div className="container mx-auto px-6">
        <h2
          id="fundaciones-heading"
          className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
        >
          Fundaciones destacadas
        </h2>
        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {foundations.map((f, i) => (
            <motion.article
              key={f.nombre}
              className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <img
                src={f.logo}
                alt={f.nombre}
                className="mb-5 h-20 w-20 rounded-full object-cover shadow-md"
                onError={(e) => {
                  e.target.src = "https://placehold.co/160x160?text=Img";
                }}
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">{f.nombre}</h3>
              <p className="mt-3 text-center text-sm leading-relaxed text-gray-600">
                {f.descripcion}
              </p>
              <span className="mt-5 inline-block rounded-full bg-cyan-50 px-4 py-1 text-xs font-medium tracking-wide text-cyan-700">
                {f.impacto}
              </span>
              <span className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-blue-600">
                {f.causa}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fundaciones;
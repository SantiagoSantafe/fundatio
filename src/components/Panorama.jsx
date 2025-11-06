import React from "react";
import { trackButtonClick, trackSectionView } from "../analytics";

const Panorama = () => {
  const cards = [
    {
      title: "Fragilidad financiera",
      stat: "50% depende de una única fuente",
      text: "Muchas organizaciones sobreviven mes a mes sin reservas ni diversificación de ingresos. El 35% podría operar menos de un mes sin nuevos recursos.",
      source: "Estudio nacional (2025)",
    },
    {
      title: "Falta de planificación",
      stat: "57% sin planificación estratégica",
      text: "Más de la mitad opera de forma reactiva, dependiendo de convocatorias y donaciones puntuales.",
      source: "Compartamos con Colombia (2025)",
    },
    {
      title: "Medición de impacto",
      stat: "70% ha evaluado proyectos",
      text: "Aunque evalúan iniciativas, muchas carecen de indicadores sólidos que demuestren resultados a financiadores.",
      source: "Estudio sectorial (2024)",
    },
    {
      title: "Brecha tecnológica",
      stat: "25% usan herramientas avanzadas",
      text: "La adopción de tecnología es baja y en zonas apartadas la situación es crítica — hasta un 47% en riesgo de cierre.",
      source: "Informe regional (2023-2025)",
    },
    {
      title: "Participación ciudadana",
      stat: "16% dona regularmente",
      text: "La cultura de donación es baja, lo que limita recursos recurrentes y la profesionalización de juntas directivas.",
      source: "El Dar en el Mundo (2023)",
    },
  ];

  const scrollTo = (id, name) => {
    trackButtonClick(name, "panorama", { target_section: id });
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="panorama"
      className="py-20 bg-gradient-to-b from-emerald-50 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Un sector que sostiene el país — y sus retos
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Diagnóstico resumido del sector social en Colombia. Aquí condensamos
            las limitaciones que enfrentan las organizaciones y por qué
            necesitamos soluciones estructurales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cards.map((c) => (
            <article
              key={c.title}
              className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-lg transition-transform hover:-translate-y-1"
              onClick={() =>
                trackSectionView(
                  `panorama_card_${c.title.replace(/\s+/g, "_")}`
                )
              }
              aria-label={`${c.title} - ${c.stat}`}
            >
              <div className="text-emerald-600 font-semibold text-sm mb-2">
                {c.title}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {c.stat}
              </div>
              <p className="text-gray-600 text-sm mb-4">{c.text}</p>
              <div className="text-xs text-gray-500">Fuente: {c.source}</div>
            </article>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-inner border border-emerald-50">
          <blockquote className="text-gray-800 italic text-lg">
            “Si bien los hallazgos son preocupantes, también nos dan una hoja de
            ruta clara para fortalecer a estas organizaciones, garantizar su
            sostenibilidad y potenciar su impacto en las comunidades.”
          </blockquote>
          <div className="mt-4 text-right">
            <div className="text-sm text-gray-500">
              — Nicolás Salcedo, Compartamos con Colombia
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => scrollTo("impacto", "panorama_go_impacto")}
              className="bg-emerald-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-colors"
            >
              Ver cómo actuamos
            </button>

            <button
              onClick={() => scrollTo("cta", "panorama_go_cta")}
              className="border border-emerald-600 text-emerald-600 px-4 py-2 rounded-full font-medium hover:bg-emerald-50 transition-colors"
            >
              Unirme / Registrar fundación
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Panorama;

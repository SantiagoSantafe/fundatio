import React from "react";
import { motion } from "framer-motion";

// Hero section – JSX version (no TypeScript)
const Hero = () => {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 pt-28 pb-24 md:pt-36 lg:pb-32"
    >
      {/* Decorative radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_40%_0%,rgba(52,211,153,0.15),transparent_60%)]"
      />

      <div className="container mx-auto flex flex-col-reverse gap-12 px-6 md:flex-row md:items-center md:justify-between lg:gap-20">
        {/* ───────────────────────────── Copy & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-6/12"
        >
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Conecta con causas <br className="hidden sm:inline" /> que transforman vidas
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-700">
            Descubre fundaciones <span className="font-semibold text-emerald-700">verificadas</span>, dona en&nbsp;
            <span className="font-semibold">dos clics</span> y sigue el impacto en tiempo real.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#registro"
              className="inline-block rounded-full bg-emerald-600 px-8 py-3 text-base font-medium text-white shadow-lg ring-emerald-600 transition hover:scale-105 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2"
            >
              Empieza ahora
            </a>
            <a
              href="#causas"
              className="inline-block rounded-full border border-emerald-600 bg-white px-8 py-3 text-base font-medium text-emerald-600 transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              Explorar causas
            </a>
          </div>

          {/* Quick stats */}
          <div className="mt-10 flex flex-wrap gap-6 text-center md:text-left">
            {[
              { label: "Donantes", value: "20 k+" },
              { label: "Fundaciones verificadas", value: "150" },
              { label: "Índice de transparencia", value: "98 %" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center md:items-start">
                <span className="text-2xl font-bold text-gray-900 lg:text-3xl">{value}</span>
                <span className="text-sm text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ───────────────────────────── Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-6/12"
        >
          <img
            src="https://source.unsplash.com/960x600/?community,donation"
            alt="Grupo de voluntarios trabajando juntos por una causa"
            className="h-auto w-full rounded-xl object-cover shadow-2xl"
            onError={(e) => {
              e.target.src = "https://placehold.co/960x600?text=Causi+Impact";
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

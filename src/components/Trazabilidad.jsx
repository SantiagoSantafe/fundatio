import React from 'react';
import { motion } from "framer-motion";
import { ShieldCheck, BarChart, ArrowRight } from "lucide-react";

const traceCards = [
  {
    title: "Seguridad de principio a fin",
    desc: "Cada aporte se guarda en un registro inalterable y público, evitando fraudes o cambios posteriores.",
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-600",
    ringColor: "ring-emerald-200",
    Icon: ShieldCheck,
    bullets: [
      "Registro a prueba de manipulaciones",
      "Identificación única de cada donación",
      "Consultas abiertas 24/7",
    ],
  },
  {
    title: "Reportes en tiempo real",
    desc: "Sigue de cerca el avance de los proyectos que apoyas gracias a paneles y alertas instantáneas.",
    iconBg: "bg-sky-100",
    iconText: "text-sky-600",
    ringColor: "ring-sky-200",
    Icon: BarChart,
    bullets: [
      "Notificaciones automáticas del uso de fondos",
      "Panel personalizado con métricas",
      "Historias y fotos verificadas",
    ],
  },
];

const traceSteps = [
  {
    title: "Donación recibida",
    desc: "Tu aporte ingresa al sistema"
  },
  {
    title: "Verificación del sistema",
    desc: "Validamos la transacción"
  },
  {
    title: "Transferencia a la fundación",
    desc: "Los fondos llegan al destino"
  },
  {
    title: "Reporte de uso",
    desc: "Recibes el impacto generado"
  },
];

const Trazabilidad = () => (
  <section id="trazabilidad" className="bg-white py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Trazabilidad y transparencia
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-600 sm:mt-6 sm:text-xl">
          Nuestra plataforma registra cada paso de tu donación en un sistema inalterable y
          de acceso público. Así puedes comprobar, en cualquier momento, a dónde llegó tu
          aporte y el impacto que generó.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-16 sm:mt-20 lg:mt-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {traceCards.map(({ title, desc, iconBg, iconText, ringColor, Icon, bullets }, i) => (
            <motion.div
              key={title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 lg:p-10">
                {/* Icon */}
                <div className="mb-6">
                  <span
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-full ring-4 ring-offset-2 ${iconBg} ${iconText} ${ringColor} shadow-lg transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-8 w-8" />
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                    {title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
                    {desc}
                  </p>
                  
                  {/* Benefits List */}
                  <div className="pt-4">
                    <ul className="space-y-3">
                      {bullets.map((bullet, idx) => (
                        <li key={bullet} className="flex items-start">
                          <div className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600 lg:text-base">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Process Flow Section */}
      <motion.div 
        className="mt-20 sm:mt-24 lg:mt-28"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-emerald-50 to-emerald-100 p-8 shadow-inner lg:p-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-200" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-emerald-200" />
          </div>
          
          <div className="relative">
            {/* Section Header */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                De tu aporte al resultado, paso a paso
              </h3>
              <p className="mt-3 text-lg text-gray-600">
                Transparencia total en cada etapa del proceso
              </p>
            </div>

            {/* Steps Flow */}
            <div className="mt-12 lg:mt-16">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                {traceSteps.map((step, idx) => (
                  <div key={step.title} className="relative">
                    {/* Connector Line - Desktop */}
                    {idx < traceSteps.length - 1 && (
                      <div className="absolute left-1/2 top-8 hidden h-px w-full translate-x-1/2 lg:block">
                        <div className="h-full bg-gradient-to-r from-emerald-400 via-emerald-400 to-transparent" />
                        <ArrowRight className="absolute -right-2 -top-2 h-4 w-4 text-emerald-500" />
                      </div>
                    )}

                    {/* Step Content */}
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="relative mb-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white shadow-lg ring-4 ring-emerald-200 ring-offset-2">
                          {idx + 1}
                        </span>
                      </motion.div>
                      
                      <div className="space-y-2">
                        <h4 className="text-base font-semibold text-gray-900 lg:text-lg">
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-600 lg:text-base">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Connector Line - Mobile */}
                    {idx < traceSteps.length - 1 && (
                      <div className="mx-auto mt-6 h-8 w-px bg-gradient-to-b from-emerald-400 to-transparent lg:hidden" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Trazabilidad;
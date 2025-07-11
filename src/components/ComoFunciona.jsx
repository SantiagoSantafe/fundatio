import { Search, HandCoins, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Explora fundaciones",
    desc: "Navega entre organizaciones verificadas y elige la causa que más te inspire.",
    color: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      ring: "ring-emerald-200",
    },
    Icon: Search,
  },
  {
    title: "Dona en dos clics",
    desc: "Selecciona el monto o artículos en especie y completa tu aporte de forma segura.",
    color: {
      bg: "bg-sky-100",
      text: "text-sky-600",
      ring: "ring-sky-200",
    },
    Icon: HandCoins,
  },
  {
    title: "Sigue el impacto",
    desc: "Recibe historias, fotos y métricas auditadas que muestran el cambio generado.",
    color: {
      bg: "bg-violet-100",
      text: "text-violet-600",
      ring: "ring-violet-200",
    },
    Icon: BarChart2,
  },
];

const ComoFunciona = () => (
  <section id="como-funciona" className="relative overflow-hidden bg-gray-50 py-16 sm:py-20 lg:py-24">
    {/* Decorative connector for desktop */}
    <div
      aria-hidden
      className="absolute left-1/2 top-60 hidden h-0.5 w-[65%] max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-gray-300 to-transparent lg:block"
    />
    
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          ¿Cómo funciona?
        </h2>
        <p className="mt-4 text-lg text-gray-600 sm:mt-6">
          Hacer el bien nunca fue tan simple y transparente
        </p>
      </div>

      {/* Steps Grid */}
      <div className="relative mt-16 sm:mt-20 lg:mt-24">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-3 lg:gap-8">
          {steps.map(({ title, desc, color, Icon }, idx) => (
            <motion.div
              key={title}
              className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              {/* Vertical connector for mobile/tablet */}
              {idx < steps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute left-1/2 top-20 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-gray-300 to-transparent lg:hidden"
                />
              )}
              
              {/* Step Content */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <span
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-full ring-4 ring-offset-2 ${color.bg} ${color.text} ${color.ring} shadow-lg transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20`}
                  >
                    <Icon className="h-7 w-7 sm:h-9 sm:w-9" />
                  </span>
                  
                  {/* Step Number */}
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white sm:h-7 sm:w-7">
                    {idx + 1}
                  </span>
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 sm:text-xl">
                    {title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600 lg:max-w-xs xl:max-w-sm">
                    {desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ComoFunciona;
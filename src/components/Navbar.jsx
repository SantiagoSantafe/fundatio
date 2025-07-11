// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import FundatioIcon from "../assets/fundatio_icon.png"; // ajusta la ruta si cambia

/* Enlaces de navegación */
const navLinks = [
  { href: "#hero",          label: "Inicio" },
  { href: "#que-es",        label: "¿Qué es?" },
  { href: "#como-funciona", label: "¿Cómo funciona?" },
  { href: "#testimonios",   label: "Testimonios" },
  { href: "#fundaciones",   label: "Fundaciones" },
  { href: "#impacto",       label: "Impacto" },
  { href: "#trazabilidad",  label: "Trazabilidad" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]   = useState(null);          // resalta link activo (opcional)

  /* Cambia estilo al hacer scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (href) => {
    setOpen(false);           // cierra drawer en móvil
    setActive(href);          // resalta link en desktop
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "backdrop-blur bg-white/80 shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Barra principal */}
      <nav
        className="container mx-auto flex items-center justify-between px-6 py-4"
        role="navigation"
        aria-label="Principal"
      >
        {/* Logo + nombre */}
        <a href="#hero" className="flex items-center gap-2 text-xl font-bold text-emerald-600">
          <img
            src={FundatioIcon}
            alt="Fundatio logo"
            className="h-8 w-8 shrink-0"
            loading="eager"
          />
          <span className="text-slate-800 dark:text-white">Fundatio</span>
        </a>

        {/* ======== Desktop ======== */}
        <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => handleNavigate(href)}
                className={`transition-colors hover:text-emerald-600 ${
                  active === href ? "text-emerald-700 font-semibold" : ""
                }`}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#cta"
              onClick={() => handleNavigate("#cta")}
              className="rounded-full bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              Únete
            </a>
          </li>
        </ul>

        {/* ======== Móvil: botón hamburguesa ======== */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* ======== Drawer móvil ======== */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 z-40 h-screen w-72 bg-white shadow-lg md:hidden"
            role="dialog"
            aria-label="Menú móvil"
          >
            <nav className="mt-24 flex flex-col gap-6 px-6 text-base font-medium">
              {navLinks.map(({ href, label }) => (
                <React.Fragment key={href}>
                  <a
                    href={href}
                    onClick={() => handleNavigate(href)}
                    className="py-2 transition-colors hover:text-emerald-600"
                  >
                    {label}
                  </a>
                  <hr className="border-slate-100" />
                </React.Fragment>
              ))}

              <a
                href="#cta"
                onClick={() => handleNavigate("#cta")}
                className="mt-4 rounded-full bg-emerald-600 px-4 py-2 text-center text-white transition hover:bg-emerald-700"
              >
                Únete
              </a>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}

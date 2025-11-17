// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import FundatioIcon from "../assets/Fundatio_logo-removebg-preview.png"; // ajusta la ruta si cambia

/* Enlaces de navegación */
const navLinks = [
  { href: "#hero", label: "Inicio" },
  { href: "#que-es", label: "¿Qué es?" },
  { href: "#como-funciona", label: "¿Cómo funciona?" },
  //{ href: "#testimonios",   label: "Testimonios" },
  //{ href: "#fundaciones",   label: "Fundaciones" },
  { href: "#impacto", label: "Impacto" },
  { href: "#trazabilidad", label: "Trazabilidad" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null); // resalta link activo (opcional)

  // Smooth scroll to sections and set active state
  const scrollToSection = (e, href) => {
    if (e && e.preventDefault) e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActive(href);
    setOpen(false);
  };

  /* Cambia estilo al hacer scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "backdrop-blur bg-white/80 shadow" : "bg-transparent"
      }`}
      role="banner"
    >
      {/* Barra principal */}
      <nav
        className="container mx-auto flex items-center justify-between px-6 py-4"
        role="navigation"
        aria-label="Principal"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="flex items-center gap-3 text-xl font-bold text-cyan-600"
        >
          <img
            src={FundatioIcon}
            alt="Fundatio logo"
            className="h-10 w-auto object-contain"
            loading="eager"
          />
        </a>

        {/* ======== Desktop ======== */}
        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href} className="relative">
              <a
                href={href}
                onClick={(e) => scrollToSection(e, href)}
                className={`inline-block pb-1 transition-colors duration-200 ${
                  active === href
                    ? "text-cyan-700 font-semibold border-b-2 border-cyan-600"
                    : "text-gray-700 hover:text-cyan-600"
                }`}
                aria-current={active === href ? "page" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#cta"
              onClick={(e) => scrollToSection(e, "#cta")}
              className="ml-2 inline-flex items-center rounded-full bg-cyan-500 px-4 py-2 text-white transition hover:bg-cyan-600 shadow-sm"
            >
              Únete
            </a>
          </li>
        </ul>

        {/* ======== Móvil: botón hamburguesa ======== */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md bg-white/60 backdrop-blur hover:bg-white/80"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6 text-cyan-700" />
          ) : (
            <Menu className="h-6 w-6 text-cyan-700" />
          )}
        </button>
      </nav>

      {/* ======== Drawer móvil con overlay ======== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/40 md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed right-0 top-0 z-40 h-screen w-80 bg-white shadow-2xl md:hidden"
              role="dialog"
              aria-label="Menú móvil"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <img
                    src={FundatioIcon}
                    alt="Fundatio"
                    className="h-10 w-auto"
                  />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md hover:bg-slate-100"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-4 px-6 text-base font-medium">
                {navLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => scrollToSection(e, href)}
                    className="py-3 rounded-lg transition-colors hover:bg-cyan-50 hover:text-cyan-700"
                  >
                    {label}
                  </a>
                ))}

                <a
                  href="#cta"
                  onClick={(e) => scrollToSection(e, "#cta")}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-center text-white transition hover:bg-cyan-600"
                >
                  Únete
                </a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
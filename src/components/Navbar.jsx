import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X} from "lucide-react";

const navLinks = [
  { href: "#hero", label: "Inicio" },
  { href: "#que-es", label: "¿Qué es?" },
  { href: "#como-funciona", label: "¿Cómo funciona?" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#fundaciones", label: "Fundaciones" },
  { href: "#impacto", label: "Impacto" },
  { href: "#trazabilidad", label: "Trazabilidad" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer when clicking a link (mobile)
  const handleLinkClick = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "backdrop-blur bg-white/80 shadow" : "bg-transparent"}`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#hero" className="text-xl font-bold text-emerald-600">
          Plataforma Social
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="transition-colors hover:text-emerald-600"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#cta"
              className="rounded-full bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              Únete
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <motion.aside
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { x: 0 },
          closed: { x: "100%" },
        }}
        transition={{ type: "tween", duration: 0.25 }}
        className="fixed right-0 top-0 z-40 h-screen w-64 bg-white shadow-lg md:hidden"
      >
        <ul className="mt-24 flex flex-col gap-6 px-6 text-base font-medium text-gray-700">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={handleLinkClick}
                className="block w-full py-2 transition-colors hover:text-emerald-600"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#cta"
              onClick={handleLinkClick}
              className="mt-4 inline-block w-full rounded-full bg-emerald-600 px-4 py-2 text-center text-white transition hover:bg-emerald-700"
            >
              Únete
            </a>
          </li>
        </ul>
      </motion.aside>
    </header>
  );
};

export default Navbar;

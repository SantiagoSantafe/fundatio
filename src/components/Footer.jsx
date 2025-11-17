import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Shield,
  Users,
  Heart
} from "lucide-react";
import FundatioIcon from "../assets/Fundatio_logo-removebg-preview.png"; // Ajusta la ruta según tu estructura

// Footer actualizado según branding
const Footer = () => {
  const footerLinks = {
    donors: [
      { label: "Cómo donar", href: "#como-funciona" },
      { label: "Fundaciones", href: "#fundaciones" },
      { label: "Seguimiento", href: "#impacto" },
      { label: "Transparencia", href: "#trazabilidad" },
    ],
    ngos: [
      { label: "Únete como fundación", href: "#cta" },
      { label: "Proceso de verificación", href: "#trazabilidad" },
      { label: "Reportes de impacto", href: "#trazabilidad" },
      { label: "Recursos para ONGs", href: "#" },
    ],
    support: [
      { label: "Centro de ayuda", href: "#" },
      { label: "Contacta con nosotros", href: "#" },
      { label: "Términos y condiciones", href: "#" },
      { label: "Política de privacidad", href: "#" },
    ],
  };

  const social = [
    { href: "#", label: "Facebook", Icon: Facebook },
    { href: "#", label: "Twitter", Icon: Twitter },
    { href: "#", label: "Instagram", Icon: Instagram },
    { href: "#", label: "LinkedIn", Icon: Linkedin },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300">
      {/* Background pattern */}
      <div>
        <div className="h-full w-full bg-gradient-to-br from-cyan-400 to-cyan-600"></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={FundatioIcon}
                alt="Fundatio logo"
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-gray-400 max-w-xs text-sm leading-relaxed mb-6">
              <span className="text-cyan-400 font-medium">Apoya a tu causa con confianza. Mira el impacto.</span>
              <br /><br />
              Conectamos corazones generosos con fundaciones transparentes para crear un impacto real y medible en Colombia.
            </p>
            <div className="flex gap-3">
              {social.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="rounded-full p-2 bg-slate-800 text-gray-400 transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries({ 
            "Para Donantes": footerLinks.donors, 
            "Para Fundaciones": footerLinks.ngos, 
            "Soporte": footerLinks.support 
          }).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a 
                      href={href} 
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3 text-center md:text-left">
              <Shield className="h-5 w-5 text-cyan-400 flex-shrink-0" />
              <span className="text-sm text-gray-400">100% Transparencia Garantizada</span>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <Users className="h-5 w-5 text-cyan-400 flex-shrink-0" />
              <span className="text-sm text-gray-400">Fundaciones Verificadas</span>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <Heart className="h-5 w-5 text-cyan-400 flex-shrink-0" />
              <span className="text-sm text-gray-400">Impacto en Tiempo Real</span>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-sm">
            <p className="text-gray-500">
              © 2025 Fundatio. Todos los derechos reservados. 
              <span className="text-cyan-400 ml-1">Transformando vidas juntos.</span>
            </p>
            <div className="flex gap-6">
              {[
                { label: "Política de privacidad", href: "#" },
                { label: "Términos de uso", href: "#" },
                { label: "Cookies", href: "#" },
              ].map(({ label, href }) => (
                <a 
                  key={label} 
                  href={href} 
                  className="text-gray-500 hover:text-cyan-400 transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
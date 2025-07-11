import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const footerLinks = {
  donors: [
    { label: "Cómo donar", href: "#como-funciona" },
    { label: "Fundaciones", href: "#fundaciones" },
    { label: "Seguimiento", href: "#impacto" },
    { label: "Impacto", href: "#impacto" },
  ],
  ngos: [
    { label: "Registrarse", href: "#cta" },
    { label: "Verificación", href: "#trazabilidad" },
    { label: "Reportes", href: "#trazabilidad" },
    { label: "Recursos", href: "#" },
  ],
  support: [
    { label: "Centro de ayuda", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Términos", href: "#" },
    { label: "Privacidad", href: "#" },
  ],
};

const social = [
  { href: "#", label: "Facebook", Icon: Facebook },
  { href: "#", label: "Twitter", Icon: Twitter },
  { href: "#", label: "Instagram", Icon: Instagram },
  { href: "#", label: "LinkedIn", Icon: Linkedin },
];

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white">Plataforma Social</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Conectando corazones generosos con causas que importan.
          </p>
          <div className="mt-6 flex gap-4">
            {social.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries({ Donantes: footerLinks.donors, Fundaciones: footerLinks.ngos, Soporte: footerLinks.support }).map(
          ([title, items]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold text-white">{title}</h4>
              <ul className="mt-4 space-y-2">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="transition hover:text-white">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-8 text-sm">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p>© 2025 Plataforma Social. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {[
              { label: "Política de privacidad", href: "#" },
              { label: "Términos de uso", href: "#" },
              { label: "Cookies", href: "#" },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="transition hover:text-white">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);


export default Footer;

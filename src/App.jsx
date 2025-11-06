import React from "react";
import { usePageAnalytics } from "./hooks/useAnalytics";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Fundaciones from "./components/Fundaciones";
import QueEs from "./components/QueEs";
import Panorama from "./components/Panorama";
import ComoFunciona from "./components/ComoFunciona";
import Impacto from "./components/Impacto";
import Testimonios from "./components/Testimonios";
import Trazabilidad from "./components/Trazabilidad";
import UnifiedCTA from "./components/UnifiedCTA";
import Footer from "./components/Footer";

export default function App() {
  // Trackear analytics de la página principal
  usePageAnalytics(
    "homepage",
    "Fundatio - Plataforma de Donaciones Transparentes"
  );

  return (
    <div className="font-sans text-gray-800">
      {/* Cada sección tiene data-section para tracking automático */}
      <div data-section="navbar">
        <Navbar />
      </div>

      <section data-section="hero">
        <Hero />
      </section>

      {/* <section data-section="fundaciones">
        <Fundaciones />
      </section> */}

      <section data-section="que-es">
        <QueEs />
      </section>

      <section data-section="panorama">
        <Panorama />
      </section>

      {/* <section data-section="testimonios">
        <Testimonios />
      </section> */}

      <section data-section="como-funciona">
        <ComoFunciona />
      </section>

      <section data-section="trazabilidad">
        <Trazabilidad />
      </section>

      <section data-section="impacto">
        <Impacto />
      </section>

      <section data-section="registro">
        <UnifiedCTA />
      </section>

      <footer data-section="footer">
        <Footer />
      </footer>
    </div>
  );
}

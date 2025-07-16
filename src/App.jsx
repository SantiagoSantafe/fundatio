import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fundaciones from './components/Fundaciones';
import QueEs from './components/QueEs';
import ComoFunciona from './components/ComoFunciona';
import Impacto from './components/Impacto';
import Testimonios from './components/Testimonios';
import Trazabilidad from './components/Trazabilidad';
import UnifiedCTA from './components/UnifiedCTA';
import Footer from './components/Footer';


export default function App() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <Hero />
      {/* <Fundaciones /> */}
      <QueEs />
      {/*<Testimonios />*/}
      <ComoFunciona />
      <Trazabilidad />
      <Impacto />
      <UnifiedCTA />
      <Footer />
    </div>
  );
}
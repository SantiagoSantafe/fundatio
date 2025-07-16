import React, { useState } from 'react';

const UnifiedCTA = () => {
  const [activeTab, setActiveTab] = useState('donantes');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    organizacion: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el registro
    console.log('Registrando:', { tipo: activeTab, datos: formData });
    
    // Simular guardado en localStorage (esto se reemplazaría con una API real)
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    registros.push({
      id: Date.now(),
      tipo: activeTab,
      datos: formData,
      fecha: new Date().toISOString()
    });
    localStorage.setItem('registros', JSON.stringify(registros));
    
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nombre: '', email: '', telefono: '', organizacion: '', mensaje: '' });
    }, 3000);
  };

  const resetForm = () => {
    setFormData({ nombre: '', email: '', telefono: '', organizacion: '', mensaje: '' });
    setSubmitted(false);
  };

  return (
    <section id="cta" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements - más sutiles */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Únete a la lista de espera
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              ¿Listo para 
              <br className="hidden sm:inline" />
              <span className="text-emerald-600">transformar vidas</span>?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Únete a nuestra lista de espera y sé parte del futuro de las donaciones 
              <span className="font-semibold text-emerald-700"> transparentes y efectivas</span> en Colombia.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-50 rounded-full p-2 shadow-sm border border-gray-200">
              <button
                onClick={() => { setActiveTab('donantes'); resetForm(); }}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'donantes'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-white'
                }`}
              >
                Quiero Donar
              </button>
              <button
                onClick={() => { setActiveTab('fundaciones'); resetForm(); }}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'fundaciones'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-white'
                }`}
              >
                Soy Fundación
              </button>
            </div>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">
            {/* Information Card */}
            <div className="bg-gray-50 rounded-2xl shadow-sm p-8 h-full border border-gray-200 hover:shadow-md transition-all duration-300">
              {activeTab === 'donantes' ? (
                <div>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💝</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Para Donantes
                    </h3>
                    <p className="text-gray-600">
                      Conecta con causas que realmente importan
                    </p>
                  </div>
                  <div className="space-y-5">
                    {[
                      { icon: '🔍', title: 'Transparencia Total', desc: 'Ve exactamente cómo se usa tu donación en tiempo real' },
                      { icon: '⚡', title: 'Donación Rápida', desc: 'Dona en solo dos clics de forma segura y confiable' },
                      { icon: '📊', title: 'Impacto Medible', desc: 'Recibe reportes multimedia del impacto generado' },
                      { icon: '🤝', title: 'Conexión Directa', desc: 'Conéctate directamente con las fundaciones que apoyas' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start space-x-4 p-3 bg-white rounded-lg border border-emerald-100">
                        <span className="text-2xl mt-1 flex-shrink-0">{item.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏢</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Para Fundaciones
                    </h3>
                    <p className="text-gray-600">
                      Amplifica tu impacto y alcanza más donantes
                    </p>
                  </div>
                  <div className="space-y-5">
                    {[
                      { icon: '✅', title: 'Verificación Gratuita', desc: 'Proceso de verificación sin costo y totalmente transparente' },
                      { icon: '🎯', title: 'Alcance Ampliado', desc: 'Llega a miles de donantes potenciales comprometidos' },
                      { icon: '📈', title: 'Herramientas de Gestión', desc: 'Panel completo para gestionar donaciones y reportes' },
                      { icon: '💬', title: 'Comunicación Directa', desc: 'Mantén informados a tus donantes en tiempo real' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start space-x-4 p-3 bg-white rounded-lg border border-emerald-100">
                        <span className="text-2xl mt-1 flex-shrink-0">{item.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Registration Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full border border-emerald-200">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-emerald-600">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Registro Exitoso!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Te hemos añadido a nuestra lista de espera. Nos pondremos en contacto contigo muy pronto.
                  </p>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <p className="text-emerald-800 font-medium text-sm">
                      📧 Revisa tu email para confirmar tu registro
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Únete a la Lista de Espera
                    </h3>
                    <p className="text-gray-600">
                      {activeTab === 'donantes' 
                        ? 'Regístrate y sé de los primeros en donar con transparencia total'
                        : 'Regístrate y conecta con donantes comprometidos desde el día uno'
                      }
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>

                  {activeTab === 'fundaciones' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de la Fundación *
                      </label>
                      <input
                        type="text"
                        name="organizacion"
                        value={formData.organizacion}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        required={activeTab === 'fundaciones'}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {activeTab === 'donantes' ? '¿Qué te motiva a donar?' : '¿Cuál es tu causa principal?'}
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                      placeholder={activeTab === 'donantes' 
                        ? 'Cuéntanos qué causas te interesan más...'
                        : 'Describe brevemente tu misión y objetivos...'
                      }
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                  >
                    {activeTab === 'donantes' ? 'Unirme como Donante' : 'Registrar mi Fundación'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:bg-white transition-all duration-300">
              <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
              <p className="text-gray-800 font-semibold">Transparencia Garantizada</p>
              <p className="text-gray-500 text-sm mt-1">Cada peso rastreado en tiempo real</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:bg-white transition-all duration-300">
              <div className="text-3xl font-bold text-emerald-600 mb-2">0%</div>
              <p className="text-gray-800 font-semibold">Comisiones Ocultas</p>
              <p className="text-gray-500 text-sm mt-1">Modelo sostenible y justo para todos</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:bg-white transition-all duration-300">
              <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
              <p className="text-gray-800 font-semibold">Soporte Disponible</p>
              <p className="text-gray-500 text-sm mt-1">Estamos aquí para ayudarte siempre</p>
            </div>
          </div>

          {/* Additional trust indicators */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-semibold text-emerald-700">Fundatio</span> • Apoya a tu causa con confianza. Mira el impacto.
            </p>
            <div className="flex justify-center items-center space-x-6 text-xs text-gray-400">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Rigurosa verificación
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Comunidad transparente
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Impacto optimista
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedCTA;
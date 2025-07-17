import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { db, analytics } from '../firebase'; // Asegúrate de que la ruta sea correcta

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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    }

    if (activeTab === 'fundaciones' && !formData.organizacion.trim()) {
      newErrors.organizacion = "El nombre de la fundación es requerido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo si existe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Registrar intento de envío con errores
      logEvent(analytics, "form_submit_error", {
        tab: activeTab,
        errors: Object.keys(errors).join(", ")
      });
      return;
    }

    setLoading(true);
    
    try {
      // Registrar inicio del proceso
      logEvent(analytics, "form_submit_start", {
        tab: activeTab,
        email_domain: formData.email.split('@')[1]
      });

      // Preparar datos para guardar
      const dataToSave = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        mensaje: formData.mensaje,
        tipo: activeTab, // 'donantes' o 'fundaciones'
        fechaRegistro: Timestamp.now(),
        estado: "activo"
      };

      // Agregar organización si es fundación
      if (activeTab === 'fundaciones') {
        dataToSave.organizacion = formData.organizacion;
      }

      // Determinar la colección según el tipo
      const collectionName = activeTab === 'donantes' ? 'donantes' : 'fundaciones';
      
      // Guardar en Firestore
      const docRef = await addDoc(collection(db, collectionName), dataToSave);
      
      console.log(`${activeTab} guardado con ID: `, docRef.id);

      // Registrar éxito en Analytics
      logEvent(analytics, "registration_success", {
        tab: activeTab,
        user_id: docRef.id,
        has_message: !!formData.mensaje
      });

      // También registrar evento específico según el tipo
      if (activeTab === 'donantes') {
        logEvent(analytics, "donante_registrado", {
          donante_id: docRef.id,
          tiene_motivacion: !!formData.mensaje
        });
      } else {
        logEvent(analytics, "fundacion_registrada", {
          fundacion_id: docRef.id,
          organizacion: formData.organizacion
        });
      }

      setSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ 
          nombre: '', 
          email: '', 
          telefono: '', 
          organizacion: '', 
          mensaje: '' 
        });
        setErrors({});
      }, 5000);

    } catch (error) {
      console.error("Error al registrar:", error);
      
      // Registrar error en Analytics
      logEvent(analytics, "registration_failed", {
        tab: activeTab,
        error_message: error.message
      });
      
      // Mostrar error al usuario
      setErrors({
        general: "Error al procesar el registro. Por favor, inténtalo de nuevo."
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ 
      nombre: '', 
      email: '', 
      telefono: '', 
      organizacion: '', 
      mensaje: '' 
    });
    setSubmitted(false);
    setErrors({});
  };

  // Registrar cambio de tab en Analytics
  const handleTabChange = (newTab) => {
    logEvent(analytics, "tab_changed", {
      from_tab: activeTab,
      to_tab: newTab
    });
    setActiveTab(newTab);
    resetForm();
  };

  // Registrar interacciones con campos
  const handleFieldFocus = (fieldName) => {
    logEvent(analytics, "form_field_focus", {
      field_name: fieldName,
      tab: activeTab
    });
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
                onClick={() => handleTabChange('donantes')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'donantes'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-white'
                }`}
              >
                Quiero Donar
              </button>
              <button
                onClick={() => handleTabChange('fundaciones')}
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
                <form onSubmit={handleSubmit} className="space-y-5">
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

                  {/* Error general */}
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-red-800 text-sm">{errors.general}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus('nombre')}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                        errors.nombre ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                    )}
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
                      onFocus={() => handleFieldFocus('email')}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
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
                      onFocus={() => handleFieldFocus('telefono')}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                        errors.telefono ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.telefono && (
                      <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
                    )}
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
                        onFocus={() => handleFieldFocus('organizacion')}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                          errors.organizacion ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.organizacion && (
                        <p className="text-red-500 text-sm mt-1">{errors.organizacion}</p>
                      )}
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
                      onFocus={() => handleFieldFocus('mensaje')}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                      placeholder={activeTab === 'donantes' 
                        ? 'Cuéntanos qué causas te interesan más...'
                        : 'Describe brevemente tu misión y objetivos...'
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform shadow-lg ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 hover:scale-[1.02]'
                    }`}
                  >
                    {loading 
                      ? 'Registrando...' 
                      : activeTab === 'donantes' 
                        ? 'Unirme como Donante' 
                        : 'Registrar mi Fundación'
                    }
                  </button>
                </form>
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
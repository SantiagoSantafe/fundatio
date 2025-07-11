import React, { useState } from 'react';

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar la suscripción
    console.log('Suscribiendo email:', email);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Mantente Informado</h2>
          <p className="text-gray-600 mb-8">
            Recibe actualizaciones sobre nuevas fundaciones, historias de impacto y 
            oportunidades para hacer la diferencia.
          </p>
          
          {subscribed ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              <p className="font-semibold">¡Gracias por suscribirte! 📧</p>
              <p className="text-sm">Te enviaremos noticias increíbles muy pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Suscribirse
              </button>
            </form>
          )}
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="flex items-center justify-center">
              <span className="text-green-500 mr-2">✓</span>
              Historias de impacto semanales
            </div>
            <div className="flex items-center justify-center">
              <span className="text-green-500 mr-2">✓</span>
              Nuevas fundaciones verificadas
            </div>
            <div className="flex items-center justify-center">
              <span className="text-green-500 mr-2">✓</span>
              Sin spam, cancela cuando quieras
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionForm;

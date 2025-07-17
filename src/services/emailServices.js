// src/services/emailService.js
import emailjs from '@emailjs/browser';
import { logEvent } from "firebase/analytics";
import { analytics } from '../firebase';

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'service_1ukz1bt'; // Reemplazar con tu Service ID
const EMAILJS_TEMPLATE_ID = 'template_l8avp9e'; // Reemplazar con tu Template ID
const EMAILJS_PUBLIC_KEY = 'TetU6pvABCjgnT6Z8'; // Reemplazar con tu Public Key

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Plantilla de email para donantes
const emailTemplateDonante = {
  subject: '¡Bienvenido a Fundatio! 🎉 - Lista de Espera Confirmada',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #059669; margin: 0; font-size: 28px;">Fundatio</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Donaciones transparentes que transforman vidas</p>
        </div>
        
        <!-- Main Content -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">¡Gracias por unirte, {{nombre}}! 💝</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Tu registro como <strong>donante</strong> ha sido confirmado exitosamente. Ya formas parte de nuestra lista de espera para ser uno de los primeros en experimentar donaciones completamente transparentes.
          </p>
          
          <div style="background-color: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #059669; margin: 0 0 10px 0;">🎯 ¿Qué sigue ahora?</h3>
            <ul style="color: #065f46; margin: 10px 0; padding-left: 20px;">
              <li>Te contactaremos cuando la plataforma esté lista</li>
              <li>Recibirás acceso exclusivo como early adopter</li>
              <li>Podrás hacer tus primeras donaciones con transparencia total</li>
              <li>Verás el impacto de tus donaciones en tiempo real</li>
            </ul>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            <strong>Tu motivación:</strong> "{{mensaje}}"
          </p>
        </div>
        
        <!-- Features -->
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">✨ Lo que te espera en Fundatio:</h3>
          <div style="display: grid; gap: 10px;">
            <div style="display: flex; align-items: center;">
              <span style="color: #059669; margin-right: 10px;">🔍</span>
              <span style="color: #374151;">Transparencia total en cada donación</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: #059669; margin-right: 10px;">⚡</span>
              <span style="color: #374151;">Donaciones rápidas y seguras</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: #059669; margin-right: 10px;">📊</span>
              <span style="color: #374151;">Reportes de impacto en tiempo real</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: #059669; margin-right: 10px;">🤝</span>
              <span style="color: #374151;">Conexión directa con fundaciones verificadas</span>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Este email fue enviado porque te registraste en nuestra lista de espera.<br>
            Si tienes preguntas, responde a este email.
          </p>
          <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0;">
            © 2025 Fundatio - Transformando vidas a través de donaciones transparentes
          </p>
        </div>
      </div>
    </div>
  `
};

// Plantilla de email para fundaciones
const emailTemplateFundacion = {
  subject: '¡Bienvenida a Fundatio! 🏢 - Registro de Fundación Confirmado',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #059669; margin: 0; font-size: 28px;">Fundatio</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Donaciones transparentes que transforman vidas</p>
        </div>
        
        <!-- Main Content -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">¡Bienvenida {{organizacion}}! 🏢</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Gracias <strong>{{nombre}}</strong> por registrar a <strong>{{organizacion}}</strong> en Fundatio. Tu organización ya está en nuestra lista para el proceso de verificación y onboarding.
          </p>
          
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1d4ed8; margin: 0 0 10px 0;">📋 Próximos pasos:</h3>
            <ol style="color: #1e40af; margin: 10px 0; padding-left: 20px;">
              <li>Revisaremos la información de tu fundación</li>
              <li>Te contactaremos para el proceso de verificación</li>
              <li>Configuraremos tu perfil en la plataforma</li>
              <li>Comenzarás a recibir donaciones transparentes</li>
            </ol>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            <strong>Sobre tu causa:</strong> "{{mensaje}}"
          </p>
        </div>
        
        <!-- Benefits -->
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">🚀 Beneficios para tu fundación:</h3>
          <div style="display: grid; gap: 10px;">
            <div style="display: flex; align-items: center;">
              <span style="color: #059669; margin-right: 10px;">✅</span>
              <span style="color: #374151;">Verificación gratuita y transparente</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: #059669; margin-right: 10px;">🎯</span>
              <span style="color: #374151;">Acceso a miles de donantes comprometidos</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: #059669; margin-right: 10px;">📈</span>
              <span style="color: #374151;">Herramientas completas de gestión</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: #059669; margin-right: 10px;">💬</span>
              <span style="color: #374151;">Comunicación directa con donantes</span>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Este email fue enviado porque registraste tu fundación en Fundatio.<br>
            Si tienes preguntas, responde a este email.
          </p>
          <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0;">
            © 2025 Fundatio - Transformando vidas a través de donaciones transparentes
          </p>
        </div>
      </div>
    </div>
  `
};

// Función principal para enviar emails
export const enviarEmailConfirmacion = async (datosUsuario, tipo) => {
  try {
    // Registrar intento de envío
    logEvent(analytics, 'email_send_attempt', {
      tipo: tipo,
      email_domain: datosUsuario.email.split('@')[1]
    });

    const template = tipo === 'donantes' ? emailTemplateDonante : emailTemplateFundacion;
    
    // Preparar parámetros para EmailJS
    const templateParams = {
      to_email: datosUsuario.email,
      to_name: datosUsuario.nombre,
      from_name: 'Fundatio',
      subject: template.subject,
      nombre: datosUsuario.nombre,
      email: datosUsuario.email,
      telefono: datosUsuario.telefono,
      mensaje: datosUsuario.mensaje || 'No especificado',
      organizacion: datosUsuario.organizacion || '',
      tipo: tipo,
      fecha: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    // Enviar email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    // Registrar éxito
    logEvent(analytics, 'email_sent_success', {
      tipo: tipo,
      email_domain: datosUsuario.email.split('@')[1],
      response_status: response.status
    });

    console.log('Email enviado exitosamente:', response);
    return {
      success: true,
      message: 'Email de confirmación enviado exitosamente'
    };

  } catch (error) {
    console.error('Error al enviar email:', error);
    
    // Registrar error
    logEvent(analytics, 'email_send_failed', {
      tipo: tipo,
      error_message: error.message,
      email_domain: datosUsuario.email.split('@')[1]
    });

    return {
      success: false,
      message: 'Error al enviar email de confirmación',
      error: error.message
    };
  }
};

// Función para enviar email de bienvenida simple
export const enviarEmailBienvenida = async (email, nombre, tipo) => {
  try {
    const templateParams = {
      to_email: email,
      to_name: nombre,
      from_name: 'Fundatio',
      subject: `¡Bienvenido a Fundatio! - Lista de Espera Confirmada`,
      message: `
        Hola ${nombre}!
        
        Tu registro como ${tipo === 'donantes' ? 'donante' : 'fundación'} ha sido confirmado.
        
        Te contactaremos cuando la plataforma esté lista.
        
        ¡Gracias por ser parte del futuro de las donaciones transparentes!
        
        Saludos,
        El equipo de Fundatio
      `
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return {
      success: true,
      message: 'Email enviado'
    };

  } catch (error) {
    console.error('Error al enviar email:', error);
    return {
      success: false,
      message: 'Error al enviar email'
    };
  }
};
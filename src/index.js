import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

// Trackear la carga inicial de la aplicación
const initializeAnalytics = () => {
  try {
    // Información de la sesión
    const sessionInfo = {
      session_id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'direct',
      user_agent: navigator.userAgent,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: navigator.platform,
      device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
    };

    // Trackear apertura de la aplicación
    logEvent(analytics, 'app_open', {
      source: 'web',
      timestamp: sessionInfo.timestamp,
      referrer: sessionInfo.referrer,
      device_type: sessionInfo.device_type
    });

    // Trackear inicio de sesión
    logEvent(analytics, 'session_start', sessionInfo);

    // Trackear información de la página
    logEvent(analytics, 'page_view', {
      page_title: 'Fundatio - Inicio',
      page_location: window.location.href,
      page_path: window.location.pathname,
      referrer: document.referrer
    });

    console.log('Analytics inicializado correctamente');
  } catch (error) {
    console.error('Error al inicializar analytics:', error);
  }
};

// Inicializar analytics
initializeAnalytics();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Enhanced Web Vitals tracking
reportWebVitals((metric) => {
  // Enviar métricas de rendimiento a Firebase Analytics
  if (analytics) {
    logEvent(analytics, 'web_vitals', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      metric_delta: metric.delta,
      page_path: window.location.pathname
    });
  }
  
  // También log en consola para debugging
  console.log('Web Vital:', metric);
});

// Trackear errores globales
window.addEventListener('error', (event) => {
  if (analytics) {
    logEvent(analytics, 'exception', {
      description: event.error?.message || 'Unknown error',
      fatal: false,
      error_type: 'javascript_error',
      filename: event.filename,
      line_number: event.lineno,
      column_number: event.colno
    });
  }
});

// Trackear errores de promesas no capturadas
window.addEventListener('unhandledrejection', (event) => {
  if (analytics) {
    logEvent(analytics, 'exception', {
      description: event.reason?.message || 'Unhandled promise rejection',
      fatal: false,
      error_type: 'promise_rejection'
    });
  }
});
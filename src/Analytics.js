// src/analytics.js - Servicio centralizado de analytics
import { logEvent, setUserProperties } from "firebase/analytics";
import { analytics } from './firebase';

// Helper para verificar si analytics está disponible
const isAnalyticsAvailable = () => {
  if (!analytics) {
    console.warn('🚫 Firebase Analytics no está inicializado');
    return false;
  }
  return true;
};

// Helper para logging mejorado
const debugLog = (eventName, parameters) => {
  console.log(`📊 [${new Date().toLocaleTimeString()}] Analytics Event: ${eventName}`, parameters);
};

// Función para trackear vistas de página con evento personalizado
export const trackPageView = (pageName, pageTitle = null) => {
  if (!isAnalyticsAvailable()) return;
  
  const parameters = {
    page_title: pageTitle || pageName,
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_name: pageName,
    custom_page_view: true // Para identificar fácilmente
  };
  
  debugLog('page_view', parameters);
  
  try {
    // Evento estándar de Google Analytics
    logEvent(analytics, 'page_view', parameters);
    
    // Evento personalizado adicional para debugging
    logEvent(analytics, 'custom_page_view', {
      page_name: pageName,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error tracking page view:', error);
  }
};

// Función para trackear clics con evento inmediato
export const trackButtonClick = (buttonName, section = null, additionalData = {}) => {
  if (!isAnalyticsAvailable()) return;
  
  const parameters = {
    content_type: 'button',
    item_id: buttonName,
    section: section || 'unknown',
    button_name: buttonName,
    page_path: window.location.pathname,
    ...additionalData
  };
  
  debugLog('button_click', parameters);
  
  try {
    // Múltiples eventos para asegurar que se capture
    logEvent(analytics, 'select_content', parameters);
    logEvent(analytics, 'custom_button_click', {
      button: buttonName,
      section: section,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error tracking button click:', error);
  }
};

// Función para trackear scroll con eventos más frecuentes
export const trackScroll = (percentage) => {
  if (!isAnalyticsAvailable()) return;
  
  const parameters = {
    percent_scrolled: percentage,
    page_path: window.location.pathname,
    scroll_milestone: `${percentage}%`
  };
  
  debugLog('scroll', parameters);
  
  try {
    logEvent(analytics, 'scroll', parameters);
    
    // Evento personalizado más simple
    logEvent(analytics, 'user_scroll', {
      percentage: percentage,
      milestone: `${percentage}%`,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error tracking scroll:', error);
  }
};

// Función para trackear tiempo en página
export const trackTimeOnPage = (seconds, pageName) => {
  if (!isAnalyticsAvailable()) return;
  
  const parameters = {
    name: 'page_view_time',
    value: seconds,
    page: pageName,
    engagement_level: seconds > 60 ? 'high' : seconds > 30 ? 'medium' : 'low',
    time_spent: seconds
  };
  
  debugLog('time_on_page', parameters);
  
  try {
    logEvent(analytics, 'timing_complete', parameters);
    
    // Evento más simple para asegurar captura
    logEvent(analytics, 'page_time', {
      seconds: seconds,
      page: pageName,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error tracking time on page:', error);
  }
};

// Función para trackear secciones con evento inmediato
export const trackSectionView = (sectionName) => {
  if (!isAnalyticsAvailable()) return;
  
  const parameters = {
    section_name: sectionName,
    page_path: window.location.pathname,
    content_type: 'section'
  };
  
  debugLog('section_view', parameters);
  
  try {
    logEvent(analytics, 'view_item', parameters);
    
    // Evento personalizado más directo
    logEvent(analytics, 'section_viewed', {
      section: sectionName,
      page: window.location.pathname,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error tracking section view:', error);
  }
};

// Función para trackear engagement
export const trackEngagement = (engagementType, value = null) => {
  if (!isAnalyticsAvailable()) return;
  
  const parameters = {
    engagement_type: engagementType,
    value: value,
    page_path: window.location.pathname
  };
  
  debugLog('engagement', parameters);
  
  try {
    logEvent(analytics, 'user_engagement', parameters);
    
    // Evento más simple
    logEvent(analytics, 'engagement', {
      type: engagementType,
      value: value,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error tracking engagement:', error);
  }
};

// Función de prueba para verificar conectividad
export const testAnalytics = () => {
  if (!isAnalyticsAvailable()) {
    console.error('❌ Analytics no disponible para testing');
    return false;
  }
  
  console.log('🧪 Enviando evento de prueba...');
  
  try {
    logEvent(analytics, 'test_event', {
      test_parameter: 'test_value',
      timestamp: Date.now(),
      user_agent: navigator.userAgent,
      page_url: window.location.href
    });
    
    console.log('✅ Evento de prueba enviado correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error enviando evento de prueba:', error);
    return false;
  }
};

// Función para verificar estado de Analytics con más detalle
export const checkAnalyticsStatus = () => {
  const status = {
    isAvailable: !!analytics,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    environment: process.env.NODE_ENV,
    userAgent: navigator.userAgent,
    url: window.location.href,
    timestamp: new Date().toISOString()
  };
  
  console.log('🔍 Estado completo de Firebase Analytics:', status);
  
  // Enviar evento de diagnóstico
  if (analytics) {
    try {
      logEvent(analytics, 'analytics_diagnostic', {
        status: 'initialized',
        environment: process.env.NODE_ENV,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error enviando diagnóstico:', error);
    }
  }
  
  return status;
};
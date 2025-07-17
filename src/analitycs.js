// src/analytics.js - Servicio centralizado de analytics
import { logEvent, setUserProperties } from "firebase/analytics";
import { analytics } from './firebase';

// Función para trackear vistas de página
export const trackPageView = (pageName, pageTitle = null) => {
  if (!analytics) return;
  
  logEvent(analytics, 'page_view', {
    page_title: pageTitle || pageName,
    page_location: window.location.href,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString()
  });
};

// Función para trackear clics en botones/enlaces
export const trackButtonClick = (buttonName, section = null, additionalData = {}) => {
  if (!analytics) return;
  
  logEvent(analytics, 'select_content', {
    content_type: 'button',
    item_id: buttonName,
    section: section,
    timestamp: new Date().toISOString(),
    ...additionalData
  });
};

// Función para trackear scroll en la página
export const trackScroll = (percentage) => {
  if (!analytics) return;
  
  logEvent(analytics, 'scroll', {
    percent_scrolled: percentage,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString()
  });
};

// Función para trackear tiempo en página
export const trackTimeOnPage = (seconds, pageName) => {
  if (!analytics) return;
  
  logEvent(analytics, 'timing_complete', {
    name: 'page_view_time',
    value: seconds,
    page: pageName,
    engagement_level: seconds > 60 ? 'high' : seconds > 30 ? 'medium' : 'low',
    timestamp: new Date().toISOString()
  });
};

// Función para trackear interacciones con secciones
export const trackSectionView = (sectionName) => {
  if (!analytics) return;
  
  logEvent(analytics, 'section_view', {
    section_name: sectionName,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString()
  });
};

// Función para trackear errores
export const trackError = (errorType, errorMessage, location) => {
  if (!analytics) return;
  
  logEvent(analytics, 'exception', {
    description: errorMessage,
    fatal: false,
    error_type: errorType,
    location: location,
    timestamp: new Date().toISOString()
  });
};

// Función para trackear engagement
export const trackEngagement = (engagementType, value = null) => {
  if (!analytics) return;
  
  logEvent(analytics, 'user_engagement', {
    engagement_type: engagementType,
    value: value,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString()
  });
};

// Función para trackear conversiones
export const trackConversion = (conversionType, value = null) => {
  if (!analytics) return;
  
  logEvent(analytics, 'conversion', {
    currency: 'COP',
    value: value,
    conversion_type: conversionType,
    timestamp: new Date().toISOString()
  });
};

// Función para trackear outbound links
export const trackOutboundLink = (url, linkText) => {
  if (!analytics) return;
  
  logEvent(analytics, 'click', {
    link_domain: new URL(url).hostname,
    link_url: url,
    link_text: linkText,
    outbound: true,
    timestamp: new Date().toISOString()
  });
};

// Función para trackear downloads
export const trackDownload = (fileName, fileType) => {
  if (!analytics) return;
  
  logEvent(analytics, 'file_download', {
    file_name: fileName,
    file_extension: fileType,
    link_url: window.location.href,
    timestamp: new Date().toISOString()
  });
};

// Función para establecer propiedades del usuario (sin datos personales)
export const setUserAnalyticsProperties = (properties) => {
  if (!analytics) return;
  
  setUserProperties(analytics, {
    ...properties,
    last_updated: new Date().toISOString()
  });
};
// src/hooks/useAnalytics.js
import { useEffect, useRef, useCallback } from 'react';
import { 
  trackPageView, 
  trackScroll, 
  trackTimeOnPage, 
  trackSectionView,
  trackButtonClick,
  trackEngagement
} from '../analitycs';

export const usePageAnalytics = (pageName, pageTitle = null) => {
  const startTimeRef = useRef(null);
  const scrollTrackedRef = useRef(new Set());
  const lastScrollTime = useRef(0);
  const engagementTracked = useRef(false);

  useEffect(() => {
    // Trackear vista de página al cargar
    trackPageView(pageName, pageTitle);
    startTimeRef.current = Date.now();

    // Trackear tiempo en página al salir
    const handleBeforeUnload = () => {
      if (startTimeRef.current) {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
        trackTimeOnPage(timeSpent, pageName);
      }
    };

    // Trackear scroll con throttling
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return; // Throttle a 1 segundo
      lastScrollTime.current = now;

      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      // Trackear hitos de scroll (25%, 50%, 75%, 100%)
      [25, 50, 75, 100].forEach(milestone => {
        if (scrollPercent >= milestone && !scrollTrackedRef.current.has(milestone)) {
          scrollTrackedRef.current.add(milestone);
          trackScroll(milestone);
          
          // Trackear engagement alto si llega al 75%
          if (milestone >= 75 && !engagementTracked.current) {
            trackEngagement('high_scroll', milestone);
            engagementTracked.current = true;
          }
        }
      });
    };

    // Trackear mouse movement (engagement)
    let mouseMoveCount = 0;
    const handleMouseMove = () => {
      mouseMoveCount++;
      if (mouseMoveCount === 10) { // Después de 10 movimientos
        trackEngagement('mouse_activity', 'active');
      }
    };

    // Trackear clicks en la página
    const handleClick = (event) => {
      const target = event.target;
      const tagName = target.tagName.toLowerCase();
      
      if (['button', 'a', 'input'].includes(tagName)) {
        const elementText = target.textContent || target.value || target.alt || 'unknown';
        const elementClass = target.className || 'no-class';
        
        trackButtonClick(`${tagName}_click`, pageName, {
          element_text: elementText.substring(0, 50), // Limitar longitud
          element_class: elementClass,
          element_id: target.id || 'no-id'
        });
      }
    };

    // Trackear secciones visibles
    const observerOptions = {
      threshold: 0.5, // Cuando el 50% de la sección es visible
      rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section') || 
                             entry.target.id || 
                             entry.target.tagName.toLowerCase();
          trackSectionView(sectionName);
        }
      });
    }, observerOptions);

    // Observar todas las secciones
    const sections = document.querySelectorAll('section, [data-section]');
    sections.forEach(section => sectionObserver.observe(section));

    // Event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick, true);

    // Trackear engagement por tiempo
    const engagementTimer = setTimeout(() => {
      trackEngagement('time_on_page', '30_seconds');
    }, 30000); // 30 segundos

    const highEngagementTimer = setTimeout(() => {
      trackEngagement('time_on_page', '2_minutes');
    }, 120000); // 2 minutos

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      sectionObserver.disconnect();
      clearTimeout(engagementTimer);
      clearTimeout(highEngagementTimer);
      
      // Trackear tiempo final si el componente se desmonta
      if (startTimeRef.current) {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
        trackTimeOnPage(timeSpent, pageName);
      }
    };
  }, [pageName, pageTitle]);
};

// Hook para trackear clics específicos
export const useClickTracking = () => {
  const trackClick = useCallback((elementName, section = null, additionalData = {}) => {
    return (event) => {
      trackButtonClick(elementName, section, additionalData);
    };
  }, []);

  return { trackClick };
};

// Hook para trackear formularios
export const useFormTracking = (formName) => {
  const trackFormStart = useCallback(() => {
    trackEngagement('form_start', formName);
  }, [formName]);

  const trackFormComplete = useCallback(() => {
    trackEngagement('form_complete', formName);
  }, [formName]);

  const trackFormError = useCallback((errorType) => {
    trackEngagement('form_error', `${formName}_${errorType}`);
  }, [formName]);

  return {
    trackFormStart,
    trackFormComplete,
    trackFormError
  };
};
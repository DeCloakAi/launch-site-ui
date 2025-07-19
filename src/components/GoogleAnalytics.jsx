import { useEffect } from 'react';

const GoogleAnalytics = () => {
  useEffect(() => {
    // Google Analytics tracking ID (dummy for now)
    const GA_TRACKING_ID = 'G-XXXXXXXXXX';

    // Create script tag for gtag
    const script1 = document.createElement('script');
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    // Create script tag for gtag configuration
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_title: 'Decloak.ai - Privacy Protection Platform',
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'early_access_signup'
        }
      });
    `;
    document.head.appendChild(script2);

    // Track page view
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Decloak.ai Landing Page',
        page_location: window.location.href,
      });
    }

    // Cleanup function
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return null;
};

// Helper function to track events
export const trackEvent = (eventName, parameters = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'user_interaction',
      event_label: 'decloak_ai_landing',
      ...parameters
    });
  }
};

// Helper function to track early access signups
export const trackSignup = (email, status = 'submitted') => {
  if (window.gtag) {
    window.gtag('event', 'early_access_signup', {
      event_category: 'conversion',
      event_label: status,
      custom_parameter_1: 'early_access_signup',
      user_email: email // Note: Be careful with PII in production
    });
  }
};

export default GoogleAnalytics;
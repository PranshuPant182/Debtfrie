import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UTM_KEYS } from './utmUtils';

const UTMTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    UTM_KEYS.forEach(key => {
      const value = searchParams.get(key);
      if (value) {
        sessionStorage.setItem(key, value);
        localStorage.setItem(key, value);
      }
    });

    // Store the initial landing page URL (with all query parameters) if not already stored
    if (!sessionStorage.getItem('landing_page')) {
      sessionStorage.setItem('landing_page', window.location.href);
    }
  }, [location.search]);

  return null;
};

export default UTMTracker;

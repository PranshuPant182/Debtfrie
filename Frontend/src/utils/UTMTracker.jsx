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

    const currentUrl = window.location.href;
    const hasStoredLandingPage = sessionStorage.getItem('landing_page');
    const currentHasParams = location.search && location.search.length > 1;

    if (!hasStoredLandingPage || (currentHasParams && !hasStoredLandingPage.includes('?'))) {
      sessionStorage.setItem('landing_page', currentUrl);
      localStorage.setItem('landing_page', currentUrl);
    }
  }, [location.search, location.pathname]);

  return null;
};

export default UTMTracker;
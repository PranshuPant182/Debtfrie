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

    // Store the initial landing page URL (with all query parameters)
    const currentUrl = window.location.href;
    const hasStoredLandingPage = sessionStorage.getItem('landing_page');
    const currentHasParams = location.search && location.search.length > 1;

    // We store the landing page if:
    // 1. We don't have one yet.
    // 2. The current page has parameters and the stored one doesn't (marketing landing vs internal redirect).
    if (!hasStoredLandingPage || (currentHasParams && !hasStoredLandingPage.includes('?'))) {
      sessionStorage.setItem('landing_page', currentUrl);
      localStorage.setItem('landing_page', currentUrl); // Also store in localStorage for persistence across sessions if needed
    }
  }, [location.search, location.pathname]); // Also track pathname in case landing page changes without search change

  return null;
};

export default UTMTracker;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FacebookPixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default FacebookPixelTracker;
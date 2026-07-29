/**
 * Dynamically generates the canonical URL based on the current window origin (domain).
 * Defaults to 'https://debtfrie.in' during build/SSR time.
 * 
 * @param {string} path - The URL path (e.g. '/about-us')
 * @returns {string} The full canonical URL
 */
export const getCanonicalUrl = (path) => {
  let origin = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://debtfrie.in';
  
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    origin = 'https://debtfrie.in';
  }
  
  const cleanPath = path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`);
  return `${origin}${cleanPath}`;
};

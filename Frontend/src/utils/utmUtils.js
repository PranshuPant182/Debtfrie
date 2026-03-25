export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_keyword',
  'utm_adgroup',
  'utm_adset',
  'utm_campaign_id',
  'utm_ad_id',
  'utm_device'
];

export const getUTMParams = () => {
  const params = {};
  UTM_KEYS.forEach(key => {
    const value = sessionStorage.getItem(key) || localStorage.getItem(key);
    if (value) params[key] = value;
  });

  // Get the landing page URL stored on first arrival
  const landingPage = sessionStorage.getItem('landing_page');
  if (landingPage) {
    params.landing_page = landingPage;
  }

  return params;
};

/**
 * Utility to create a lead in Odoo CRM using JSON-RPC
 */

const ODOO_CONFIG = {
  url: 'https://debtfrie1.odoo.com/jsonrpc',
  db: 'debtfrie1',
  uid: 2,
  password: '97fa39c7320d0fe2251bc1c80539d8e45a8e9a1a',
};

/**
 * Creates a lead in Odoo CRM
 * @param {Object} formData Form data from the UI
 * @param {Object} utmParams UTM parameters from storage
 * @returns {Promise<Object>} API response
 */
export const createOdooLead = async (formData, utmParams = {}) => {
  const leadData = {
    name: formData.fullName || 'New Lead',
    email_from: formData.email,
    phone: formData.phone,
    city: formData.city || '',
    x_Monthly_Income: formData.monthlyIncome || '',
    x_outstanding_creditCards_due: formData.creditCardDues || '',
    x_outstanding_personal_loan_dues: formData.loanDues || '',
    x_emi_bounce_status: formData.emiBounce || '',
    description: formData.additionalInfo || '',
    type: 'lead',
    x_landing_page_url: window.location.href,
    // UTM Parameters mapping
    x_utm_source: utmParams.utm_source || '',
    x_utm_medium: utmParams.utm_medium || '',
    x_utm_campaign: utmParams.utm_campaign || '',
    x_utm_term: utmParams.utm_term || '',
    x_utm_content: utmParams.utm_content || '',
    x_utm_keyword: utmParams.utm_keyword || '',
    x_utm_adgroup: utmParams.utm_adgroup || '',
    x_utm_adset: utmParams.utm_adset || '',
    x_utm_campaign_id: utmParams.utm_campaign_id || '',
    x_utm_ad_id: utmParams.utm_ad_id || '',
    x_utm_device: utmParams.utm_device || '',
  };

  const payload = {
    jsonrpc: '2.0',
    method: 'call',
    id: Math.floor(Math.random() * 1000),
    params: {
      service: 'object',
      method: 'execute_kw',
      args: [
        ODOO_CONFIG.db,
        ODOO_CONFIG.uid,
        ODOO_CONFIG.password,
        'crm.lead',
        'create',
        [[leadData]],
      ],
    },
  };

  try {
    const response = await fetch(ODOO_CONFIG.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Odoo API Result:', result);
    return result;
  } catch (error) {
    console.error('Error calling Odoo API:', error);
    // We don't want to block the user experience if Odoo fails
    // (e.g. CORS or network issues)
    return { error: error.message };
  }
};

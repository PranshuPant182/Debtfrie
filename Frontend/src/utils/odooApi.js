/**
 * Utility to create a lead in Odoo CRM by calling our own backend
 */

const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
};

/**
 * Creates a lead in Odoo CRM via Backend
 * @param {Object} formData Form data from the UI
 * @param {Object} utmParams UTM parameters from storage
 * @returns {Promise<Object>} API response
 */
export const createOdooLead = async (formData, utmParams = {}) => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/odoo/create-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData,
        utmParams,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error calling Backend Odoo API:', error);
    throw error;
  }
};

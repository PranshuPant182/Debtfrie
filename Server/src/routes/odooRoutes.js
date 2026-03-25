const express = require('express');
const router = express.Router();
const axios = require('axios');

console.log("--- odooRoutes.js Module Loaded ---");
console.log("Initial process.env.ODOO_URL check:", process.env.ODOO_URL ? "Defined" : "UNDEFINED");

/**
 * Creates a lead in Odoo CRM
 */
router.post('/create-lead', async (req, res) => {
    // Read config inside the handler to ensure environment variables are loaded
    const ODOO_CONFIG = {
        url: process.env.ODOO_URL,
        db: process.env.ODOO_DB,
        uid: parseInt(process.env.ODOO_UID),
        password: process.env.ODOO_PASSWORD,
    };

    const { formData, utmParams = {} } = req.body;

    if (!formData) {
        return res.status(400).json({ success: false, error: 'Form data is required.' });
    }

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
        x_landing_page_url: utmParams.landing_page || req.headers.referer || '', // Prioritize landing_page from frontend
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
        console.log("--- ODOO API CALL START ---");
        console.log("ODOO URL:", ODOO_CONFIG.url);
        console.log("ODOO DB:", ODOO_CONFIG.db);
        console.log("ODOO UID:", ODOO_CONFIG.uid);
        // Do not log password for security, but maybe confirm it's present
        console.log("ODOO Password Present:", !!ODOO_CONFIG.password);

        console.log("Request Payload:", JSON.stringify(payload, null, 2));

        const response = await axios.post(ODOO_CONFIG.url, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Odoo Response Status:", response.status);

        if (response.data.error) {
            console.error('Odoo API Internal Error:', JSON.stringify(response.data.error, null, 2));
            return res.status(500).json({
                success: false,
                error: response.data.error.data?.message || response.data.error.message || 'Odoo API Error',
            });
        }

        console.log("Odoo Result:", response.data.result);
        console.log("--- ODOO API CALL END ---");

        res.json({
            success: true,
            result: response.data.result,
        });
    } catch (error) {
        console.error('--- ODOO API CALL FAILED ---');
        console.error('Error Message:', error.message);
        if (error.response) {
            console.error('Error Response Data:', JSON.stringify(error.response.data, null, 2));
            console.error('Error Response Status:', error.response.status);
        }
        res.status(500).json({
            success: false,
            error: 'Internal Server Error while communicating with Odoo',
        });
    }
});

module.exports = router;

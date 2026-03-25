const express = require('express');
const router = express.Router();
const axios = require('axios');

const ODOO_CONFIG = {
    url: process.env.ODOO_URL,
    db: process.env.ODOO_DB,
    uid: parseInt(process.env.ODOO_UID),
    password: process.env.ODOO_PASSWORD,
};

/**
 * Creates a lead in Odoo CRM
 */
router.post('/create-lead', async (req, res) => {
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
        x_landing_page_url: req.headers.referer || '', // Using referer since window.location is not available here
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
        const response = await axios.post(ODOO_CONFIG.url, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("ODOO URL:", ODOO_CONFIG.url);

        if (response.data.error) {
            console.error('Odoo API Error:', response.data.error);
            return res.status(500).json({
                success: false,
                error: response.data.error.data?.message || response.data.error.message || 'Odoo API Error',
            });
        }

        res.json({
            success: true,
            result: response.data.result,
        });
    } catch (error) {
        console.error('Backend error calling Odoo API:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error while communicating with Odoo',
        });
    }
});

module.exports = router;

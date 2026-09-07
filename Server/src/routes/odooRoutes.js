const express = require('express');
const router = express.Router();
const axios = require('axios');
const Lead = require('../models/Lead');

/**
 * Creates a lead in MongoDB and syncs to Odoo CRM
 */
router.post('/create-lead', async (req, res) => {
    const { formData, utmParams = {} } = req.body;

    if (!formData) {
        return res.status(400).json({ success: false, error: 'Form data is required.' });
    }

    // 1. Save lead to MongoDB first
    let savedLead;
    try {
        savedLead = new Lead({
            fullName: formData.fullName || 'New Lead',
            email: formData.email || '',
            phone: formData.phone || '',
            city: formData.city || '',
            monthlyIncome: formData.monthlyIncome || '',
            creditCardDues: formData.creditCardDues || '',
            loanDues: formData.loanDues || '',
            emiBounce: formData.emiBounce || '',
            additionalInfo: formData.additionalInfo || '',
            utmParams: {
                landing_page: utmParams.landing_page || req.headers.referer || '',
                utm_source: utmParams.utm_source || '',
                utm_medium: utmParams.utm_medium || '',
                utm_campaign: utmParams.utm_campaign || '',
                utm_term: utmParams.utm_term || '',
                utm_content: utmParams.utm_content || '',
                utm_keyword: utmParams.utm_keyword || '',
                utm_adgroup: utmParams.utm_adgroup || '',
                utm_adset: utmParams.utm_adset || '',
                utm_campaign_id: utmParams.utm_campaign_id || '',
                utm_ad_id: utmParams.utm_ad_id || '',
                utm_device: utmParams.utm_device || '',
            },
            odooStatus: 'pending',
        });
        await savedLead.save();
    } catch (dbError) {
        console.error('Failed to save Lead to database:', dbError.message);
        return res.status(500).json({
            success: false,
            error: 'Failed to save lead in database.',
            details: dbError.message,
        });
    }

    // 2. Read config inside handler to ensure environment variables are loaded
    const ODOO_CONFIG = {
        url: process.env.ODOO_URL,
        db: process.env.ODOO_DB,
        uid: parseInt(process.env.ODOO_UID),
        password: process.env.ODOO_PASSWORD,
    };

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
        x_landing_page_url: utmParams.landing_page || req.headers.referer || '',
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

    console.log("---- leadData ----", leadData);

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

    // 3. Send to Odoo CRM & update DB status
    try {
        const response = await axios.post(ODOO_CONFIG.url, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.error) {
            const errorMsg = response.data.error.data?.message || response.data.error.message || 'Odoo API Error';
            console.error('Odoo API Internal Error:', JSON.stringify(response.data.error, null, 2));

            await Lead.findByIdAndUpdate(savedLead._id, {
                odooStatus: 'failed',
                odooError: errorMsg,
            });

            return res.status(500).json({
                success: false,
                leadId: savedLead._id,
                error: errorMsg,
            });
        }

        const odooResult = response.data.result;
        await Lead.findByIdAndUpdate(savedLead._id, {
            odooStatus: 'success',
            odooLeadId: Array.isArray(odooResult) ? odooResult[0] : odooResult,
        });

        res.json({
            success: true,
            leadId: savedLead._id,
            result: odooResult,
        });
    } catch (error) {
        console.error('--- ODOO API CALL FAILED ---');
        console.error('Error Message:', error.message);
        if (error.response) {
            console.error('Error Response Data:', JSON.stringify(error.response.data, null, 2));
            console.error('Error Response Status:', error.response.status);
        }

        await Lead.findByIdAndUpdate(savedLead._id, {
            odooStatus: 'failed',
            odooError: error.message,
        });

        res.status(500).json({
            success: false,
            leadId: savedLead._id,
            error: 'Internal Server Error while communicating with Odoo',
        });
    }
});

// GET API to fetch all leads saved in database
router.get('/leads', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;

        let query = {};
        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { city: { $regex: search, $options: 'i' } },
            ];
        }

        const leads = await Lead.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const total = await Lead.countDocuments(query);

        res.json({
            success: true,
            data: leads,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;


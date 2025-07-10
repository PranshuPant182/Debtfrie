// server/routes/webhooks.js
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.post('/razorpay', async (req, res) => {
    const webhookSecret = 'Testing_2025_Debtfrie';
    const signature = req.headers['x-razorpay-signature'];
    
    console.log('🔥 Webhook received');
    console.log('Signature:', signature);
    console.log('Body type:', typeof req.body);
    
    try {
        // Handle the raw body correctly
        let body;
        if (Buffer.isBuffer(req.body)) {
            body = req.body.toString();
        } else if (typeof req.body === 'string') {
            body = req.body;
        } else {
            // If it's already parsed as JSON, convert back to string
            body = JSON.stringify(req.body);
        }
        
        console.log('Body for verification:', body.substring(0, 100) + '...');
        
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(body)
            .digest('hex');
            
        console.log('Expected:', expectedSignature);
        console.log('Received:', signature);
        
        if (signature === expectedSignature) {
            console.log('✅ Signature verified!');
            
            // Parse the webhook data
            const webhookData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const event = webhookData.event;
            const payment = webhookData.payload.payment.entity;
            
            console.log('Event:', event);
            console.log('Payment ID:', payment.id);
            
            if (event === 'payment.captured') {
                console.log('✅ Payment captured:', payment.id);
                console.log('Order ID:', payment.order_id);
                console.log('Amount:', payment.amount);
            }
            
            if (event === 'payment.failed') {
                console.log('❌ Payment failed:', payment.id);
            }
            
            res.status(200).json({ received: true });
        } else {
            console.log('❌ Signature mismatch');
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

module.exports = router;

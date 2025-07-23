// server/routes/webhooks.js
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.post('/razorpay', async (req, res) => {
    const webhookSecret = "secret_2025_debtfrie_webhook_";
    const signature = req.headers['x-razorpay-signature'];
    
    try {
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(JSON.stringify(req.body))
            .digest('hex');

        if (signature === expectedSignature) {
            const event = req.body.event;
            const payment = req.body.payload.payment.entity;
            
            console.log('Webhook received:', event, payment.id);
            
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
            console.log('❌ Invalid webhook signature');
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

module.exports = router;
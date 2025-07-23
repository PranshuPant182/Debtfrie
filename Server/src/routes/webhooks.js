// server/routes/webhooks.js
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.get('/generate-signature', (req, res) => {
    const testBody = JSON.stringify({
        "event": "payment.captured",
        "payload": {
            "payment": {
                "entity": {
                    "id": "pay_test123",
                    "order_id": "order_test456",
                    "amount": 50000
                }
            }
        }
    });

    const signature = crypto
        .createHmac('sha256', 'secret_2025_debtfrie_webhook_')
        .update(testBody)
        .digest('hex');

    res.json({
        signature: signature,
        body: testBody
    });
});

router.post('/razorpay', async (req, res) => {
    // Get the real secret from Razorpay dashboard
    const webhookSecret = "secret_2025_debtfrie_webhook_"; // Replace with real secret
    const signature = req.headers['x-razorpay-signature'];

    try {
        const body = req.body.toString();

        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(body)
            .digest('hex');

        if (signature === expectedSignature) {
            const payload = JSON.parse(body);
            const event = payload.event;
            const payment = payload.payload.payment.entity;

            console.log('Webhook received:', event, payment.id);

            if (event === 'payment.captured') {
                console.log('✅ Payment captured:', payment.id);
                console.log('Order ID:', payment.order_id);
                console.log('Amount:', payment.amount);

                // TODO: Update your database here
                // - Mark order as paid
                // - Send confirmation email
                // - Update user account, etc.
            }

            if (event === 'payment.failed') {
                console.log('❌ Payment failed:', payment.id);
                // TODO: Handle failed payment
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
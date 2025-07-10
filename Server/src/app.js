// server/routes/webhooks.js
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// GET route for testing
router.get('/razorpay', (req, res) => {
    res.json({ 
        message: "Razorpay webhook endpoint is active",
        method: "This endpoint expects POST requests from Razorpay",
        status: "ready"
    });
});

// POST webhook with proper signature verification
router.post('/razorpay', async (req, res) => {
    console.log('🔥 Webhook received');
    
    const webhookSecret = 'Testing_2025_Debtfrie;
    const signature = req.headers['x-razorpay-signature'];
    
    console.log('Secret exists:', !!webhookSecret);
    console.log('Signature received:', signature);
    
    try {
        if (!webhookSecret) {
            console.log('❌ No webhook secret configured');
            return res.status(500).json({ error: 'Webhook secret not configured' });
        }
        
        if (!signature) {
            console.log('❌ No signature in headers');
            return res.status(400).json({ error: 'No signature provided' });
        }
        
        // Get the raw body - this is crucial for signature verification
        let body;
        if (req.rawBody) {
            body = req.rawBody;
        } else if (Buffer.isBuffer(req.body)) {
            body = req.body.toString();
        } else {
            body = JSON.stringify(req.body);
        }
        
        console.log('Body for verification:', body.substring(0, 200) + '...');
        
        // Create expected signature
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(body)
            .digest('hex');
            
        console.log('Expected signature:', expectedSignature);
        console.log('Received signature:', signature);
        console.log('Signatures match:', signature === expectedSignature);

        if (signature === expectedSignature) {
            console.log('✅ Signature verified successfully');
            
            // Parse the webhook data
            const webhookData = JSON.parse(body);
            const event = webhookData.event;
            
            console.log('Event type:', event);
            
            if (webhookData.payload && webhookData.payload.payment) {
                const payment = webhookData.payload.payment.entity;
                console.log('Payment ID:', payment.id);
                console.log('Payment Status:', payment.status);
                console.log('Order ID:', payment.order_id);
                console.log('Amount:', payment.amount);
                
                if (event === 'payment.captured') {
                    console.log('✅ Payment successfully captured!');
                    // TODO: Update your database here
                    // Example: await updatePaymentStatus(payment.order_id, 'success');
                }
                
                if (event === 'payment.failed') {
                    console.log('❌ Payment failed');
                    // TODO: Update your database here
                    // Example: await updatePaymentStatus(payment.order_id, 'failed');
                }
            }
            
            // Always respond with 200 to acknowledge receipt
            res.status(200).json({ 
                received: true,
                event: event,
                timestamp: new Date().toISOString()
            });
            
        } else {
            console.log('❌ Signature verification failed');
            res.status(400).json({ error: 'Invalid signature' });
        }
        
    } catch (error) {
        console.error('❌ Webhook processing error:', error.message);
        console.error('Full error:', error);
        res.status(500).json({ 
            error: 'Webhook processing failed',
            details: error.message 
        });
    }
});

module.exports = router;

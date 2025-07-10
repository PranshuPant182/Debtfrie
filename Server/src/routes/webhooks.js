// server/routes/webhooks.js
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.post('/razorpay', async (req, res) => {
    console.log('=== WEBHOOK DEBUG START ===');
    
    const webhookSecret = 'secret_2025_debtfrie_webhook_';
    const signature = req.headers['x-razorpay-signature'];
    const isFromPostman = req.headers['user-agent']?.includes('Postman');
    
    console.log('1. Headers:', JSON.stringify(req.headers, null, 2));
    console.log('2. Body type:', typeof req.body);
    console.log('3. Is from Postman:', isFromPostman);
    console.log('4. Signature:', signature);
    
    try {
        // Handle Postman testing (no signature verification)
        if (isFromPostman && !signature) {
            console.log('🧪 POSTMAN TEST MODE - Skipping signature verification');
            
            let bodyString = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : JSON.stringify(req.body);
            const webhookData = JSON.parse(bodyString);
            
            console.log('✅ Test webhook data received:', JSON.stringify(webhookData, null, 2));
            
            return res.status(200).json({ 
                received: true,
                test_mode: true,
                message: 'Webhook endpoint working - test successful'
            });
        }
        
        // Handle real Razorpay webhooks (with signature verification)
        if (!signature) {
            console.log('❌ No signature found - not from Razorpay');
            return res.status(400).json({ error: 'No signature - not a valid Razorpay webhook' });
        }
        
        // Process real webhook
        let bodyString = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : JSON.stringify(req.body);
        
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(bodyString, 'utf8')
            .digest('hex');
            
        console.log('5. Expected signature:', expectedSignature);
        console.log('6. Received signature:', signature);
        
        if (signature === expectedSignature) {
            console.log('✅ SIGNATURE VERIFIED!');
            
            const webhookData = JSON.parse(bodyString);
            const event = webhookData.event;
            
            if (webhookData.payload && webhookData.payload.payment) {
                const payment = webhookData.payload.payment.entity;
                console.log('🎉 Payment event:', event);
                console.log('💰 Payment ID:', payment.id);
                console.log('📝 Order ID:', payment.order_id);
                console.log('💵 Amount:', payment.amount);
                
                if (event === 'payment.captured') {
                    console.log('🎉 PAYMENT SUCCESS!');
                    // TODO: Update your database here
                }
            }
            
            res.status(200).json({ 
                received: true,
                event: event,
                signature_verified: true
            });
            
        } else {
            console.log('❌ SIGNATURE MISMATCH');
            res.status(400).json({ error: 'Invalid signature' });
        }
        
    } catch (error) {
        console.error('❌ WEBHOOK ERROR:', error.message);
        res.status(500).json({ 
            error: 'Webhook processing failed',
            details: error.message
        });
    }
    
    console.log('=== WEBHOOK DEBUG END ===');
});

module.exports = router;

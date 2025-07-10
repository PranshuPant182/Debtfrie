// server/routes/webhooks.js
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.post('/razorpay', async (req, res) => {
    console.log('=== WEBHOOK DEBUG START ===');
    
    const webhookSecret = 'Testing_2025_Debtfrie';
    const signature = req.headers['x-razorpay-signature'];
    
    // Log everything for debugging
    console.log('1. Headers:', JSON.stringify(req.headers, null, 2));
    console.log('2. Body type:', typeof req.body);
    console.log('3. Body constructor:', req.body.constructor.name);
    console.log('4. Body length:', req.body.length || 'no length');
    console.log('5. Signature:', signature);
    console.log('6. Secret:', webhookSecret);
    
    try {
        if (!signature) {
            console.log('❌ No signature found');
            return res.status(400).json({ error: 'No signature' });
        }
        
        // Handle different body types
        let bodyString;
        if (Buffer.isBuffer(req.body)) {
            bodyString = req.body.toString('utf8');
            console.log('7a. Body is Buffer, converted to string');
        } else if (typeof req.body === 'string') {
            bodyString = req.body;
            console.log('7b. Body is already string');
        } else if (typeof req.body === 'object') {
            bodyString = JSON.stringify(req.body);
            console.log('7c. Body is object, stringified');
        } else {
            bodyString = String(req.body);
            console.log('7d. Body converted with String()');
        }
        
        console.log('8. Final body string (first 200 chars):', bodyString.substring(0, 200));
        console.log('9. Body string length:', bodyString.length);
        
        // Create signature
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(bodyString, 'utf8')
            .digest('hex');
            
        console.log('10. Expected signature:', expectedSignature);
        console.log('11. Received signature:', signature);
        console.log('12. Signatures match:', signature === expectedSignature);
        
        if (signature === expectedSignature) {
            console.log('✅ SIGNATURE VERIFIED!');
            
            // Parse JSON
            const webhookData = JSON.parse(bodyString);
            console.log('13. Parsed webhook data:', JSON.stringify(webhookData, null, 2));
            
            const event = webhookData.event;
            console.log('14. Event:', event);
            
            if (webhookData.payload && webhookData.payload.payment) {
                const payment = webhookData.payload.payment.entity;
                console.log('15. Payment:', JSON.stringify(payment, null, 2));
                
                if (event === 'payment.captured') {
                    console.log('🎉 PAYMENT CAPTURED SUCCESS!');
                }
            }
            
            res.status(200).json({ 
                received: true,
                event: event,
                debug: 'signature_verified'
            });
            
        } else {
            console.log('❌ SIGNATURE MISMATCH');
            return res.status(400).json({ 
                error: 'Invalid signature',
                expected: expectedSignature,
                received: signature
            });
        }
        
    } catch (error) {
        console.error('❌ WEBHOOK ERROR:', error.message);
        console.error('❌ ERROR STACK:', error.stack);
        console.error('❌ ERROR DETAILS:', error);
        
        res.status(500).json({ 
            error: 'Webhook processing failed',
            details: error.message,
            stack: error.stack
        });
    }
    
    console.log('=== WEBHOOK DEBUG END ===');
});

module.exports = router;

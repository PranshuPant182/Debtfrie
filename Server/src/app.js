router.post('/razorpay', async (req, res) => {
    const webhookSecret = 'Testing_2025_Debtfrie';
    const signature = req.headers['x-razorpay-signature'];
    
    const rawBody = req.rawBody; // ✅ use raw body
    console.log('🔥 Webhook received');
    console.log('Signature:', signature);
    console.log('Raw Body:', rawBody.substring(0, 100) + '...');

    try {
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(rawBody)
            .digest('hex');

        console.log('Expected:', expectedSignature);
        console.log('Received:', signature);

        if (signature === expectedSignature) {
            console.log('✅ Signature verified!');
            const webhookData = JSON.parse(rawBody); // safe to parse now

            const event = webhookData.event;
            const payment = webhookData.payload.payment.entity;

            if (event === 'payment.captured') {
                console.log('✅ Payment captured:', payment.id);
            } else if (event === 'payment.failed') {
                console.log('❌ Payment failed:', payment.id);
            }

            res.status(200).json({ received: true });
        } else {
            console.log('❌ Signature mismatch');
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (err) {
        console.error('Webhook error:', err);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

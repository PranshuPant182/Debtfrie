// server/routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order endpoint
router.post('/create-order', async (req, res) => {
    const options = {
        amount: 100, // 49 INR in paisa
        currency: 'INR',
        receipt: 'receipt_order_' + new Date().getTime(),
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Payment verification endpoint
router.post('/verify-payment', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        // Verify signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment verified successfully
            res.json({ 
                success: true, 
                message: "Payment verified successfully",
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id
            });
        } else {
            res.status(400).json({ 
                success: false, 
                message: "Payment verification failed" 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Check payment status endpoint (for polling)
router.get('/payment-status/:paymentId', async (req, res) => {
    const { paymentId } = req.params;

    try {
        const payment = await razorpay.payments.fetch(paymentId);
        res.json({ 
            success: true, 
            status: payment.status,
            payment: payment
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Add this to check order status
router.get('/order-status/:orderId', async (req, res) => {
    const { orderId } = req.params;
    
    try {
        const order = await razorpay.orders.fetch(orderId);
        const payments = await razorpay.orders.fetchPayments(orderId);
        
        res.json({
            success: true,
            order_status: order.status,
            payments: payments.items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
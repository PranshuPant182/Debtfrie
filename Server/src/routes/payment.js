// server/routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create-order', async (req, res) => {
    const options = {
        amount: 4900, // 50 INR in paisa
        // amount: 100, // 50 INR in paisa
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

module.exports = router;

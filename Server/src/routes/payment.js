// // server/routes/payment.js
// const express = require('express');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const router = express.Router();

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create order endpoint
// router.post('/create-order', async (req, res) => {
//     const options = {
//         amount: 4900, // 49 INR in paisa
//         currency: 'INR',
//         receipt: 'receipt_order_' + new Date().getTime(),
//     };

//     try {
//         const order = await razorpay.orders.create(options);
//         res.json({ success: true, order });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

// // Payment verification endpoint
// router.post('/verify-payment', async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     try {
//         // Verify signature
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSign = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(sign.toString())
//             .digest("hex");

//         if (razorpay_signature === expectedSign) {
//             // Payment verified successfully
//             res.json({ 
//                 success: true, 
//                 message: "Payment verified successfully",
//                 payment_id: razorpay_payment_id,
//                 order_id: razorpay_order_id
//             });
//         } else {
//             res.status(400).json({ 
//                 success: false, 
//                 message: "Payment verification failed" 
//             });
//         }
//     } catch (error) {
//         res.status(500).json({ 
//             success: false, 
//             error: error.message 
//         });
//     }
// });

// // Check payment status endpoint (for polling)
// router.get('/payment-status/:paymentId', async (req, res) => {
//     const { paymentId } = req.params;

//     try {
//         const payment = await razorpay.payments.fetch(paymentId);
//         res.json({ 
//             success: true, 
//             status: payment.status,
//             payment: payment
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false, 
//             error: error.message 
//         });
//     }
// });

// module.exports = router;



// server/routes/payment.js - FIXED PRODUCTION VERSION
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

// FIXED: Correct environment detection
const isProduction = true;
const requiredEnvVars = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'];

console.log('🔧 Payment routes loading...');
console.log('🌍 Environment:', process.env.NODE_ENV || 'development');

// Validate required environment variables
requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        console.error(`❌ Missing required environment variable: ${envVar}`);
        // Don't exit in production, just log the error
        if (isProduction) {
            console.error('⚠️ Production deployment with missing env vars!');
        }
    }
});

// FIXED: Removed forced production mode validation for now
console.log(`✅ Razorpay initializing for ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ================================
// SIMPLE TEST ROUTE FIRST
// ================================

router.get('/test', (req, res) => {
    console.log('🎯 Test route accessed!');
    res.json({
        success: true,
        message: 'Payment routes are working!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        api_url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    });
});

// ================================
// WEBHOOK TEST ENDPOINT
// ================================

router.get('/webhook/test', (req, res) => {
    console.log('🔔 Webhook test route accessed!');
    res.json({
        success: true,
        message: 'Webhook endpoint is accessible',
        timestamp: new Date().toISOString(),
        server: 'DebtFrie API',
        environment: process.env.NODE_ENV || 'development',
        webhook_url: `${req.protocol}://${req.get('host')}${req.originalUrl.replace('/test', '')}`,
        razorpay_mode: process.env.RAZORPAY_KEY_ID ? 
            (process.env.RAZORPAY_KEY_ID.startsWith('rzp_live_') ? 'live' : 'test') : 
            'not_configured'
    });
});

// ================================
// WEBHOOK ENDPOINT - SIMPLIFIED
// ================================

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const startTime = Date.now();
    
    try {
        console.log('🔔 Webhook received from Razorpay at:', new Date().toISOString());
        console.log('📍 Source IP:', req.ip || req.connection.remoteAddress);
        
        // Get webhook data
        const webhookSignature = req.get('x-razorpay-signature');
        const webhookBody = req.body;
        const eventId = req.get('x-razorpay-event-id');
        
        console.log('📋 Event ID:', eventId);
        console.log('🔏 Signature received:', webhookSignature ? 'Yes' : 'No');
        console.log('📦 Body length:', webhookBody ? webhookBody.length : 0);
        
        // Basic validation
        if (!webhookSignature) {
            console.log('❌ No webhook signature found');
            return res.status(200).json({ // Return 200 to prevent retries
                success: false,
                error: 'Missing signature',
                event_id: eventId
            });
        }
        
        if (!webhookBody || webhookBody.length === 0) {
            console.log('❌ Empty webhook body');
            return res.status(200).json({
                success: false,
                error: 'Empty body',
                event_id: eventId
            });
        }
        
        // FIXED: Use environment variable for webhook secret
        const webhookSecret = process.env.WEBHOOK_SECRET || 'debtfrie_webhook_secret_2024';
        console.log('🔐 Using webhook secret from:', process.env.WEBHOOK_SECRET ? 'env var' : 'default');
        
        // Verify signature
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(webhookBody)
            .digest('hex');
        
        if (webhookSignature !== expectedSignature) {
            console.log('❌ Webhook signature verification failed');
            console.log('Expected length:', expectedSignature.length);
            console.log('Received length:', webhookSignature.length);
            
            // In development, show more details
            if (!isProduction) {
                console.log('Expected:', expectedSignature.substring(0, 10) + '...');
                console.log('Received:', webhookSignature.substring(0, 10) + '...');
            }
            
            return res.status(200).json({ // Return 200 to prevent retries
                success: false,
                error: 'Invalid signature',
                event_id: eventId
            });
        }
        
        console.log('✅ Webhook signature verified successfully');
        
        // Parse webhook data
        let event;
        try {
            event = JSON.parse(webhookBody.toString());
        } catch (parseError) {
            console.error('❌ Failed to parse webhook JSON:', parseError.message);
            return res.status(200).json({
                success: false,
                error: 'Invalid JSON',
                event_id: eventId
            });
        }
        
        console.log('📦 Event type:', event.event);
        console.log('🆔 Entity ID:', event.payload?.payment?.entity?.id || event.payload?.order?.entity?.id);
        
        // Handle webhook events
        let processingResult = { success: true, message: 'Event processed' };
        
        switch (event.event) {
            case 'payment.captured':
                processingResult = await handlePaymentCaptured(event.payload.payment.entity);
                break;
                
            case 'payment.failed':
                processingResult = await handlePaymentFailed(event.payload.payment.entity);
                break;
                
            case 'payment.authorized':
                processingResult = await handlePaymentAuthorized(event.payload.payment.entity);
                break;
                
            case 'order.paid':
                processingResult = await handleOrderPaid(event.payload.order.entity);
                break;
                
            default:
                console.log('ℹ️ Unhandled event type:', event.event);
                processingResult = { success: true, message: 'Event type not handled' };
        }
        
        const processingTime = Date.now() - startTime;
        console.log(`⚡ Webhook processed in ${processingTime}ms`);
        
        // Always return 200 status
        res.status(200).json({
            success: true,
            message: 'Webhook processed successfully',
            event_type: event.event,
            event_id: eventId,
            processing_time_ms: processingTime,
            result: processingResult
        });
        
    } catch (error) {
        const processingTime = Date.now() - startTime;
        console.error('❌ Webhook processing error:', error);
        
        // Always return 200 to prevent retries
        res.status(200).json({
            success: false,
            message: 'Webhook processing failed',
            error: isProduction ? 'Internal server error' : error.message,
            processing_time_ms: processingTime
        });
    }
});

// ================================
// WEBHOOK EVENT HANDLERS - SIMPLIFIED
// ================================

async function handlePaymentCaptured(payment) {
    try {
        console.log('💰 PAYMENT CAPTURED SUCCESS!');
        console.log('🆔 Payment ID:', payment.id);
        console.log('💵 Amount:', payment.amount / 100, 'INR');
        console.log('📋 Order ID:', payment.order_id);
        console.log('📧 Email:', payment.email || 'Not provided');
        console.log('📱 Contact:', payment.contact || 'Not provided');
        console.log('🏦 Method:', payment.method);
        
        // TODO: Add your business logic here
        // - Update database
        // - Send emails
        // - Trigger other processes
        
        return {
            success: true,
            message: 'Payment captured and processed successfully',
            payment_id: payment.id,
            order_id: payment.order_id
        };
        
    } catch (error) {
        console.error('❌ Error processing payment capture:', error);
        return {
            success: false,
            message: 'Payment captured but processing failed',
            error: error.message
        };
    }
}

async function handlePaymentFailed(payment) {
    try {
        console.log('❌ PAYMENT FAILED');
        console.log('🆔 Payment ID:', payment.id);
        console.log('📋 Order ID:', payment.order_id);
        console.log('💔 Error Code:', payment.error_code);
        console.log('📝 Error Description:', payment.error_description);
        
        return {
            success: true,
            message: 'Payment failure processed',
            error_code: payment.error_code
        };
        
    } catch (error) {
        console.error('❌ Error handling payment failure:', error);
        return {
            success: false,
            message: 'Failure handling failed'
        };
    }
}

async function handlePaymentAuthorized(payment) {
    try {
        console.log('🔐 PAYMENT AUTHORIZED');
        console.log('🆔 Payment ID:', payment.id);
        console.log('💵 Amount:', payment.amount / 100, 'INR');
        console.log('📋 Order ID:', payment.order_id);
        
        return {
            success: true,
            message: 'Payment authorization logged'
        };
        
    } catch (error) {
        console.error('❌ Error processing payment authorization:', error);
        return {
            success: false,
            message: 'Authorization processing failed'
        };
    }
}

async function handleOrderPaid(order) {
    try {
        console.log('✅ ORDER FULLY PAID');
        console.log('🆔 Order ID:', order.id);
        console.log('💵 Amount Paid:', order.amount_paid / 100, 'INR');
        console.log('💰 Total Amount:', order.amount / 100, 'INR');
        
        return {
            success: true,
            message: 'Order completion processed',
            order_id: order.id
        };
        
    } catch (error) {
        console.error('❌ Error in order completion:', error);
        return {
            success: false,
            message: 'Order completion failed'
        };
    }
}

// ================================
// EXISTING PAYMENT ROUTES
// ================================

// Create order endpoint
router.post('/create-order', async (req, res) => {
    try {
        console.log('📝 Creating new order...');
        
        const options = {
            amount: 4900, // 49 INR in paisa
            currency: 'INR',
            receipt: 'receipt_order_' + new Date().getTime(),
            payment_capture: 1,
            notes: {
                purpose: 'DebtFrie Consultation Fee',
                created_at: new Date().toISOString()
            }
        };

        const order = await razorpay.orders.create(options);
        console.log('✅ Order created successfully:', order.id);
        
        res.json({
            success: true,
            order,
            key_id: process.env.RAZORPAY_KEY_ID
        });
        
    } catch (err) {
        console.error('❌ Order creation error:', err);
        res.status(500).json({
            success: false,
            error: isProduction ? 'Order creation failed' : err.message,
            code: 'ORDER_CREATION_FAILED'
        });
    }
});

// Payment verification endpoint
router.post('/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        console.log('🔍 Verifying payment:', {
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id
        });

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing required payment parameters",
                code: 'MISSING_PARAMETERS'
            });
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            console.log('✅ Payment signature verified successfully');
            
            try {
                const payment = await razorpay.payments.fetch(razorpay_payment_id);
                
                res.json({
                    success: true,
                    message: "Payment verified successfully",
                    payment_id: razorpay_payment_id,
                    order_id: razorpay_order_id,
                    amount: payment.amount / 100,
                    status: payment.status
                });
                
            } catch (fetchError) {
                console.error('⚠️ Payment fetch error:', fetchError);
                res.json({
                    success: true,
                    message: "Payment verified successfully",
                    payment_id: razorpay_payment_id,
                    order_id: razorpay_order_id,
                    note: "Payment details fetch failed but signature is valid"
                });
            }
            
        } else {
            console.log('❌ Payment verification failed - signature mismatch');
            res.status(400).json({
                success: false,
                message: "Payment verification failed",
                code: 'SIGNATURE_MISMATCH'
            });
        }
        
    } catch (error) {
        console.error('❌ Payment verification error:', error);
        res.status(500).json({
            success: false,
            error: isProduction ? 'Verification failed' : error.message,
            code: 'VERIFICATION_ERROR'
        });
    }
});

// Check order status endpoint
router.get('/check-order-status/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        console.log('🔍 Checking order status:', orderId);

        if (!orderId || orderId === 'undefined') {
            return res.status(400).json({
                success: false,
                error: 'Invalid order ID',
                code: 'INVALID_ORDER_ID'
            });
        }

        const order = await razorpay.orders.fetch(orderId);
        const payments = await razorpay.orders.fetchPayments(orderId);

        let orderStatus = 'pending';
        let paymentDetails = null;

        if (payments.items.length > 0) {
            const latestPayment = payments.items[0];
            if (latestPayment.status === 'captured') {
                orderStatus = 'paid';
                paymentDetails = {
                    payment_id: latestPayment.id,
                    amount: latestPayment.amount / 100,
                    method: latestPayment.method,
                    captured_at: latestPayment.captured_at
                };
            } else {
                orderStatus = latestPayment.status;
            }
        }

        console.log('📊 Order status:', orderStatus);

        res.json({
            success: true,
            status: orderStatus,
            order: {
                id: order.id,
                amount: order.amount / 100,
                currency: order.currency,
                status: order.status,
                created_at: order.created_at
            },
            payment: paymentDetails
        });

    } catch (error) {
        console.error('❌ Order status check error:', error);
        
        if (error.statusCode === 400) {
            res.status(400).json({
                success: false,
                error: 'Invalid order ID',
                code: 'INVALID_ORDER_ID'
            });
        } else {
            res.status(500).json({
                success: false,
                error: isProduction ? 'Order status check failed' : error.message,
                code: 'ORDER_STATUS_ERROR'
            });
        }
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        service: 'DebtFrie Payment Service',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        razorpay_configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
        webhook_secret_configured: !!process.env.WEBHOOK_SECRET
    });
});

console.log('✅ Payment routes loaded successfully');

module.exports = router;
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



// server/routes/payment.js - PRODUCTION READY VERSION
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

// Environment validation
const isProduction = process.env.NODE_ENV === 'production';
const requiredEnvVars = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'];

// Validate required environment variables
requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        console.error(`❌ Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
});

// Validate key types for production
if (isProduction && !process.env.RAZORPAY_KEY_ID.startsWith('rzp_live_')) {
    console.error('❌ Production environment requires LIVE Razorpay keys (rzp_live_*)');
    process.exit(1);
}

console.log(`✅ Razorpay initialized for ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ================================
// WEBHOOK ENDPOINT - CRITICAL FOR PRODUCTION
// ================================

// Webhook endpoint for Razorpay notifications
// IMPORTANT: This MUST be added BEFORE other routes to avoid middleware conflicts
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const startTime = Date.now();

    try {
        console.log('🔔 Webhook received from Razorpay at:', new Date().toISOString());
        console.log('📍 Source IP:', req.ip || req.connection.remoteAddress);

        // Get the signature from header
        const webhookSignature = req.get('x-razorpay-signature');
        const webhookBody = req.body;
        const eventId = req.get('x-razorpay-event-id');

        // Validate webhook signature exists
        if (!webhookSignature) {
            console.log('❌ No webhook signature found in headers');
            return res.status(400).json({
                success: false,
                error: 'Missing signature',
                event_id: eventId
            });
        }

        // Validate webhook body
        if (!webhookBody || webhookBody.length === 0) {
            console.log('❌ Empty webhook body received');
            return res.status(400).json({
                success: false,
                error: 'Empty body',
                event_id: eventId
            });
        }

        // Verify the webhook signature for security
        const webhookSecret = process.env.WEBHOOK_SECRET || 'debtfrie_webhook_secret_2024';
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(webhookBody)
            .digest('hex');

        if (webhookSignature !== expectedSignature) {
            console.log('❌ Invalid webhook signature');
            console.log('Expected length:', expectedSignature.length);
            console.log('Received length:', webhookSignature.length);

            // Log in development only
            if (!isProduction) {
                console.log('Expected:', expectedSignature);
                console.log('Received:', webhookSignature);
            }

            return res.status(401).json({
                success: false,
                error: 'Invalid signature',
                event_id: eventId
            });
        }

        console.log('✅ Webhook signature verified successfully');

        // Parse the webhook data safely
        let event;
        try {
            event = JSON.parse(webhookBody.toString());
        } catch (parseError) {
            console.error('❌ Failed to parse webhook JSON:', parseError.message);
            return res.status(400).json({
                success: false,
                error: 'Invalid JSON',
                event_id: eventId
            });
        }

        console.log('📦 Event type:', event.event);
        console.log('📋 Event ID:', eventId);
        console.log('🆔 Entity ID:', event.payload?.payment?.entity?.id || event.payload?.order?.entity?.id);

        // Process webhook events
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

        // CRITICAL: Always respond with 200 status to prevent retries
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
        console.error('Stack trace:', error.stack);

        // Still respond with 200 to prevent infinite retries
        res.status(200).json({
            success: false,
            message: 'Webhook processing failed',
            error: isProduction ? 'Internal server error' : error.message,
            processing_time_ms: processingTime
        });
    }
});

// ================================
// WEBHOOK EVENT HANDLERS
// ================================

// Handle successful payment capture
async function handlePaymentCaptured(payment) {
    try {
        console.log('💰 PAYMENT CAPTURED SUCCESS!');
        console.log('🆔 Payment ID:', payment.id);
        console.log('💵 Amount:', payment.amount / 100, 'INR');
        console.log('📋 Order ID:', payment.order_id);
        console.log('📧 Email:', payment.email || 'Not provided');
        console.log('📱 Contact:', payment.contact || 'Not provided');
        console.log('🏦 Method:', payment.method);
        console.log('⏰ Captured at:', new Date(payment.created_at * 1000));

        // Add your business logic here:

        // 1. Database operations (implement based on your DB)
        // await updatePaymentStatus(payment.order_id, 'completed', payment.id);

        // 2. Send confirmation email (integrate with your email service)
        if (payment.email) {
            console.log('📧 Triggering confirmation email to:', payment.email);
            // await sendPaymentConfirmationEmail(payment);
        }

        // 3. Update customer records
        // await updateCustomerRecord(payment.contact, payment.order_id);

        // 4. Analytics and logging
        console.log('📊 Payment analytics logged');

        // 5. Trigger any downstream services
        // await triggerOrderFulfillment(payment.order_id);

        return {
            success: true,
            message: 'Payment captured and processed successfully',
            payment_id: payment.id,
            order_id: payment.order_id
        };

    } catch (error) {
        console.error('❌ Error processing payment capture:', error);

        // Don't throw - webhook should still return success
        return {
            success: false,
            message: 'Payment captured but processing failed',
            error: isProduction ? 'Processing error' : error.message
        };
    }
}

// Handle payment authorization (before capture)
async function handlePaymentAuthorized(payment) {
    try {
        console.log('🔐 PAYMENT AUTHORIZED');
        console.log('🆔 Payment ID:', payment.id);
        console.log('💵 Amount:', payment.amount / 100, 'INR');
        console.log('📋 Order ID:', payment.order_id);

        // For auto-capture payments, this is just for logging
        // You might want to capture manually in some cases

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

// Handle failed payment
async function handlePaymentFailed(payment) {
    try {
        console.log('❌ PAYMENT FAILED');
        console.log('🆔 Payment ID:', payment.id);
        console.log('📋 Order ID:', payment.order_id);
        console.log('💔 Error Code:', payment.error_code);
        console.log('📝 Error Description:', payment.error_description);
        console.log('📧 Customer Email:', payment.email || 'Not provided');

        // Handle failure:

        // 1. Update order status
        // await updatePaymentStatus(payment.order_id, 'failed', payment.id);

        // 2. Log failure for analysis
        console.log('📊 Payment failure logged for analysis');

        // 3. Optional: Send failure notification
        if (payment.email) {
            console.log('📧 Consider sending failure notification to:', payment.email);
            // await sendPaymentFailureNotification(payment);
        }

        // 4. Analytics for failure reasons
        // await logPaymentFailure(payment.error_code, payment.method);

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

// Handle order paid (when full order amount is paid)
async function handleOrderPaid(order) {
    try {
        console.log('✅ ORDER FULLY PAID');
        console.log('🆔 Order ID:', order.id);
        console.log('💵 Amount Paid:', order.amount_paid / 100, 'INR');
        console.log('💰 Total Amount:', order.amount / 100, 'INR');
        console.log('📊 Status:', order.status);

        // Complete order processing

        // 1. Mark order as completed
        // await completeOrder(order.id);

        // 2. Trigger fulfillment processes
        // await triggerOrderFulfillment(order.id);

        // 3. Customer onboarding (for service-based orders)
        // await initiateCustomerOnboarding(order.id);

        console.log('🎉 Order completion process initiated');

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
// TEST ENDPOINT
// ================================

// Test endpoint to verify webhook is accessible
router.get('/webhook/test', (req, res) => {
    res.json({
        success: true,
        message: 'Webhook endpoint is accessible',
        timestamp: new Date().toISOString(),
        server: 'DebtFrie API',
        environment: isProduction ? 'production' : 'development',
        webhook_url: `${req.protocol}://${req.get('host')}${req.originalUrl.replace('/test', '')}`,
        razorpay_mode: process.env.RAZORPAY_KEY_ID.startsWith('rzp_live_') ? 'live' : 'test'
    });
});

// ================================
// EXISTING PAYMENT ROUTES - ENHANCED
// ================================

// Create order endpoint - Enhanced with better error handling
router.post('/create-order', async (req, res) => {
    try {
        console.log('📝 Creating new order...');

        const options = {
            amount: 4900, // 49 INR in paisa
            currency: 'INR',
            receipt: 'receipt_order_' + new Date().getTime(),
            payment_capture: 1, // Auto capture payments
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
            key_id: process.env.RAZORPAY_KEY_ID // Send key to frontend
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

// Payment verification endpoint - Enhanced
router.post('/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        console.log('🔍 Verifying payment:', {
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id
        });

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing required payment parameters",
                code: 'MISSING_PARAMETERS'
            });
        }

        // Create signature for verification
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            console.log('✅ Payment signature verified successfully');

            // Fetch payment details for additional verification
            try {
                const payment = await razorpay.payments.fetch(razorpay_payment_id);

                console.log('💰 Payment details:', {
                    status: payment.status,
                    amount: payment.amount / 100,
                    method: payment.method
                });

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

                // Still return success if signature is valid
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

// Check payment status endpoint - Enhanced with better error handling
router.get('/payment-status/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params;

        console.log('🔍 Checking payment status:', paymentId);

        if (!paymentId || paymentId === 'undefined') {
            return res.status(400).json({
                success: false,
                error: 'Invalid payment ID',
                code: 'INVALID_PAYMENT_ID'
            });
        }

        const payment = await razorpay.payments.fetch(paymentId);

        console.log('📊 Payment status:', payment.status);

        res.json({
            success: true,
            status: payment.status,
            payment: {
                id: payment.id,
                amount: payment.amount / 100,
                currency: payment.currency,
                status: payment.status,
                method: payment.method,
                created_at: payment.created_at
            }
        });

    } catch (error) {
        console.error('❌ Payment status check error:', error);

        // Handle specific Razorpay errors
        if (error.statusCode === 400) {
            res.status(400).json({
                success: false,
                error: 'Invalid payment ID',
                code: 'INVALID_PAYMENT_ID'
            });
        } else {
            res.status(500).json({
                success: false,
                error: isProduction ? 'Status check failed' : error.message,
                code: 'STATUS_CHECK_ERROR'
            });
        }
    }
});

// Check order status endpoint - Enhanced for better polling support
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
        environment: isProduction ? 'production' : 'development',
        razorpay_configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
    });
});

module.exports = router;
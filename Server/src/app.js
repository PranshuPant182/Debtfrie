const express = require('express');
const cors = require('cors');
const app = express();

// ========== MIDDLEWARE ==========
app.use(cors());

// Raw body parser for webhooks BEFORE express.json()
app.use('/api/webhooks/razorpay', express.raw({ type: 'application/json' }));

// Regular JSON parser for other routes
app.use(express.json());

// ========== ROUTES ==========

// User routes (Auth, Profile, etc.)
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Blog routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);

// Razorpay payment routes
const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);

// Webhook routes - ADD THIS LINE
const webhookRoutes = require('./routes/webhooks');
app.use('/api/webhooks', webhookRoutes);

// Form submission after payment
const contactFormRoutes = require('./routes/contactForm');
app.use('/api', contactFormRoutes); // handles /submit-form

// Root route for basic API check
app.get('/', (req, res) => {
    res.send('API WORKING');
});

module.exports = app;

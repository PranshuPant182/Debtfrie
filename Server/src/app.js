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

// Auth routes - ADD THIS NEW ROUTE
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// User routes (Auth, Profile, etc.)
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Blog routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);

// Testimonials routes - NEW ROUTE ADDED
const testimonialRoutes = require('./routes/testimonial');
app.use('/api/testimonials', testimonialRoutes);

// Razorpay payment routes
const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);

// Webhook routes
const webhookRoutes = require('./routes/webhooks');
app.use('/api/webhooks', webhookRoutes);

// Form submission after payment
const contactFormRoutes = require('./routes/contactForm');
app.use('/api', contactFormRoutes);

// Root route for basic API check
app.get('/', (req, res) => {
    res.send('API WORKING');
});

module.exports = app;
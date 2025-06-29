const express = require('express');
const cors = require('cors');
const app = express();

// ========== MIDDLEWARE ==========
app.use(cors());
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

// Form submission after payment
const contactFormRoutes = require('./routes/contactForm');
app.use('/api', contactFormRoutes); // handles /submit-form


module.exports = app;
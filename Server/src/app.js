// const express = require('express');
// const cors = require('cors');
// const app = express();

// // ========== MIDDLEWARE ==========
// app.use(cors());

// // Raw body parser for webhooks BEFORE express.json()
// app.use('/api/webhooks/razorpay', express.raw({ type: 'application/json' }));

// // Regular JSON parser for other routes
// app.use(express.json());

// // ========== ROUTES ==========

// // User routes (Auth, Profile, etc.)
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// // Blog routes
// const blogRoutes = require('./routes/blogRoutes');
// app.use('/api/blogs', blogRoutes);

// // Razorpay payment routes
// const paymentRoutes = require('./routes/payment');
// app.use('/api/payment', paymentRoutes);

// // Webhook routes - ADD THIS LINE
// const webhookRoutes = require('./routes/webhooks');
// app.use('/api/webhooks', webhookRoutes);

// // Form submission after payment
// const contactFormRoutes = require('./routes/contactForm');
// app.use('/api', contactFormRoutes); // handles /submit-form

// // Root route for basic API check
// app.get('/', (req, res) => {
//     res.send('API WORKING');
// });

// module.exports = app;


const express = require('express');
const cors = require('cors');
const app = express();

// ========== CORS CONFIGURATION ==========
const corsOptions = {
  origin: [
    'http://localhost:5173',  // Your Vite dev server
    'http://localhost:3000',  // Alternative React port
    'https://debtfrie.com',   // Your production domain (if any)
    'https://www.debtfrie.com' // www version
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ]
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// ========== MIDDLEWARE ==========

// Raw body parser for webhooks BEFORE express.json()
app.use('/api/webhooks/razorpay', express.raw({ type: 'application/json' }));

// Regular JSON parser for other routes
app.use(express.json({ limit: '10mb' })); // Increased for image uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

// Webhook routes
const webhookRoutes = require('./routes/webhooks');
app.use('/api/webhooks', webhookRoutes);

// Form submission after payment
const contactFormRoutes = require('./routes/contactForm');
app.use('/api', contactFormRoutes); // handles /submit-form

// Root route for basic API check
app.get('/', (req, res) => {
    res.json({ 
        message: 'API WORKING',
        cors: 'enabled',
        timestamp: new Date().toISOString()
    });
});

// Test route for debugging
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'CORS test successful',
        origin: req.headers.origin,
        method: req.method
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({ 
        error: error.message,
        timestamp: new Date().toISOString()
    });
});

module.exports = app;
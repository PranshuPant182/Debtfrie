require('dotenv').config(); // Load environment variables

const connectDB = require('./config/db'); // MongoDB connection
const app = require('./app'); // Express app

const PORT = process.env.PORT || 3000;

// Add this line 👇 before starting the server
console.log("Trying to start server on port:", PORT);

// Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Failed to start server:', err.message);
});

require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});

const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 3000;
console.log("Trying to start server on port:", PORT);

// Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err.message);
});

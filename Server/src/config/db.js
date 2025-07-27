const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://pranshupant66:rAb1M7rAp0FM8Tb1@debtfrie.zlhdljv.mongodb.net/?retryWrites=true&w=majority&appName=Debtfrie");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

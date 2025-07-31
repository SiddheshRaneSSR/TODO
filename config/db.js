const mongoose = require('mongoose');
const db_url = process.env.db_url;
const connectDB = async () => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;


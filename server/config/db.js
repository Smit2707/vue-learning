const mongoose = require('mongoose');

/**
 * Connects to MongoDB database
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    // Don't exit process, just throw error to be caught by caller
    throw error;
  }
};

/**
 * Gracefully closes database connection
 * @returns {Promise<void>}
 */
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error.message);
  }
};

// Handle process termination
process.on('SIGINT', closeDB);
process.on('SIGTERM', closeDB);

module.exports = { connectDB, closeDB };

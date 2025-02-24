const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { logDbConnection, logError } = require('../utils/logger');

dotenv.config();

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      `mongodb+srv://shravandeshmukh72:${process.env.DATABADE_PASSWORD}@cluster0.n4qbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    logDbConnection(connection.host); 
  } catch (error) {
    logError('MongoDB connection error:', error.stack); 
    process.exit(1);
  }
};

module.exports = connectDB;

const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/zomato_reels';

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      // agar Atlas URI use kar rahe ho aur dbName nahi diya, to yaha specify kar sakte ho
      dbName: "zomato_reels"
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // server ko band kar do taki dobara try kar sake
  }
}

module.exports = connectDB;

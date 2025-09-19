const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user_model");
const dotenv = require("dotenv");
dotenv.config();

async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    // 1️⃣ Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Save user
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // 6️⃣ Respond with user + token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const ispasswordvalid = await bcrypt.compare(password,user.password);
  if(!ispasswordvalid){
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign({
    id:user._id,
  })
}

module.exports = { registerUser, loginUser };
    
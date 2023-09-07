const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const { body, validationResult } = require("express-validator");

console.log(process.env.JWT_TOKEN);

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, password, confirmPassword } = req.body;

  console.log(req.body);

  if (!(username && password && confirmPassword)) {
    return res.status(400).json({ Error: "Please add all fields" });
  }

  if (password != confirmPassword) {
    return res.status(400).json({ Error: " Passwords must match" });
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    return res.json({ Error: "Username already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username: username,
    password: hashedPassword,
  });
  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  } else {
    return res.status(201).json({
      id: user.id,
      username: user.username,
      confirm: req.body.password === req.body.confirmPassword,
      token: generateToken(user._id),
    });
  }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!(password && username)) {
    return res.status(400).json({ Error: "Invalid username/password" });
  }
  const user = await User.findOne({ username: username }).exec();
  if (!user) {
    return res.status(400).json({ Error: "User not found" });
  }

  const authUser = await bcrypt.compare(password, user.password);
  if (authUser) {
    res.status(201).json({
      id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ Error: "Wrong password" });
    throw new Error("Invalid credentials");
  }
});

exports.getMe = asyncHandler(async (req, res) => {
  return res.status(200).json(req.user);
});

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "100s" });
}

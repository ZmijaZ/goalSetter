const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const { body, validationResult } = require("express-validator");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, password, confirmPassword } = req.body;

  console.log(req.body);

  if (!(username && password)) {
    res.status(400);
    res.json({ Error: "Please add all fields" });
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    res.json({ Error: "Username already taken" });
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
    res.status(201).json({
      id: user.id,
      username: user.username,
      confirm: req.body.password === req.body.confirmPassword,
      token: generateToken(user._id),
    });
  }
});
(exports.loginUser = body("username").trim().escape()),
  body("password").trim().escape(),
  asyncHandler(async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!(password && username)) {
      res.status(400).send("Invalid username/password");
    }
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
      res.status(400).send("User not found");
    }

    const authUser = await bcrypt.compare(password, user.password);
    if (authUser) {
      res.status(201).json({
        id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  }),
  function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "100s" });
  };

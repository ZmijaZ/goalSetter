const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

exports.createGoal = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400).json({ message: "Please add some text" });
    throw new Error("Please add some text");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  return res.status(200).json({
    goal,
  });
});

exports.getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find({ user: req.user.id }).exec();

  return res.status(200).json({
    goals,
  });
});

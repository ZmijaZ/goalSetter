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

  return res.status(200).json(goals);
});

exports.updateGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id).populate("user").exec();

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //check if the user matches the goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const newGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(newGoal);
});

exports.deleteGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("User not found");
  }

  //check if the user matches the goal
  const user = await User.findById(req.user.id);
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

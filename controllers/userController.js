const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");

exports.registerUser = asyncHandler(async (req, res, next) => {});

exports.loginUser = asyncHandler(async (req, res, next) => {});

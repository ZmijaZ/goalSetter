const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//used to identify user based on JWT
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password").exec();

      return next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ Error: "Not authorized" });
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401).json({ Error: "No token" });
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };

var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

/* GET users listing. */
router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/me", protect, userController.getMe);

module.exports = router;

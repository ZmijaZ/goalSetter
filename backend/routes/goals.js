const express = require("express");
var router = express.Router();
const goalController = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

router.post("/new", protect, goalController.createGoal);
router.get("/me", protect, goalController.getGoals);

router.put("/:id", protect, goalController.updateGoal);
router.delete("/:id", protect, goalController.deleteGoal);

module.exports = router;

const express = require("express");
const router = express.Router();
const { markMaterialAsCompleted } = require("../controllers/employeeController");

// Other routes...

// Route to mark a learning material as completed
router.post("/complete-learning-material", markMaterialAsCompleted);

module.exports = router;

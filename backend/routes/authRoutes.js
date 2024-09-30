// const express = require("express");
// const { login, createEmployee } = require("../controllers/authController");
// const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// const router = express.Router();

// // Route for login
// router.post("/login", login);

// // Admin routes (only accessible to admins)
// router.post("/admin/create-employee", authMiddleware, adminMiddleware, createEmployee);

// module.exports = router;

const express = require("express");
const { login, createEmployee } = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// Route for login
router.post("/login", login);

// Route for admin to create employee (protected for Admin only)
router.post("/admin/create-employee", verifyToken, isAdmin, createEmployee);

module.exports = router;

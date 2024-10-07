const express = require("express");
const { login, createEmployee,getAllEmployees,updateEmployee,deleteEmployee,getEmployeeById } = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// Route for login
router.post("/login", login);

// Route for admin to create employee (protected for Admin only)
router.post("/admin/create-employee", verifyToken, isAdmin, createEmployee);

// Route for admin to get all employees
router.get("/admin/employees",  getAllEmployees);
router.get("/employee/:employeeId", getEmployeeById);

// Route for admin to update an employee
router.put("/admin/employee/:employeeId", verifyToken, isAdmin, updateEmployee);

// Route for admin to delete an employee
router.delete("/admin/employee/:employeeId", verifyToken, isAdmin,deleteEmployee);

module.exports = router;

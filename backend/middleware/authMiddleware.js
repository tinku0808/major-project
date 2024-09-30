// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     const token = req.header("Authorization");

//     // Check if token exists
//     if (!token) {
//         return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: "Token is not valid" });
//     }
// };

// const adminMiddleware = (req, res, next) => {
//     // Make sure the user is admin
//     if (req.user.role !== "admin") {
//         return res.status(403).json({ message: "Access denied: Admins only" });
//     }
//     next();
// };

// module.exports = { authMiddleware, adminMiddleware };


const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Attach the user to the request object
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

// Middleware for role-based access (Admin only)
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Access denied, Admins only" });
    }
    next();
};

// Middleware for employee access
exports.isEmployee = (req, res, next) => {
    if (req.user.role !== "employee") {
        return res.status(403).json({ msg: "Access denied, Employees only" });
    }
    next();
};

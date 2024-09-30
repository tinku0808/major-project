// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//         expiresIn: "1h",
//     });

//     res.json({ token, role: user.role });
// };

// exports.createEmployee = async (req, res) => {
//     const { name, email, password, team, department } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//         name,
//         email,
//         password: hashedPassword,
//         role: "employee",
//         team,
//         department,
//     });

//     await newUser.save();

//     res.json({ message: "Employee created successfully" });
// };


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Create JWT Token
        const payload = {
            user: {
                id: user._id,
                role: user.role, // e.g., 'admin' or 'employee'
            },
        };

        // Sign the token with secret and send it to the client
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.createEmployee = async (req, res) => {
    const { name, email, password, team, department } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Create new user
        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10), // Hash the password
            team,
            department,
            role: "employee", // Automatically set role to employee
        });

        await user.save();
        res.status(201).json({ msg: "Employee created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
const nodemailer = require("nodemailer");
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
        console.log(user)
        // Create JWT Token
        const payload = {
            user: {
                id: user._id,
                role: user.role, // e.g., 'admin' or 'employee'
            },
        };

        // Sign the token with secret and send it to the client
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ employeeId: user.employeeId,token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
// Configure your email transporter (using Gmail as an example)

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: 'sabareeshwaran.m@jmangroup.com',
        pass: ''
    }
});

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

        

        // Prepare the email options
        const mailOptions = {
            from: "sabareeshwaran.m@jmangroup.com", // Sender address
            to: email, // Recipient address
            subject: "Welcome to the company", // Subject line
            text: `Hi ${name},\n\nYour employee account has been successfully created!\n\n` +
            `Team: ${team}\nDepartment: ${department}\n\n` +
            `Your password is: ${password}\n\n` + // Include the password here
            `Please log in to access your dashboard.\n\n` +
            `Best regards,\nCompany Team`, // Plain text body
        };
        

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        res.status(201).json({ msg: "Employee created successfully, email sent." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
// exports.createEmployee = async (req, res) => {
//     const { name, email, password, team, department } = req.body;

//     try {
//         // Check if user already exists
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ msg: "User already exists" });
//         }

//         // Create new user
//         user = new User({
//             name,
//             email,
//             password: await bcrypt.hash(password, 10), // Hash the password
//             team,
//             department,
//             role: "employee", // Automatically set role to employee
//         });

//         await user.save();
//         res.status(201).json({ msg: "Employee created successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error" });
//     }
// };
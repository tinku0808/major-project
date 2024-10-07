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
        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,  // Use 587 for TLS
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,  // Using environment variable
                pass: process.env.EMAIL_PASS  // Using environment variable // Your email password or app password if using 2FA
            },
        });

        // Prepare the email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
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

exports.getAllEmployees = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password from the response
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.employeeId; // Extract employeeId from request params
        const user = await User.findOne({ employeeId }).select("-password"); // Exclude the password from the response

        if (!user) {
            return res.status(404).json({ msg: "Employee not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.updateEmployee = async (req, res) => {
    const { employeeId } = req.params;
    const { name, email, password, team, department } = req.body;

    try {
        if (isNaN(employeeId)) {
            return res.status(400).json({ message: 'Invalid employee ID format' });
        }

        const user = await User.findOne({ employeeId: Number(employeeId) });
        if (!user) {
            return res.status(404).json({ msg: "Employee not found" });
        }

        let originalPassword;
        if (password) {
            originalPassword = password;
            user.password = await bcrypt.hash(password, 10);
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.team = team || user.team;
        user.department = department || user.department;

        await user.save();

        // Send an email with updated details
        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            auth: {
                user: process.env.EMAIL_USER,  // Using environment variable
                pass: process.env.EMAIL_PASS   // Using environment variable
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Using environment variable
            to: user.email,
            subject: 'Your Profile Has Been Updated',
            text: `Dear ${user.name},\n\nYour profile has been updated successfully with the following details:\n\nName: ${user.name}\nEmail: ${user.email}\nTeam: ${user.team}\nDepartment: ${user.department}\nPassword: ${originalPassword || 'Unchanged'}\n\nIf you didn't request these changes, please contact support.\n\nBest regards,\nYour Company`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({ msg: "Employee updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

// Function to delete an employee
// Example deleteEmployee function


exports.deleteEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params; // Get employeeId from request parameters
        console.log('Attempting to delete employee with ID:', employeeId);

        // Validate that employeeId is a number
        if (isNaN(employeeId)) {
            return res.status(400).json({ message: 'Invalid employee ID format' });
        }

        // Attempt to find and delete the user by employeeId
        const result = await User.findOneAndDelete({ employeeId: employeeId }); // Convert to number for the query

        // Check if the result is null, meaning no employee was found
        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

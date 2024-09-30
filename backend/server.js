const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Function to seed admin user
const createAdminUser = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const adminUser = new User({
            name: "Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
            team: "Admin Team",
            department: "Administration",
        });

        await adminUser.save();
        console.log("Admin user created");
    } else {
        console.log("Admin user already exists");
    }
};

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        createAdminUser();  // Seed admin credentials on server start
    })
    .catch((err) => console.error("MongoDB connection error", err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

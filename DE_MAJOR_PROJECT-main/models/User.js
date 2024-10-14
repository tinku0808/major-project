// models/User.js
const mongoose = require("mongoose");
const Counter = require("./Counter"); // Import the Counter model

const userSchema = new mongoose.Schema({
    employeeId: { type: Number, unique: true }, // Add the incremental ID field
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "employee"], default: "employee" },
    team: { type: String },
    department: { type: String },
});

// Pre-save hook to increment the ID
userSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: "employeeId" }, // Unique ID for employees
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );

            this.employeeId = counter.seq; // Assign the new ID to employeeId
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model("User", userSchema);

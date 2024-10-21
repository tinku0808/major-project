const Employee = require("../models/User"); // Update with the correct path
const LearningMaterial = require("../models/LearningMaterial");
const Score = require('../models/Score')
 // Update with the correct path

// Mark learning material as completed
const markMaterialAsCompleted = async (req, res) => {
    const { employeeId, materialId } = req.body;

    try {
        // Find the employee using employeeId (number)
        const employee = await Employee.findOne({ employeeId: employeeId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        
        // Find the corresponding score entry for the employee and quiz
        const score = await Score.findOne({ employeeId: employeeId, quizId: materialId });
        // console.log("this is scoreeeee",score)
        if (score) {
            // Update the score's completed status
            score.completed = true;
            await score.save();
        }

        return res.status(200).json({ message: "Learning material marked as completed" });
    } catch (error) {
        console.error("Error marking material as completed:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    markMaterialAsCompleted

};

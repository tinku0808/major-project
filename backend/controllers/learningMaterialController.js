const LearningMaterial = require("../models/LearningMaterial");

// Controller to create a learning material
const createLearningMaterial = async (req, res) => {
    const { title, description, modules } = req.body;

    // Validate required fields
    if (!title || !description || !modules || !modules.length) {
        return res.status(400).json({ msg: "Please fill in all required fields, including modules." });
    }

    try {
        // Create a new learning material
        const newMaterial = new LearningMaterial({
            title,
            description,
            modules,
            createdBy: req.user.id, // Assuming user ID is available from the token
        });

        // Save to database
        const savedMaterial = await newMaterial.save();
        res.status(201).json(savedMaterial);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { createLearningMaterial };

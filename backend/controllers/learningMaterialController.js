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

// Controller to get all learning materials
const getAllLearningMaterials = async (req, res) => {
    try {
        const learningMaterials = await LearningMaterial.find();
        res.status(200).json(learningMaterials);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to fetch learning materials" });
    }
};

const getLearningMaterialById = async (req, res) => {
    const { id } = req.params;

    try {
        const material = await LearningMaterial.findById(id);
        if (!material) {
            return res.status(404).json({ message: "Learning material not found" });
        }
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: "Error fetching learning material", error });
    }
};

module.exports = { createLearningMaterial, getAllLearningMaterials,getLearningMaterialById };

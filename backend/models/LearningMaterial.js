const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const LearningMaterialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    modules: [ModuleSchema], // An array of modules
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("LearningMaterial", LearningMaterialSchema);

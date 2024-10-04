// models/Feedback.js
const mongoose = require('mongoose');

// Create Feedback Schema
const FeedbackSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.Number, // Use Number as the type for employeeId
        required: true,
        ref: 'User' // Reference to the User model
    },
    learningMaterialTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,  // Minimum rating
        max: 5,  // Maximum rating
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the Feedback model
module.exports = mongoose.model('Feedback', FeedbackSchema);

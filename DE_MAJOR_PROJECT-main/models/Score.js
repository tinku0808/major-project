const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    employeeId: { type: Number, ref:'User', required: true },  // or String if you prefer
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: { type: Number, required: true },
    timeSpent: { type: Number, required: true },
    completed: {
        type: Boolean, // Data type for completion status
        default: false, // Default value set to false
      },
    
  });
  

module.exports = mongoose.model("Score", scoreSchema);

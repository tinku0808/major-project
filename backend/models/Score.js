const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    employeeId: { type: Number, required: true },  // or String if you prefer
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: { type: Number, required: true },
    timeSpent: { type: Number, required: true } 
  });
  

module.exports = mongoose.model("Score", scoreSchema);

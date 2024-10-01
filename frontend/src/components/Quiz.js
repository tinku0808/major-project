// Quiz.js
import React from "react";

const Quiz = ({ questions, answers, handleAnswerChange }) => {
    return (
        <div>
            {questions.map((question, index) => (
                <div key={index} className="mb-3">
                    <h5>{question.questionText}</h5> {/* Accessing questionText */}
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name={`question-${index}`}
                                value={option.optionText} // Accessing optionText
                                onChange={() => handleAnswerChange(index, option.optionText)} // Pass the correct option text
                                checked={answers[index] === option.optionText} // Check if the current option is selected
                            />
                            <label className="form-check-label">{option.optionText}</label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Quiz;

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FeedbackForm.css'; 
import { useNavigate } from 'react-router-dom';// Import the CSS file for styling

const FeedbackForm = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        employeeId: '',
        learningMaterialTitle: '',
        description: '',
        rating: 5,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/feedback', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert('Feedback submitted successfully!'); // Alert on successful submission
            console.log(response.data); // Log the response from the server

            // Reset form data
            setFormData({
                employeeId: '',
                learningMaterialTitle: '',
                description: '',
                rating: 5,
            });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback. Please try again.'); // Alert on error
        }
    };

    return (
        <div className="feedback-form-container">
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="employeeId">Employee ID:</label>
                    <input
                        type="number"
                        id="employeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Employee ID"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="learningMaterialTitle">Learning Material Title:</label>
                    <input
                        type="text"
                        id="learningMaterialTitle"
                        name="learningMaterialTitle"
                        value={formData.learningMaterialTitle}
                        onChange={handleChange}
                        required
                        placeholder="Enter the title of the material"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Write your feedback here"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                    >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Good</option>
                        <option value="3">3 - Average</option>
                        <option value="2">2 - Below Average</option>
                        <option value="1">1 - Poor</option>
                    </select>
                </div>
                <button type="submit" className="submit-button" onClick={() => window.history.back()}>Submit Feedback</button>
            </form>
            <button className="back-button btn btn-danger btn-block mt-2" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default FeedbackForm;

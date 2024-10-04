// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/FeedbackList.css'; // Import the CSS file for styling

// const FeedbackList = () => {
//     const [feedbacks, setFeedbacks] = useState([]);
//     const [selectedFeedback, setSelectedFeedback] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchFeedbacks = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/feedback');
//                 setFeedbacks(response.data);
//             } catch (error) {
//                 console.error('Error fetching feedbacks:', error);
//                 setError('Failed to load feedbacks. Please try again.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFeedbacks();
//     }, []);

//     const handleViewFeedback = async (feedbackId) => {
//         console.log('Fetching feedback details for ID:', feedbackId); 
//         try {
//             const response = await axios.get(`http://localhost:5000/api/feedback/details/${feedbackId}`);
//             console.log('Feedback details response:', response.data); // Log the response
//             setSelectedFeedback(response.data); // Save both feedback and user details
//         } catch (error) {
//             console.error('Error fetching feedback details:', error);
//             setError('Failed to load feedback details. Please try again.');
//         }
//     };

//     const closeModal = () => {
//         setSelectedFeedback(null);
//     };

//     if (loading) {
//         return <div>Loading feedbacks...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className="feedback-list-container">
//             <h2>Feedback List</h2>
//             <table className="feedback-table">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Learning Material Title</th>
//                         <th>Action</th>
//                         <th>Description</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {feedbacks.map((feedback) => (
//                         <tr key={feedback._id}>
//                             <td>{feedback.employeeId}</td>
//                             <td>{feedback.learningMaterialTitle}</td>
//                             <td>{feedback.description}</td>
//                             <td>
//                                 <button onClick={() => handleViewFeedback(feedback._id)}>View</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {selectedFeedback && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <span className="close" onClick={closeModal}>&times;</span>
//                         <h2>Feedback Details</h2>
//                         <p><strong>Name:</strong> {selectedFeedback.user.name}</p>
//                         <p><strong>Team:</strong> {selectedFeedback.user.team}</p>
//                         <p><strong>Department:</strong> {selectedFeedback.user.department}</p>
//                         <p><strong>Learning Material Title:</strong> {selectedFeedback.feedback.learningMaterialTitle}</p>
//                         <p><strong>Description:</strong> {selectedFeedback.feedback.description}</p>
//                         <p><strong>Rating:</strong> {selectedFeedback.feedback.rating}</p>
//                         <p><strong>Submitted At:</strong> {new Date(selectedFeedback.feedback.createdAt).toLocaleString()}</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FeedbackList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FeedbackList.css';
import { useNavigate } from 'react-router-dom'; // Import the CSS file for styling

const FeedbackList = () => {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDescription, setShowDescription] = useState({});
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [itemsPerPage] = useState(5); // Number of items per page

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/feedback');
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
                setError('Failed to load feedbacks. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleShowDescription = (id) => {
        setShowDescription((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Handle search functionality
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    // Filter feedbacks based on the search query
    const filteredFeedbacks = feedbacks.filter(
        (feedback) =>
            feedback.learningMaterialTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feedback.employeeId.toString().includes(searchQuery)
    );

    // Calculate pagination values
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div className="loading-spinner">Loading feedbacks...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="feedback-list-container">
            <h2 className="heading">Feedback List</h2>

            <button className="back-button btn btn-danger mb-2" onClick={() => navigate(-1)}>
                Back
            </button>

            {/* Search Bar */}
            <input
                type="text"
                className="search-bar"
                placeholder="Search by employee ID or learning material title"
                value={searchQuery}
                onChange={handleSearch}
            />

            <table className="feedback-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Learning Material Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentFeedbacks.map((feedback) => (
                        <tr key={feedback._id}>
                            <td>{feedback.employeeId}</td>
                            <td>{feedback.learningMaterialTitle}</td>
                            <td>
                                <button className="view-description" onClick={() => handleShowDescription(feedback._id)}>
                                    {showDescription[feedback._id] ? 'Hide' : 'View'}
                                </button>
                                {showDescription[feedback._id] && (
                                    <div className="description-modal">
                                        <p>{feedback.description}</p>
                                        <p>Ratings:{feedback.rating}</p>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FeedbackList;

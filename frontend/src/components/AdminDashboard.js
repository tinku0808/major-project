// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

// const AdminDashboard = () => {
//     const [view, setView] = useState("createEmployee");
//     const [learningMaterials, setLearningMaterials] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [employeeData, setEmployeeData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         team: "",
//         department: "",
//     });
    
//     const [editEmployeeData, setEditEmployeeData] = useState(null);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [performanceData, setPerformanceData] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [sortOrder, setSortOrder] = useState("score"); // Default sorting by score

//     const navigate = useNavigate();

//     // Handle employee input change
//     const handleEmployeeChange = (e) => {
//         setEmployeeData({
//             ...employeeData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // Create Employee Function
//     const createEmployee = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem("token");

//         if (!token) {
//             alert("Unauthorized, please login.");
//             navigate("/");
//             return;
//         }

//         try {
//             await axios.post("http://localhost:5000/api/admin/create-employee", employeeData, {
//                 headers: {
//                     "x-auth-token": token,
//                 },
//             });
//             alert("Employee created successfully");
//             setEmployeeData({
//                 name: "",
//                 email: "",
//                 password: "",
//                 team: "",
//                 department: "",
//             });
//             fetchEmployees(); // Fetch the updated list of employees
//         } catch (err) {
//             console.error(err);
//             alert("Failed to create employee");
//         }
//     };

//     // Fetch available learning materials
//     const fetchLearningMaterials = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.get("http://localhost:5000/api/admin/learning-materials", {
//                 headers: {
//                     "x-auth-token": token,
//                 },
//             });
//             setLearningMaterials(res.data);
//         } catch (err) {
//             console.error("Error fetching learning materials:", err);
//         }
//     };

//     // Fetch employees
//     const fetchEmployees = async () => {
//         const token = localStorage.getItem("token");
//         try {
//             const res = await axios.get("http://localhost:5000/api/admin/employees", {
//                 headers: {
//                     "x-auth-token": token,
//                 },
//             });
//             setEmployees(res.data);
//         } catch (err) {
//             console.error("Error fetching employees:", err);
//         }
//     };

//     // Fetch employee performance data
//     const fetchPerformanceData = async () => {
//         const token = localStorage.getItem("token");
//         try {
//             const res = await axios.get("http://localhost:5000/api/employee/scores", {
//                 headers: {
//                     "x-auth-token": token,
//                 },
//             });
//             setPerformanceData(res.data);
//         } catch (err) {
//             console.error("Error fetching performance data:", err);
//         }
//     };

//     // Delete Employee Function
//     const deleteEmployee = async (employeeId) => {
//         const token = localStorage.getItem("token");
//         console.log('Attempting to delete employee with ID:', employeeId);
//         try {
//             await axios.delete(`http://localhost:5000/api/admin/employee/${employeeId}`, {
//                 headers: {
//                     "x-auth-token": token,
//                 },
//             });
//             alert("Employee deleted successfully");
//             fetchEmployees(); 
//         } catch (err) {
//             console.error("Error deleting employee:", err);
//             alert("Failed to delete employee");
//         }
//     };

//     // Handle Logout
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     };

//     // Handle Edit Employee
//     const handleEditClick = (employee) => {
//         setEditEmployeeData(employee);
//         setShowEditModal(true);
//     };

//     // Handle Edit Input Change
//     const handleEditChange = (e) => {
//         setEditEmployeeData({
//             ...editEmployeeData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // Save Edited Employee
//     const saveEditedEmployee = async () => {
//         const token = localStorage.getItem("token");
//         try {
//             await axios.put(`http://localhost:5000/api/admin/employee/${editEmployeeData.employeeId}`, editEmployeeData, {
//                 headers: {
//                     "x-auth-token": token,
//                 },
//             });
//             alert("Employee updated successfully");
//             setShowEditModal(false);
//             fetchEmployees(); // Fetch updated employees
//         } catch (err) {
//             console.error("Error updating employee:", err);
//             alert("Failed to update employee");
//         }
//     };

//     // Sort and filter performance data
//     const filteredPerformanceData = performanceData.filter(item =>
//         item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.learningMaterialTitle.toLowerCase().includes(searchQuery.toLowerCase())
//     ).sort((a, b) => {
//         if (sortOrder === "score") {
//             return b.score - a.score; // Descending order
//         } else {
//             return b.timeSpent - a.timeSpent; // Descending order
//         }
//     });
    
    

//     useEffect(() => {
//         fetchEmployees(); // Fetch employees when component mounts
//         if (view === "learningMaterials") {
//             fetchLearningMaterials();
//         } else if (view === "performance") {
//             fetchPerformanceData();
//         }
//     }, [view]);

//     return (
//         <div className="container mt-5">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
//     <Link className="navbar-brand" to="/admin-dashboard">Admin Dashboard</Link>
//     <ul className="navbar-nav">
//         <li className="nav-item">
//             <button className="nav-link btn" onClick={() => setView("createEmployee")}>Create Employees</button>
//         </li>
//         <li className="nav-item">
//             <Link className="nav-link" to="/admin-dashboard/create-learning-material">Create Learning Material</Link>
//         </li>
//         <li className="nav-item">
//             <button className="nav-link btn" onClick={() => setView("learningMaterials")}>Available Learning Materials</button>
//         </li>
//         <li className="nav-item">
//             <button className="nav-link btn" onClick={() => setView("performance")}>Employee Performance</button>
//         </li>
//         <li className="nav-item ml-auto">
//             <button className="nav-link btn btn-danger" onClick={handleLogout}>Logout</button>
//         </li>
//     </ul>
// </nav>

//             {view === "createEmployee" && (
//                 <div className="row">
//                     <div className="col-md-8 offset-md-2">
//                         <h3 className="text-center">Create Employee</h3>
//                         <form onSubmit={createEmployee}>
//                             <div className="form-group">
//                                 <label>Name</label>
//                                 <input type="text" name="name" className="form-control" value={employeeData.name} onChange={handleEmployeeChange} required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Email</label>
//                                 <input type="email" name="email" className="form-control" value={employeeData.email} onChange={handleEmployeeChange} required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Password</label>
//                                 <input type="password" name="password" className="form-control" value={employeeData.password} onChange={handleEmployeeChange} required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Team</label>
//                                 <input type="text" name="team" className="form-control" value={employeeData.team} onChange={handleEmployeeChange} required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Department</label>
//                                 <input type="text" name="department" className="form-control" value={employeeData.department} onChange={handleEmployeeChange} required />
//                             </div>
//                             <button type="submit" className="btn btn-primary btn-block mt-3">Create Employee</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {view === "createEmployee" && (
//                 <div className="row mt-4">
//                     <div className="col-md-8 offset-md-2">
//                         <h3 className="text-center">Existing Employees</h3>
//                         <table className="table table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th>Employee ID</th>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Team</th>
//                                     <th>Department</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {employees.map((employee) => (
//                                     <tr key={employee.employeeId}>
//                                         <td>{employee.employeeId}</td>
//                                         <td>{employee.name}</td>
//                                         <td>{employee.email}</td>
//                                         <td>{employee.team}</td>
//                                         <td>{employee.department}</td>
//                                         <td>
//                                             <button className="btn btn-warning" onClick={() => handleEditClick(employee)}>Edit</button>
//                                             <button className="btn btn-danger" onClick={() => deleteEmployee(employee.employeeId)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}

//             {view === "learningMaterials" && (
//                 <div className="row mt-4">
//                     <div className="col-md-8 offset-md-2">
//                         <h3 className="text-center">Available Learning Materials</h3>
//                         <table className="table table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th>Title</th>
//                                     <th>Description</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {learningMaterials.map((material) => (
//                                     <tr key={material._id}>
//                                         <td>{material.title}</td>
//                                         <td>{material.description}</td>
//                                         <td>
//                                             <Link to={`/admin-dashboard/quiz/create/${material._id}`} className="btn btn-warning">Create Quiz</Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}

//             {view === "performance" && (
//                 <div className="row mt-4">
//                     <div className="col-md-8 offset-md-2">
//                         <h3 className="text-center">Employee Performance</h3>
//                         <input
//                             type="text"
//                             placeholder="Search by Employee Name or Material Title"
//                             className="form-control mb-3"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                         <select className="form-control mb-3" onChange={(e) => setSortOrder(e.target.value)}>
//                             <option value="score">Sort by Score</option>
//                             <option value="time">Sort by Time Spent</option>
//                         </select>
//                         <table className="table table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th>Employee Name</th>
//                                     <th>Learning Material</th>
//                                     <th>Score</th>
//                                     <th>Time Spent</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredPerformanceData.map((item) => (
//                                     <tr key={item.id}>
//                                         <td>{item.employeeName}</td>
//                                         <td>{item.learningMaterialTitle}</td>
//                                         <td>{item.score}</td>
//                                         <td>{item.timeSpent} seconds</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}

//             {/* Edit Employee Modal */}
//             <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Edit Employee</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form>
//                         <div className="form-group">
//                             <label>Name</label>
//                             <input type="text" name="name" className="form-control" value={editEmployeeData?.name} onChange={handleEditChange} required />
//                         </div>
//                         <div className="form-group">
//                             <label>Email</label>
//                             <input type="email" name="email" className="form-control" value={editEmployeeData?.email} onChange={handleEditChange} required />
//                         </div>
//                         <div className="form-group">
//                             <label>Password</label>
//                             <input type="password" name="password" className="form-control" value={editEmployeeData?.password} onChange={handleEditChange} required />
//                         </div>
//                         <div className="form-group">
//                             <label>Team</label>
//                             <input type="text" name="team" className="form-control" value={editEmployeeData?.team} onChange={handleEditChange} required />
//                         </div>
//                         <div className="form-group">
//                             <label>Department</label>
//                             <input type="text" name="department" className="form-control" value={editEmployeeData?.department} onChange={handleEditChange} required />
//                         </div>
//                     </form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={saveEditedEmployee}>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* <button className="btn btn-danger mt-4" onClick={handleLogout}>Logout</button> */}
//         </div>
//     );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AdminDashboard = () => {
    const [view, setView] = useState("createEmployee");
    const [learningMaterials, setLearningMaterials] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [employeeData, setEmployeeData] = useState({
        name: "",
        email: "",
        password: "",
        team: "",
        department: "",
    });
    
    const [editEmployeeData, setEditEmployeeData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [performanceData, setPerformanceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("score"); // Default sorting by score
    const [currentPage, setCurrentPage] = useState(1);
    const [profilePic] = useState("https://i.imgur.com/SJae53b.jpeg");
    const [employeeName, setEmployeeName] = useState(""); 
    const employeeId = localStorage.getItem("employeeId"); 

    const navigate = useNavigate();


    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${employeeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployeeName(response.data.name);
                // Removed profilePic fetching, now using hardcoded value
            } catch (error) {
                console.error("Error fetching employee details:", error);
            }
        };
        fetchEmployeeDetails();
    }, [employeeId]);
    // Handle employee input change
    const handleEmployeeChange = (e) => {
        setEmployeeData({
            ...employeeData,
            [e.target.name]: e.target.value,
        });
    };

    // Create Employee Function
    const createEmployee = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Unauthorized, please login.");
            navigate("/");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/admin/create-employee", employeeData, {
                headers: {
                    "x-auth-token": token,
                },
            });
            alert("Employee created successfully");
            setEmployeeData({
                name: "",
                email: "",
                password: "",
                team: "",
                department: "",
            });
            fetchEmployees(); // Fetch the updated list of employees
        } catch (err) {
            console.error(err);
            alert("Failed to create employee");
        }
    };

    // Fetch available learning materials
    const fetchLearningMaterials = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/admin/learning-materials", {
                headers: {
                    "x-auth-token": token,
                },
            });
            setLearningMaterials(res.data);
        } catch (err) {
            console.error("Error fetching learning materials:", err);
        }
    };

    // Fetch employees
    const fetchEmployees = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:5000/api/admin/employees", {
                headers: {
                    "x-auth-token": token,
                },
            });
            setEmployees(res.data);
        } catch (err) {
            console.error("Error fetching employees:", err);
        }
    };

    // Fetch employee performance data
    const fetchPerformanceData = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:5000/api/employee/buddhu/scores", {
                headers: {
                    "x-auth-token": token,
                },
            });
            setPerformanceData(res.data);
        } catch (err) {
            console.error("Error fetching performance data:", err);
        }
    };

    // Delete Employee Function
    const deleteEmployee = async (employeeId) => {
        const token = localStorage.getItem("token");
        console.log('Attempting to delete employee with ID:', employeeId);
        try {
            await axios.delete(`http://localhost:5000/api/admin/employee/${employeeId}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
            alert("Employee deleted successfully");
            fetchEmployees(); 
        } catch (err) {
            console.error("Error deleting employee:", err);
            alert("Failed to delete employee");
        }
    };

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Handle Edit Employee
    const handleEditClick = (employee) => {
        setEditEmployeeData(employee);
        setShowEditModal(true);
    };

    // Handle Edit Input Change
    const handleEditChange = (e) => {
        setEditEmployeeData({
            ...editEmployeeData,
            [e.target.name]: e.target.value,
        });
    };

    // Save Edited Employee
    const saveEditedEmployee = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:5000/api/admin/employee/${editEmployeeData.employeeId}`, editEmployeeData, {
                headers: {
                    "x-auth-token": token,
                },
            });
            alert("Employee updated successfully");
            setShowEditModal(false);
            fetchEmployees(); // Fetch updated employees
        } catch (err) {
            console.error("Error updating employee:", err);
            alert("Failed to update employee");
        }
    };

    // Sort and filter performance data
    const filteredPerformanceData = performanceData.filter(item =>
        item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.learningMaterialTitle.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
        if (sortOrder === "score") {
            return b.score - a.score; // Descending order
        } else {
            return b.timeSpent - a.timeSpent; // Descending order
        }
    });

    // Get current employees
    const indexOfLastEmployee = currentPage * 5;
    const indexOfFirstEmployee = indexOfLastEmployee - 5;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    

    
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        fetchEmployees(); // Fetch employees when component mounts
        if (view === "learningMaterials") {
            fetchLearningMaterials();
        } else if (view === "performance") {
            fetchPerformanceData();
        }
    }, [view]);

    return (
        <div className="container mt-5">
        <div className="profile-container text-center mt-3">
                {/* Circular Profile Picture */}
                <div className="profile-pic-wrapper">
                    <img
                        src={profilePic} // Now using hardcoded profile picture
                        alt="Profile"
                        className="profile-pic"
                    />
                </div>
                {/* Welcome message */}
                <h4>Welcome, {employeeName}!</h4>

                {/* Logout Button */}
                <button className="btn btn-danger mt-2 mb-4" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                {/* <Link className="navbar-brand" to="/admin-dashboard">Admin Dashboard</Link> */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="nav-link btn" onClick={() => setView("createEmployee")}>Create Employees</button>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin-dashboard/create-learning-material">Create Learning Material</Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn" onClick={() => setView("learningMaterials")}>Available Learning Materials</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn" onClick={() => setView("performance")}>Employee Performance</button>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin-dashboard/feedback-list">Feedback List</Link>
                    </li>
                </ul>
            </nav>

            {view === "createEmployee" && (
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h3 className="text-center">Create Employee</h3>
                        <form onSubmit={createEmployee}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" className="form-control" value={employeeData.name} onChange={handleEmployeeChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={employeeData.email} onChange={handleEmployeeChange} required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" className="form-control" value={employeeData.password} onChange={handleEmployeeChange} required />
                            </div>
                            <div className="form-group">
                                <label>Team</label>
                                <input type="text" name="team" className="form-control" value={employeeData.team} onChange={handleEmployeeChange} required />
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <input type="text" name="department" className="form-control" value={employeeData.department} onChange={handleEmployeeChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mt-3">Create Employee</button>
                        </form>
                    </div>
                </div>
            )}

            {view === "createEmployee" && (
                <div className="row mt-4">
                    <div className="col-md-8 offset-md-2">
                        <h3 className="text-center">Existing Employees</h3>
                        <input
                            type="text"
                            placeholder="Search by Employee Name or Email"
                            className="form-control mb-3"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Team</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEmployees.filter((employee) => 
                                    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    employee.email.toLowerCase().includes(searchQuery.toLowerCase())
                                ).map((employee) => (
                                    <tr key={employee.employeeId}>
                                        <td>{employee.employeeId}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.team}</td>
                                        <td>{employee.department}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={() => handleEditClick(employee)} style={{ marginRight: '10px' }}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => deleteEmployee(employee.employeeId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            {[...Array(Math.ceil(employees.length / 5)).keys()].map((pageNumber) => (
                                <button key={pageNumber} onClick={() => paginate(pageNumber + 1)} className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}>
                                    {pageNumber + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {view === "learningMaterials" && (
                <div className="row mt-4">
                    <div className="col-md-8 offset-md-2">
                        <h3 className="text-center">Available Learning Materials</h3>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {learningMaterials.map((material) => (
                                    <tr key={material._id}>
                                        <td>{material.title}</td>
                                        <td>{material.description}</td>
                                        <td>
                                            <Link to={`/admin-dashboard/quiz/create/${material._id}`} className="btn btn-warning">Create Quiz</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {view === "performance" && (
                <div className="row mt-4">
                    <div className="col-md-8 offset-md-2">
                        <h3 className="text-center">Employee Performance</h3>
                        <input
                            type="text"
                            placeholder="Search by Employee Name or Material Title"
                            className="form-control mb-3"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select className="form-control mb-3" onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="score">Sort by Score</option>
                            <option value="time">Sort by Time Spent</option>
                        </select>
                        <table className="table table-bordered">
                            <thead>
                                <tr key ={"header-row"}>
                                    <th>Employee Name</th>
                                    <th>Learning Material</th>
                                    <th>Score</th>
                                    <th>Time Spent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPerformanceData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.employeeName}</td>
                                        <td>{item.learningMaterialTitle}</td>
                                        <td>{item.score}</td>
                                        <td>{item.timeSpent} seconds</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        
                    </div>
                </div>
            )}

            {/* Edit Employee Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" value={editEmployeeData?.name} onChange={handleEditChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" value={editEmployeeData?.email} onChange={handleEditChange} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" value={editEmployeeData?.password} onChange={handleEditChange} required />
                        </div>
                        <div className="form-group">
                            <label>Team</label>
                            <input type="text" name="team" className="form-control" value={editEmployeeData?.team} onChange={handleEditChange} required />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <input type="text" name="department" className="form-control" value={editEmployeeData?.department} onChange={handleEditChange} required />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveEditedEmployee}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <button className="btn btn-danger mt-4" onClick={handleLogout}>Logout</button> */}
        </div>
    );
};

export default AdminDashboard;

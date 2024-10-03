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

    const navigate = useNavigate();

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

    useEffect(() => {
        fetchEmployees(); // Fetch employees when component mounts
        if (view === "learningMaterials") {
            fetchLearningMaterials();
        }
    }, [view]);

    return (
        <div className="container mt-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <Link className="navbar-brand" to="/admin-dashboard">Admin Dashboard</Link>
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
                                {employees.map((employee) => (
                                    <tr key={employee.employeeId}>
                                        <td>{employee.employeeId}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.team}</td>
                                        <td>{employee.department}</td>
                                        <td>
                                            <button className="btn btn-secondary" onClick={() => handleEditClick(employee)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => deleteEmployee(employee.employeeId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {view === "learningMaterials" && (
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h3 className="text-center">Available Learning Materials</h3>
                        <ul className="list-group">
                            {learningMaterials.map((material) => (
                                <li key={material._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {material.title}
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => navigate(`/admin-dashboard/quiz/create/${material._id}`)}
                                    >
                                        Create Quiz
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <button onClick={handleLogout} className="btn btn-danger btn-block mt-3">Logout</button>

            {/* Edit Employee Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" value={editEmployeeData?.name || ""} onChange={handleEditChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" value={editEmployeeData?.email || ""} onChange={handleEditChange} required />
                        </div>
                        <div className="form-group">
                            <label>Team</label>
                            <input type="text" name="team" className="form-control" value={editEmployeeData?.team || ""} onChange={handleEditChange} required />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <input type="text" name="department" className="form-control" value={editEmployeeData?.department || ""} onChange={handleEditChange} required />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="primary" onClick={saveEditedEmployee}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminDashboard;







// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const AdminDashboard = () => {
//     const [employeeData, setEmployeeData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         team: "",
//         department: "",
//     });

//     const navigate = useNavigate();

//     // Handle input change
//     const handleChange = (e) => {
//         setEmployeeData({
//             ...employeeData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // Create Employee Function
//     const createEmployee = async (e) => {
//         e.preventDefault(); // Prevent form from refreshing
//         const token = localStorage.getItem("token");

//         if (!token) {
//             alert("Unauthorized, please login.");
//             navigate("/");
//             return;
//         }

//         try {
//             await axios.post("http://localhost:5000/api/admin/create-employee", employeeData, {
//                 headers: {
//                     "x-auth-token": token, // Include the JWT token in headers
//                 },
//             });
//             alert("Employee created successfully");
//             // Clear the form after successful submission
//             setEmployeeData({
//                 name: "",
//                 email: "",
//                 password: "",
//                 team: "",
//                 department: "",
//             });
//         } catch (err) {
//             console.error(err);
//             alert("Failed to create employee");
//         }
//     };

//     // Logout Function
//     const handleLogout = () => {
//         localStorage.removeItem("token"); // Clear the token
//         navigate("/"); // Redirect to login page
//     };

//     return (
//         <div className="container mt-5">
//             {/* Navigation Bar */}
//             <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
//                 <Link className="navbar-brand" to="/admin-dashboard">Admin Dashboard</Link>
//                 <div className="collapse navbar-collapse">
//                     <ul className="navbar-nav mr-auto">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/admin-dashboard">Create Employees</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/admin-dashboard/create-learning-material">Create Learning Material</Link>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>

//             {/* Employee Creation Form */}
//             <div className="row">
//                 <div className="col-md-8 offset-md-2">
//                     <h3 className="text-center">Create Employee</h3>
//                     <form onSubmit={createEmployee}>
//                         <div className="form-group">
//                             <label>Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 className="form-control"
//                                 value={employeeData.name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 className="form-control"
//                                 value={employeeData.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 className="form-control"
//                                 value={employeeData.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Team</label>
//                             <input
//                                 type="text"
//                                 name="team"
//                                 className="form-control"
//                                 value={employeeData.team}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Department</label>
//                             <input
//                                 type="text"
//                                 name="department"
//                                 className="form-control"
//                                 value={employeeData.department}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-primary btn-block mt-3">
//                             Create Employee
//                         </button>
//                     </form>

//                     {/* Logout Button */}
//                     <button onClick={handleLogout} className="btn btn-danger btn-block mt-3">
//                         Logout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
    const [view, setView] = useState("createEmployee");
    const [learningMaterials, setLearningMaterials] = useState([]);

    const [employeeData, setEmployeeData] = useState({
        name: "",
        email: "",
        password: "",
        team: "",
        department: "",
    });

    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
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

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
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
                                <input type="text" name="name" className="form-control" value={employeeData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={employeeData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" className="form-control" value={employeeData.password} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Team</label>
                                <input type="text" name="team" className="form-control" value={employeeData.team} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <input type="text" name="department" className="form-control" value={employeeData.department} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mt-3">Create Employee</button>
                        </form>
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
                                        onClick={() => navigate(`/admin-dashboard/quiz/${material._id}`)}
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
        </div>
    );
};

export default AdminDashboard;

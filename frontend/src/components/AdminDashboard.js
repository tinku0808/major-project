// import React, { useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//     const [employeeData, setEmployeeData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         team: "",
//         department: "",
//     });

//     // Function to handle input change
//     const handleChange = (e) => {
//         setEmployeeData({
//             ...employeeData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // Create Employee Function (You can place this here)
//     const createEmployee = async (e) => {
//         e.preventDefault(); // Prevent form from refreshing
//         const token = localStorage.getItem("token");

//         try {
//             await axios.post("http://localhost:5000/api/admin/create-employee", employeeData, {
//                 headers: {
//                     "x-auth-token": token, // Include the JWT token in headers
//                 },
//             });
//             alert("Employee created successfully");
//         } catch (err) {
//             console.error(err);
//             alert("Failed to create employee");
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Admin Dashboard</h2>
//             <form onSubmit={createEmployee}>
//                 <div className="form-group">
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         className="form-control"
//                         value={employeeData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         className="form-control"
//                         value={employeeData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         className="form-control"
//                         value={employeeData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Team</label>
//                     <input
//                         type="text"
//                         name="team"
//                         className="form-control"
//                         value={employeeData.team}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Department</label>
//                     <input
//                         type="text"
//                         name="department"
//                         className="form-control"
//                         value={employeeData.department}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                     Create Employee
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
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
        e.preventDefault(); // Prevent form from refreshing
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Unauthorized, please login.");
            navigate("/");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/admin/create-employee", employeeData, {
                headers: {
                    "x-auth-token": token, // Include the JWT token in headers
                },
            });
            alert("Employee created successfully");
            // Clear the form after successful submission
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

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear the token
        navigate("/"); // Redirect to login page
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h3 className="text-center">Admin Dashboard</h3>
                    <form onSubmit={createEmployee}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={employeeData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={employeeData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={employeeData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Team</label>
                            <input
                                type="text"
                                name="team"
                                className="form-control"
                                value={employeeData.team}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <input
                                type="text"
                                name="department"
                                className="form-control"
                                value={employeeData.department}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">
                            Create Employee
                        </button>
                    </form>
                    <button onClick={handleLogout} className="btn btn-danger btn-block mt-3">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;



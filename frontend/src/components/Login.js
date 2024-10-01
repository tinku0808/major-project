// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     try {
//     //         const response = await axios.post("http://localhost:5000/api/login", { email, password });
//     //         if (response.data.role === "admin") {
//     //             navigate("/admin-dashboard");
//     //         } else {
//     //             navigate("/employee-dashboard");
//     //         }
//     //     } catch (error) {
//     //         alert("Invalid credentials");
//     //     }
//     // };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:5000/api/login", { email, password });
    
//             // Save JWT token to localStorage
//             localStorage.setItem("token", response.data.token);
    
//             // Redirect based on role
//             if (response.data.role === "admin") {
//                 navigate("/admin-dashboard");
//             } else {
//                 navigate("/employee-dashboard");
//             }
//         } catch (error) {
//             alert("Invalid credentials");
//         }
//     };
    

//     return (
//         <div className="container">
//             <div className="row justify-content-center mt-5">
//                 <div className="col-md-6">
//                     <div className="card">
//                         <div className="card-body">
//                             <h3 className="card-title text-center">Login</h3>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="form-group">
//                                     <label>Email</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                 </div>
//                                 <button type="submit" className="btn btn-primary btn-block mt-3">
//                                     Login
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login", { email, password });
            console.log(response)
            const employeeId = response.data.employeeId;
           
            localStorage.setItem("employeeId", employeeId);
        
            // Save JWT token to localStorage
            localStorage.setItem("token", response.data.token);
    
            // Redirect based on role
            if (response.data.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/employee-dashboard");
            }
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;


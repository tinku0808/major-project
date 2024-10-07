import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css"; // Ensure the path is correct for your setup

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      const employeeId = response.data.employeeId;
      localStorage.setItem("employeeId", employeeId);
      localStorage.setItem("token", response.data.token);

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
    <div className="unique-login-page">
      <div className="unique-left-section">
        <h1 className="unique-tin-text">Tin</h1>
      </div>
      <div className="unique-right-section">
        <div className="unique-form-container">
          <form className="unique-login-form" onSubmit={handleSubmit}>
            <div className="unique-form-group">
              <label className="unique-form__label">Email</label>
              <input
                type="email"
                className="unique-form__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="unique-form-group">
              <label className="unique-form__label">Password</label>
              <input
                type="password"
                className="unique-form__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="unique-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

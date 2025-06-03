// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api/authApi";

// const Login = () => {
//     const [user, setUser] = useState({ username: "", password: "" });
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await loginUser(user);
//             localStorage.setItem("token", response.token);  // Store JWT token
//             navigate("/dashboard");
//         } catch (err) {
//             setError("Invalid username or password");
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="login-card">
//                 <h2 className="login-title">Welcome Back</h2>
//                 {error && <p className="error-message">{error}</p>}
//                 <form onSubmit={handleSubmit} className="login-form">
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             name="username"
//                             placeholder="Username"
//                             value={user.username}
//                             onChange={handleChange}
//                             required
//                             className="login-input"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={user.password}
//                             onChange={handleChange}
//                             required
//                             className="login-input"
//                         />
//                     </div>
//                     <button type="submit" className="login-button">
//                         Sign In
//                     </button>
//                 </form>
//             </div>
//             <style jsx>{`
//                 .login-container {
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     min-height: 100vh;
//                     background-color: #f5f5f5;
//                 }
//                 .login-card {
//                     background: white;
//                     padding: 2rem;
//                     border-radius: 10px;
//                     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//                     width: 100%;
//                     max-width: 400px;
//                 }
//                 .login-title {
//                     text-align: center;
//                     color: #333;
//                     margin-bottom: 1.5rem;
//                 }
//                 .login-form {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 1rem;
//                 }
//                 .form-group {
//                     margin-bottom: 1rem;
//                 }
//                 .login-input {
//                     width: 100%;
//                     padding: 0.75rem;
//                     border: 1px solid #ddd;
//                     border-radius: 4px;
//                     font-size: 1rem;
//                 }
//                 .login-button {
//                     background-color: #007bff;
//                     color: white;
//                     padding: 0.75rem;
//                     border: none;
//                     border-radius: 4px;
//                     font-size: 1rem;
//                     cursor: pointer;
//                     transition: background-color 0.2s;
//                 }
//                 .login-button:hover {
//                     background-color: #0056b3;
//                 }
//                 .error-message {
//                     color: #dc3545;
//                     text-align: center;
//                     margin-bottom: 1rem;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // <-- Import Link
import { loginUser } from "../../api/authApi";
import "./Login.css"; // Import your CSS file for styling

const Login = () => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(user);
            localStorage.setItem("token", response.token);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={user.username}
                            onChange={handleChange}
                            required
                            className="login-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            className="login-input"
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Sign In
                    </button>
                </form>
                {/* Add Sign Up Link Here */}
                <p className="signup-link">
                    Not registered? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

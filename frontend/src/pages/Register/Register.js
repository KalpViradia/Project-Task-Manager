// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../api/authApi";

// const Register = () => {
//     const [user, setUser] = useState({ username: "", password: "", confirmPassword: "" });
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (user.password !== user.confirmPassword) {
//             setError("Passwords do not match!");
//             return;
//         }

//         try {
//             const { data } = await registerUser({ username: user.username, password: user.password });
//             console.log("Registration Successful:", data);
//             navigate("/login");
//         } catch (err) {
//             console.error("Error during registration:", err);
//             const errorMessage = 
//                 err.response?.data?.error ||
//                 err.response?.data ||
//                 err.message ||
//                 'Registration failed. Please try again.';
//             setError(errorMessage);
//         }
//     };

//     const styles = {
//         container: {
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             minHeight: '100vh',
//             backgroundColor: '#f5f5f5',
//             padding: '20px'
//         },
//         card: {
//             background: 'white',
//             padding: '2rem',
//             borderRadius: '8px',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//             width: '100%',
//             maxWidth: '400px'
//         },
//         title: {
//             textAlign: 'center',
//             color: '#333',
//             marginBottom: '1.5rem',
//             fontSize: '1.8rem'
//         },
//         form: {
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1rem'
//         },
//         input: {
//             width: '100%',
//             padding: '0.8rem',
//             border: '1px solid #ddd',
//             borderRadius: '4px',
//             fontSize: '1rem',
//             marginBottom: '0.5rem'
//         },
//         button: {
//             backgroundColor: '#007bff',
//             color: 'white',
//             padding: '0.8rem',
//             border: 'none',
//             borderRadius: '4px',
//             fontSize: '1rem',
//             cursor: 'pointer',
//             marginTop: '1rem'
//         },
//         error: {
//             color: '#dc3545',
//             textAlign: 'center',
//             marginBottom: '1rem',
//             fontSize: '0.9rem'
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.card}>
//                 <h2 style={styles.title}>Create Account</h2>
//                 {error && <p style={styles.error}>{error}</p>}
//                 <form onSubmit={handleSubmit} style={styles.form}>
//                     <input 
//                         type="text" 
//                         name="username" 
//                         placeholder="Username" 
//                         value={user.username} 
//                         onChange={handleChange} 
//                         style={styles.input}
//                         required 
//                     />
//                     <input 
//                         type="password" 
//                         name="password" 
//                         placeholder="Password" 
//                         value={user.password} 
//                         onChange={handleChange} 
//                         style={styles.input}
//                         required 
//                     />
//                     <input 
//                         type="password" 
//                         name="confirmPassword" 
//                         placeholder="Confirm Password" 
//                         value={user.confirmPassword} 
//                         onChange={handleChange} 
//                         style={styles.input}
//                         required 
//                     />
//                     <button type="submit" style={styles.button}>Register</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Register;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import "./Register.css"; // <-- Import the CSS file

const Register = () => {
    const [user, setUser] = useState({ username: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const { data } = await registerUser({ username: user.username, password: user.password });
            console.log("Registration Successful:", data);
            navigate("/login");
        } catch (err) {
            console.error("Error during registration:", err);
            const errorMessage =
                err.response?.data?.error ||
                err.response?.data ||
                err.message ||
                'Registration failed. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Create Account</h2>
                {error && <p className="register-error">{error}</p>}
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <button type="submit" className="register-button">Register</button>
                </form>

                <p className="register-link">
                    Already have an account?{" "}
                    <Link to="/login">Back to Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

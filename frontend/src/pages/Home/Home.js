// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//     return (
//         <div style={{
//             height: '100vh',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: '#f5f5f5'
//         }}>
//             <div style={{
//                 padding: '2rem',
//                 borderRadius: '10px',
//                 backgroundColor: 'white',
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                 textAlign: 'center'
//             }}>
//                 <h1 style={{
//                     color: '#333',
//                     marginBottom: '2rem',
//                     fontFamily: 'Arial, sans-serif'
//                 }}>Welcome to Task Manager</h1>
//                 <div style={{ gap: '1rem', display: 'flex', justifyContent: 'center' }}>
//                     <Link to="/login" style={{
//                         padding: '0.75rem 1.5rem',
//                         backgroundColor: '#007bff',
//                         color: 'white',
//                         textDecoration: 'none',
//                         borderRadius: '5px',
//                         fontWeight: 'bold'
//                     }}>Login</Link>
//                     <Link to="/register" style={{
//                         padding: '0.75rem 1.5rem',
//                         backgroundColor: '#28a745',
//                         color: 'white',
//                         textDecoration: 'none',
//                         borderRadius: '5px',
//                         fontWeight: 'bold'
//                     }}>Register</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;


import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // ✅ Import the CSS file

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-card">
                <h1 className="home-title">Welcome to Task Manager</h1>
                <div className="home-links">
                    <Link to="/login" className="home-button home-login">Login</Link>
                    <Link to="/register" className="home-button home-register">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

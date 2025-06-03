// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";
// import "./Dashboard.css"; // Import the CSS file for styling

// const Dashboard = () => {
//     const [tasks, setTasks] = useState([]);
//     const [newTask, setNewTask] = useState({
//         title: "",
//         description: "",
//         dueDate: new Date().toISOString().split('T')[0],
//         priority: "low",
//         status: "active",
//         completed: false
//     });
//     const [editTask, setEditTask] = useState(null);  // Track task being edited
//     const [error, setError] = useState("");
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     const fetchTasks = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/tasks", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTasks(response.data);
//         } catch (err) {
//             console.error("Error fetching tasks:", err);
//             setError("Failed to load tasks.");
//         }
//     };

//     const handleAddTask = async (e) => {
//         e.preventDefault();
//         if (!newTask.title) return;

//         try {
//             await axios.post("http://localhost:5000/tasks", newTask, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setNewTask({ title: "", description: "", dueDate: new Date().toISOString().split('T')[0], priority: "low", status: "active", completed: false });
//             fetchTasks();
//         } catch (err) {
//             console.error("Error adding task:", err);
//             setError("Failed to add task.");
//         }
//     };

//     const handleDeleteTask = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/tasks/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             fetchTasks();
//         } catch (err) {
//             console.error("Error deleting task:", err);
//             setError("Failed to delete task.");
//         }
//     };

//     const handleEditTask = async (id, updatedTask) => {
//         try {
//             await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setEditTask(null);  // Exit edit mode
//             fetchTasks();
//         } catch (err) {
//             console.error("Error updating task:", err.response?.data || err.message);
//             setError("Failed to update task.");
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <h1 style={styles.title}>Task Manager</h1>

//             {/* Add Task Form */}
//             <form onSubmit={handleAddTask} style={styles.form}>
//                 <input
//                     type="text"
//                     placeholder="Enter task title"
//                     value={newTask.title}
//                     onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//                     required
//                     style={styles.input}
//                 />
//                 <textarea
//                     placeholder="Enter task description"
//                     value={newTask.description}
//                     onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//                     style={styles.textarea}
//                     rows="3"
//                 />
//                 <div style={styles.formRow}>
//                     <input
//                         type="date"
//                         value={newTask.dueDate}
//                         onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
//                         style={styles.dateInput}
//                     />
//                     <select
//                         value={newTask.priority}
//                         onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
//                         style={styles.select}
//                     >
//                         <option value="low">Low Priority</option>
//                         <option value="medium">Medium Priority</option>
//                         <option value="high">High Priority</option>
//                     </select>
//                     <select
//                         value={newTask.status}
//                         onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
//                         style={styles.select}
//                     >
//                         <option value="active">Active</option>
//                         <option value="inactive">Inactive</option>
//                         <option value="completed">Completed</option>
//                     </select>
//                 </div>
//                 <button type="submit" style={styles.addButton}>
//                     <FaPlus style={styles.buttonIcon} /> Add New Task
//                 </button>
//             </form>

//             {/* Task List */}
//             {error && <p style={styles.error}>{error}</p>}
//             <div style={styles.taskList}>
//                 {tasks.map((task) => (
//                     <div key={task._id} style={{
//                         ...styles.taskItem,
//                         borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
//                         opacity: task.status === 'inactive' ? 0.6 : 1
//                     }}>
//                         {editTask === task._id ? (
//                             <div style={styles.editForm}>
//                                 <input
//                                     type="text"
//                                     value={task.title}
//                                     onChange={(e) => setTasks(tasks.map(t => 
//                                         t._id === task._id ? { ...t, title: e.target.value } : t
//                                     ))}
//                                     style={styles.editInput}
//                                 />
//                                 <textarea
//                                     value={task.description}
//                                     onChange={(e) => setTasks(tasks.map(t => 
//                                         t._id === task._id ? { ...t, description: e.target.value } : t
//                                     ))}
//                                     style={styles.editTextarea}
//                                     rows="2"
//                                 />
//                                 <div style={styles.formRow}>
//                                     <input
//                                         type="date"
//                                         value={task.dueDate.split('T')[0]}
//                                         onChange={(e) => setTasks(tasks.map(t => 
//                                             t._id === task._id ? { ...t, dueDate: e.target.value } : t
//                                         ))}
//                                         style={styles.dateInput}
//                                     />
//                                     <select
//                                         value={task.priority}
//                                         onChange={(e) => setTasks(tasks.map(t => 
//                                             t._id === task._id ? { ...t, priority: e.target.value } : t
//                                         ))}
//                                         style={styles.select}
//                                     >
//                                         <option value="low">Low Priority</option>
//                                         <option value="medium">Medium Priority</option>
//                                         <option value="high">High Priority</option>
//                                     </select>
//                                     <select
//                                         value={task.status}
//                                         onChange={(e) => setTasks(tasks.map(t => 
//                                             t._id === task._id ? { ...t, status: e.target.value } : t
//                                         ))}
//                                         style={styles.select}
//                                     >
//                                         <option value="active">Active</option>
//                                         <option value="inactive">Inactive</option>
//                                         <option value="completed">Completed</option>
//                                     </select>
//                                 </div>
//                                 <button onClick={() => handleEditTask(task._id, task)} style={styles.saveButton}>
//                                     <FaSave style={styles.buttonIcon} /> Save Changes
//                                 </button>
//                             </div>
//                         ) : (
//                             <div style={styles.taskContent}>
//                                 <div style={styles.taskHeader}>
//                                     <h3 style={styles.taskTitle}>{task.title}</h3>
//                                     <span style={styles.taskMeta}>
//                                         Due: {new Date(task.dueDate).toLocaleDateString()}
//                                     </span>
//                                 </div>
//                                 <p style={styles.taskDescription}>{task.description}</p>
//                                 <div style={styles.taskMeta}>
//                                     <span style={getStatusStyle(task.status)}>{task.status}</span>
//                                     <span style={styles.priorityBadge}>{task.priority}</span>
//                                 </div>
//                                 <div style={styles.taskActions}>
//                                     <button onClick={() => setEditTask(task._id)} style={styles.editButton}>
//                                         <FaEdit style={styles.buttonIcon} /> Edit
//                                     </button>
//                                     <button onClick={() => handleDeleteTask(task._id)} style={styles.deleteButton}>
//                                         <FaTrash style={styles.buttonIcon} /> Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// const getPriorityColor = (priority) => {
//     const colors = {
//         low: '#2ecc71',
//         medium: '#f1c40f',
//         high: '#e74c3c'
//     };
//     return colors[priority] || colors.low;
// };

// const getStatusStyle = (status) => ({
//     padding: '4px 8px',
//     borderRadius: '4px',
//     fontSize: '0.8rem',
//     backgroundColor: status === 'completed' ? '#2ecc71' : 
//                     status === 'inactive' ? '#95a5a6' : '#3498db',
//     color: 'white'
// });

// const styles = {
//     container: {
//         maxWidth: '800px',
//         margin: '2rem auto',
//         padding: '0 20px',
//     },
//     title: {
//         color: '#2c3e50',
//         marginBottom: '2rem',
//         textAlign: 'center',
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1rem',
//         marginBottom: '2rem',
//         background: '#f8f9fa',
//         padding: '1.5rem',
//         borderRadius: '8px',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//     },
//     input: {
//         padding: '12px',
//         fontSize: '1rem',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//         outline: 'none',
//     },
//     textarea: {
//         padding: '12px',
//         fontSize: '1rem',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//         outline: 'none',
//         resize: 'vertical',
//     },
//     addButton: {
//         padding: '12px',
//         backgroundColor: '#2ecc71',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '8px',
//         fontSize: '1rem',
//         transition: 'background-color 0.2s',
//     },
//     taskList: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1rem',
//     },
//     taskItem: {
//         background: 'white',
//         padding: '1.5rem',
//         borderRadius: '8px',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//     },
//     taskContent: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '0.5rem',
//     },
//     taskTitle: {
//         margin: '0',
//         color: '#2c3e50',
//         fontSize: '1.2rem',
//     },
//     taskDescription: {
//         margin: '0',
//         color: '#666',
//         fontSize: '0.95rem',
//     },
//     taskActions: {
//         display: 'flex',
//         gap: '0.5rem',
//         marginTop: '1rem',
//     },
//     editButton: {
//         padding: '8px 16px',
//         backgroundColor: '#3498db',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '4px',
//     },
//     deleteButton: {
//         padding: '8px 16px',
//         backgroundColor: '#e74c3c',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '4px',
//     },
//     editForm: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1rem',
//     },
//     editInput: {
//         padding: '8px',
//         fontSize: '1rem',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//     },
//     editTextarea: {
//         padding: '8px',
//         fontSize: '1rem',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//         resize: 'vertical',
//     },
//     saveButton: {
//         padding: '8px 16px',
//         backgroundColor: '#2ecc71',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '4px',
//     },
//     buttonIcon: {
//         fontSize: '1rem',
//     },
//     error: {
//         color: '#e74c3c',
//         textAlign: 'center',
//         marginBottom: '1rem',
//     },
//     formRow: {
//         display: 'flex',
//         gap: '1rem',
//         width: '100%',
//     },
//     dateInput: {
//         padding: '8px',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//         flex: 1,
//     },
//     select: {
//         padding: '8px',
//         borderRadius: '4px',
//         border: '1px solid #ddd',
//         flex: 1,
//     },
//     taskHeader: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     taskMeta: {
//         display: 'flex',
//         gap: '1rem',
//         alignItems: 'center',
//         marginTop: '0.5rem',
//         fontSize: '0.9rem',
//         color: '#666',
//     },
//     priorityBadge: {
//         textTransform: 'capitalize',
//     }
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: new Date().toISOString().split('T')[0],
        priority: "low",
        status: "active",
        completed: false
    });
    const [editTask, setEditTask] = useState(null);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError("Failed to load tasks.");
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.title) return;

        try {
            await axios.post("http://localhost:5000/tasks", newTask, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNewTask({
                title: "", description: "", 
                dueDate: new Date().toISOString().split('T')[0],
                priority: "low", status: "active", completed: false
            });
            fetchTasks();
        } catch (err) {
            console.error("Error adding task:", err);
            setError("Failed to add task.");
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
            setError("Failed to delete task.");
        }
    };

    const handleEditTask = async (id, updatedTask) => {
        try {
            await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditTask(null);
            fetchTasks();
        } catch (err) {
            console.error("Error updating task:", err);
            setError("Failed to update task.");
        }
    };

    const getPriorityColor = (priority) => {
        const colors = {
            low: '#2ecc71',
            medium: '#f1c40f',
            high: '#e74c3c'
        };
        return colors[priority] || colors.low;
    };

    const getStatusStyle = (status) => ({
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.8rem',
        backgroundColor: status === 'completed' ? '#2ecc71' :
                        status === 'inactive' ? '#95a5a6' : '#3498db',
        color: 'white'
    });

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Task Manager</h1>

            <form onSubmit={handleAddTask} className="dashboard-form">
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                    className="dashboard-input"
                />
                <textarea
                    placeholder="Enter task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="dashboard-textarea"
                    rows="3"
                />
                <div className="dashboard-form-row">
                    <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="dashboard-date"
                    />
                    <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        className="dashboard-select"
                    >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <select
                        value={newTask.status}
                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                        className="dashboard-select"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="dashboard-add-button">
                    <FaPlus /> Add New Task
                </button>
            </form>

            {error && <p className="dashboard-error">{error}</p>}

            <div className="dashboard-task-list">
                {tasks.map((task) => (
                    <div
                        key={task._id}
                        className="dashboard-task-item"
                        style={{
                            borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
                            opacity: task.status === 'inactive' ? 0.6 : 1
                        }}
                    >
                        {editTask === task._id ? (
                            <div className="dashboard-edit-form">
                                <input
                                    type="text"
                                    value={task.title}
                                    onChange={(e) =>
                                        setTasks(tasks.map(t =>
                                            t._id === task._id ? { ...t, title: e.target.value } : t
                                        ))
                                    }
                                    className="dashboard-edit-input"
                                />
                                <textarea
                                    value={task.description}
                                    onChange={(e) =>
                                        setTasks(tasks.map(t =>
                                            t._id === task._id ? { ...t, description: e.target.value } : t
                                        ))
                                    }
                                    className="dashboard-edit-textarea"
                                    rows="2"
                                />
                                <div className="dashboard-form-row">
                                    <input
                                        type="date"
                                        value={task.dueDate.split('T')[0]}
                                        onChange={(e) =>
                                            setTasks(tasks.map(t =>
                                                t._id === task._id ? { ...t, dueDate: e.target.value } : t
                                            ))
                                        }
                                        className="dashboard-date"
                                    />
                                    <select
                                        value={task.priority}
                                        onChange={(e) =>
                                            setTasks(tasks.map(t =>
                                                t._id === task._id ? { ...t, priority: e.target.value } : t
                                            ))
                                        }
                                        className="dashboard-select"
                                    >
                                        <option value="low">Low Priority</option>
                                        <option value="medium">Medium Priority</option>
                                        <option value="high">High Priority</option>
                                    </select>
                                    <select
                                        value={task.status}
                                        onChange={(e) =>
                                            setTasks(tasks.map(t =>
                                                t._id === task._id ? { ...t, status: e.target.value } : t
                                            ))
                                        }
                                        className="dashboard-select"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <button onClick={() => handleEditTask(task._id, task)} className="dashboard-save-button">
                                    <FaSave /> Save Changes
                                </button>
                            </div>
                        ) : (
                            <div className="dashboard-task-content">
                                <div className="dashboard-task-header">
                                    <h3 className="dashboard-task-title">{task.title}</h3>
                                    <span className="dashboard-task-meta">
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="dashboard-task-description">{task.description}</p>
                                <div className="dashboard-task-meta">
                                    <span style={getStatusStyle(task.status)}>{task.status}</span>
                                    <span className="dashboard-priority-badge">{task.priority}</span>
                                </div>
                                <div className="dashboard-task-actions">
                                    <button onClick={() => setEditTask(task._id)} className="dashboard-edit-button">
                                        <FaEdit /> Edit
                                    </button>
                                    <button onClick={() => handleDeleteTask(task._id)} className="dashboard-delete-button">
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

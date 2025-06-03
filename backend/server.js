// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRoutes from "./routes/authRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";

// dotenv.config();

// const app = express();
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"));

// app.use("/api", authRoutes);
// app.use("/api", taskRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors"; // ✅ Import CORS
// import authRoutes from "./routes/authRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";

// dotenv.config();

// const app = express();

// // ✅ Enable CORS to allow frontend requests
// app.use(cors({
//     origin: "http://localhost:3000", // Allow frontend access
//     credentials: true // Allow cookies & headers
// }));

// // Middleware
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.error("MongoDB Connection Error:", err));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// Enable JSON Parsing
app.use(express.json());

// Enable CORS
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

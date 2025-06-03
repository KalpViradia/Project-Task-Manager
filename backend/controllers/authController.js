// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import UserModel from "../models/userModel.js";

// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// export const registerUser = asyncHandler(async (req, res) => {
//     const { user_name, password } = req.body;

//     if (!user_name || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     const userExists = await UserModel.findOne({ user_name });
//     if (userExists) {
//         return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await UserModel.create({ user_name, password: hashedPassword, tasks: [] });

//     if (user) {
//         res.status(201).json({
//             _id: user.id,
//             user_name: user.user_name,
//             token: generateToken(user._id)
//         });
//     } else {
//         res.status(400).json({ message: "Invalid user data" });
//     }
// });

// export const loginUser = asyncHandler(async (req, res) => {
//     const { user_name, password } = req.body;

//     const user = await UserModel.findOne({ user_name });

//     if (user && (await bcrypt.compare(password, user.password))) {
//         res.json({ _id: user.id, user_name: user.user_name, token: generateToken(user._id) });
//     } else {
//         res.status(401).json({ message: "Invalid username or password" });
//     }
// });


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// User Registration
export const registerUser = asyncHandler(async (req, res) => {
    console.log("Received registration request:", req.body);  // Debug request

    const { username, password } = req.body; // Ensure field names match frontend

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await UserModel.findOne({ user_name: username });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with corrected field names
    const user = await UserModel.create({ 
        user_name: username, 
        password: hashedPassword, 
        tasks: [] 
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            user_name: user.user_name,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
});

// User Login
export const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body; // Ensure field names match frontend

    const user = await UserModel.findOne({ user_name: username });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ 
            _id: user.id, 
            user_name: user.user_name, 
            token: generateToken(user._id) 
        });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

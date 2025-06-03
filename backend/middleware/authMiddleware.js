// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import UserModel from "../models/userModel.js";

// export const protect = asyncHandler(async (req, res, next) => {
//     let token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Not authorized, no token" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await UserModel.findById(decoded.id).select("-password");
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Not authorized, invalid token" });
//     }
// });


import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
    console.log("🔍 Checking token in headers:", req.headers.authorization);

    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.log("No token found!");
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token Decoded:", decoded);

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            console.log("User not found!");
            return res.status(401).json({ message: "User not found" });
        }

        console.log("User Authorized:", req.user);
        next();
    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        res.status(401).json({ message: "Not authorized, invalid token" });
    }
});

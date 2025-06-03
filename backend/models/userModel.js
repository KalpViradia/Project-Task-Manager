import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "No Description" },
    dueDate: { type: Date, default: Date.now },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    status: { type: String, enum: ["active", "inactive", "completed"], default: "active" },
    completed: { type: Boolean, default: false }
});

const userSchema = mongoose.Schema(
    {
        user_name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        tasks: [taskSchema]
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

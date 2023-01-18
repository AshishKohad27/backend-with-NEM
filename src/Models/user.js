const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum: ["admin", "user", "writer"],
        default: "admin", 
    }
});

const userModel = model("user", userSchema);

module.exports = userModel;
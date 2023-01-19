const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum: ["admin", "user", "writer"],
        default: "user",
    },
    // post: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "post",
    //     required: true,
    // }
});

const userModel = model("user", userSchema);

module.exports = userModel;
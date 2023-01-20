const { Schema, model } = require("mongoose");

const authSchema = new Schema({
    name: { type: String, require: true },
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
})

const authModel = model("auth", authSchema);

module.exports = authModel;
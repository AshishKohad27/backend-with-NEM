const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: String,
    desc: String,
    author: String,
    auth: {
        type: Schema.Types.ObjectId,
        ref: "auth",
        required: true,
    }
});

const postModel = model("post", postSchema);

module.exports = postModel;
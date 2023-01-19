const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: String,
    desc: String,
    author: String,
});

const postModel = model("post", postSchema);

module.exports = postModel;
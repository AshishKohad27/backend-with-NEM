const postModel = require("../Models/post");

const getPost = async ({ orderBy, limit, page }) => {
    if (!limit) {
        limit = 10
    }
    if (!page) {
        page = 1
    }
    try {
        // let Post = await postModel.find({}).sort({ title: orderBy === "asc" ? 1 : orderBy === "desc" ? -1 : 0 }).limit(+limit).skip((+page - 1) * limit);
        let Post = await postModel.find().populate([{ path: "auth" }]);
        return {
            message: "Post get Successfully",
            data: Post,
            flag: true,
        }
    } catch (e) {
        return {
            message: e.message,
            data: [],
            flag: false,
        }
    }
}

const addPost = async (title, desc, author, auth) => {
    try {
        let post = await new postModel({ title, desc, author, auth });
        post.save();
        let postall = await postModel.find({});
        return {
            message: "post Added Successfully",
            data: postall,
            flag: true,
        }
    } catch (e) {
        return {
            message: e.message,
            data: [],
            flag: false,
        }
    }
}
module.exports = { getPost, addPost };
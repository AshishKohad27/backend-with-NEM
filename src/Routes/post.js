const express = require("express");
const { getPost, addPost } = require("../Controllers/post");
const postRoute = express.Router();

postRoute.get("/", async (req, res) => {
    const { orderBy, limit, page } = req.query;
    console.log('orderBy, limit, page:', orderBy, limit, page);

    const { message, data, flag } = await getPost({ orderBy, limit, page });
    if (flag) {
        res.send({ message, flag, data })
    } else {
        res.send({ message, flag, data });
    }
})

postRoute.post("/", async (req, res) => {
    const { title, desc, author } = req.body;
    const { message, data, flag } = await addPost(title, desc, author);
    if (flag) {
        res.send({ message, data, flag })
    } else {
        res.send({ message, data, flag })
    }
})


module.exports = postRoute;
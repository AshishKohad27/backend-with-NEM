const express = require("express");
const { getPost, addPost } = require("../Controllers/post");
const postRoute = express.Router();
const jwt = require("jsonwebtoken")

const authMiddleWare = (req, res, next) => {
    const token = req.headers["authorization"];
    console.log('token:', token)
    // next();
    try {
        if (!token) {
            return res.status(400).send({
                data: [],
                message: "Unauthorized Person",
                flag: false,
                desc: "",
            });
        } else if (token) {
            const verification = jwt.decode(token, "SECRET_AUTH");
            req.userId = verification.id;
            next();
        }
    } catch (error) {
        console.log("error:", error);
        return res.status(400).send({
            data: [],
            message: "Error Occur",
            flag: false,
            desc: error.message,
        });
    }
}

postRoute.get("/", async (req, res) => {
    const { orderBy, limit, page } = req.query;
    console.log('orderBy, limit, page:', orderBy, limit, page);
    // console.log("userId", req.userId);

    const { message, data, flag } = await getPost({ orderBy, limit, page });
    if (flag) {
        res.send({ message, flag, data })
    } else {
        res.send({ message, flag, data });
    }
})

postRoute.post("/", authMiddleWare, async (req, res) => {
    const { title, desc, author } = req.body;
    const { message, data, flag } = await addPost(title, desc, author, auth = req.userId);
    if (flag) {
        res.send({ message, data, flag })
    } else {
        res.send({ message, data, flag })
    }
})


module.exports = postRoute;
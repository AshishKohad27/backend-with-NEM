const express = require("express");
const { getUser, postUser } = require("../Controllers/user");
const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
    const { message, data, flag } = await getUser();
    if (flag) {
        res.status(200).send(data);
    } else {
        res.send(message);
    }
});

userRoute.post("/", async (req, res) => {
    const { username, password } = req.body;
    const { message, data, flag } = await postUser(username, password);
    if (flag) {
        res.send({ message, data, flag })
    } else {
        res.send({ message, data, flag })
    }
})

module.exports = userRoute;
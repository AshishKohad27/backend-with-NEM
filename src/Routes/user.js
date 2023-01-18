const express = require("express");
const { getUser } = require("../Controllers/user");
const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
    const { message, data, flag } = await getUser();
    if (flag) {
        res.status(200).send(data);
    } else {
        res.send(message);
    }
})

module.exports = userRoute;
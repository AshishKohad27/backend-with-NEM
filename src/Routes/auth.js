const express = require("express");
const authRoute = express.Router();
const authModel = require("../Models/auth");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken")

authRoute.get("/", async (req, res) => {
    res.send("Hello From Auth");
})

authRoute.post("/signup", async (req, res) => {
    const { name, username, email, password } = req.body;
    const authCheck = await authModel.find({ email });
    const hash = await argon2.hash(password);
    console.log('hash:', hash);
    try {
        if (authCheck) {
            return res.status(201).send({ message: "Auth with this email id already have an account", desc: "", auth: authCheck })
        }
        let auth = new authModel({ name, username, email, password: hash });
        await auth.save();
        return res.status(200).send({ message: "Signup SuccessFully", desc: "", auth })
    } catch (e) {
        return res.status(401).send({ message: "Error...", desc: e.message });
    }
});

authRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const authFind = await authModel.findOne({ email });
    console.log('authFind:', authFind);
    try {

        if (authFind && await argon2.verify(authFind.password, password)) {
            let token = jwt.sign(
                { id: authFind._id, name: authFind.name, username: authFind.username, email: authFind.email },
                "SECRET_AUTH",
                { expiresIn: "4 days" }
            )
            return res.status(200).send({ message: "Login SuccessFully", desc: "", auth: authFind, token })
        } else {
            return res.status(404).send({ message: "Email Not Found", desc: "", auth: [] })
        }

    } catch (e) {
        return res.status(401).send({ message: "Error...", desc: e.message });
    }
})

module.exports = authRoute;
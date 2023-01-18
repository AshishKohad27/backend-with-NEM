//1. import 
require("dotenv").config();
const express = require("express");
const cors = require("cors");

//2.routes import
const { userRoutes } = require("./Routes/allroutes");

//3.connect
const connect = require("./config/db");

//4.port
const PORT = process.env.PORT

//5.create
const app = express();

//6.use
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes)

//7. own routes
app.get("/", (req, res) => {
    res.send("Hello World!")
})

//8.listen
app.listen(PORT, async (req, res) => {
    await connect();
    console.log(`Listening on http://localhost:${PORT}`)
})
const userModel = require("../Models/user");
const jwt = require("jsonwebtoken");

const getUser = async () => {
    try {
        let user = await userModel.find({});
        return {
            message: "Data get Successfully",
            data: user,
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

const postUser = async (username, password) => {
    const token = req.headers["authorization"]
    console.log('token:', token);
    try {
        if (!token) {
            let user = await new userModel({ username, password });
            user.save();
            return {
                message: "User Added Successfully",
                data: user,
                flag: true,
            }
        } else {
            const decode = jwt.decode(token, "SECRET")
            console.log('decode:', decode);
            if (decode.role === "admin") {
                let user = await new userModel({ username, password, role: "writer" });
                await user.save();
                return {
                    message: "Writer Added Successfully",
                    data: user,
                    flag: true,
                }
            }
        }
    } catch (e) {
        return {
            message: e.message,
            data: [],
            flag: false,
        }
    }
}
module.exports = { getUser, postUser };
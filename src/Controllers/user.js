const userModel = require("../Models/user");

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
    try {
        let user = await new userModel({ username, password });
        user.save();
        let userall = await userModel.find({});
        return {
            message: "User Added Successfully",
            data: userall,
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
module.exports = { getUser, postUser };
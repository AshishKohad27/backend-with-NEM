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
            flag: true,
        }
    }
}

module.exports = { getUser };
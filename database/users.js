const mongoose = require("mongoose");

// create user schema
const UserSchema = mongoose.Schema(
    {
        username: String,
        email: String,
        password: String
    }
);

const UserModel = mongoose.model("users", UserSchema);      // users (MongoDB Collection)

module.exports = UserModel;

const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // avatar:{
    //     public_id: { type: String, required: true },
    //     url: { type: String, required: true }
    // },
    avatar: { type: String },
    isAdmin: { type: String, default: "user" }
}, {
    timestamps: true
})


module.exports = mongoose.model("User", UserSchema)
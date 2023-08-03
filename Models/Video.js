const mongoose = require("mongoose")


const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    discription: { type: String },
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, require: true },
    views: { type: Number, default: 0 },
    year: { type: String },
    timing: { type: String },
    category: { type: Array },
    likes: { type: Number, default: 0 },

}, {
    timestamps: true
})


module.exports = mongoose.model("Video", VideoSchema)
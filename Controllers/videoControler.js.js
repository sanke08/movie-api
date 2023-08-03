const Video = require("../Models/Video")


// create 
exports.createVideo = async (req, res) => {
    const { title, discription, videoUrl, thumbnailUrl, category, timing, year } = req.body
    if (!title || !discription || !videoUrl || !thumbnailUrl) return res.status(400).json({ message: "please enter  all fields" })
    try {
        const exist = await Video.findOne({ title })
        if (exist) return res.status(400).json("already exists")
        const newVideo = await Video.create({ title, discription, videoUrl, thumbnailUrl, category, timing, year })
        res.json({ newVideo })
    } catch (error) {
        res.json({ message: error.message })

    }
}



exports.getAllVideo = async (req, res) => {
    const videoCount = await Video.countDocuments()
    const videos = Video.find()
    const keyward = req.query.keyward ? {
        title: {
            $regex: req.query.keyward,
            $options: "i"
        }
    } : {}

    const resultPerPage = 4
    const currentPage = req.query.page ? req.query.page : 1
    const skipPage = resultPerPage * (currentPage - 1)

    try {
        const video = await videos.find({ ...keyward }).limit(resultPerPage).skip(skipPage)
        res.json({ video, videoCount, resultPerPage })
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.randomVideo = async (req, res) => {

    try {
        const videoCount = await Video.countDocuments()

        const video = await Video.aggregate([
            { $sample: { size: 10 } }
        ])
        res.json({ video, videoCount })
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return res.status(404).json("not found")
        res.json({ video })
    } catch (error) {
        res.json({ message: error.message })
    }
}





exports.getAllVideoAdmin = async (req, res) => {
    try {
        const videoCount = await Video.countDocuments()
        const videos = Video.find()
        const keyward = req.query.keyward ? {
            title: {
                $regex: req.query.keyward,
                $options: "i"
            }
        } : {}
        const video = await videos.find({ ...keyward })
        res.json({ video, videoCount })
    } catch (error) {
        res.json({ message: error.message })
    }
}



exports.deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return res.status(404).json({ message: "User Not Found" })
        await Video.findByIdAndDelete(video.id)
        res.json({ message: "delete Successfully" })
    } catch (error) {
        res.json({ message: error.message })
    }
}
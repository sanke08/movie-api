const jwt = require("jsonwebtoken")
const User = require("../Models/User")




exports.isAuthanticated = async (req, res, next) => {
    try {
        const { token } = req.cookies
        const decodeData = jwt.verify(token, process.env.SECRET_KET)
        req.user = await User.findById(decodeData.id)
        next()
    } catch (error) {
        res.json({ message: error.message })
    }
}


exports.admin = (...isAdmin) => {
    try {
        return (req, res, next) => {
            if (!isAdmin.includes(req.user.isAdmin)) {
                return res.status(400).json({ message: `${req.user.isAdmin} not alloweed to access this resource` })
            }
            next()
        }
    } catch (error) {
        res.json({ message: error.message })   
    }
}
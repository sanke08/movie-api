const User = require("../Models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")







exports.signup = async (req, res) => {
    

    const { name, password, email, avatar } = req.body

    if (!name || !password || !email) return res.status(400).json({ message: "Please Enter All Fields" })
    const exixtUser = await User.findOne({ email })
    if (exixtUser) return res.status(400).json({ message: "user Already Exists" })
    const exixtUserName = await User.findOne({ name })
    if (exixtUserName) return res.status(400).json({ message: "userName Already Exists" })
    try {
        const user = await User.create({
            name, email, password: await bcrypt.hash(password, 12),
            //  avatar: {
            //     public_id: myCloude.public_id,
            //     url: myCloude.secure_url
            // }
            avatar
        
        res.json({ user })
    } catch (error) {
        res.json(error)
    }
}




exports.signin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: "Please enter all required fields" })
    console.log("Please enter all required fields")
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "User Not Found" })
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (!isMatchPassword) return res.status(400).json({ message: "invalid credentials" })
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KET)
        console.log(user.id)
        res.cookie("token", token, {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }) 
        res.json({ user })
    } catch (error) {
        res.json({ message: error.message })
    }
}





exports.logout = async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.json("logout success")
}


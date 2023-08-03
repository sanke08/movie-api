const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const auth = require("./Routes/loginSignupRoutes")
const video = require("./Routes/videoRoutes")
const user = require("./Routes/userRoutes")
const cors=require("cors")
const cookieParser = require("cookie-parser")


app.use(cors())
dotenv.config()
app.use(cookieParser())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: "youtube"


}).then(() => console.log("connected")).catch((error) => console.log(error))
// mongoose.connect(process.env.MONG_URL, {
//     dbName: "youtube"
// }).then(() => console.log("connected")).catch((error) => console.log(error))


app.use("/api/auth", auth)
app.use("/api/video", video)
app.use("/api/user", user)






app.listen(8800, () => {
    console.log("listining")
})

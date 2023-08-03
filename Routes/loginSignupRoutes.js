const router = require("express").Router()
const { signup, signin, logout } = require("../Controllers/loginSignupSontroller")
const { isAuthanticated } = require("../utils/isAdmin")







router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/logout").get(isAuthanticated,logout)






module.exports = router
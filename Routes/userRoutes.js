const router = require("express").Router()
const { myAccount, getAllUsers, deleteUser, getUser } = require("../Controllers/userControler")
const { isAuthanticated, admin } = require("../utils/isAdmin")


router.route("/me").get(isAuthanticated, myAccount)
router.route("/getAllUsers").get(isAuthanticated, admin("admin"), getAllUsers)
router.route("/getUser/:id").get(isAuthanticated, admin("admin"), getUser)
router.route("/deleteUser/:id").delete(isAuthanticated, admin("admin"), deleteUser)


module.exports = router
 
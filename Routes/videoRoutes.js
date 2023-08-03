const { createVideo, getAllVideo, getVideo, randomVideo, getAllVideoAdmin, deleteVideo } = require("../Controllers/videoControler.js")
const { admin, isAuthanticated } = require("../utils/isAdmin.js")



const router = require("express").Router()



router.route("/create").post(isAuthanticated, admin("admin"), createVideo)
router.route("/getAllVideo").get(getAllVideo)
router.route("/getAllVideoAdmin").get(isAuthanticated, admin("admin"), getAllVideoAdmin)
router.route("/getRandomVideo").get(randomVideo)
router.route("/getVideo/:id").get(getVideo)
router.route("/deleteVideo/:id").delete(isAuthanticated, admin("admin"), deleteVideo)


module.exports = router

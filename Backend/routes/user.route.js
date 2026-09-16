const router = require("express").Router()
const { getAllUsers, createUser, getDeletedUsers, getOneUser, updateUser, softDeleteUser, DeleteUser } = require("../controllers/user.controller")
const auth = require("../middlewares/authMiddleware")
const restrictTo = require("../middlewares/restrictTo")



router.route("/").get(auth,restrictTo("admin","user"),getAllUsers).post(createUser)

router.route("/deleted-users").get(getDeletedUsers)


router.route("/:id").get(getOneUser).patch(updateUser).delete(DeleteUser)
router.route("/:id/soft-delete").patch(softDeleteUser)



module.exports = router
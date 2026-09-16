const { signup, confirmEmail, login, forgetPassword, resetPassword, getMe } = require("../controllers/auth.controller")
const auth = require("../middlewares/authMiddleware")

const router = require("express").Router()


router.route("/signup").post(signup)
router.route("/confirm-email").post(confirmEmail)
router.route("/login").post(login)
router.route("/forget-password").post(forgetPassword)
router.route("/reset-password/:token").post(resetPassword)
router.route("/me").get(auth,getMe)




module.exports = router
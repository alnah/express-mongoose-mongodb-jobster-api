const router = require("express").Router();

const { register, login, updateUser } = require("../controllers/auth");
const authUserMiddleware = require("../middlewares/auth-user");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authUserMiddleware, updateUser);

module.exports = router;

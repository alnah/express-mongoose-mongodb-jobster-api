const router = require("express").Router();

const { register, login, updateUser } = require("../controllers/auth");
const authUser = require("../middlewares/auth-user");
const testUser = require("../middlewares/test-user");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authUser, testUser, updateUser);

module.exports = router;

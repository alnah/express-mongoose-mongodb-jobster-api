const router = require("express").Router();
const rateLimit = require("express-rate-limit");

const { register, login, updateUser } = require("../controllers/auth");
const authUser = require("../middlewares/auth-user");
const testUser = require("../middlewares/test-user");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3, // 15 minutes
  limit: 10, // limit each IP to 10 requests per 15 minutes
  standardHeaders: "draft-7", // draft-7: combined `RateLimit` header
  legacyHeaders: false, // disable the `X-RateLimit-*` headers
});

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authUser, testUser, updateUser);

module.exports = router;

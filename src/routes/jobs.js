const router = require("express").Router();

const {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
const testUser = require("../middlewares/test-user");

router.route("/").get(getAllJobs).post(testUser, createJob);
router
  .route("/:id")
  .get(getJob)
  .patch(testUser, updateJob)
  .delete(testUser, deleteJob);

module.exports = router;

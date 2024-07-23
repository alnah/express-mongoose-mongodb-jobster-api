const { StatusCodes } = require("http-status-codes");
const moment = require("moment");

const Job = require("../models/job");
const { BadRequestError } = require("../errors");

const getAllJobs = async (req, res, next) => {
  const {
    user: { _id: userId },
    query: { status, jobType, sort, search },
  } = req;

  const query = { createdBy: userId };

  if (search) query.position = { $regex: search, $options: "i" };
  if (status && status !== "all") query.status = status;
  if (jobType && jobType !== "all") query.jobType = jobType;

  let result = Job.find(query);

  switch (sort) {
    case "oldest":
      result = result.sort("createdAt");
      break;
    case "a-z":
      result = result.sort("position");
      break;
    case "z-a":
      result = result.sort("-position");
      break;
    default:
      result = result.sort("-createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;
  const totalJobs = await Job.countDocuments(query);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const createJob = async (req, res, next) => {
  req.body.createdBy = req.user._id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getJob = async (req, res, next) => {
  const {
    user: { _id: userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new BadRequestError(`Could not find a job with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res, next) => {
  const {
    body: { company, position },
    user: { _id: userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Fields company and position cannot be empty.");
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!job) {
    throw new BadRequestError(`Could not find a job with id: ${jobId}.`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res, next) => {
  const {
    user: { _id: userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new BadRequestError(`Could not find a job with id: ${jobId}.`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const showStats = async (req, res, next) => {
  // aggregate pending, interview and declined status
  let stats = await Job.aggregate([
    { $match: { createdBy: req.user._id } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  // reshape the data structure expexcted by the client
  stats = stats.reduce((accumulator, current) => {
    const { _id: title, count } = current;
    accumulator[title] = count;
    return accumulator;
  }, {});

  // set default stats for a new user
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications: [] });
};

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
  showStats,
};

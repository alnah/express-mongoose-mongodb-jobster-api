const { StatusCodes } = require("http-status-codes");

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

  const jobs = await result;
  res.status(StatusCodes.OK).json({ jobs });
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

module.exports = { getAllJobs, createJob, getJob, updateJob, deleteJob };

const mongoose = require("mongoose");

const JobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company."],
      maxLength: 60,
    },
    position: {
      type: String,
      required: [true, "Please provide a position."],
      maxLength: 120,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);

const { BadRequestError } = require("../errors");

const testUser = (req, res, next) => {
  if (req.testUser) {
    throw new BadRequestError("Test User. Read Only!");
  }
  next();
};

module.exports = testUser;

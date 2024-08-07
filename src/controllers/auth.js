const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const User = require("../models/user");

const register = async (req, res, next) => {
  const user = await User.create({ ...req.body });
  const token = user.createJwt();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password are required fields.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("No account found with this email address.");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong password for this email account.");
  }
  const token = user.createJwt();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const {
    user: { _id: userId },
    body: { name, email, lastName, location },
  } = req;

  if (!name || !email || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { name, email, lastName, location },
    { new: true, runValidators: true }
  );

  const token = user.createJwt();

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};

module.exports = { register, login, updateUser };

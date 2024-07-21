require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xssClean = require("xss-clean");

const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs");

const authUserMiddleware = require("./middlewares/auth-user");
const routeNotFoundMiddleware = require("./middlewares/route-not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

const connectDb = require("./db/connect");

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

// trust proxy
app.enable("trust proxy");

// parser
app.use(express.json());

// security
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 min
    limit: 100, // limit each IP to 100 requests per `window`, here, per 15 min
    standardHeaders: "draft-7", // combined `RateLimit` header
    legacyHeaders: false, // disable the `X-RateLimit-*` headers
  })
);
app.use(helmet());
app.use(cors());
app.use(xssClean());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authUserMiddleware, jobsRoutes);

// middlewares
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

// start
const start = async () => {
  try {
    await connectDb(uri);
    console.log("Connected to the database...");
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.error(error);
  }
};

start();

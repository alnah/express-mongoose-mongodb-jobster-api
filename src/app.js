const path = require("path");

require("dotenv").config();
require("express-async-errors");

const express = require("express");
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
const clientBuild = path.resolve(__dirname, "..", "..", "client", "build");

// trust proxy
// app.enable("trust proxy");
app.use(express.static(clientBuild));

// parser
app.use(express.json());

// security
app.use(helmet());
app.use(xssClean());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authUserMiddleware, jobsRoutes);

// serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(clientBuild, "index.html"));
});

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

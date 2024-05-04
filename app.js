const express = require("express");
const env = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/auth");
// const userRouter = require("./routes/user");
const organizationRouter = require("./routes/organization");
const userOrganization = require("./routes/userOrganization");
const budgetRouter = require("./routes/budget");
const expenseRouter = require("./routes/expense");
const gen_modelsRouter = require("./routes/gen_models");

const AppError = require("./utils/appError");
const globalError = require("./controllers/error/globalError");

env.config({
  path: "./.env",
});

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
app.use("/api/organization", organizationRouter);
app.use("/api/userOrganization", userOrganization);
app.use("/api/budget", budgetRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/models", gen_modelsRouter);

app.all("*", (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );

  next(error);
});

app.use(globalError);

module.exports = app;

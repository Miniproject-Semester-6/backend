const express = require("express");
const env = require("dotenv");
const morgan = require("morgan");

const authRouter = require("./routes/auth");
// const userRouter = require("./routes/user");
const organizationRouter = require("./routes/organization");
const userOrganization = require("./routes/userOrganization");
const budgetRouter = require("./routes/budget");
const expenseRouter = require("./routes/expense");

const AppError = require("./utils/appError");
const globalError = require("./controllers/error/globalError");

env.config({
  path: "./.env",
});

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
app.use("/api/organization", organizationRouter);
app.use("/api/linkUserOrganization", userOrganization);
app.use("/api/budget", budgetRouter);
app.use("/api/expense", expenseRouter);

app.all("*", (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );

  next(error);
});

app.use(globalError);

module.exports = app;

const express = require("express");
const env = require("dotenv");
const morgan = require("morgan");
// const authRouter = require("./routes/auth");
// const userRouter = require("./routes/user");
const organizationRouter = require("./routes/organization");
const budgetRouter = require("./routes/budget");
const expenseRouter = require("./routes/expense");

env.config({
  path: "./.env",
});

const app = express();
app.use(morgan("dev"));
app.use(express.json());

// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
app.use("/api/organization", organizationRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/expense", expenseRouter);

module.exports = app;

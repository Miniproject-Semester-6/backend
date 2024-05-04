const UserOrganization = require("../../models/userOrganization");
const Expense = require("../../models/expense");
const { modelsClient } = require("../../restClients");
const AppError = require("../../utils/appError");

const forecast = async (req, res, next) => {
  const allowedRoles = ["owner"];
  try {
    const { user } = req;
    const { orgid: organization, budgetid: budget } = req.query;

    if (!organization || !budget)
      return next(
        new AppError("Please provide organization and budget id", 400),
      );

    const userOrg = await UserOrganization.find({
      user: user._id,
      organization,
    });

    if (user.role !== "SUPER_ADMIN" && !allowedRoles.includes(userOrg[0]?.role))
      return next(new AppError("You are not authorized for this action!", 403));

    const expenses = await Expense.find({ budget, organization })
      .sort({ createdAt: -1 })
      .limit(90);

    const aggregatedExpenses = expenses.reduce((acc, expense) => {
      const dateKey = new Date(expense.createdAt).toISOString().split("T")[0];

      if (!acc[dateKey]) {
        acc[dateKey] = {
          totalExpenses: 0,
          date: dateKey,
        };
      }

      acc[dateKey].totalExpenses += expense.amount;

      return acc;
    }, {});

    const formattedExpenses = Object.values(aggregatedExpenses);

    const response = await modelsClient({
      method: "POST",
      url: "/forecast",
      data: formattedExpenses,
    });

    if (response.status === 200)
      res.status(200).json({
        status: "success",
        results: response.data.length,
        data: response.data,
      });
    else return next(new AppError("Something went wrong!", 500));
  } catch (error) {
    next(error);
  }
};

module.exports = forecast;

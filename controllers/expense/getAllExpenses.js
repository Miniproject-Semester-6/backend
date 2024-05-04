const Budget = require("../../models/budget");
const Expense = require("../../models/expense");

const getAllExpense = async (req, res, next) => {
  try {
    const query = {};
    const { startDate, endDate } = req.query;

    if (!req.query.budgetid && req.user.role !== "SUPER_ADMIN")
      return next(new AppError("You are not authorised for this action!", 403));

    if (req.query.budgetid) query.budget = req.query.budgetid;

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const expenses = await Expense.find(query);
    const budget = await Budget.findById(req.query.budgetid);

    res.status(200).json({
      status: "success",
      results: expenses.length,
      data: {
        expenses,
        budget,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllExpense;

const Expense = require("../../models/expense");

const getAllExpense = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.budgetid) query.budget = req.query.budgetid;

    const expenses = await Expense.find(query);

    res.status(200).json({
      status: "success",
      results: expenses.length,
      data: {
        expenses,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllExpense;

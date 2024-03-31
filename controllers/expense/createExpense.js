const Expense = require("../../models/expense");
const Budget = require("../../models/budget");

const createExpense = async (req, res, next) => {
  try {
    const { budget, amount } = req.body;

    const bgt = await Budget.findById(budget);
    bgt.spend += amount;
    await bgt.save();

    const expense = await Expense.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        expense,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createExpense;

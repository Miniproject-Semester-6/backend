const Budget = require("../../models/budget");

const getAllBudgets = async (req, res, next) => {
  try {
    const query = {};

    if (req.query.orgid) query.organization = req.query.orgid;

    const budgets = await Budget.find(query);

    res.status(200).json({
      status: "success",
      results: budgets.length,
      data: {
        budgets,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllBudgets;

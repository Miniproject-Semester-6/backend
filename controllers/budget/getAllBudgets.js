const Budget = require("../../models/budget");
const Organization = require("../../models/organization");
const AppError = require("../../utils/appError");

const getAllBudgets = async (req, res, next) => {
  try {
    const query = {};

    if (!req.query.orgid && req.user.role !== "SUPER_ADMIN")
      return next(new AppError("You are not authorised for this action!", 403));

    if (req.query.orgid) query.organization = req.query.orgid;

    const budgets = await Budget.find(query);
    const organization = await Organization.findById(req.query.orgid);

    res.status(200).json({
      status: "success",
      results: budgets.length,
      data: {
        budgets,
        organization,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllBudgets;

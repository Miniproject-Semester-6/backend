const UserOrganization = require("../../models/userOrganization");
const Budget = require("../../models/budget");
const Expense = require("../../models/expense");
const AppError = require("../../utils/appError");

const createExpense = async (req, res, next) => {
  const allowedRoles = ["owner", "manager", "employee"];

  try {
    const { user } = req;
    const { organization, budget, amount } = req.body;

    const userOrg = await UserOrganization.find({
      user: user._id,
      organization,
    });
    if (user.role !== "SUPER_ADMIN" && !allowedRoles.includes(userOrg[0]?.role))
      return next(new AppError("You are not authorized for this action!", 403));

    const bgt = await Budget.findById(budget);
    bgt.spend += Number(amount);
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

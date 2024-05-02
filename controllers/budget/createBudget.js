const Budget = require("../../models/budget");
const Organization = require("../../models/organization");
const UserOrganization = require("../../models/userOrganization");
const AppError = require("../../utils/appError");

const createBudget = async (req, res, next) => {
  const allowedRoles = ["owner", "manager"];

  try {
    const { user } = req;
    const { organization, amount } = req.body;

    const userOrg = await UserOrganization.find({
      user: user._id,
      organization,
    });
    if (user.role !== "SUPER_ADMIN" && !allowedRoles.includes(userOrg[0]?.role))
      return next(new AppError("You are not authorized for this action!", 403));

    const org = await Organization.findById(organization);
    org.spend += Number(amount);
    await org.save();

    const budget = await Budget.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        budget,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createBudget;

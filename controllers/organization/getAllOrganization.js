const Organization = require("../../models/organization");
const AppError = require("../../utils/appError");

const getAllOrganization = async (req, res, next) => {
  try {
    const { user } = req;

    if (user.role !== "SUPER_ADMIN")
      return next(new AppError("You are not authorised for this action!", 403));

    const organizations = await Organization.find();

    res.status(200).json({
      status: "success",
      results: organizations.length,
      data: {
        organizations,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllOrganization;

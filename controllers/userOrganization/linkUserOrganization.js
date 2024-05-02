const UserOrganization = require("../../models/userOrganization");

const linkUserOrganization = async (req, res, next) => {
  try {
    const userOrg = await UserOrganization.create(req.body);

    if (req.user.role !== "SUPER_ADMIN")
      return next(
        new AppError("You are not authorized to access this route", 403),
      );

    res.status(201).json({
      status: "success",
      data: {
        userOrg,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = linkUserOrganization;

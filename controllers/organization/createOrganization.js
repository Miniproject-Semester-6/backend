const Organization = require("../../models/organization");

const createOrganization = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== "SUPER_ADMIN")
      return next(new AppError("You are not authorised for this action!", 403));

    const organization = await Organization.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        organization,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createOrganization;

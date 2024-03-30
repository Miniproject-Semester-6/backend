const Organization = require("../../models/organization");
const AppError = require("../../utils/appError");

const updateOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.params.organizationId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!organization) return next(new AppError("Organization not found", 404));

    res.status(200).json({
      status: "success",
      data: {
        organization,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateOrganization;

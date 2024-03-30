const Organization = require("../../models/organization");
const AppError = require("../../utils/appError");

const getOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.findById(req.params.organizationId);

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

module.exports = getOrganization;

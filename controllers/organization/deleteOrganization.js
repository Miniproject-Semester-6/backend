const Organization = require("../../models/organization");
const AppError = require("../../utils/appError");

const deleteOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.findByIdAndDelete(
      req.params.id,
    );

    if (!organization) return next(new AppError("Organization not found", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteOrganization;

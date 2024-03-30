const Organization = require("../../models/organization");

const getAllOrganization = async (req, res, next) => {
  try {
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

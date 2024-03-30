const Organization = require("../../models/organization");

const createOrganization = async (req, res, next) => {
  try {
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

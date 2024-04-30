const UserOrganization = require("../../models/userOrganization");

const linkUserOrganization = async (req, res, next) => {
  try {
    const userOrg = await UserOrganization.create(req.body);

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

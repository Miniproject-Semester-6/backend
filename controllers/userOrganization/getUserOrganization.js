const UserOrganization = require("../../models/userOrganization");

const getUserOrganization = async (req, res, next) => {
  try {
    const { user } = req;

    const userOrg = await UserOrganization.find({
      user: user._id,
    }).populate("organization");

    const formattedData = userOrg.map((userOrg) => {
      return {
        id: userOrg.organization._id,
        name: userOrg.organization.name,
        role: userOrg.role,
      };
    });

    res.status(200).json({
      status: "success",
      results: userOrg.length,
      data: formattedData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserOrganization;

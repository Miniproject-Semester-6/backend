const Budget = require("../../models/budget");
const Organization = require("../../models/organization");

const createBudget = async (req, res, next) => {
  try {
    const { organization, amount } = req.body;

    const org = await Organization.findById(organization);
    org.spend += amount;
    await org.save();

    const budget = await Budget.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        budget,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createBudget;

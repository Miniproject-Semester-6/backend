const mongoose = require("mongoose");
const validateSpend = require("../validators/spend");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A organization must have a name"],
    maxLength: [
      40,
      "A organization name must have less or equal then 40 characters",
    ],
    minLength: [
      3,
      "A organization name must have more or equal then 3 characters",
    ],
  },
  budget: {
    type: Number,
    required: [true, "A organization must have a budget"],
    min: [0, "A organization budget must be more or equal then 0"],
  },
  spend: {
    type: Number,
    default: 0,
    min: [0, "A organization spent must be more or equal then 0"],
    validate: {
      validator: function (spend) {
        return validateSpend(spend, this.budget);
      },
      message: "Spend should be less than budget",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;

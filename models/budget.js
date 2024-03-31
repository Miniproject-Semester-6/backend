const mongoose = require("mongoose");
const validateSpend = require("../validators/spend");

const budgetSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "A budget with this name already exists"],
    required: [true, "A budget must have a name"],
    maxLength: [40, "A budget name must have less or equal then 40 characters"],
    minLength: [3, "A budget name must have more or equal then 3 characters"],
  },
  amount: {
    type: Number,
    required: [true, "A budget must have a amount"],
    min: [0, "A budget amount must be more or equal then 0"],
  },
  spend: {
    type: Number,
    default: 0,
    min: [0, "A spend must be more or equal then 0"],
    validate: {
      validator: function (spend) {
        return validateSpend(spend, this.amount);
      },
      message: "Spend should be less than amount of budget",
    },
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: [true, "A budget must have a organization"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

budgetSchema.pre("save", async function (next) {
  await this.validate();
  next();
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;

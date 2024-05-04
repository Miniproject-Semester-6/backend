const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An expense must have a name"],
    maxLength: [
      40,
      "An expense name must have less or equal then 80 characters",
    ],
    minLength: [3, "An expense name must have more or equal then 3 characters"],
  },
  amount: {
    type: Number,
    required: [true, "An expense must have a amount"],
    min: [0, "An expense amount must be more or equal then 0"],
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: [true, "An expense must have a organization"],
  },
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
    required: [true, "An expense must have a budget"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

expenseSchema.index({ createdAt: -1 });

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;

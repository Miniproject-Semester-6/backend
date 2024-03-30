const mongoose = require("mongoose");

const userOrganizationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["owner", "manager", "employee"],
      message:
        "{VALUE} not allowed. Role is either: owner, manager, or employee",
    },
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const UserOrganization = mongoose.model(
  "UserOrganization",
  userOrganizationSchema,
);

module.exports = UserOrganization;

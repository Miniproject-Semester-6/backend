const express = require("express");
const {
  linkUserOrganization,
  getUserOrganization,
} = require("../controllers/userOrganization/exports");
const { authorize, protect } = require("../middlewares/auth/authorization");

const router = express.Router();

router
  .route("/")
  .get(protect, getUserOrganization)
  .post(protect, linkUserOrganization);

module.exports = router;

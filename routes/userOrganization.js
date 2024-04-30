const express = require("express");
const {
  linkUserOrganization,
} = require("../controllers/userOrganization/exports");
const { authorize, protect } = require("../middlewares/auth/authorization");

const router = express.Router();

router.route("/").post(protect, authorize, linkUserOrganization);

module.exports = router;

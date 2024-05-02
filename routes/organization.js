const express = require("express");
const {
  getAllOrganization,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organization/exports");
const { protect } = require("../middlewares/auth/authorization");

const router = express.Router();

router
  .route("/")
  .get(protect, getAllOrganization)
  .post(protect, createOrganization);
// router
//   .route("/:id")
//   .get(getOrganization)
//   .patch(updateOrganization)
//   .delete(deleteOrganization);

module.exports = router;

const express = require("express");
const {
  getAllOrganization,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organization/exports");

const router = express.Router();

router.route("/").get(getAllOrganization).post(createOrganization);
router
  .route("/:id")
  .get(getOrganization)
  .patch(updateOrganization)
  .delete(deleteOrganization);

module.exports = router;

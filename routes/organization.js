const express = require("express");
const { getAllOrganization } = require("../controllers/organization/exports");

const router = express.Router();

// router.param("organizationId", (req, res, next, organizationId) => {
//   req.organizationId = organizationId;
//   next();
// });

router.route("/").get(getAllOrganization).post();
router.route("/:organizationId").get().patch().delete();

module.exports = router;

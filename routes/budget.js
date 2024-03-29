const express = require("express");

const router = express.Router();

router.route("/").get().post();
router.route("/:budgetId").get().patch().delete();

module.exports = router;

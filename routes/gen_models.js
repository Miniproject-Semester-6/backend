const express = require("express");

const { forecast } = require("../controllers/gen_models/exports");
const { protect } = require("../middlewares/auth/authorization");

const router = express.Router();

router.route("/forecast").post(protect, forecast);

module.exports = router;

const express = require("express");
const {
  createBudget,
  getAllBudgets,
} = require("../controllers/budget/exports");
const { protect } = require("../middlewares/auth/authorization");

const router = express.Router();

router.route("/").get(protect, getAllBudgets).post(protect, createBudget);
// router.route("/:id").get().patch().delete();

module.exports = router;

const express = require("express");
const {
  createBudget,
  getAllBudgets,
} = require("../controllers/budget/exports");

const router = express.Router();

router.route("/").get(getAllBudgets).post(createBudget);
router.route("/:id").get().patch().delete();

module.exports = router;

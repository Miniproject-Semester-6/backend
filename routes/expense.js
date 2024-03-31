const express = require("express");
const {
  createExpense,
  getAllExpenses,
} = require("../controllers/expense/exports");

const router = express.Router();

router.route("/").get(getAllExpenses).post(createExpense);
router.route("/:id").get().patch().delete();

module.exports = router;

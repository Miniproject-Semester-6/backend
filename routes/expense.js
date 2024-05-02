const express = require("express");
const {
  createExpense,
  getAllExpenses,
} = require("../controllers/expense/exports");
const { protect } = require("../middlewares/auth/authorization");

const router = express.Router();

router.route("/").get(getAllExpenses).post(protect, createExpense);
router.route("/:id").get().patch().delete();

module.exports = router;

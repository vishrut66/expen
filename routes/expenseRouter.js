const express = require('express');
const expenseController = require("../controller/expenseController.js");
const authentication = require("../controller/authentication.js");

const router = express.Router()

router.use(authentication.checkAuth)

router.route("/").get(expenseController.getAllExpense).post(expenseController.addExpense)
router.route("/:id").patch(expenseController.updateExppense).delete(expenseController.deleteExpense)

router.route("/stats").get(expenseController.showStats);

module.exports = router;
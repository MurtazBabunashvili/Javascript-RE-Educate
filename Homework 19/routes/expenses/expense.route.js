const {Router} = require("express")
const {createExpense, findExpenseById, getAllExpenses, updateExpenseById, deleteExpenseById} = require("./expense.service.js")

const expenseRouter = Router()

expenseRouter.get("/", getAllExpenses)
expenseRouter.get("/:id", findExpenseById)
expenseRouter.post("/", createExpense)
expenseRouter.put("/:id", updateExpenseById)
expenseRouter.delete("/:id", deleteExpenseById)

module.exports = expenseRouter
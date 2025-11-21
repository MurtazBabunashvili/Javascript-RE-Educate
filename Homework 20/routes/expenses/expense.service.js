const {isValidObjectId} = require("mongoose")
const expenseSchema = require("../../models/expenses.model.js")
const userSchema = require("../../models/user.model.js")
const createExpense = async (req, res) => {
    const {title, amount} = req.body
    if(!title || !amount) {
        return res.status(400).json({message:"Invalid parameters", data:null})
    }
    
    const createdExpense = await expenseSchema.create({title, amount, date:new Date(), user:req.userId})
    await userSchema.findByIdAndUpdate(req.userId,{$push:{expenses: createdExpense._id}})

    res.json({message:"Expense created successfully", data:createdExpense})
}

const getAllExpenses = async (req, res) => {
    const allExpenses = await expenseSchema.find()
    res.json({message:"All expenses found successfully", data:allExpenses})
}

const findExpenseById = async (req, res) => {
    const {id} = req.params

    if(!isValidObjectId(id)) {
        return res.status(400).json({message:"Invalid id", data:null})
    }
    const expense = await expenseSchema.findById(id)
    if(!expense) {
        return res.status(404).json({message:"Expense can not be found", data:null})
    }
    res.json({message:"Expense found successfully", data:expense})
}


const updateExpenseById = async (req, res) => {
    const {id} = req.params
    const {title, amount} = req.body
    if(!isValidObjectId(id)) {
        return res.status(400).json({message:"Invalid id", data:null})
    }
    if (!title || !amount) {
        return res.status(400).json({message:"Invalid parameters"})
    }

    const updateExpense = await expenseSchema.findByIdAndUpdate(id, {title, amount}, {new:true}) //Date stays same because it implies to creation date
    if (!updateExpense) {
        return res.status(404).json({message:"Expense can not be found", data:null})
    }
    res.json({message:"Expense updated successfully", data:updateExpense})
}

const deleteExpenseById = async (req, res) => {
    const {id} =req.params
    if(!isValidObjectId(id)) {
        return res.status(400).json({message:"Invalid id", data:null})
    }
    const deletedExpense = await expenseSchema.findByIdAndDelete(id)
    if(!deletedExpense) {
        return res.status(404).json({message:"Expense can not be found", data:null})
    }
    res.json({message:"Expense deleted successfully", data:deletedExpense})
}

module.exports = {createExpense, getAllExpenses, findExpenseById, updateExpenseById, deleteExpenseById}
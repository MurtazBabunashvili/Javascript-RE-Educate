const {default:mongoose} = require("mongoose")

const expenseSchema = new mongoose.Schema({
    title: {
        type:String
    },
    amount: {
        type:Number
    },
    date: {
        type:Date
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"user"
    }
})

module.exports = mongoose.model("expenses", expenseSchema)

/*
{
    "title": "Crypto",
    "amount": 10
} */
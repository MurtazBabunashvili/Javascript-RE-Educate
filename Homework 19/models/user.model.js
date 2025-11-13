const {default:mongoose} = require("mongoose")

const userSchema = new mongoose.Schema( {
    fullName: {
        type:String
    },
    email: {
        type:String
    },
    password: {
        type:String
    },
    expenses: {
        type: [mongoose.Schema.Types.ObjectId], ref:"expenses", default:[]
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("user", userSchema)
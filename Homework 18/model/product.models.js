const {default: mongoose} = require("mongoose")

const productSchema = new mongoose.Schema( {
    name: {
        type:String
    },
    price: {
        type:Number
    },
    category: {
        type:String
    },
    description: {
        type:String
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("product", productSchema)


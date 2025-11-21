const {default:mongoose} = require("mongoose")
require("dotenv").config()

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database successfully")
    } catch(error) {
        console.log(error, "Could not connect database")
    }
}

module.exports = connectToDB
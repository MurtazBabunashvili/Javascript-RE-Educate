const express = require("express")
const connectToDB = require("./config/connectToMongoDB.js")
const productsRouter = require("./routes/product.route.js")
const PORT = 3030
const logger = require("./middleware/logger.middleware.js") // Not required in exercise but still added + admin middleware (for the love of the game)

const app = express()

app.use(logger)

app.use(express.json())
app.use("/products", productsRouter)

connectToDB()

app.get("/", (req, res) => {
    res.send("This is / request")
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})

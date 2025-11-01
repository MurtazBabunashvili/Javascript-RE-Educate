const {Router} = require("express")
const productsRouter = require("./products/products.route.js")

const apiRouter = Router()

apiRouter.use("/products", productsRouter)

module.exports = apiRouter
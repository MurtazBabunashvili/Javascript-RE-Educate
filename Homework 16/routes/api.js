const {Router} = require("express")
const ordersRouter = require("./orders/orders.route.js")

const apiRouter = Router()

apiRouter.use("/orders", ordersRouter)

module.exports = apiRouter
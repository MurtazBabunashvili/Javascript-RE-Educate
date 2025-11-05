const {Router} = require("express")
const isAdminMiddleware = require("../../middleware/is_admin.middleware.js")
const isEditorMiddleware = require("../../middleware/is_editor.middleware.js")
const {pagination, createOrder, deleteOrder, updateOrder, findOrder, updateStatus} = require("../../services/orders.service.js")

const ordersRouter = Router()

ordersRouter.get("/", pagination)
ordersRouter.get("/:id", findOrder)
ordersRouter.post("/", isAdminMiddleware, createOrder)
ordersRouter.put("/:id", isAdminMiddleware, updateOrder)
ordersRouter.put("/status/:id", isEditorMiddleware, updateStatus) //Separate update logic for status update
ordersRouter.delete("/:id", isAdminMiddleware, deleteOrder)

module.exports = ordersRouter

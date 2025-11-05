const {Router} = require("express")
const isAdminMiddleware = require("../../middleware/is_admin.middleware.js")
const isEditorMiddleware = require("../../middleware/is_editor.middleware.js")
const {pagination, createOrder, deleteOrder, updateOrder, findOrder} = require("../../services/orders.service.js")

const ordersRouter = Router()

ordersRouter.get("/", pagination)
ordersRouter.get("/:id", findOrder)
ordersRouter.post("/", isAdminMiddleware, createOrder)
ordersRouter.put("/:id", isEditorMiddleware, updateOrder) // If we have isAdminMiddleware, isEditorMiddleware we MUST have both to edit. (FIX: create is_admin_or_editor middleware)
ordersRouter.delete("/:id", isAdminMiddleware, deleteOrder)

module.exports = ordersRouter

const {Router} = require("express")
const {createProduct, pagination, deleteProductById, updateProductById, findProductById} = require("./products.service.js")
const isAdminMiddleWare = require("../../middleware/isadmin.middleware.js")
const isEditorMiddleWare = require("../../middleware/iseditor.middleware.js")
const isValidAPIKeyMiddleware = require("../../middleware/isvalidapikey.middleware.js")

const productsRouter = Router()

productsRouter.get("/", isValidAPIKeyMiddleware, pagination)

productsRouter.get("/:id", findProductById)

productsRouter.post("/", isAdminMiddleWare, createProduct)

productsRouter.put("/:id", isAdminMiddleWare, isEditorMiddleWare, updateProductById)

productsRouter.delete("/:id", isAdminMiddleWare, deleteProductById)

module.exports = productsRouter
const {Router} = require("express")
const {getAllProducts, getProductById, createProduct, updateProductById, deleteProductById} = require("./product.service.js")
const logger = require("../middleware/logger.middleware.js")
const isAdminMiddleware = require("../middleware/admin.middleware.js")

const productsRouter = Router()


productsRouter.get("/", getAllProducts)

productsRouter.get("/:id", getProductById)

productsRouter.post("/", isAdminMiddleware, createProduct)

productsRouter.put("/:id", isAdminMiddleware, updateProductById)

productsRouter.delete("/:id", isAdminMiddleware, deleteProductById)

module.exports = productsRouter
const {Router} = require("express")
const isValidAPIKeyMiddleware = require("../middleware/isvalidapikey.middleware")

const secretRouter = Router()

secretRouter.get("/", isValidAPIKeyMiddleware, (req, res) => {
    res.json("This is secret info. Pentagon password: pentagon_loves_javascript123")
})

module.exports = secretRouter
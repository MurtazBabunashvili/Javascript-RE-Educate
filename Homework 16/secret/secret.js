const {Router} = require("express")
const secretRouter = Router()


secretRouter.get("/secret", (req, res) => {
    res.json({message:"I love js"})
})

module.exports = secretRouter
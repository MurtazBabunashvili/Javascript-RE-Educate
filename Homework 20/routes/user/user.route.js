const {Router} = require("express")
const {findAllUsers, findUserById, updateUserById, deleteUserById} = require("./user.service.js")

const userRouter = Router()

userRouter.get("/", findAllUsers)
userRouter.get("/:id", findUserById)
userRouter.put("/:id", updateUserById)
userRouter.delete("/:id", deleteUserById)

module.exports = userRouter
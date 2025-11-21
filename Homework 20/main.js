//თქვენი მიზანია ააწყოთ რეგისტრაცია ავოტიზაცია სადაც გექნებათ:expenses და users.აუცილებელია route,middleware,mongoDB.

const express = require("express")
const connectToDB = require("./config/connectToDB.js")
const expenseRouter = require("./routes/expenses/expense.route.js")
const userRouter = require("./routes/user/user.route.js")
const authRouter = require("./auth/auth.router.js")
const isAuth = require("./middleware/isAuth.middleware.js")
const PORT = 3030

const app = express()

app.use(express.json())
connectToDB()

app.get("/", (req, res) => {
    res.send("This is / request")
})

app.use("/expenses", isAuth, expenseRouter)
app.use("/users", userRouter)
app.use("/auth", authRouter)

app.listen(3030, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})
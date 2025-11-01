const express = require("express")
const apiRouter = require("./api/api.js")
const secretRouter = require("./secret/secret.route.js")
const logger = require("./middleware/logger.middleware.js")
const app = express()
const PORT = 3030

app.use(express.json())
app.use(logger)

app.use("/api", apiRouter)
app.use("/secret", secretRouter)


app.get("/", (req, res) => {
    res.json("This is '/' request")
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})
const express = require("express")
const app = express()
const apiRouter = require("./routes/api.js")
const secretRouter = require("./secret/secret.js")
const logger = require("./middleware/logger.js")
const PORT = 3030


app.use(express.json())

app.use(logger)

app.use("/api", apiRouter)
app.use("/", secretRouter)


app.get("/", (req, res) => {
    res.json("This is '/' request")
})


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})
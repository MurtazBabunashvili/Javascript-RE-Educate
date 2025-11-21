const jwt = require("jsonwebtoken")
require("dotenv").config()
function getToken(headers) {
    if (!headers["authorization"]) {
        return null
    }

    const [type, token] = headers["authorization"].split(" ")
    return type === "Bearer" ? token : null
}

async function isAuth(req, res, next) {
    const token = getToken(req.headers)
    if(!token) {
        return res.status(400).json({message:"Permission denied"})
    }
    try {
        const payLoad = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = payLoad.userId
        next()
    } catch(error) {
        console.log(error, "isAuth error")
        return res.json({message:"Wrong key"})
    }
}

module.exports = isAuth

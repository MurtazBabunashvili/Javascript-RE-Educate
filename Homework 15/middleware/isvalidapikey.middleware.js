module.exports = (req, res, next) => {
    const secretKey = req.headers.secret
    if(!secretKey || secretKey !== "fsociety") {
        return res.status(403).json({message:"Unauthorized request", data:null})
    }
    next()
}

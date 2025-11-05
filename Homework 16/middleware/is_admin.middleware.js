module.exports = (req, res, next) => {
    const isAdmin = req.headers.admin
    if (!isAdmin || isAdmin !== "admin12") {
        return res.status(403).json({message:"Unauthorized request", data:null})
    }
    next()
}
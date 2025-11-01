module.exports = (req, res, next) => {
    const isAdminRole = req.headers.admin
    if (!isAdminRole || isAdminRole !== "admin12"){
        return res.status(403).json({message:"Unauthorized request", data:"You can not do that because you are not admin!"})
    }
    next()
}
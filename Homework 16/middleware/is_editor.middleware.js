module.exports = (req, res, next) => {
    const isEditor = req.headers.editor
    if (!isEditor || isEditor !== "editor12") {
        return res.status(403).json({message:"Unauthorized request!", data:null})
    }
    next()
}
module.exports = (req, res, next) => {
    const isEditorRole = req.headers.editor
    if (!isEditorRole || isEditorRole !== "editor12"){
        return res.status(403).json({message:"Unauthorized request", data:"You can not do that because you are not editor!"})
    }
    next()
}
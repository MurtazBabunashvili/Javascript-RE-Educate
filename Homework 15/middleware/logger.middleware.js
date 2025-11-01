module.exports = (req, res, next) => {
    console.log(req.method, new Date().toISOString())
    next()
}
const { default: mongoose } =  require("mongoose")

module.exports  =  async () => {
    try {
        await  mongoose.connect("mongodb+srv://admin:admin@cluster0.u6svnzp.mongodb.net/?appName=Cluster0")
        console.log('connected successfully')
    } catch (error) {
        console.log(error, "cound not connect mongoDb")
    }
}
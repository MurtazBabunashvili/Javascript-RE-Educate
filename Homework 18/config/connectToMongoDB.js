const { default: mongoose } =  require("mongoose")
const  dotenv  =  require('dotenv') // Env problem without dotenv
dotenv.config()

module.exports  =  async () => {
	try {
		await  mongoose.connect(process.env.MONGO_URL)
		console.log('connected successfully')
	} catch (error) {
		console.log(error, "cound not connect mongoDb")
	}
}

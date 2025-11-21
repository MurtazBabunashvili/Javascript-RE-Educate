const {Router} = require("express")
const userModel = require("../models/user.model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config()
const authRouter = Router()

authRouter.post("/sign-up", async (req, res) => {
    const {fullName, email, password} = req.body
    if(!fullName || !email || !password || password.length < 8) {
        return res.status(400).json({message:"Fullname, email and password fields are required. Minimum 8 characters are needed for password", data:null})
    }
    const existingUser = await userModel.findOne({email:email})
    if(existingUser) {
        return res.status(400).json({message:"User with this email already exists", data:null})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await userModel.create({fullName, email, password:hashedPassword})
    res.json({message:"User created successfully"})
})

authRouter.post("/sign-in", async (req, res) => {
    const {email, password} = req.body
    if(!email || !password)  {
        return res.status(400).json({message:"Email and password required!"})
    }
    const existingUser = await userModel.findOne({email: email})
    if(!existingUser) {
        return res.status(401).json({message:"Either email or password is incorrect"}) //Email is incorrect would be not good in practice
    }

    const isEqualPassword = await bcrypt.compare(password, existingUser.password)
    if (!isEqualPassword) {
        return res.status(401).json({message:"Either email or password is incorrect"}) //Same logic OF COURSE for password
    }
    const payLoad = {
        userId:existingUser._id
    }
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, {expiresIn:"1h"})
    res.json({message:"token generated successfully", data:token})
})

module.exports = authRouter
const {isValidObjectId} = require("mongoose")
const userSchema = require("../../models/user.model.js")

const findAllUsers = async (req, res) => {
    const allUsers = await userSchema.find()
    res.json({message:"All users found successfully", data:allUsers})
}

const findUserById = async (req, res) => {
    const {id} = req.params
    if (!isValidObjectId(id)) {
        return res.status(400).json({message:"Invalid id", data:null})
    }

    const findUser = await userSchema.findById(id)
    if(!findUser) {
        return res.status(404).json({message:"User not found", data:null})
    }

    res.json({message:"User found successfully", data:findUser})
}

const updateUserById =async (req, res) => {
    const {id} = req.params
    const {fullName, email} = req.body
    if(!isValidObjectId(id)) {
        return res.status(400).json({message:"Invalid id", data:null})
    }
    if(!fullName || !email) {
        return res.status(400).json({message:"Invalid parameters passed", data:null})
    }

    const updatedUser = await userSchema.findByIdAndUpdate(id, {fullName, email})
    if (!updatedUser) {
        return res.json({message:"id not found", data:null})
    }
    res.json({message:"User updated successfully", data:updatedUser})
}

const deleteUserById = async (req, res) => {
    const {id} = req.params
    if (!isValidObjectId(id)) {
        return res.status(400).json({message:"Invalid id", data:null})
    }
    const deletedUser = await userSchema.findByIdAndDelete(id)
    if (!deletedUser) {
        return res.json({message:"id not found", data:null})
    }
    res.json({message:"User deleted successfully", data:deletedUser})
}

module.exports = {findAllUsers, findUserById, updateUserById, deleteUserById}
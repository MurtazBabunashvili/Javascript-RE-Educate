const {isValidObjectId} = require("mongoose")
const productSchema = require("../model/product.models.js")

function paginate(array, page, take) {
  const startIndex = (page - 1) * take;
  return array.slice(startIndex, startIndex + take);
}

const getAllProducts = async (req, res) => {
    const {page=1, take=5} = req.query
    const allProducts = await productSchema.find()

    const paginatedProducts = paginate(allProducts, Number(page), Number(take))

    res.json({message:"Products got successfully", data:paginatedProducts})
}

const getProductById = async (req, res) => {
    const {id} = req.params
    if(!isValidObjectId(id)) {
        return res.status(400).json({message:"Invalid parameter", data:null})
    }

    const findProductById = await productSchema.findById(id)
    if (!findProductById) {
        return res.status(404).json({message:"Product not found", data:null})
    }

    res.json({message:"Product found successfully", data:findProductById})
}

const createProduct = async (req, res) => {
    const {name, price, category, description} = req.body
    if(!name || typeof name !== "string" || !price || typeof price !== "number" || price < 2 || price > 4000 || !category || typeof category !== "string") {
        return res.status(400).json("Invalid parameters. Please make sure that you have passed name(string), price(number) and category(string). Minimum price must be 2$ and maximum 4000$.")
    }
    
    const createObject = await productSchema.create({name, price, category, description})

    res.json({message:"Product added successfully", data:createObject})
}

const updateProductById = async (req, res) => {
    const {id} = req.params
    const {name, price, category, description} = req.body

    if (!isValidObjectId(id)) {
        return res.status(400).json({message:"Invalid parameter", data:null})
    }
    if(!name || typeof name !== "string" || !price || typeof price !== "number" || !category || typeof category !== "string" || !description || typeof description !== "string") {
        return res.status(400).json("Invalid parameters. Please make sure that you have passed name(string), price(number) and category(string), description(string)")
    }

    const updatedProduct = await productSchema.findByIdAndUpdate(id, {name, price, category, description})
    if(!updatedProduct) {
        return res.status(404).json({message:"Product not found", data:null})
    }

    res.json({message:"Product updated successfully"})
}


const deleteProductById = async (req, res) => {
    const {id} = req.params
    if (!isValidObjectId(id)) {
        return res.status(400).json({message:"Invalid parameter", data:null})
    }
    const deletedProduct = await productSchema.findByIdAndDelete(id)

    if(!deletedProduct) {
        return res.status(404).json({message:"Product not found", data:null})
    }
    res.json({message:"Product deleted successfully", data:deletedProduct})
}

module.exports = {getAllProducts, getProductById, createProduct, updateProductById, deleteProductById}
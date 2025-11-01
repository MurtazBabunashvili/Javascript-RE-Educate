const products = [
    {
        id:1,
        price: 5,
        category: "cloth",
        isExpire: false,
        name: "trousers"
    },
    {
        id:2,
        price: 1,
        category: "food",
        isExpire: true,
        name: "apple"
    },
    {
        id:3,
        price: 3,
        category: "food",
        isExpire: false,
        name: "pie"
    },
    {
        id:4,
        price: 15,
        category: "device",
        isExpire: false,
        name: "gadget"
    },
    {
        id:5,
        price: 3,
        category: "cloth",
        isExpire: true,
        name: "shirt" // Expired shirt?? imagination goes down day by day
    }
]


const createProduct = (req, res) => {
    const {price, category, isExpire, name} = req.body
    if (!price || !category || !isExpire || !name || price > 200) {
        return res.status(400).json({message:"Not enough/invalid parameters!", data:null})
    }
    
    const lastID = products[products.length-1]?.id || 0
    const newObj = {
        id: lastID+1,
        price,
        category,
        isExpire,
        name
    }
    products.push(newObj)
    
    res.json({message:"Added successfully", data:newObj})
}

const pagination = (req,res) => {
   let {page=1,take=3} = req.query
   take > 4 ? take = 4 : take
   res.json(products.slice((page-1)*take,take*page))
}

const deleteProductById = (req, res) => {
    const {id} = req.params
    let findIndexById = products.findIndex(el => el.id === Number(id))
    if (findIndexById === -1) {
        return res.status(404).json({message:"Product not found", data:null})
    }

    const deletedProduct = products.splice(findIndexById, 1)
    res.json({message: "Deleted successfully", data:deletedProduct})
}

const updateProductById = (req, res) => {
    const {id} = req.params
    const {price, category, isExpire, name} = req.body
    if (!price || !category || !isExpire || !name || price > 200) {
        return res.status(400).json({message:"Not enough/invalid parameters!", data:null})
    }
    
    const findIndexById = products.findIndex(el =>  el.id === Number(id))
    if (findIndexById === -1) {
        return res.status(404).json({message:"Product not found", data:null})
    }

    products[findIndexById] = {
        ...products[findIndexById],
        price,
        category,
        isExpire,
        name
    }

    res.json({message:"Updated successfully", data:products[findIndexById]})
}

const findProductById = (req, res) => {
    const {id} = req.params
    const findProduct = products.find(el => el.id === Number(id))
    if (!findProduct) {
        return res.status(404).json({message:"Product not found!", data:null})
    }

    res.json({message:"Found successfully", data:findProduct})
}

module.exports = {createProduct, pagination, deleteProductById, updateProductById, findProductById}
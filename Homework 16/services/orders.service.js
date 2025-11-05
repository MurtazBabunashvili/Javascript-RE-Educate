const orders = [
  {
    id:1,
    productName: "Wireless Mouse",
    quantity: 2,
    totalPrice: 39.98,
    status: "delivered"
  },
  {
    id:2,
    productName: "Mechanical Keyboard",
    quantity: 1,
    totalPrice: 89.99,
    status: "processing"
  },
  {
    id:3,
    productName: "USB-C Charger",
    quantity: 3,
    totalPrice: 44.97,
    status: "shipped"
  },
  {
    id:4,
    productName: "Gaming Headset",
    quantity: 1,
    totalPrice: 69.99,
    status: "cancelled"
  },
  {
    id:5,
    productName: "Laptop Stand",
    quantity: 2,
    totalPrice: 59.98,
    status: "pending"
  }
]



const pagination = (req,res) => {
   let { page = 1, take = 3 } = req.query
   page = Number(page)
   take = Number(take)
   if (take > 4) take = 4

   const start = (page - 1) * take
   const end = page * take

   res.json(orders.slice(start, end))
}

const createOrder = (req, res) => {
    const {productName, quantity, totalPrice, status} = req.body
    if (!productName) {
        return res.status(400).json({message:"product name not passed!", data:null})
    }
    if (quantity > 10 || totalPrice > 500) {
        return res.status(400).json({message:"quantity or total price is too much!", data:null})
    }

    let lastId = orders[orders.length - 1]?.id || 0

    const newObj = {
        id: lastId+1,
        productName,
        quantity,
        totalPrice,
        status
    }
    orders.push(newObj)
    res.json({message:"Order added successfully", data:newObj})
}


const deleteOrder = (req, res) => {
    const {id} = req.params
    const findIndexById = orders.findIndex(el => el.id === Number(id))
    
    if(findIndexById === -1) {
        return res.status(404).json({message:"Order not found", data:null})
    }
    const removedOrder = orders.splice(findIndexById, 1)

    res.json({message:"Order removed successfully", data: removedOrder})
}

const updateOrder = (req, res) => {
    const {id} = req.params
    const {productName, quantity, totalPrice, status} = req.body
    if (quantity > 10 || totalPrice > 500) {
        return res.status(400).json({message:"quantity or total price exceeds 10 or 500"})
    }

    const findIndexById = orders.findIndex(el => el.id === Number(id))
    if (findIndexById === -1) {
        return res.status(404).json({message:"Order not found!", data:null})
    }

    orders[findIndexById] = {
        ...orders[findIndexById],
        productName: productName || orders[findIndexById].productName,
        quantity: quantity || orders[findIndexById].quantity,
        totalPrice: totalPrice || orders[findIndexById].totalPrice,
        status: status || orders[findIndexById].status
    }
    res.json({message:"Order updated successfully", data:orders[findIndexById]})
}

const findOrder = (req, res) => {
    const {id} = req.params
    const findOrderById = orders.find(el => el.id === Number(id))
    if (!findOrderById) {
        return res.status(404).json({message:"Order not found!", data:null})
    }
    
    res.json({message:"Order found successfully", data:findOrderById})
}


const updateStatus = (req, res) => {
    const {id} = req.params
    const {status} = req.body

    if (!status) {
        return res.status(400).json({message:"You have to pass status field", data:null})
    }
    const findIndexById = orders.findIndex(el => el.id === Number(id))
    if (findIndexById === -1) {
        return res.status(404).json({message:"Order not found!", data:null})
    }

    orders[findIndexById] = {
        ...orders[findIndexById],
        status
    }

    res.json({message:"Status updated successfully", data:orders[findIndexById]})
}

module.exports = {pagination, createOrder, deleteOrder, updateOrder, findOrder, updateStatus}

const express = require("express")
const app = express()
app.use(express.json())

const PORT = 3030


function pagination(data, page, take) {
    const start = (page - 1) * take;
    const end = page * take;
    return data.slice(start, end);
}

const users = [
    {
        id: 1,
        name: "Giorgi",
        age: 19,
        email: "giorgi.gogebashvili@gmail.com",
        eyecolor: "Green"
    },
    {
        id: 2,
        name: "Saba",
        age: 16,
        email: "saba.tabukashvili@gmail.com",
        eyecolor: "Gray"
    },
    {
        id: 3,
        name: "Erekle",
        age: 13,
        email: "erekle.maisuradze@gmail.com",
        eyecolor: "Blue"
    },
    {
        id: 4,
        name: "Mariami",
        age: 21,
        email: "mariam.siradze@gmail.com",
        eyecolor: "Brown"
    }
]

app.get("/users", (req, res) => {
    let { page, take } = req.query

    page = Number(page) || 1
    take = Number(take) || 3

    const paginatedUsers = pagination(users, page, take)

    res.json({ data: paginatedUsers })
})
app.get("/users/:id", (req, res) => {
    const { id } = req.params
    const findUserByID = users.find(el => el.id === Number(id))

    if (!findUserByID) {
        return res.status(404).json({ message: "User can not be found", data: null })
    }

    res.json({ message: "User found successfully", data: findUserByID })
})

app.post("/users", (req, res) => {
    const { name, age, email, eyecolor } = req.body
    if (!name || !age || age < 10 || age > 30) {
        return res.status(400).json({ message: "Invalid post" })
    }
    let lastId = users[users.length - 1]?.id || 0
    let newObj = {
        id: lastId + 1,
        name,
        age,
        email: email || null,
        eyecolor: eyecolor || null
    }
    users.push(newObj);
    res.json({ message: "User posted successfully", data: newObj })
})

app.delete("/users/:id", (req, res) => {
    const { id } = req.params
    const findUserIndexByID = users.findIndex(el => el.id === Number(id))
    if (findUserIndexByID === -1) {
        return res.status(404).json({ message: "User not found", data: null })
    }
    users.splice(findUserIndexByID, 1)
    res.json({ message: "User deleted successfully", data: users })
})

app.put("/users/:id", (req, res) => {
    const { id } = req.params
    const { name, age, email, eyecolor } = req.body

    if (!name || !age || age < 10 || age > 30) {
        return res.status(400).json({ message: "Invalid update request!", data: null })
    }

    const index = users.findIndex(el => el.id === Number(id))
    if (index === -1) {
        return res.status(404).json({ message: "User not found", data: null })
    }

    users[index] = {
        ...users[index],
        name,
        age,
        email: email || users[index].email,
        eyecolor: eyecolor || users[index].eyecolor
    }

    res.json({ message: "User updated successfully", data: users })
})

app.get("/secret", (req, res) => {
    const secretKey = req.headers.secret
    if (!secretKey || secretKey !== "mypassword12") {
        return res.status(403).json({ message: "Unauthorized", data: "Invalid secret key" })
    }
    res.json("secret info")
})

app.listen(PORT, () => {
    console.log(`sever running on http://localhost:${PORT}`)
})

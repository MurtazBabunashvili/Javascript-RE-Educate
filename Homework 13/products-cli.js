const { Command } = require("commander")
const program = new Command()
const { read, write } = require("./utils/helper")
const fs = require("fs")

async function initialize() {
    if (!fs.existsSync("products.json")) { //ვქმნი products.json ფაილს
        await write("products.json", []);
    }
}
initialize()

program
    .command("add")
    .argument("name")
    .argument("description")
    .argument("date")
    .argument("category")
    .action(async (name, description, date, category) => {
        let parsedProductsJson = await read("products.json", true)
        let lastId = parsedProductsJson[parsedProductsJson.length - 1]?.id || 0

        let newObj = {
            id: lastId + 1,
            name,
            description,
            date,
            category
        }
        parsedProductsJson.push(newObj)
        await write("products.json", parsedProductsJson)
    })

program
    .command("read_by_id")
    .argument("id")
    .option("--isexpire")
    .action(async (id, options) => {
        let parsedProductsJson = await read("products.json", true)
        let findProductById = parsedProductsJson.find(el => el.id == id)

        if (!findProductById) {
            console.log("product not found")
            return
        }

        if (options.isexpire) {
            const isExpired = new Date(findProductById.date) < new Date()
            console.log({ findProductById, expired: isExpired })
        } else {
            console.log(findProductById)
        }
    })



program
    .command("read")
    .action(async () => {
        let parsedProductsJson = await read("products.json", true)
        console.log(parsedProductsJson)
    })

program
    .command("delete")
    .argument("id")
    .action(async (id) => {
        let parsedProductsJson = await read("products.json", true)
        let findIndexById = parsedProductsJson.findIndex(el => el.id == id)

        if (findIndexById === -1) {
            console.log("Product not found")
            return
        }
        parsedProductsJson.splice(findIndexById, 1)
        await write("products.json", parsedProductsJson)
        console.log("Deleted succesfully")
    })

program
    .command("update")
    .argument("id")
    .argument("name")
    .argument("description")
    .argument("date")
    .argument("category")
    .action(async (id, name, description, date, category) => {
        let parsedProductsJson = await read("products.json", true)
        let findIndexById = parsedProductsJson.findIndex(el => el.id == id)

        if (findIndexById === -1) {
            console.log("Product not found")
            return
        }


        parsedProductsJson[findIndexById] = {
            id: Number(id),
            name,
            description,
            date,
            category
        }
        await write("products.json", parsedProductsJson)
        console.log("Updated succesfully")
    })

program.parse(process.argv)
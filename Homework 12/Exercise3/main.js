#! /usr/bin/env node

const { Command } = require("commander")
const program = new Command()
const { read, write } = require("../utils/helpers.js")
program
    .command("add")
    .argument("name")
    .argument("phone")
    .option("--america")
    .action(async (name, phone, options) => {
        let readData = await read("contacts.json", true)
        let lastId = readData[readData.length - 1]?.id || 0
        phone = options.america ? `011${phone}` : `995${phone}`

        let user = {
            id: lastId + 1,
            name,
            phone
        }
        readData.push(user)
        await write("contacts.json", readData)
    })
program
    .command("delete")
    .argument("id")
    .action(async (id) => {
        let readData = await read("contacts.json", true)
        readData = readData.filter(el => el.id != id)
        await write("contacts.json", readData)
    })

program
    .command("get_by_id")
    .argument("id")
    .action(async (id) => {
        let readData = await read("contacts.json", true)
        user = readData.find(el => el.id == id)
        console.log(user)
    })

program.parse(process.argv)
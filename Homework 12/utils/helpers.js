const fs = require("fs/promises")

async function write(file, data) {
    let stringified = JSON.stringify(data)
    await fs.writeFile(file, stringified)
}

async function read(file, parse) {
    let data = await fs.readFile(file, "utf-8")
    if (parse) {
        return JSON.parse(data)
    }
    return data
}

function sum(a, b) {
    return a + b
}


function reverse_string(str) {
    return str.split("").reverse().join("")
}

module.exports = { write, read, sum, reverse_string };



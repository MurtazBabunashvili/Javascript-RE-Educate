const fs = require("fs/promises")

function toCapital(str) {
    return str.toUpperCase()
}


function isPalindrome(str) {
    let reversed = str.split("").reverse().join("")
    return str === reversed
}

function largestWord(sentence) {
    let words = sentence.split(" ")

    let largest_length = 0
    let largest_word = ""

    words.forEach(el => {
        if (el.length > largest_length) {
            largest_length = el.length
            largest_word = el
        }
    })

    return { "Largest Word": largest_word, "length": largest_length }
}

async function read(file, parse) {
    let readJsonData = await fs.readFile(file, "utf-8")
    if (parse) {
        let parsedData = JSON.parse(readJsonData)
        return parsedData
    }
    return readJsonData
}

async function write(file, content) {
    let stringrified_content = JSON.stringify(content)
    await fs.writeFile(file, stringrified_content)
}

async function fetch_API(API) {
    let res = await fetch(API)
    let data = await res.json()

    return data
}

function pagination(data, page, limit) {
    const start = (page - 1) * limit;
    const end = page * limit;
    return data.slice(start, end);
}

module.exports = {
    toCapital, isPalindrome, largestWord,
    read, write, fetch_API, pagination
}

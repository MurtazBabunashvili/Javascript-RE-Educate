const fs = require("fs/promises")

//Exercise 1 

async function sum_nums() {
    let arr = [1, 2, 3, 4, 5, 6]
    await fs.writeFile("numbers.json", JSON.stringify(arr))
    let read = await fs.readFile("numbers.json", "utf-8")
    let strToArr = JSON.parse(read)
    let sum = strToArr.reduce((tot, curr) => tot + curr, 0)
    await fs.writeFile("result.txt", sum)
    console.log(sum)
}
sum_nums()

//Exercise 2

async function reverse_word() {
    await fs.writeFile("text.txt", "My Text")
    let read = await fs.readFile("text.txt", "utf-8")
    let arr = read.split("")
    arr = arr.reverse()
    let reversed_word = arr.join("")
    console.log(reversed_word)
}
reverse_word()

//Exercise 3

let users = [
    {
        name: "Giorgi",
        age: 25,
        email: "giorgi.machavariani@gmail.com"
    },
    {
        name: "Nika",
        age: 18,
        email: "Nikagoshkheteliani@outlook.com"
    },
    {
        name: "Mariami",
        age: 31,
        email: "Chumburidzemariam@mail.rum"
    }
]

async function write_users() {
    await fs.writeFile("users.json", JSON.stringify(users))
    console.log(JSON.parse(await fs.readFile("users.json", "utf-8")))
}

write_users()

//Exercise 4

async function merge_two() {
    await fs.writeFile("text2.txt", "Second text")
    let read1 = await fs.readFile("text.txt", "utf-8") //წინა სავარჯიშოში შექმნილ ტექსტს ვიყენებ
    let read2 = await fs.readFile("text2.txt", "utf-8")
    let merge = read1 + " " + read2
    await fs.writeFile("text3.txt", merge)
    console.log(await fs.readFile("text3.txt", "utf-8"))
}

merge_two()

//Exercise 5

async function count_words() {
    await fs.writeFile("text.txt", "I love javascript")
    let read = await fs.readFile("text.txt", "utf-8")
    let count = read.split(" ").length
    console.log(count)
}

count_words()

//Exercise 6

//გამოვიყენოთ users.json წინა ფაილი

async function filter_ages() {
    let read = JSON.parse(await fs.readFile("users.json", "utf-8"))
    read = read.filter(el => el.age > 18)
    await fs.writeFile("users.json", JSON.stringify(read))
    console.log(JSON.parse(await fs.readFile("users.json", "utf-8")))
}

filter_ages()

//Exercise 7

let students = [
    {
        name: "Tsotne",
        score: 91,
        passed: true
    },
    {
        name: "Giorgi",
        score: 93,
        passed: true
    },
    {
        name: "Mariam",
        score: 41,
        passed: false
    },
    {
        name: "Tekla",
        score: 81,
        passed: true
    }
]

async function students_scores() {
    students = students.filter(el => el.score > 50)
    await fs.writeFile("passed.json", JSON.stringify(students))
    const data = await fs.readFile("passed.json", "utf-8")
    console.log(JSON.parse(data))
}

students_scores()

//Exercise 8

let another_users = [
    { "name": "Gio", "email": "gio@gmail.com" },
    { "name": "Nika", "email": "nikaexample.com" },
    { "name": "Mariam", "email": "mariam@reeducate.ge" },
    { "name": "Lasha", "email": "lashareeducate.ge" },
    { "name": "Ana", "email": "ana@mail.com" }
]

async function delete_invalid() {
    await fs.writeFile("another_users.json", JSON.stringify(another_users))
    let data = JSON.parse(await fs.readFile("another_users.json", "utf-8"))
    data = data.filter(el => el.email.includes("@"))
    await fs.writeFile("another_users.json", JSON.stringify(data))
}

delete_invalid()
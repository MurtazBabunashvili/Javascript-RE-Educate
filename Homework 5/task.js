//Exercise 1

async function countdown(sec) {
    let interval = setInterval(() => {
        console.log(sec)
        sec--

        if (sec < 0) {
            clearInterval(interval)
            console.log("Countdown has finished")
        }
    }, 1000)
}

countdown(10)

//Exercise 2

async function randomGuesser(num) {
    let interval = setInterval(() => {
        let i = Math.floor(Math.random() * num + 1)
        console.log(`Wrong number: ${i}`)

        if (i == num) {
            clearInterval(interval)
            console.log(`Correct number: ${num}`)
        }
    }, 500)
}

randomGuesser(15)

//Exercise 3

function numberChecker(n, Callback) {
    if (n > 27) {
        Callback(n)
    } else {
        console.log(`${n} is not greater than 27`)
    }
}


//ამ ფუნქციის Input უბრალოდ რიცხვის დასაპრინტად გამოვიყენე, რა თქმა უნდა, n ის გარეშეც ჩვეულებრივად გაკეთდებოდა(უბრალოდ fancy გზა ავირჩიე).
function moreOutput(n) {
    console.log(`${n} is greater than 27`)
}

numberChecker(25, moreOutput)
numberChecker(30, moreOutput)

//Exercise 4

//პირველი გზა
async function firstFetch(API) {
    fetch(API).then(res => res.json()).then(data => console.log(data.slice(0, -6)))
}
firstFetch("https://jsonplaceholder.typicode.com/users")

//მეორე გზა
async function secondFetch(API) {
    let res = await fetch(API)
    let data = await res.json()
    console.log(data.slice(0, -6))
}
secondFetch("https://jsonplaceholder.typicode.com/users")

//Exercise 5

function ageGroups(people) {
    let grouped = people.reduce((tot, curr) => {
        let age = curr.age
        if (age > 10) tot.moreThanTen++
        if (age < 20) tot.lessThanTwenty++
        return tot
    }, { moreThanTen: 0, lessThanTwenty: 0 })
    return grouped
}

let people = [
    { name: "Giorgi", age: 25 },
    { name: "Nika", age: 15 },
    { name: "Mariam", age: 30 },
    { name: "Luka", age: 18 }
];

console.log(ageGroups(people))

//Exercise 6

function firstGreaterThanSecond(first, second, Callback) {
    if (first > second) {
        Callback()
    } else {
        console.log(`${first} is less than or equal to ${second}`)
    }
}

function lessOrEqual() {
    console.log("First number is greater than second one")
}

firstGreaterThanSecond(10, 15, lessOrEqual)
firstGreaterThanSecond(15, 10, lessOrEqual)

//Exercise 7

function groupPrices(products) {
    let grouped = products.reduce((tot, curr) => {
        let price = curr.price
        if (price > 20) {
            tot.greaterThanTwenty.push(curr)
        } else {
            tot.lessOrEqualToTwenty.push(curr)
        }
        return tot
    }, { greaterThanTwenty: [], lessOrEqualToTwenty: [] })
    return grouped
}

let products = [
    { name: "Mouse", price: 15 },
    { name: "Keyboard", price: 45 },
    { name: "USB Cable", price: 7 },
    { name: "Headphones", price: 29.9 },
    { name: "Webcam", price: 52 }
];

console.log(groupPrices(products))
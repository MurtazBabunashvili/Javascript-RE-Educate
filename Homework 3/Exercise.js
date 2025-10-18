//Exercise 1

let arr1 = [1, 2, 3]
arr1 = arr1.map(el => el * 3)
console.log("Trippled array: " + arr1)

//Exercise 2

function dividesByThree(arr) {
    return arr.filter(el => el % 3 === 0)
}
console.log(dividesByThree([1, 2, 3, 4, 5, 6, 7, 8, 9]))

//Exercise 3

function sumOfPositiveNumbers(arr) {
    return arr.filter(el => el > 0).reduce((tot, curr) => tot + curr, 0)
}
console.log("Sum of positive numbers " + sumOfPositiveNumbers([-1, 5, -3, 3, -2, 2]))

//Exercise 4

let namesArr = ["giorgi", "nika", "mariami"]
namesArr = namesArr.map(el => el.slice(0, el.length - 1));
console.log(namesArr)

//Exercise 5

function multiplyTwoDivideThree(arr) {
    return arr.map(el => el * 2).filter(el => el % 3 === 0)
}
console.log(multiplyTwoDivideThree([1, 2, 3, 4, 5, 6]))

//Exercise 6

let arr = [
    {
        category: "pizza",
        price: 20
    },
    {
        category: "pizza",
        price: 20
    },
    {
        category: "sushi",
        price: 30
    },
    {
        category: "sushi",
        price: 30
    },
]

let grouped = arr.reduce((tot, curr) => {
    let price = curr.price
    if (!tot[price]) tot[price] = []
    tot[price].push(curr)
    return tot
}, {})
console.log(grouped)

//Exercise 7

let numsArr = [1, -1, -2, -10, 111, 3, 2, 5]
numsArr.sort((a, b) => a - b)
console.log(numsArr)

//Exercise 8

function multByTwoMoreThanFive(arr) {
    return arr.map(el => el * 2).filter(el => el > 5)
}

//Test
console.log(multByTwoMoreThanFive([1, 2, 3, 4, 5]))

//Exercise 9

let someArr = [1, 1, 1, 1, 2, 2, 3, 3, 3]
let unque = [...new Set(someArr)]
console.log(unque)

//Exercise 10
let anotherArr = [-1, 20, 90, 4, 5, 111]
let sum = anotherArr.sort((a, b) => a - b).slice(0, 2).reduce((tot, curr) => tot + curr, 0)
console.log(sum)
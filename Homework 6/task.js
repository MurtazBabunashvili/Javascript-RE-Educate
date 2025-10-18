//Exercise 1

function block() {
    for (let i = 1; i < 10000000000; i++) { }
}

let myPromise = new Promise((res, rej) => {
    res("Fix")
})

console.log("one")
// myPromise.then(res => block())
console.log("two")

//Exercise 2

let firstPromise = new Promise((res, rej) => {
    res("First one is resolved")
})

let secondPromise = new Promise((res, rej) => {
    rej("Second one is rejected")
})

//ცალ-ცალკე
firstPromise.then(res => console.log(res)).catch(error => console.log(error, "Error"))
secondPromise.then(res => console.log(res)).catch(error => console.log(error, "Error"))

//Allsettled-ით

Promise.allSettled([firstPromise, secondPromise]).then(result => console.log(result))


//Exercise 3

let promise_one = new Promise((res, rej) => {
    res("First one resolved")
})

let promise_two = new Promise((res, rej) => {
    rej("Second one rejected")
})

let promise_three = new Promise((res, rej) => {
    res("Third one resolved")
})

let promise_four = new Promise((res, rej) => {
    rej("Fourth one rejected")
})

Promise.any([promise_one, promise_two, promise_three, promise_four]).then(res => console.log(res))

//Exercise 4

let promise_one_again = new Promise((res, rej) => {
    res("First one resolved")
})

let promise_two_again = new Promise((res, rej) => {
    rej("Second one rejected")
})

let promise_three_again = new Promise((res, rej) => {
    res("Third one resolved")
})

let promise_four_again = new Promise((res, rej) => {
    rej("Fourth one rejected")
})

Promise.allSettled([promise_one_again, promise_two_again, promise_three_again, promise_four_again]).then(arr => console.log(arr.reduce((tot, curr) => {
    if (curr.status === 'fulfilled') tot.resolvedAmount++
    if (curr.status === 'rejected') tot.rejectedAmount++

    return tot
}, { resolvedAmount: 0, rejectedAmount: 0 })))

//Exercise 5

let first_resolve = new Promise((res, rej) => {
    res("Resolved first")
})

let second_reject = new Promise((res, rej) => {
    rej("Rejected second")
})

let third_resolve = new Promise((res, rej) => {
    res("Resolved third")
})

let fourth_reject = new Promise((res, rej) => {
    rej("Rejected fourth")
})

let fifth_reject = new Promise((res, rej) => {
    rej("Rejected fifth")
})

Promise.allSettled([first_resolve, second_reject, third_resolve, fourth_reject, fifth_reject]).then(arr => {
    console.log(arr.filter(el => el.status === 'rejected'))
})

//Exercise 6

async function myFetch(API) {
    try {
        let res = await fetch(API)
        let data = await res.json()
        return data
    } catch (error) {
        console.log(error, "error")
    }
}

api1 = "https://jsonplaceholder.typicode.com/users"
api2 = "https://jsonplaceholder.typicode.com/posts"


Promise.all([myFetch(api1), myFetch(api2)]).then(res => console.log(res))
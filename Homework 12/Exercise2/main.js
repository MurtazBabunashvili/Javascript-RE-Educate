const axios = require("axios")

const api1 = "https://jsonplaceholder.typicode.com/users"
const api2 = "https://jsonplaceholder.typicode.com/posts"

//1

async function runBoth(api1, api2) {
    let [users, posts] = await Promise.all([axios.get(api1), axios.get(api2)])
    console.log(users.data.slice(0, 2), posts.data.slice(0, 2))
}

// runBoth(api1, api2)

//2

async function raceTwo(api1, api2) {
    let faster = await Promise.race([axios.get(api1), axios.get(api2)])
    console.log(faster.data.slice(0, 2))
}

// raceTwo(api1, api2)

async function returnInfo(api1, api2) {
    let results = await Promise.allSettled([axios.get(api1), axios.get(api2)])
    let apis = ["first_api", "second_api"] //რომელი API-ც გაეშვა, მაგის დასაპრინტად
    results.forEach((result, i) => {
        if (result.status === 'fulfilled') {
            console.log(result.status, apis[i], result.value.data.slice(0, 1)) //სატესტოდ გაეშვას მისი პირველი დათა
        } else {
            console.log(result.status, apis[i]) //დაპრინტოთ apis ერეიდან რომელი დარეჯექთდა
        }
    })

}

// returnInfo(api1, api2)
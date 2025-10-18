//Exercise 1

let arr = [1, [2, 3, [4, 5]], 5, [2, [3, 6]]]
let flattened_sorted_arr = arr.flat(Infinity).sort((a, b) => a - b)
let unique_arr = []
for (let i = 0; i < flattened_sorted_arr.length; i++) {
    if (!unique_arr.includes(flattened_sorted_arr[i])) {
        unique_arr.push(flattened_sorted_arr[i])
    }
}
console.log(unique_arr)

//Exercise 2

let products = [
    { name: "Phone", price: 1200, rating: 4.5 },
    { name: "Laptop", price: 2500, rating: 4.8 },
    { name: "Book", price: 30, rating: 4.9 },
    { name: "TV", price: 800, rating: 4.0 }
]

let obj = products.filter(el => el.price < 1000).sort((a, b) => b.rating - a.rating)[0]
console.log(obj)

//Exercise 3

let sentence = "dog cat dog bird cat dog fish bird"

let words = sentence.split(" ")
let occurrences = words.reduce((tot, curr) => {
    if (tot[curr]) {
        tot[curr] += 1
    } else {
        tot[curr] = 1
    }
    return tot
}, {})

let maxCount = 0
let maxObject = ""
for (let word in occurrences) {
    if (occurrences[word] > maxCount) {
        maxCount = occurrences[word]
        maxObject = word
    }
}

console.log(`${maxObject} with ${maxCount} occurrences`)


//For loop tasks

//Exercise 1
function countChar(word, char) {
    let count = 0
    for (let i = 0; i < word.length; i++) {
        if (word[i] === char) {
            count++
        }
    }
    return count
}

console.log(countChar("Testinggg", "g")) //g 3-ჯერ

//Exercise 2

function isPolindrome(word) {
    let reversed = ""
    for (let i = word.length - 1; i >= 0; i--) {
        reversed += word[i]
    }
    return reversed === word
}

console.log(isPolindrome("anna")) //true
console.log(isPolindrome("abba")) // true
console.log(isPolindrome("gig")) // true
console.log(isPolindrome("murtaz")) // false\

//Exercise 3

function unify_arrs(arr1, arr2) {
    let unified_arr = [...arr1, ...arr2]
    let cleaned_arr = []
    for (let i = 0; i < unified_arr.length; i++) {
        if (!cleaned_arr.includes(unified_arr[i])) {
            cleaned_arr.push(unified_arr[i])
        }
    }
    return cleaned_arr.reduce((tot, curr) => tot + curr, 0)
}

arr1 = [1, 2, 3, 1, 2, 5] //ამ ერეიდან მხოლოდ იქნება 1 2 3 5
arr2 = [3, 2, 1, 3, 4] //მხოლოდ 4-იანს ამატებს, რადგან დანარჩენი მეორდებოდა
console.log(unify_arrs(arr1, arr2))

// Exercise 4

function factorial(n) {
    if (n <= 1) {
        return 1
    }
    return n * factorial(n - 1)
}
console.log(factorial(5)) //120

//Exercise 5

function two_sum(arr, sum) {
    let pairs = []
    for (let i = 0; i < arr.length; i++) {
        for (let k = i + 1; k < arr.length; k++) {
            if (arr[i] + arr[k] === sum) {
                pairs.push([arr[i], arr[k]])
            }
        }
    }
    return pairs
}

some_arr = [1, 2, 3, 4, 5, 6]
console.log(two_sum(some_arr, 5))
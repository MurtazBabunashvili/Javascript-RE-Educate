//Exercise 1

function find_even_mean(arr) {
    let filtered_even = arr.filter(el => el % 2 === 0)
    if (filtered_even.length === 0) {
        return "No even numbers"
    }
    return filtered_even.reduce((tot, curr) => tot + curr, 0) / filtered_even.length
}

console.log(find_even_mean([1, 2, 3, 4, 5, 6]))

//Exercise 2

function word_count(sentence) {
    return sentence.split(" ").length
}
console.log(word_count("I love JavaScript"))

//Exercise 3

function is_prime(number) {
    if (number <= 1) {
        return false
    }
    if (number === 2) {
        return true
    }
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false
        }
    }
    return true
}

console.log(is_prime(5))
console.log(is_prime(16))

//Exercise 4

function longest_word(arr) {
    let longest_len = 0
    let word = ""
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > longest_len) {
            longest_len = arr[i].length
            word = arr[i]
        }
    }
    return { LongestWord: word, Length: longest_len }
}

let words = ["dog", "elephant", "cat", "hippopotamus"]
console.log(longest_word(words))

//Exercise 5

function most_repeated(arr) {
    let obj = arr.reduce((tot, curr) => {
        if (!tot[curr]) {
            tot[curr] = 1
        } else {
            tot[curr] += 1
        }

        if (tot[curr] > tot.maxCount) {
            tot.maxCount = tot[curr]
            tot.mostRepeated = curr
        }
        return tot
    }, { mostRepeated: null, maxCount: 0 })

    return { MostRepeated: obj.mostRepeated, Count: obj.maxCount }
}

let arr = [3, 5, 3, 2, 5, 5, 3, 5]
console.log(most_repeated(arr))

//Exercise 6

function count_even_odd(arr) {
    let even_arr = arr.filter(el => el % 2 === 0)
    let odd_arr = arr.filter(el => el % 2 !== 0)
    return { Even: even_arr.length, Odd: odd_arr.length }
}

let nums = [1, 2, 3, 4, 5, 6, 7, 8]
console.log(count_even_odd(nums))

//Exercise 7

function find_min(arr) {
    return arr.sort((a, b) => a - b)[0]
}


let nums1 = [10, 2, 33, 5, 7]
console.log(find_min(nums1))
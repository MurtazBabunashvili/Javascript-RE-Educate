function returnFirst<T>(arr: T[]):T | undefined {
    return arr[0]
}

console.log(returnFirst([1,2,3,4,5]))
console.log(returnFirst(["first","second","third"]))
// Exercise 1

const laptops = [
    { model: "Dell XPS 13", price: 1800 },
    { model: "MacBook Pro 14", price: 2499 },
    { model: "Lenovo ThinkPad X1", price: 2100 },
    { model: "Asus Zephyrus G14", price: 1999 },
];
let mostExpensive = laptops.sort((a, b) => b.price - a.price)[0]
console.log(mostExpensive)

//Exercise 2

let object = {
    width: 10,
    height: 15,
    getArea: function () {
        return this.width * this.height
    }
}

console.log(object.getArea())

//Exercise 3

const students = [
    { name: "Giorgi", score: 85, passed: true },
    { name: "Nika", score: 50, passed: false },
    { name: "Mariam", score: 92, passed: true },
    { name: "Luka", score: 60, passed: false }
];

students.filter(el => el.passed === true).forEach(el => console.log(el.name))
//Exercise 4

const products = [
    { title: "Pencil", price: 2 },
    { title: "Notebook", price: 5 },
    { title: "Backpack", price: 35 },
    { title: "Ruler", price: 3 },
    { title: "Calculator", price: 40 }
];

let titleArr = products.filter(el => el.price < 10).reduce((tot, curr) => {
    tot.push(curr.title)
    return tot;
}, [])

console.log(titleArr)


//Exercise 5

const movies = [
    { title: "Inception", rating: 9 },
    { title: "Avatar", rating: 7.5 },
    { title: "Joker", rating: 8.2 },
    { title: "Tenet", rating: 6.9 }
];

movies.sort((a, b) => a.rating - b.rating)
console.log(movies)

//Exercise 6

const phones = [
    { model: "iPhone 15", price: 1200 },
    { model: "Samsung Galaxy S24", price: 950 },
    { model: "Xiaomi Redmi 13", price: 250 },
    { model: "Pixel 8", price: 800 }
];

console.log(phones.sort((a, b) => a.price - b.price)[0].model)

//Exercise 7

const books = [
    { title: "Harry Potter", pages: 500 },
    { title: "The Little Prince", pages: 120 },
    { title: "Lord of the Rings", pages: 700 },
    { title: "Animal Farm", pages: 250 },
];

books.filter(el => el.pages > 300).forEach(el => console.log(el))

//Exercise 8

const anotherPhones = [
    { model: "iPhone 15", price: 1200 },
    { model: "Samsung Galaxy S24", price: 950 },
    { model: "Xiaomi Redmi 13", price: 250 },
    { model: "Pixel 8", price: 800 }
];


let sum = anotherPhones.sort((a, b) => a.price - b.price).reduce((tot, curr) => tot + curr.price, 0)
console.log(sum)
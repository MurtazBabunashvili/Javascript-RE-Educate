//Exercise 1

class Triangle {
    constructor(a, b, c) {
        this.a = a
        this.b = b
        this.c = c
    }
    getPerimeter() {
        return this.a + this.b + this.c
    }
    getArea() {
        let semi_perimeter = this.getPerimeter() / 2
        return Math.sqrt(semi_perimeter * (semi_perimeter - this.a) * (semi_perimeter - this.b) * (semi_perimeter - this.c))
    }
    isRightTriangle() {
        return (this.a ** 2 + this.b ** 2 === this.c ** 2 || this.a ** 2 + this.c ** 2 === this.b ** 2 || this.b ** 2 + this.c ** 2 === this.a ** 2)
    }
}


//Exercise 2

class Smartphone {
    constructor(brand, model, releaseYear) {
        this.brand = brand
        this.model = model
        this.releaseYear = releaseYear
    }
}
class GamingPhone extends Smartphone {
    constructor(brand, model, releaseYear, gpuScore, batteryCapacity) {
        super(brand, model, releaseYear)
        this.gpuScore = gpuScore
        this.batteryCapacity = batteryCapacity
    }

    performanceIndex() {
        return this.gpuScore * this.batteryCapacity / 1000
    }
}

//Exercise 3

class CryptoWallet {
    constructor(initialValue) {
        this.initialValue = initialValue
        this.history = []
    }
    deposit(value) {
        this.initialValue += value
        this.history.push({ type: "Deposit", amount: value })
    }
    withdraw(value) {
        if (this.initialValue < value) {
            console.log("არ შეგიძლია იმაზე მეტის გამოტანა, ვიდრე გაქვს")
            return
        }
        this.initialValue -= value
        this.history.push({ type: "Withdraw", amount: value })
    }
    transfer(account, value) {
        if (value > this.initialValue) {
            console.log("არ შეგიძლია იმაზე მეტის გადარიცხვა, ვიდრე გაქვს")
            return
        }
        account.initialValue += value
        this.initialValue -= value
        this.history.push({ type: "Transfer", amount: value })
        account.history.push({ type: "Being_Transfered", amount: value }) //დამატებით ვამატებ აგრეთვე მიმღების ისტორიაშიც
    }
    getHistory() {
        return this.history
    }
}

//Exercise 4

class Wishlist {
    constructor() {
        this.itemList = []
    }
    addItem(item) {
        let lastId = this.itemList[this.itemList.length - 1]?.id || 0
        let obj = {
            id: lastId + 1,
            item
        }
        this.itemList.push(obj)
    }
    deleteItem(id) {
        this.itemList = this.itemList.filter(el => el.id !== id)
    }
    updateItem(oldItem, newItem) {
        let index = this.itemList.findIndex(el => el.item === oldItem)
        if (index !== -1) {
            this.itemList[index].item = newItem
        }
    }
}

//Exercise 5

class Freelancer {
    constructor(name, balance, hourWork, hourRate) {
        this.name = name
        this.balance = balance
        this.hourRate = hourRate
        this.hourWork = hourWork
    }

    calculateEarnings() {
        if (this.hourWork > 160) {
            return this.hourRate * this.hourWork * 1.15 //15%-ით მეტი 160> საათზე
        }
        return this.hourRate * this.hourWork
    }
}
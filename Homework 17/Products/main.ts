interface IProducts {
    id: number,
    name: string,
    price: number,
    isExpired:boolean
}

function isDiscountable(products: IProducts[]):void {
    let totalPrice:number = 0
    for (const product of products) {
        totalPrice += product.price
    }

    console.log(`Total price is ${totalPrice}`)

    if (totalPrice > 100) {
        console.log("Discount available")
    }
}

const products: IProducts[] = [
  { id: 1, name: "Milk", price: 20, isExpired: false },
  { id: 2, name: "Bread", price: 10, isExpired: false },
  { id: 3, name: "Cheese", price: 80, isExpired: false }
]

isDiscountable(products)
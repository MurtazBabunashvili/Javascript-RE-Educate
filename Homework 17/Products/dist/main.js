"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isDiscountable(products) {
    let totalPrice = 0;
    for (const product of products) {
        totalPrice += product.price;
    }
    console.log(`Total price is ${totalPrice}`);
    if (totalPrice > 100) {
        console.log("Discount available");
    }
}
const products = [
    { id: 1, name: "Milk", price: 20, isExpired: false },
    { id: 2, name: "Bread", price: 10, isExpired: false },
    { id: 3, name: "Cheese", price: 80, isExpired: false }
];
isDiscountable(products);
//# sourceMappingURL=main.js.map
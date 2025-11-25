import { BadRequestException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { IProductsDTO } from './DTO/products.dto';
import { IHeadersDTO } from './DTO/header.dto';

@Injectable()
export class ProductsService {
    products = [
        { "id": 1, "name": "Headphones", "price": 50 },
        { "id": 2, "name": "Book", "price": 20 },
        { "id": 3, "name": "Jacket", "price": 60 },
        { "id": 4, "name": "Sneakers", "price": 80 },
        { "id": 5, "name": "Watch", "price": 100 },
        { "id": 6, "name": "Backpack", "price": 40 },
        { "id": 7, "name": "Phone", "price": 500 },
        { "id": 8, "name": "Lamp", "price": 25 },
        { "id": 9, "name": "Notebook", "price": 10 },
        { "id": 10, "name": "Water Bottle", "price": 15 }
    ]

    getAll(query) {
        let {id, name, price, page, take} = query
        let data = this.products
        
        page = Number(page) || 1
        take = Number(take) || 3

        let start = (page - 1)*take
        let end = start + take

        data = data.slice(start, end)

        if (id && id !== "") data = data.filter(el => el.id === Number(id))
        if (name && name !== "") data = data.filter(el => el.name === name)
        if (price && price !== "") data = data.filter(el => el.price === Number(price))
        
        return data
    }

    getById(id:number) {
        const find = this.products.filter(el => el.id === Number(id))
        return find
    }

    create(body:IProductsDTO, headers:IHeadersDTO) {
        if (!headers || headers.password !== "admin12") throw new BadRequestException("Invalid credentials!")
        const lastId = this.products[this.products.length - 1]?.id || 0
        const newProduct = {
            id:lastId + 1,
            name:body.name,
            price:body.price
        }
        this.products.push(newProduct)

        return newProduct
    }

    delete(id:number, headers:IHeadersDTO) {
        if (!headers || headers.password !== "admin12") throw new BadRequestException("Invalid credentials!")
        
        const findByIndex = this.products.findIndex(el => el.id === id)
        if (findByIndex === -1) {
            throw new NotFoundException("Product not found!")
        }

        const foundItem = this.products[findByIndex]
        this.products.splice(findByIndex, 1)
        return foundItem
    }

    update(id:number, body:IProductsDTO, headers:IHeadersDTO) {
        if (!headers || headers.password !== "admin12") throw new BadRequestException("Invalid credentials!")
        
        const findByIndex = this.products.findIndex(el => el.id === id)
        if (findByIndex === -1) {
            throw new NotFoundException("Product not found!")
        }

        this.products[findByIndex] = {
            ...this.products[findByIndex],
            name: body.name || this.products[findByIndex].name,
            price: body.price || this.products[findByIndex].price
        }

        return this.products[findByIndex]
    }
}

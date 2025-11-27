import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  products = [
    {id:1, name:"ball", price:10},
    {id:2, name:"iphone", price:1500},
    {id:3, name:"laptop", price:2000},
    {id:4, name:"book", price:20}
  ]
  create(createProductDto: CreateProductDto) {
    const {name, price} = createProductDto
    const lastId = this.products[this.products.length-1]?.id || 0
    const newProduct = {
      id: lastId +1,
      name,
      price
    }
    this.products.push(newProduct)
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const findProduct = this.products.find(el => el.id === id)
    if (!findProduct) {
      throw new NotFoundException("Product not found")
    }
    return findProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const findIndex = this.products.findIndex(el => el.id === id)
    if (findIndex === -1) {
      throw new NotFoundException("Product not found")
    }
    this.products[findIndex] = {
      ...this.products[findIndex],
      name: updateProductDto.name || this.products[findIndex].name,
      price: updateProductDto.price || this.products[findIndex].price
    }
    return this.products[findIndex];
  }

  remove(id: number) {
    const findIndex = this.products.findIndex(el => el.id === id)
    if (findIndex === -1) {
      throw new NotFoundException("Product not found")
    }

    const deletedProduct = this.products[findIndex]
    this.products.splice(findIndex, 1)
    return deletedProduct;
  }
}

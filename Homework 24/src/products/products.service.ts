import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  products = [ 
    { id: 1, title: 'Wireless Keyboard', description: 'Slim Bluetooth keyboard for laptops', price: 89.9, stock: 12, category: 'electronics' },
    { id: 2, title: 'USB-C Hub', description: '7-in-1 multiport adapter with HDMI', price: 49.5, stock: 30, category: 'electronics' },
    { id: 3, title: 'Noise Cancelling Headphones', description: 'Wireless over-ear ANC headphones', price: 129.0, stock: 8, category: 'electronics' },
    { id: 4, title: 'Portable SSD 1TB', description: 'High-speed external solid-state drive', price: 99.99, stock: 15, category: 'electronics' }
  ]
  create(createProductDto: CreateProductDto) {
    const lastId = this.products[this.products.length-1]?.id || 0
    const newProduct = {
      id: lastId + 1,
      title: createProductDto.title,
      description: createProductDto.description,
      price: createProductDto.price,
      stock: createProductDto.stock,
      category: createProductDto.category
    }
    this.products.push(newProduct)
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const find = this.products.find(el => el.id === id)
    if (!find) {
      throw new NotFoundException("Product not found")
    }
    return find;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const findIndex = this.products.findIndex(el => el.id === id)
    if (findIndex === -1) {
      throw new NotFoundException("Product not found")
    }

    this.products[findIndex] = {
      ...this.products[findIndex],
      title: updateProductDto.title || this.products[findIndex].title,
      description: updateProductDto.description || this.products[findIndex].description,
      price: updateProductDto.price || this.products[findIndex].price,
      stock: updateProductDto.stock || this.products[findIndex].stock,
      category: updateProductDto.category || this.products[findIndex].category
    }
    return this.products[findIndex];
  }

  remove(id: number) {
    const findIndex = this.products.findIndex(el => el.id === id)
    if (findIndex === -1) {
      throw new NotFoundException("Product not found")
    }
    const deletedProduct = this.products.splice(findIndex, 1)
    return deletedProduct;
  }
}

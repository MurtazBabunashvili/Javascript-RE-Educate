import { Controller, Query, Get, Param, ParseIntPipe, Post, Body, Headers, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
    constructor (private productsService: ProductsService) {}

    @Get()
    getAll(@Query() query) {
        return this.productsService.getAll(query)
    }

    @Get(":id")
    getById(@Param("id", ParseIntPipe) id) {
        return this.productsService.getById(id)
    }

    @Post()
    create(@Body() body, @Headers() headers) {
        return this.productsService.create(body, headers)
    }

    @Put(":id")
    updateById(@Param("id", ParseIntPipe) id, @Body() body, @Headers() headers) {
        return this.productsService.update(id, body, headers)
    }

    @Delete(":id")
    deleteById(@Param("id", ParseIntPipe) id, @Headers() headers) {
        return this.productsService.delete(id, headers)
    }
}

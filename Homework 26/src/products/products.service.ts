import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product') private productModel: Model<any>,
    @InjectModel('user') private userModel: Model<User>,
  ) {}
  async create(id: string, createProductDto: CreateProductDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }
    const createProduct = await this.productModel.create({
      ...createProductDto,
      user: id,
    });
    const updateUserById = await this.userModel.findByIdAndUpdate(
      id,
      {
        $push: { products: createProduct._id },
      },
      { new: true },
    );
    if (!updateUserById) {
      throw new NotFoundException('User not found!');
    }
    return createProduct;
  }

  findAll() {
    return this.productModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }
    const findProduct = await this.productModel.findById(id);

    if (!findProduct) {
      throw new NotFoundException('Product not found');
    }
    return findProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      deletedProduct.user,
      { $pull: { products: deletedProduct._id } },
      { new: true },
    );
    return deletedProduct;
  }
}

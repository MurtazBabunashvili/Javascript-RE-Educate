import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './schema/user.schema';
import { faker } from '@faker-js/faker';
import { QueryDTO } from './dto/query.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel('user') private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new BadRequestException(
        'User with the following email already exists',
      );
    }
    const createUser = await this.userModel.create(createUserDto);
    return createUser;
  }

  findAll({ page, take }: QueryDTO) {
    return this.userModel
      .find()
      .select('-password')
      .populate('products', 'title price')
      .skip((page - 1) * take)
      .limit(take);
  }

  async onModuleInit() {
    const count = await this.userModel.countDocuments();

    if (count > 0) {
      return;
    }

    let users: any = [];

    for (let i = 0; i < 10_000; i++) {
      users.push({
        username: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }

    await this.userModel.insertMany(users);
  }

  async deleteAll() {
    return await this.userModel.deleteMany();
  }
  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }
    const findUser = await this.userModel
      .findById(id)
      .select('-password')
      .populate('products', 'title price');
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto)
      .select('-password');
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updateUserDto;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}

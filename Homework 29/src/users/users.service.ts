import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const createUser = await this.userModel.create(createUserDto);

    return createUser;
  }

  findAll() {
    return this.userModel.find();
  }

  async findByEmail(email: string) {
    const existingUser = await this.userModel
      .findOne({ email: email })
      .select('+password');
    return existingUser;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }

    const existingUser = await this.userModel.findById(id);

    if (!existingUser) {
      throw new NotFoundException('User not found!');
    }
    return existingUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
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

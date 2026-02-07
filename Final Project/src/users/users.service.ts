import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  create(CreateUserDto: CreateUserDTO) {
    return this.userModel.create(CreateUserDto);
  }
  findAll() {
    return this.userModel.find().lean();
  }

  findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }
    return this.userModel.findById(id);
  }

  findByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Please provide email');
    }
    return this.userModel.findOne({ email: email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }
    return this.userModel.findByIdAndDelete(id);
  }
}

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
import { changePasswordDTO } from './dto/change-password.dto';
import bcrypt from 'bcrypt';
import { Post } from 'src/posts/schema/post.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    @InjectModel('post') private postModel: Model<any>,
  ) {}
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

    await this.postModel.deleteMany({ user: deletedUser?._id });

    return deletedUser;
  }

  async changePassword(id: string, changePasswordDTO: changePasswordDTO) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }

    if (
      !changePasswordDTO.current_password ||
      !changePasswordDTO.new_password
    ) {
      throw new BadRequestException(
        'Please provide current password and new password!',
      );
    }

    const existingUser = await this.userModel.findById(id).select('+password');

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await bcrypt.compare(
      changePasswordDTO.current_password,
      existingUser.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Current password does not match!');
    }

    const hashedPassword = await bcrypt.hash(
      changePasswordDTO.new_password,
      10,
    );
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async addPost(userId, postId) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { posts: postId } },
      { new: true },
    );
    return updatedUser;
  }
}

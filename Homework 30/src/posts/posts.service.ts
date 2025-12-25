import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('post') private postModel: Model<Post>,
    private userService: UsersService,
  ) {}
  async create(userId, createPostDto: CreatePostDto) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid mongo id');
    }

    const newPost = await this.postModel.create({
      ...createPostDto,
      user: userId,
    });

    await this.userService.addPost(userId, newPost._id);
    return newPost;
  }

  findAll() {
    return this.postModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }

    const foundPost = await this.postModel.findById(id);
    if (!foundPost) {
      throw new NotFoundException('Post not found');
    }
    return foundPost;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }

    const updatedPost = await this.postModel.findByIdAndUpdate(
      id,
      updatePostDto,
      { new: true },
    );
    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }
    return updatedPost;
  }

  async remove(id: string) {
    const deletedPost = this.postModel.findByIdAndDelete(id);
    if (!deletedPost) {
      throw new NotFoundException('Post not found!');
    }
    return deletedPost;
  }
}

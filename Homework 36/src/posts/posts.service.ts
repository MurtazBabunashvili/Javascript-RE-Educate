import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel('post') private postModel: Model<Post>) {}
  create(createPostDto: CreatePostDto) {
    return this.postModel.create(createPostDto);
  }

  findAll() {
    return this.postModel.find().lean();
  }

  findOne(id: string) {
    return this.postModel.findById(id).lean();
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .lean();
  }

  remove(id: string) {
    return this.postModel.findByIdAndDelete(id).lean();
  }
}

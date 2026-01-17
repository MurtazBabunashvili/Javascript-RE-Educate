import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { HasTokenGuard } from 'src/auth/guards/HasToken.guard';
import { UserIdDecorator } from 'src/decorators/userId.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOkResponse({
    example: {
      message: 'Post created successfully',
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: 'Bad request',
      status: 400,
    },
  })
  @Post()
  @UseGuards(HasTokenGuard)
  create(@UserIdDecorator() userId, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(userId, createPostDto);
  }

  @ApiResponse({
    example: {
      _id: '696b4a293f3452f41cc73043',
      firstName: 'Nika',
      lastName: 'Beridze',
      username: 'User123',
      age: 25,
      email: 'example@email.com',
      role: 'USER',
      posts: [],
      createdAt: '2026-01-17T08:36:57.287Z',
      updatedAt: '2026-01-17T08:36:57.287Z',
      __v: 0,
    },
  })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOkResponse({
    example: {
      _id: '696b4a293f3452f41cc73043',
      firstName: 'Nika',
      lastName: 'Beridze',
      username: 'User123',
      age: 25,
      email: 'example@email.com',
      role: 'USER',
      posts: [],
      createdAt: '2026-01-17T08:36:57.287Z',
      updatedAt: '2026-01-17T08:36:57.287Z',
      __v: 0,
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: 'Bad request',
      status: 400,
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOkResponse({
    example: {
      message: 'Post updated successfully',
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: 'Bad request',
      status: 400,
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOkResponse({
    example: {
      message: 'Post deleted successfully',
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: 'Bad request',
      status: 400,
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}

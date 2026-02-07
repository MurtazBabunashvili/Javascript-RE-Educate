import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HasTokenGuard } from 'src/auth/guards/HasToken.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(HasTokenGuard)
  @Post('/fileUpload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const path = Math.random().toString().slice(2);
    const filePath = `images/${path}`;
    return this.usersService.uploadImage(filePath, file.buffer);
  }

  @UseGuards(HasTokenGuard)
  @Post('getImage')
  getImage(@Body('fileId') fileId) {
    return this.usersService.getImage(fileId);
  }

  @UseGuards(HasTokenGuard)
  @Post('/transform')
  @UseInterceptors(FileInterceptor('file'))
  transformImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('transformations') transformations: string,
  ) {
    const parsedtransformations = JSON.parse(transformations);
    return this.usersService.transformImage(file.buffer, parsedtransformations);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

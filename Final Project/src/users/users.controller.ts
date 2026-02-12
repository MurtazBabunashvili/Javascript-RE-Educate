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
  Query,
  Res,
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
  @Post('transform')
  transformImage(
    @Body('fileId') fileId: string,
    @Body('transformations') transformations: any,
  ) {
    return this.usersService.transformImageById(fileId, transformations);
  }

  @UseGuards(HasTokenGuard)
  @Post('download')
  async downloadImage(@Body('fileId') fileId: string, @Res() res: any) {
    const imageBuffer = await this.usersService.downloadImage(fileId);

    res.set({
      'Content-Type': imageBuffer?.contentType,
      'Content-Disposition': `attachment; filename="${fileId.split('/').pop()}"`,
    });

    res.send(imageBuffer?.buffer);
  }

  @UseGuards(HasTokenGuard)
  @Get('getImages')
  getImages(@Query('page') page?: string, @Query('take') take?: string) {
    const parsedPage = parseInt(page || '1');
    const parsedTake = parseInt(take || '5');
    return this.usersService.getImages(parsedPage, parsedTake);
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

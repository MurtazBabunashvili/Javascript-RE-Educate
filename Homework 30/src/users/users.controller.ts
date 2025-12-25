import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HasTokenGuard } from 'src/auth/guards/HasToken.guard';
import { UserIdDecorator } from 'src/decorators/userId.decorator';
import { changePasswordDTO } from './dto/change-password.dto';
import { IsAdminGuard } from 'src/auth/guards/isAdmin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(HasTokenGuard)
  @Patch('/change-password')
  changePassword(
    @UserIdDecorator() userId,
    @Body() changePasswordDTO: changePasswordDTO,
  ) {
    return this.usersService.changePassword(userId, changePasswordDTO);
  }

  @Patch()
  update(@UserIdDecorator() userId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @UseGuards(HasTokenGuard)
  @Delete()
  remove(@UserIdDecorator() userId) {
    return this.usersService.remove(userId);
  }

  @UseGuards(HasTokenGuard, IsAdminGuard)
  @Delete(':id')
  removeOtherUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

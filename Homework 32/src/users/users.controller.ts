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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    example: {
      message: 'All users retreived successfully',
    },
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({
    example: {
      message: 'User retreived successfully',
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
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({
    example: {
      message: 'Password changed successfully',
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: 'Bad request',
      status: 400,
    },
  })
  @UseGuards(HasTokenGuard)
  @Patch('/change-password')
  changePassword(
    @UserIdDecorator() userId,
    @Body() changePasswordDTO: changePasswordDTO,
  ) {
    return this.usersService.changePassword(userId, changePasswordDTO);
  }

  @ApiOkResponse({
    example: {
      message: 'User updated successfully',
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: 'Bad request',
      status: 400,
    },
  })
  @Patch()
  update(@UserIdDecorator() userId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @ApiOkResponse({
    example: {
      message: 'User deleted successfully',
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: 'Bad request',
      status: 400,
    },
  })
  @UseGuards(HasTokenGuard)
  @Delete()
  remove(@UserIdDecorator() userId) {
    return this.usersService.remove(userId);
  }

  @ApiOkResponse({
    example: {
      message: 'Other user deleted successfully',
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: 'Bad request',
      status: 400,
    },
  })
  @UseGuards(HasTokenGuard, IsAdminGuard)
  @Delete(':id')
  removeOtherUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

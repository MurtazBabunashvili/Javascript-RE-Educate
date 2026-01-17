import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO } from './dto/sign-up.dto';
import { signInDTO } from './dto/sign-in.dto';
import { HasTokenGuard } from './guards/HasToken.guard';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiCreatedResponse({
    example: 'User created successfully',
  })
  @ApiBadRequestResponse({
    example: {
      message: 'User already exists',
      error: 'Bad request',
      status: 400,
    },
  })
  signUp(@Body() signUpDTO: signUpDTO) {
    return this.authService.signUp(signUpDTO);
  }

  @ApiOkResponse({
    example: {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTZiNGEyOTNmMzQ1MmY0MWNjNzMwNDMiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc2ODYzOTQzOCwiZXhwIjoxNzY4NjQzMDM4fQ.eHsDQFBCjbVygGlJkBspLRR-QT4LSLIZp9zQLo-MSgI',
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: 'Invalid credentials',
      error: 'Bad request',
      status: 400,
    },
  })
  @Post('sign-in')
  signIn(@Body() signInDTO: signInDTO) {
    return this.authService.signIn(signInDTO);
  }

  @ApiOkResponse({
    example: {
      _id: '696b4a293f3452f41cc73043',
      firstName: 'Nika',
      lastName: 'Beridze',
      username: 'User123',
      age: 25,
      email: 'example@email.com',
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: 'Invalid token',
      error: 'Bad request',
      status: 400,
    },
  })
  @ApiBearerAuth()
  @UseGuards(HasTokenGuard)
  @Get('me')
  myProfile(@Req() request) {
    const userId = request.userId;
    return this.authService.currentUser(userId);
  }
}

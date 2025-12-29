import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO } from './dto/sign-up.dto';
import { signInDTO } from './dto/sign-in.dto';
import { HasTokenGuard } from './guards/HasToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDTO: signUpDTO) {
    return this.authService.signUp(signUpDTO);
  }

  @Post('sign-in')
  signIn(@Body() signInDTO: signInDTO) {
    return this.authService.signIn(signInDTO);
  }

  @UseGuards(HasTokenGuard)
  @Get('me')
  myProfile(@Req() request) {
    const userId = request.userId;
    return this.authService.currentUser(userId);
  }
}

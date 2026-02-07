import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.signUp(signUpDTO);
  }

  @Post('sign-in')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }

}

import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDTO } from './dto/sign-up.dto';
import bcrypt from 'bcrypt';
import { SignInDTO } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(@Body() signUpDTO: SignUpDTO) {
    const existingUser = await this.userService.findByEmail(signUpDTO.email);
    if (existingUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const hashedPassword = await bcrypt.hash(signUpDTO.password, 10);

    const createdUser = this.userService.create({
      ...signUpDTO,
      password: hashedPassword,
    });
    return createdUser;
  }

  async signIn(@Body() signInDTO: SignInDTO) {
    const existingUser = await this.userService.findByEmail(signInDTO.email);
    if (!existingUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(
      signInDTO.password,
      existingUser.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const payLoad = {
      userId: existingUser._id,
    };

    const accessToken = await this.jwtService.sign(payLoad, {
      expiresIn: '1h',
    });
    return accessToken;
  }
}

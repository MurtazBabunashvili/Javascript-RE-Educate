import {
  BadGatewayException,
  BadRequestException,
  Body,
  Injectable,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { signUpDTO } from './dto/sign-up.dto';
import bcrypt from 'bcrypt';
import { signInDTO } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(@Body() signUpDTO: signUpDTO) {
    const existingUser = await this.userService.findByEmail(signUpDTO.email);
    if (existingUser) {
      throw new BadGatewayException('Invalid credentials');
    }

    const hashedPassword = await bcrypt.hash(signUpDTO.password, 10);

    const createdUser = this.userService.create({
      ...signUpDTO,
      password: hashedPassword,
    });

    return createdUser;
  }

  async signIn(@Body() signInDTO: signInDTO) {
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
      role: existingUser.role,
    };

    const accessToken = await this.jwtService.sign(payLoad, {
      expiresIn: '1h',
    });
    return accessToken;
  }

  async currentUser(userId: string) {
    const findUserById = await this.userService.findOne(userId);
    return findUserById;
  }
}

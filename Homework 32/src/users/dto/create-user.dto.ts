import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  // user იქმნება auth-ში, ამიტომ აქ swagger-ით აღწერა არ არის საჭირო
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  username: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(13)
  @Max(99)
  age: Number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

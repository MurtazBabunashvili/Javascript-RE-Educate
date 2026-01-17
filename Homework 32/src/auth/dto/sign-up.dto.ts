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

export class signUpDTO {
  @ApiProperty({
    example: 'Nika',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  firstName: string;

  @ApiProperty({
    example: 'Beridze',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  lastName: string;

  @ApiProperty({
    example: 'User123',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  username: string;

  @ApiProperty({
    example: 25,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(13)
  @Max(99)
  age: Number;

  @ApiProperty({
    example: 'example@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd!',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

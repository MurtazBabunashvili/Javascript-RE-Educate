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
  @IsNotEmpty()
  @IsString()
  @Length(4, 30)
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(5, 50)
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(12)
  @Max(99)
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}

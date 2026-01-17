import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class signInDTO {
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

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class changePasswordDTO {
  @ApiProperty({
    example: 'CurrentP@ssw0rd!',
  })
  @IsNotEmpty()
  current_password: string;

  @ApiProperty({
    example: 'NewP@ssw0rd!',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  new_password: string;
}

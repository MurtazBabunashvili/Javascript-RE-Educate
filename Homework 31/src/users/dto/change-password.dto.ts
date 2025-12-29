import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class changePasswordDTO {
  @IsNotEmpty()
  current_password: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  new_password: string;
}

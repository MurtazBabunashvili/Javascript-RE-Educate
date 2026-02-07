import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator"

export class SignUpDTO {
    @IsString()
    @Length(6, 50)
    @IsNotEmpty()
    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword()
    @IsNotEmpty()
    password:string
}
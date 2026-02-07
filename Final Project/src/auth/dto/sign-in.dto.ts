import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator"

export class SignInDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword()
    @IsNotEmpty()
    password:string
}
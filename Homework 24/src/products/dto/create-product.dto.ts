import { IsNotEmpty, IsNumber, IsString, Length, Min, Max } from "class-validator";


export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    title: string

    @IsNotEmpty()
    @IsString()
    @Length(2, 200)
    description: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(100000)
    price: number


    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(1000)
    stock: number

    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    category: string
}

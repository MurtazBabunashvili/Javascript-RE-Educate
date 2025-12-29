import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  title: string;

  @IsNotEmpty()
  @Length(2, 500)
  @IsString()
  description: string;
}

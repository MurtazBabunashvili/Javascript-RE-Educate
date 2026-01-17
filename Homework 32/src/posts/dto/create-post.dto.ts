import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'My first post',
  })
  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'Today I have played football with my friends and it was really fun!',
  })
  @IsNotEmpty()
  @Length(2, 500)
  @IsString()
  description: string;
}

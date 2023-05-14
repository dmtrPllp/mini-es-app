import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  authorId: number;
}

export default CreatePostDto;

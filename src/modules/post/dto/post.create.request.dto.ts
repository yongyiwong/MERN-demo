import { IsNotEmpty, IsString } from 'class-validator';

export class PostCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class PostUpdateRequestDto {
  @IsString()
  @IsNotEmpty()
  title: String;

  @IsString()
  @IsNotEmpty()
  content: String;
}

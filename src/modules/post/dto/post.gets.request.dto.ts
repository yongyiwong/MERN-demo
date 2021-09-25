import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PostGetsRequestDto {
  @IsInt()
  @Transform((params) => Number(params.value))
  @IsNotEmpty()
  @Min(0)
  count: number;

  @IsInt()
  @Transform((params) => Number(params.value))
  @IsNotEmpty()
  @Min(0)
  page: number;
}

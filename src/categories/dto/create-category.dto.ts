import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'The name of the role.',
    required: true,
  })
  @MinLength(1)
  @IsString()
  public name: string;
}

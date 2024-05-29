import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CategoryDto {
  @ApiProperty({
    type: Number,
    minimum: 1,
    description: 'The ID of the role.',
    required: true,
  })
  @IsNumber()
  @Min(1)
  public id: number;

  @ApiPropertyOptional({
    type: String,
    description: 'The name of the category. (Optional)',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  public name?: string;

  private constructor(id: number, name: string) {
    {
      this.id = id;
      this.name = name;
    }
  }

  public static mapFrom(obj: { [key: string]: any }): CategoryDto {
    const { id, name } = obj;
    return new CategoryDto(id, name);
  }
}

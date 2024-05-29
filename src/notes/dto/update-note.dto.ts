import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CategoryDto } from '../../categories/dto/category.dto';
import { Type } from 'class-transformer';

export class UpdateNoteDto {
  @ApiProperty({
    type: String,
    description: 'The title of the note',
    required: true,
  })
  @MinLength(2)
  @IsString()
  public title: string;

  @ApiProperty({
    type: String,
    description: 'The description of the note',
    required: true,
  })
  @MinLength(2)
  @IsString()
  public description: string;

  @ApiProperty({
    type: [CategoryDto],
    description: 'Array of categories assigned to this note. (Could be Empty)',
    required: true,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  public categories: CategoryDto[];
}


import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from "class-validator";

export class NotesFilterDto {
  @ApiProperty({
    type: Number,
    description: 'The ID of the user',
    required: true,
  })
  @IsPositive()
  @IsNumber()
  public userId: number;
}

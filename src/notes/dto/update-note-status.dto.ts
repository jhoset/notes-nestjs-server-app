import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateNoteStatusDto {
  @ApiProperty({
    type: Boolean,
    description:
      'The status of the note (true: will retrieve actives notes & false: will retrieve archived notes)',
    required: true,
  })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  @IsBoolean()
  public isActive: boolean;
}

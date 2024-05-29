import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotesFilterDto } from './dto/notes-filter.dto';
import { UpdateNoteStatusDto } from './dto/update-note-status.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Notes')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller({
  path: 'notes',
  version: '1',
})
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll(@Query() userNotesDto: NotesFilterDto) {
    return this.notesService.findAll(userNotesDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch('status/:id')
  updateNoteStatus(
    @Param('id') id: string,
    @Body() updateNoteStatusDto: UpdateNoteStatusDto,
  ) {
    return this.notesService.updateNoteStatus(+id, updateNoteStatusDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}

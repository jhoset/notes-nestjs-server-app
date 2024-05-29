import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../prisma/services/prisma.service';
import { NoteDto } from './dto/note.dto';
import { NotesFilterDto } from './dto/notes-filter.dto';
import { UpdateNoteStatusDto } from './dto/update-note-status.dto';

@Injectable()
export class NotesService {
  constructor(private _prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto) {
    await this.checkExistingUserId(createNoteDto.userId);
    let categoryIds = [];
    if (createNoteDto.categories) {
      categoryIds = createNoteDto.categories.map(({ id }) => id);
      await this.checkExistingCategories(categoryIds);
    }

    const noteCreated = await this._prisma.note.create({
      data: {
        ...createNoteDto,
        categories: {
          create: categoryIds.map((id) => ({
            category: { connect: { id } },
          })),
        },
      },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });

    return NoteDto.mapFrom(noteCreated);
  }

  async findAll(notesFilterDto: NotesFilterDto) {
    await this.checkExistingUserId(notesFilterDto.userId);
    const dbNotes = await this._prisma.note.findMany({
      where: { isDeleted: false, ...notesFilterDto },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });

    return dbNotes.map((note) => NoteDto.mapFrom(note));
  }

  async findOne(id: number) {
    const existingNote = await this._prisma.note.findFirst({
      where: { id, isDeleted: false },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
    if (!existingNote)
      throw new NotFoundException(`There is no Note with ID: ${id}`);
    return NoteDto.mapFrom(existingNote);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    await this.findOne(id);
    let categoryIds = [];
    if (updateNoteDto.categories) {
      categoryIds = updateNoteDto.categories.map(({ id }) => id);
      await this.checkExistingCategories(categoryIds);
    }

    const noteUpdated = await this._prisma.note.update({
      where: { id },
      data: {
        ...updateNoteDto,
        categories: {
          deleteMany: {},
          create: categoryIds.map((id) => ({
            category: { connect: { id } },
          })),
        },
      },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });

    return NoteDto.mapFrom(noteUpdated);
  }

  async updateNoteStatus(id: number, updateNoteStatusDto: UpdateNoteStatusDto) {
    await this.findOne(id);
    const noteUpdated = await this._prisma.note.update({
      where: { id },
      data: {
        ...updateNoteStatusDto,
      },
    });
    return noteUpdated.isActive === updateNoteStatusDto.isActive;
  }

  async remove(id: number) {
    await this.findOne(id);
    const { isDeleted } = await this._prisma.note.update({
      where: { id },
      data: { isDeleted: true },
    });
    return !!isDeleted;
  }

  private async checkExistingCategories(categoryIds: number[]) {
    const dbCategories = await this._prisma.category.findMany({
      where: {
        isDeleted: false,
        id: { in: categoryIds },
      },
    });
    if (categoryIds.length !== dbCategories.length) {
      throw new BadRequestException(
        `At least one Category ID provided does not exists in the database`,
      );
    }
    return dbCategories;
  }

  private async checkExistingUserId(id: number) {
    const userDb = await this._prisma.user.findUnique({
      where: { isDeleted: false, id },
    });
    if (!userDb)
      throw new BadRequestException(`User with ID: ${id} not found!`);
    return;
  }
}

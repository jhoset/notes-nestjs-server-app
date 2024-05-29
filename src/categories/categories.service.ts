import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma/services/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private _prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryCreated = await this._prisma.category.create({
      data: { ...createCategoryDto },
    });
    return CategoryDto.mapFrom(categoryCreated);
  }

  async findAll() {
    const dbCategories = await this._prisma.category.findMany({
      where: { isDeleted: false },
    });
    return dbCategories.map((dbCat) => CategoryDto.mapFrom(dbCat));
  }
}

import { CategoryDto } from '../../categories/dto/category.dto';

export class NoteDto {
  private constructor(
    public id: number,
    public title: string,
    public description: string,
    public isActive: boolean,
    public categories: CategoryDto[],
  ) {}

  public static mapFrom(obj: { [key: string]: any }): NoteDto {
    const { id, title, description, isActive, categories } = obj;
    const categoriesDto = categories.map(({ category }: any) =>
      CategoryDto.mapFrom(category),
    );
    return new NoteDto(id, title, description, isActive, categoriesDto);
  }
}

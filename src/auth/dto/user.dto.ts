export class UserDto {
  private constructor(
    public id: number,
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public email: string,
  ) {}

  public static mapFrom(obj: { [key: string]: any }): UserDto {
    const { id, firstName, middleName, lastName, email } = obj;
    return new UserDto(id, firstName, middleName, lastName, email);
  }
}

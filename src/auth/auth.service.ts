import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BcryptAdapter } from '../common/adapters/bcrypt.adapter';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserDto } from './dto/user.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { PrismaService } from '../prisma/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private _prisma: PrismaService,
    private _bcryptAdapter: BcryptAdapter,
    private _jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const existingUser = await this._prisma.user.findFirst({
      where: { email, isDeleted: false },
    });
    if (!existingUser)
      throw new UnauthorizedException('Email or password is incorrect');
    if (!this._bcryptAdapter.compare(password, existingUser.password))
      throw new UnauthorizedException('Email or password is incorrect');
    const user = UserDto.mapFrom(existingUser);
    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    await this.checkNotRegisteredEmail(registerUserDto.email);
    registerUserDto.password = this._bcryptAdapter.hash(
      registerUserDto.password,
    );
    const userCreated = await this._prisma.user.create({
      data: {
        ...registerUserDto,
      },
    });
    const user = UserDto.mapFrom(userCreated);
    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this._jwtService.sign(payload);
  }

  private async checkNotRegisteredEmail(email: string) {
    const existingUser = await this._prisma.user.findFirst({
      where: { email, isDeleted: false },
    });
    if (existingUser)
      throw new BadRequestException(
        `There is already a user with the email ${email}`,
      );
  }
}

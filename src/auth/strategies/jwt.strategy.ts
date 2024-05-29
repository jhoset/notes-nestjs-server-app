import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserDto } from '../dto/user.dto';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private _prisma: PrismaService,
    private _configService: ConfigService,
  ) {
    super({
      secretOrKey: _configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { id } = payload;

    const userDb = await this._prisma.user.findUnique({
      where: { id, isDeleted: false },
    });
    if (!userDb) throw new UnauthorizedException(`Invalid Token`);

    return UserDto.mapFrom(userDb);
  }
}

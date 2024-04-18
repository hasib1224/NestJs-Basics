// jwt-cookie.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy, 'jwt-cookie') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.Authentication; 
        },
      ]),
      secretOrKey: 'topSecret92', 
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId }; 
  }

  authenticate(req: Request, options?: any) {
    return super.authenticate(req, options);
  }
}

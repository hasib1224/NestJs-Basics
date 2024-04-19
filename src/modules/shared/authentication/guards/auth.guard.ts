import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.headers?.cookie?.split('; ');

    const { user } = context.switchToHttp().getRequest();

    if (Array.isArray(cookies)) {
      const authToken = cookies.find((cookie) =>
        cookie.startsWith('Authentication='),
      );
      const token = authToken.split('Authentication=')[1].trim();
      if (token) {
        return true;
      }
    }
    return false;
  }
}

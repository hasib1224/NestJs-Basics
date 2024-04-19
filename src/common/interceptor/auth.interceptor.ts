import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.headers?.cookie?.split('; ');

    if (!cookies) {
      throw new UnauthorizedException('Authentication cookie not found');
    }

    try {
      if (Array.isArray(cookies)) {
        const authToken = cookies.find((cookie) =>
          cookie.startsWith('Authentication='),
        );
        const token = authToken.split('Authentication=')[1].trim();
        const decodedToken = this.jwtService.decode(token);

        request.user = {
          email: decodedToken.email,
          userId: decodedToken.userId,
        };
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return next.handle();
  }
}



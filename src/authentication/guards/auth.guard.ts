import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.headers?.cookie?.split('; ');

    if (Array.isArray(cookies)) {
      const authToken = cookies.find(cookie => cookie.startsWith('Authentication='));

      if (authToken) {
        return true; 
      }
    }
    return false; 
  }
}

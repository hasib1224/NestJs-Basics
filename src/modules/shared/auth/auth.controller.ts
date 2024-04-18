import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDto } from './dtos/auth.user.dto';

@Controller('auth')
export class AuthController {
    authService: any;
    @Post('/signup')
    signup(@Body() body: AuthUserDto) {
      return this.authService.signup(body.email, body.password);
    }
}



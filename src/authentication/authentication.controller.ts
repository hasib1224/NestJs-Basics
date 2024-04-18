import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthUserDto } from './dtos/auth.user.dto';
import { AuthenticationService } from './authentication.service';
import { CurrentUser } from './decorators/currentUser.decorator';
import { useContainer } from 'class-validator';
import { CookieAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('/signup')
  signup(@Body() body: AuthUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  async signin(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AuthUserDto,
  ) {
    const token = await this.authService.signin(body.email, body.password);

    res.cookie('Authentication', token, {
      httpOnly: true,
      path: '/',
      maxAge: 86400,
    });
    return { message: 'Signin successful' };
  }

  @Post('/signout')
  @UseGuards(CookieAuthGuard)
  async signout(@Res({ passthrough: true }) res: Response) {
    // Clear the authentication cookie
    res.clearCookie('Authentication', { path: '/' });
    return { message: 'Signout successful' };
  }

  @Get('/who')
  @UseGuards(CookieAuthGuard)
  who(@CurrentUser() user: string) {
    return user;
  }
}

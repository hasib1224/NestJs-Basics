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
    const ret = await this.authService.signin(body.email, body.password);

    res.cookie('Authentication', ret.token, {
      httpOnly: true,
      path: '/',
      maxAge: 86400,
    });
    // return res.send(ret);
    return {message:"hiiii"}
  }

  @Post('/signout')
  @UseGuards(CookieAuthGuard)
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Authentication', { path: '/' });
    return { message: 'Signout successful' };
  }

  @Get('/who')
  @UseGuards(CookieAuthGuard)
  who(@CurrentUser() user: string) {
    return user;
  }
}

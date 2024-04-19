import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthUserDto } from './dtos/auth.user.dto';
import { AuthenticationService } from './authentication.service';
import { useContainer } from 'class-validator';
import { CookieAuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from '../../../common/interceptor/auth.interceptor';
import { CurrentUser } from 'src/common/decorator/user.decorator';

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
    return { message: 'hiiii' };
  }

  @Post('/signout')
  @UseGuards(CookieAuthGuard)
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Authentication', { path: '/' });
    return { message: 'Signout successful' };
  }

  @Get('/who')
  @UseGuards(CookieAuthGuard)
  @UseInterceptors(AuthInterceptor)
  who(@CurrentUser() user: any, @Req() req: Request) {
    console.log(user, 'req');
    return user;
  }
}

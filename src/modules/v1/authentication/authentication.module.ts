import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { JwtCookieStrategy } from './strategies/jwtCookie.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'topSecret92', // SECRET KEY 
      signOptions: {
        expiresIn: 86400, 
      },
    }),
  ],
  providers: [
    AuthenticationService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    JwtCookieStrategy
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/v1/user/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private authRepo: Repository<User>,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    const hashedPass = await this.hashingService.hash(password);

    const user = new User();
    user.email = email;
    user.password = hashedPass;
    await this.authRepo.save(user);

    return user;
  }

  async signin(email: string, password: string) {
    const user = await this.authRepo.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashingService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, userId: user.id };
    const token = this.jwtService.sign(payload);

    return { user, status: 'success', token };
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload: any = this.jwtService.verify(token, {
      secret: 'topSecret92',
    });

    const userId = payload.id;
    console.log(userId);
  }
}

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterDTO } from '../dtos/register.dto';
import type { IUserRepository } from '../interfaces/user.repository.interface';
import { IUserService } from '../interfaces/user.service.interface';
import { HttpResponse } from 'src/common/constants/response-msg.constants';
import { PasswordUtil } from 'src/common/utils/password.util';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { OtpUtil } from 'src/common/utils/otp.util';
import { EmailUtil } from 'src/common/utils/mail.util';
import { JwtUtil } from 'src/common/utils/jwt.util';
import { CookieUtil } from 'src/common/utils/cookie.util';
import type { Cache } from 'cache-manager';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async register(userData: RegisterDTO): Promise<void> {
    const { username, email, password } = userData;

    const user = await this.userRepository.getUserByEmail(email);

    if (user) {
      throw new HttpException(
        HttpResponse.USER_ALREADY_EXIST,
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await PasswordUtil.hash(password);

    const otp = OtpUtil.generate();

    EmailUtil.sendOtp(email, otp);

    const saveData = {
      username,
      email,
      password:hashedPassword,
      otp,
    };

    await this.cacheManager.set(email, saveData, 300000);
  }

  async login(
    userData: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = userData;

    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new HttpException(
        HttpResponse.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid = await PasswordUtil.validate(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        HttpResponse.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    const accessToken = JwtUtil.generateAccessToken(payload);
    const refreshToken = JwtUtil.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyOtp(email: string, otp: string): Promise<void> {
    const userData = (await this.cacheManager.get(email)) as {
      otp: string;
      username: string;
      email: string;
      password: string;
    };

    if (!userData) {
      throw new HttpException(HttpResponse.INVALID_OTP, HttpStatus.BAD_REQUEST);
    }

    if (userData.otp !== otp) {
      throw new HttpException(HttpResponse.INVALID_OTP, HttpStatus.BAD_REQUEST);
    }

    const saveData = {
      username: userData.username,
      email: userData.email,
      password: userData.password
    };

    await this.cacheManager.del(email);
    await this.userRepository.createUser(saveData)
  }
  async resendOtp(email: string): Promise<void> {
    const userData = await this.cacheManager.get(email);
    if (!userData) {
      throw new HttpException(HttpResponse.INVALID_OTP, HttpStatus.BAD_REQUEST);
    }

    const otp = OtpUtil.generate();

    EmailUtil.sendOtp(email, otp);

    this.cacheManager.set(email, { ...userData, otp }, 300000);
  }
}

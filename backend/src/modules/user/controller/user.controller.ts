import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { IUserController } from '../interfaces/user.controller.interface';
import type { Response } from 'express';
import { RegisterDTO } from '../dtos/register.dto';
import { UserService } from '../service/user.service';
import { successResponse } from 'src/common/utils/response.util';
import { HttpResponse } from 'src/common/constants/response-msg.constants';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';
import { ResendOtpDto } from '../dtos/reset-otp.dto';
import { CookieUtil } from 'src/common/utils/cookie.util';

@Controller('users')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(
    @Body() body: RegisterDTO,
    @Res() res: Response,
  ): Promise<void> {
    await this.userService.register(body);
    successResponse(res, HttpStatus.OK, HttpResponse.OTP_SENT);
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response): Promise<void> {
    const { accessToken, refreshToken } = await this.userService.login(body);
    CookieUtil.setRefreshToken(res, refreshToken);
    successResponse(res, HttpStatus.OK, HttpResponse.LOGIN_SUCCESS, {
      accessToken,
    });
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body() body: VerifyOtpDto,
    @Res() res: Response,
  ): Promise<any> {
    await this.userService.verifyOtp(body.email, body.otp);
    successResponse(res, HttpStatus.OK, HttpResponse.OTP_VERIFIED);
  }

  @Post('resend-otp')
  async resendOtp(
    @Body() body: ResendOtpDto,
    @Res() res: Response,
  ): Promise<any> {
    await this.userService.resendOtp(body.email);
    successResponse(res, HttpStatus.OK, HttpResponse.OTP_RESENT);
  }

  // @Post('logout')
  // async logout(@Res() res: Response): Promise<void> {
  //   successResponse(res, HttpStatus.OK, HttpResponse.AUTH_SUCCESS);
  // }
}

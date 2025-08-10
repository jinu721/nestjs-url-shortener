import { RegisterDTO } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';
import { ResendOtpDto } from '../dtos/reset-otp.dto';

export interface IUserService {
  register(userData: RegisterDTO): Promise<void>;
  login(
    userData: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  verifyOtp(email: string, otp: string): Promise<void>;
  resendOtp(email: string): Promise<void>;
  getUser(id: string): Promise<any>;
}

import { RegisterDTO } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

export interface IUserService {
  register(userData: RegisterDTO): Promise<void>;
  login(userData: LoginDto): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<void>;
  resendOtp(email: string): Promise<void>;
  // getMe(token: string): Promise<{ id: string; email: string }>;
}

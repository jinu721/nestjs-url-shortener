import { RegisterDTO } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { Request, Response } from 'express';

export interface IUserController {
  register(body: RegisterDTO, res: Response): Promise<void>;
  login(body: LoginDto, res: Response): Promise<void>;
  verifyOtp(body: any, res: Response): Promise<void>;
  resendOtp(body: any, res: Response): Promise<void>;
  // logout(request: Request, res: Response): Promise<void>;
  getMe(request: Request, res: Response): Promise<any>;
}

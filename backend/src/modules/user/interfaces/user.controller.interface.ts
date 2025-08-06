import { CreateUserDto } from '../dto/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { Request, Response } from 'express';

export interface IUserController {
  register(body: CreateUserDto, res: Response): Promise<void>;
  login(body: LoginDto, res: Response): Promise<void>;
  verifyOtp(body: any, res: Response): Promise<any>;
  resendOtp(body: any, res: Response): Promise<any>;
  logout(request: Request, res: Response): Promise<void>;
  getMe(request: Request, res: Response): Promise<any>;
}

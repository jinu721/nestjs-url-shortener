import { CreateUrlDto } from '../dtos/create-url.dto';
import { Request, Response } from 'express';

export interface IUrlController {
  create(dto: CreateUrlDto, req: Request, res: Response): Promise<void>;
  getUserUrls(req: Request, res: Response): Promise<void>;
  getOriginal(code: string, res: Response): Promise<void>;
  getHistory(req: Request, res: Response): Promise<void>;
}

import { CreateUrlDto } from '../dtos/create-url.dto';
import { Url } from 'src/schema/url.schema';

export interface IUrlService {
  createShortUrl(dto: CreateUrlDto, userId: string): Promise<Url>;
  getUserUrls(userId: string): Promise<Url[]>;
  getOriginalUrl(shortCode: string): Promise<string>;
  getUserUrlHistory(
    userId: string,
    page: number,
    limit: number,
    search?: string,
  ): Promise<{
    data: Url[];
    total: number;
    totalUrlCount: number;
    totalClickCount: number;
  }>;
}

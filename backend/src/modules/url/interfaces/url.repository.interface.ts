import { Url } from 'src/schema/url.schema';

export interface IUrlRepository {
  createUrl(
    originalUrl: string,
    shortCode: string,
    userId: string,
  ): Promise<Url>;
  findByShortCode(shortCode: string): Promise<Url | null>;
  findByUserId(userId: string): Promise<Url[]>;
  findAllByUserId(
    userId: string,
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ data: Url[]; total: number }>;
  incrementClickCount(urlId: string): Promise<void>;
  getTotalClickCount(userId: string): Promise<number>;
  getTotalUrlCount(userId: string): Promise<number>;
}

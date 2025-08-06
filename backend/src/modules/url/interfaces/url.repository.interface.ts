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
  ): Promise<{ data: Url[]; total: number }>;
}

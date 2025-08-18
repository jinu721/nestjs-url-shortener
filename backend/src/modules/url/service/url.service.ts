import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUrlService } from '../interfaces/url.service.interface';
import type { IUrlRepository } from '../interfaces/url.repository.interface';
import { CreateUrlDto } from '../dtos/create-url.dto';
import { Url } from 'src/schema/url.schema';
import { HttpResponse } from 'src/common/constants/response-msg.constants';

@Injectable()
export class UrlService implements IUrlService {
  constructor(
    @Inject('IUrlRepository') private readonly urlRepo: IUrlRepository,
  ) {}

  async createShortUrl(dto: CreateUrlDto, userId: string): Promise<Url> {
    const { nanoid } = await import('nanoid');
    const shortCode = nanoid(8);
    return this.urlRepo.createUrl(dto.originalUrl, shortCode, userId);
  }

  async getUserUrls(userId: string): Promise<Url[]> {
    return this.urlRepo.findByUserId(userId);
  }

  async getOriginalUrl(shortCode: string): Promise<string> {
    const url = await this.urlRepo.findByShortCode(shortCode);
    if (!url) {
      throw new HttpException(HttpResponse.URL_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.urlRepo.incrementClickCount(String(url._id));

    return url.originalUrl;
  }
  async getUserUrlHistory(
    userId: string,
    page: number,
    limit: number,
    search?: string,
  ): Promise<{
    data: Url[];
    total: number;
    totalUrlCount: number;
    totalClickCount: number;
  }> {
    console.log('UserId', userId, page, limit, search);
    const { data, total } = await this.urlRepo.findAllByUserId(
      userId,
      page,
      limit,
      search,
    );

    const totalUrlCount = await this.urlRepo.getTotalUrlCount(userId);
    const totalClickCount = await this.urlRepo.getTotalClickCount(userId);

    console.log('data', data);
    console.log('total', total);
    console.log('totalUrlCount', totalUrlCount);
    console.log('totalClickCount', totalClickCount);

    return {
      data,
      total,
      totalUrlCount,
      totalClickCount,
    };
  }
}

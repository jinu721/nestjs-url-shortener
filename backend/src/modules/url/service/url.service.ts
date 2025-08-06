import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUrlService } from '../interfaces/url.service.interface';
import type { IUrlRepository } from '../interfaces/url.repository.interface';
import { CreateUrlDto } from '../dtos/create-url.dto';
import { Url } from 'src/schema/url.schema';
import * as shortid from 'shortid';

@Injectable()
export class UrlService implements IUrlService {
  constructor(
    @Inject('IUrlRepository') private readonly urlRepo: IUrlRepository,
  ) {}

  async createShortUrl(dto: CreateUrlDto, userId: string): Promise<Url> {
    const shortCode = shortid.generate();
    return this.urlRepo.createUrl(dto.originalUrl, shortCode, userId);
  }

  async getUserUrls(userId: string): Promise<Url[]> {
    return this.urlRepo.findByUserId(userId);
  }

  async getOriginalUrl(shortCode: string): Promise<string> {
    const url = await this.urlRepo.findByShortCode(shortCode);
    if (!url) {
      throw new HttpException('URL Not Found', HttpStatus.NOT_FOUND);
    }
    return url.originalUrl;
  }
  async getUserUrlHistory(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ data: Url[]; total: number }> {
    return await this.urlRepo.findAllByUserId(userId, page, limit);
  }
}

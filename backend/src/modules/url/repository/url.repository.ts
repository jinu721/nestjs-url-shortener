import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from 'src/schema/url.schema';
import { Model } from 'mongoose';
import { IUrlRepository } from '../interfaces/url.repository.interface';
import { env } from 'src/common/config/env.config';

export class UrlRepository implements IUrlRepository {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async createUrl(
    originalUrl: string,
    shortCode: string,
    userId: string,
  ): Promise<Url> {
    return this.urlModel.create({
      originalUrl,
      shortUrl: `${env.BASE_URL}/url/${shortCode}`,
      shortCode,
      userId,
    });
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    return this.urlModel.findOne({ shortCode });
  }

  async findByUserId(userId: string): Promise<Url[]> {
    return this.urlModel.find({ userId });
  }

  async findAllByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ data: Url[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.urlModel.find({ userId }).skip(skip).limit(limit).exec(),
      this.urlModel.countDocuments({ userId }),
    ]);
    return { data, total };
  }
}

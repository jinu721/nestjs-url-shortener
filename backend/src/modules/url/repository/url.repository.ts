import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from 'src/schema/url.schema';
import { Model } from 'mongoose';
import { IUrlRepository } from '../interfaces/url.repository.interface';
import { env } from 'src/common/config/env.config';
import { BaseRepository } from 'src/modules/base/repository/base.repository';

export class UrlRepository
  extends BaseRepository<UrlDocument>
  implements IUrlRepository
{
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {
    super(urlModel);
  }

  async createUrl(
    originalUrl: string,
    shortCode: string,
    userId: string,
  ): Promise<Url> {
    return this.create({
      originalUrl,
      shortUrl: `${env.BASE_URL}/${shortCode}`,
      shortCode,
      userId,
    });
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    return this.findOne({ shortCode });
  }

  async findByUserId(userId: string): Promise<Url[]> {
    return this.findAll({ userId });
  }

  async findAllByUserId(
    userId: string,
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ data: Url[]; total: number }> {
    const skip = (page - 1) * limit;

    const filter: {
      userId?: string;
      originalUrl?: { $regex: RegExp };
    } = { userId };

    if (search) {
      filter.originalUrl = { $regex: new RegExp(search, 'i') };
    }

    const [data, total] = await Promise.all([
      await this.urlModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      await this.urlModel.countDocuments(filter),
    ]);

    return { data, total };
  }
  async incrementClickCount(urlId: string): Promise<void> {
    console.log('urlId', urlId);
    await this.urlModel.updateOne({ _id: urlId }, { $inc: { clicks: 1 } });
  }

  async getTotalClickCount(userId: string): Promise<number> {
    const total = await this.aggregate<{
      _id: string;
      totalClickCount: number;
    }>([
      { $match: { userId } },
      { $group: { _id: '$userId', totalClickCount: { $sum: '$clicks' } } },
    ]);

    return total[0]?.totalClickCount || 0;
  }

  async getTotalUrlCount(userId: string): Promise<number> {
    const total = await this.count({ userId });
    return total;
  }
}

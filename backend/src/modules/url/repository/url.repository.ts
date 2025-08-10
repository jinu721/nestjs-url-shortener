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
      await this.urlModel.find(filter).skip(skip).limit(limit).exec(),
      await this.urlModel.countDocuments(filter),
    ]);

    return { data, total };
  }
  async incrementClickCount(urlId: string): Promise<void> {
    console.log('urlId', urlId);
    await this.urlModel.updateOne({ _id: urlId }, { $inc: { clicks: 1 } });
  }

  async getTotalClickCount(userId: string): Promise<number> {
    const total = await this.urlModel
      .aggregate([
        { $match: { userId } },
        {
          $group: { _id: '$userId', totalClickCount: { $sum: '$clicks' } },
        },
      ])
      .exec();
    return total[0]?.totalClickCount || 0;
  }

  async getTotalUrlCount(userId: string): Promise<number> {
    const total = await this.urlModel.countDocuments({ userId });
    return total;
  }
}

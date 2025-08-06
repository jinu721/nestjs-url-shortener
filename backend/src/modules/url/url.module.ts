import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from 'src/schema/url.schema';
import { UrlController } from './controller/url.controller';
import { UrlService } from './service/url.service';
import { UrlRepository } from './repository/url.repository';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
  ],
  controllers: [UrlController],
  providers: [
    UrlService,
    UrlRepository,
    {
      provide: 'IUrlRepository',
      useClass: UrlRepository,
    },
  ],
})
export class UrlModule {}

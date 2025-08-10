import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateUrlDto } from '../dtos/create-url.dto';
import { UrlService } from '../service/url.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import type { Request, Response } from 'express';
import { IUrlController } from '../interfaces/url.controller.interface';
import { successResponse } from 'src/common/utils/response.util';
import { HttpResponse } from 'src/common/constants/response-msg.constants';

@Controller()
export class UrlController implements IUrlController {
  constructor(private readonly urlService: UrlService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() dto: CreateUrlDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const user = req['user'];
    const url = await this.urlService.createShortUrl(dto, user.userId);
    successResponse(res, HttpStatus.OK, HttpResponse.URL_CREATED, { url });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserUrls(@Req() req: Request, @Res() res: Response): Promise<void> {
    const user = req['user'];
    await this.urlService.getUserUrls(user.userId);
    successResponse(res, HttpStatus.OK, HttpResponse.URL_FOUND);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getHistory(@Req() req: Request, @Res() res: Response): Promise<void> {
    console.log('HISTORY');
    const user = req['user'];
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';

    const data = await this.urlService.getUserUrlHistory(
      user.userId,
      page,
      limit,
      search,
    );
    successResponse(res, HttpStatus.OK, HttpResponse.URL_HISTORY_FOUND, data);
  }

  @Get(':shortCode')
  async getOriginal(
    @Param('shortCode') code: string,
    @Res() res: Response,
  ): Promise<void> {
    const originalUrl = await this.urlService.getOriginalUrl(code);
    res.redirect(originalUrl);
  }
}

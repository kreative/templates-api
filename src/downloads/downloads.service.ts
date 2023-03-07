import { Injectable, Req } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Download } from '@prisma/client';
import { DownloadDto } from './downloads.dto';
import { IResponse } from '@/types/IResponse';
import { handlePrismaErrors } from '@/utils/handlePrismaErrors';
import logger from '@/utils/logger';

@Injectable()
export class DownloadsService {
  constructor(private prisma: PrismaService) {}

  async findAll(@Req() req): Promise<IResponse> {
    logger.info('DownloadsService.findAll() initiated');
    let downloads: Download[];
    let total: number;

    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    try {
      // gets a list of downloads based on pagination limits
      downloads = await this.prisma.download.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });

      // gets the total amount of downloads
      total = await this.prisma.download.count();
    } catch (error) {
      logger.warn('DownloadsService.findAll() failed', error);
      handlePrismaErrors(error);
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Downloads retrieved successfully',
      data: { total, downloads },
    };

    logger.info('DownloadsService.findAll() completed', payload);
    return payload;
  }

  async create(dto: DownloadDto): Promise<IResponse> {
    logger.info('DownloadsService.create() initiated');
    let download: Download;

    try {
      download = await this.prisma.download.create({
        data: dto,
      });
    } catch (error) {
      logger.warn('DownloadsService.create() failed', error);
      handlePrismaErrors(error);
    }

    const payload: IResponse = {
      statusCode: 201,
      message: 'Download created successfully',
      data: download,
    };

    logger.info('DownloadsService.create() completed', payload);
    return payload;
  }
}

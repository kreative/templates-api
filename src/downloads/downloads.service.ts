import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Download } from '@prisma/client';
import { DownloadDto } from './downloads.dto';
import { IResponse } from '@/types/IResponse';
import { handlePrismaErrors } from '@/utils/handlePrismaErrors';
import logger from '@/utils/logger';

@Injectable()
export class DownloadsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IResponse> {
    logger.info('DownloadsService.findAll() initiated');
    let downloads: Download[];

    try {
      downloads = await this.prisma.download.findMany();
    } catch (error) {
      logger.warn('DownloadsService.findAll() failed', error);
      handlePrismaErrors(error);
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Downloads retrieved successfully',
      data: downloads,
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

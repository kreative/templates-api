import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadDto } from './downloads.dto';
import logger from '@/utils/logger';

@Controller('downloads')
export class DownloadsController {
  constructor(private downloadsService: DownloadsService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    logger.info('GET /downloads initiated');
    return this.downloadsService.findAll();
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: DownloadDto) {
    logger.info('POST /downloads initiated');
    return this.downloadsService.create(dto);
  }
}

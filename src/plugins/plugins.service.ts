import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { IResponse } from '@/types/IResponse';
import { Plugin } from '@prisma/client';
import { handlePrismaErrors } from '@/utils/handlePrismaErrors';
import logger from '@/utils/logger';

@Injectable()
export class PluginsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IResponse> {
    logger.info('PluginsService.findAll() initiated');
    let plugins: Plugin[];

    try {
      plugins = await this.prisma.plugin.findMany();
    } catch (error) {
      logger.error('PluginsService.findAll() error with prisma', error);
      handlePrismaErrors(error);
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Plugins fetched successfully',
      data: plugins,
    };

    logger.debug('PluginsService.findAll() succeeded', payload);
    return payload;
  }
}

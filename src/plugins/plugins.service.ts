import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import logger from '@/utils/logger';
import { IResponse } from '@/types/IResponse';
import { Plugin } from '@prisma/client';

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
      return {
        statusCode: 500,
        message: 'Error fetching plugins',
        data: null,
      } as IResponse;
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

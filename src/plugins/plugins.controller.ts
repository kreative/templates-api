import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PluginsService } from './plugins.service';
import logger from '@/utils/logger';

@Controller('plugins')
export class PluginsController {
  constructor(private pluginsService: PluginsService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll() {
    logger.info('GET /plugins initiated');
    return this.pluginsService.findAll();
  }
}

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { TemplateDto } from './templates.dto';
import { TemplatesService } from './templates.service';
import logger from '@/utils/logger';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    logger.info('GET /templates initiated');
    return this.templatesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    logger.info(`GET /templates/${id} initiated`);
    return this.templatesService.findOne(id);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: TemplateDto) {
    logger.info('POST /templates initiated');
    return this.templatesService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: TemplateDto) {
    logger.info(`PUT /templates/${id} initiated`);
    return this.templatesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    logger.info(`DELETE /templates/${id} initiated`);
    return this.templatesService.delete(id);
  }
}

import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorDto } from './authors.dto';
import logger from '@/utils/logger';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    logger.info('GET /authors initiated');
    return await this.authorsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    logger.info(`GET /authors/${id} initiated`, { id });
    return await this.authorsService.findOne(id);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: AuthorDto) {
    logger.info('POST /authors initiated', { dto });
    return await this.authorsService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: AuthorDto) {
    logger.info(`PUT /authors/${id} initiated`, { id, dto });
    return await this.authorsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    logger.info(`DELETE /authors/${id} initiated`, { id });
    return await this.authorsService.delete(id);
  }
}

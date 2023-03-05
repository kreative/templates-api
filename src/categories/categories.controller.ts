import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import logger from '@/utils/logger';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    logger.info('GET /categories initiated');
    return await this.categoriesService.findAll();
  }
}

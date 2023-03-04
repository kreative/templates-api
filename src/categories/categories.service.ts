import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IResponse } from '@/types/IResponse';
import { Category } from '@prisma/client';
import logger from '@/utils/logger';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IResponse> {
    logger.info('CategoriesService.findAll() initiated');
    let categories: Category[];

    try {
      categories = await this.prisma.category.findMany();
    } catch (error) {
      logger.error('CategoriesService.findAll() error with prisma', error);
      return {
        statusCode: 500,
        message: 'Error fetching categories',
        data: null,
      } as IResponse;
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Categories fetched successfully',
      data: categories,
    };

    logger.debug('CategoriesService.findAll() succeeded', payload);
    return payload;
  }
}

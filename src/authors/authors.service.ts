import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IResponse } from '@/types/IResponse';
import { Author } from '@prisma/client';
import { AuthorDto } from './authors.dto';
import { handlePrismaErrors } from '@/utils/handlePrismaErrors';
import logger from '@/utils/logger';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IResponse> {
    logger.info('AuthorsService.findAll() initiated');
    let authors: Author[];

    try {
      authors = await this.prisma.author.findMany();
    } catch (error) {
      logger.error('AuthorsService.findAll() error with prisma', error);
      handlePrismaErrors(error);
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Authors fetched successfully',
      data: authors,
    };

    logger.debug('AuthorsService.findAll() succeeded', payload);
    return payload;
  }

  async findOne(id: string): Promise<IResponse> {
    logger.info(`AuthorsService.findOne(${id}) initiated`);
    let author: Author;

    try {
      author = await this.prisma.author.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      logger.error('AuthorsService.findOne() error with prisma', error);
      handlePrismaErrors(error);
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Author fetched successfully',
      data: author,
    };

    logger.debug('AuthorsService.findOne() succeeded', payload);
    return payload;
  }

  async create(dto: AuthorDto): Promise<IResponse> {
    logger.info('AuthorsService.create() initiated');
    let author: Author;

    try {
      author = await this.prisma.author.create({
        data: dto,
      });
    } catch (error) {
      logger.error('AuthorsService.create() error with prisma', error);
      handlePrismaErrors(error);
    }

    const payload: IResponse = {
      statusCode: 201,
      message: 'Author created successfully',
      data: author,
    };

    logger.debug('AuthorsService.create() succeeded', payload);
    return payload;
  }

  async update(id: string, dto: AuthorDto): Promise<IResponse> {
    logger.info(`AuthorsService.update(${id}) initiated`);
    let authorChange: any;

    try {
      authorChange = await this.prisma.author.update({
        where: {
          id,
        },
        data: dto,
      });
    } catch (error) {
      logger.warn('AuthorsService.update() error with prisma', error);
      const message =
        error.code == 'P2025' ? 'No author found to update' : null;
      handlePrismaErrors(error, message);
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Author updated successfully',
      data: authorChange,
    };

    logger.debug('AuthorsService.update() succeeded', payload);
    return payload;
  }

  async delete(id: string): Promise<IResponse> {
    logger.info(`AuthorsService.delete(${id}) initiated`);
    let author: Author;

    try {
      author = await this.prisma.author.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      logger.warn('AuthorsService.delete() error with prisma', error);
      const message =
        error.code == 'P2025' ? 'No author found to delete' : null;
      handlePrismaErrors(error, message);
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Author deleted successfully',
    };

    logger.debug('AuthorsService.delete() succeeded', { payload, author });
    return payload;
  }
}

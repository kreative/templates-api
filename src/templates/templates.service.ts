import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { Template } from '@prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';
import { TemplateDto } from './templates.dto';
import { IResponse } from '../../types/IResponse';
import { handlePrismaErrors } from '../../utils/handlePrismaErrors';
import logger from '../../utils/logger';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(@Req() req): Promise<IResponse> {
    logger.info('TemplatesService.findAll() initiated');
    let templates: Template[] | any[];
    let total: number;

    const validSelections = ['all', 'limited', 'templates'];
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const skip = req.query.page
      ? (parseInt(req.query.page) - 1) * limit
      : undefined;
    const category = req.query.category ? req.query.category : undefined;
    const selection = req.query.selection ? req.query.selection : 'all';

    if (!validSelections.includes(selection)) {
      logger.warn('TemplatesService.findAll() invalid selection');
      throw new BadRequestException('Invalid selection');
    }

    try {
      // gets a list of templates based on pagination limits
      // adds the data for the author and for the category as well
      if (selection === 'all') {
        // gets all fields for templates, authors, and categories
        logger.debug('TemplatesService.findAll() selection is "all"');
        templates = await this.prisma.template.findMany({
          take: limit,
          skip,
          where: {
            category: {
              name: category,
            },
          },
          include: {
            author: true,
            category: true,
          },
        });
      } else if (selection === 'limited') {
        // gets templates, authors fields just for index page
        // gets only the name field for categories
        logger.debug('TemplatesService.findAll() selection is "limited"');
        templates = await this.prisma.template.findMany({
          take: limit,
          skip,
          where: {
            category: {
              name: category,
            },
          },
          select: {
            id: true,
            name: true,
            description: true,
            slug: true,
            price: true,
            thumbnailUrl: true,
            author: {
              select: {
                id: true,
                displayName: true,
                avatarUrl: true,
              },
            },
            category: {
              select: {
                name: true,
              },
            },
          }
        });
      } else if (selection === 'templates') {
        // gets all the fields for just the templates
        // no author or category data
        logger.debug('TemplatesService.findAll() selection is "templates"');
        templates = await this.prisma.template.findMany({
          take: limit,
          skip,
          where: {
            category: {
              name: category,
            },
          },
        });
      }
      // gets the total amount of templates available
      total = await this.prisma.template.count();
    } catch (error) {
      logger.error(error);
      handlePrismaErrors(error);
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Templates fetched successfully',
      data: { total, templates },
    };

    logger.debug('TemplatesService.findAll() succeeded', payload);
    return payload;
  }

  async findOne(id: string): Promise<IResponse> {
    logger.info(`TemplatesService.findOne(${id}) initiated`);
    let template: Template;

    try {
      template = await this.prisma.template.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          author: true,
          category: true,
        },
      });
    } catch (error) {
      logger.error(error);
      handlePrismaErrors(error);
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Template fetched successfully',
      data: template,
    };

    logger.debug('TemplatesService.findOne() succeeded', payload);
    return payload;
  }

  async create(dto: TemplateDto): Promise<IResponse> {
    logger.info('TemplatesService.create() initiated');
    let template: Template;

    try {
      template = await this.prisma.template.create({
        data: dto,
      });
    } catch (error) {
      logger.error(error);
      handlePrismaErrors(error);
    }

    const payload: IResponse = {
      statusCode: 201,
      message: 'Template created successfully',
      data: template,
    };

    logger.debug('TemplatesService.create() succeeded', payload);
    return payload;
  }

  async update(id: string, dto: TemplateDto): Promise<IResponse> {
    logger.info(`TemplatesService.update(${id}) initiated`);
    let template: Template;

    try {
      template = await this.prisma.template.update({
        where: {
          id,
        },
        data: dto,
      });
    } catch (error) {
      logger.warn(error);
      const message =
        error.code == 'P2025' ? 'No template found to update' : null;
      handlePrismaErrors(error, message);
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Template updated successfully',
      data: template,
    };

    logger.debug('TemplatesService.update() succeeded', payload);
    return payload;
  }

  async delete(id: string): Promise<IResponse> {
    logger.info(`TemplatesService.delete(${id}) initiated`);
    let template: Template;

    try {
      template = await this.prisma.template.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      logger.warn(error);
      const message =
        error.code == 'P2025' ? 'No template found to delete' : null;
      handlePrismaErrors(error, message);
    }

    const payload: IResponse = {
      statusCode: 200,
      message: 'Template deleted successfully',
      data: template,
    };

    logger.debug('TemplatesService.delete() succeeded', payload);
    return payload;
  }
}

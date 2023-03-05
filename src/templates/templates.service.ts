import { Injectable } from '@nestjs/common';
import { Template } from '@prisma/client';
import { PrismaService } from '@/src/prisma/prisma.service';
import { TemplateDto } from './templates.dto';
import { IResponse } from '@/types/IResponse';
import { handlePrismaErrors } from '@/utils/handlePrismaErrors';
import logger from '@/utils/logger';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<IResponse> {
    logger.info('TemplatesService.findAll() initiated');
    let templates: Template[];

    try {
      templates = await this.prisma.template.findMany({
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
      message: 'Templates fetched successfully',
      data: templates,
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

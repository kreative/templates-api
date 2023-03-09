import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TemplatesController', () => {
  let controller: TemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [TemplatesService, PrismaService],
    }).compile();

    controller = module.get<TemplatesController>(TemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DownloadsController } from './downloads.controller';
import { DownloadsService } from './downloads.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DownloadsController', () => {
  let controller: DownloadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadsController],
      providers: [DownloadsService, PrismaService],
    }).compile();

    controller = module.get<DownloadsController>(DownloadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

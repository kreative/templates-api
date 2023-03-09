import { Test, TestingModule } from '@nestjs/testing';
import { DownloadsService } from './downloads.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('DownloadsService', () => {
  let service: DownloadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownloadsService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<DownloadsService>(DownloadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

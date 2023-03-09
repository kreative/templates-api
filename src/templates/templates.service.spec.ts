import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesService } from './templates.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('TemplatesService', () => {
  let service: TemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplatesService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

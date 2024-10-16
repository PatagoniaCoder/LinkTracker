import { Test, TestingModule } from '@nestjs/testing';
import { LinkGeneratorService } from './link-generator.service';

describe('LinkGeneratorService', () => {
  let service: LinkGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkGeneratorService],
    }).compile();

    service = module.get<LinkGeneratorService>(LinkGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

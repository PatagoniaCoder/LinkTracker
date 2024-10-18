import { Test, TestingModule } from '@nestjs/testing';
import { LinkGeneratorService } from './link-generator.service';
import { REQUEST } from '@nestjs/core';
import { LinkGeneratorRepository } from './repository/link-generator.repository';

describe('LinkGeneratorService', () => {
  let service: LinkGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkGeneratorService,
        {
          provide: REQUEST,
          useValue: {},
        },
        { provide: LinkGeneratorRepository, useValue: {} },
      ],
    }).compile();

    service = await module.resolve<LinkGeneratorService>(LinkGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

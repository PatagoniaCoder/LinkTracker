import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { LinkGeneratorController } from './link-generator.controller';
import { LinkGeneratorService } from './link-generator.service';

describe('LinkGeneratorController', () => {
  let controller: LinkGeneratorController;
  const body = {
    url: 'https://www.someSite.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkGeneratorController],
      providers: [
        {
          provide: LinkGeneratorService,
          useValue: {
            generate: () => ({
              target: body.url,
              link: 'http://localhost:3000/link-generator/linkSample',
              valid: true,
            }),
          },
        },
        {
          provide: REQUEST,
          useValue: {
            secure: false,
            path: 'link-generator',
            headers: { host: 'localhost:3000/' },
          },
        },
      ],
    }).compile();

    controller = module.get<LinkGeneratorController>(LinkGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a valid link', async () => {
    const result = await controller.create(body);

    expect(result).toEqual({
      target: body.url,
      link: 'http://localhost:3000/link-generator/linkSample',
      valid: true,
    });
  });
});

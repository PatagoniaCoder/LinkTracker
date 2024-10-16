import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import * as dayjs from 'dayjs';
import { Request } from 'express';
import { DatabaseService } from '../database/database.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { MaskedUrl } from './interfaces/masked-url';
import { LinkModel } from './model/link.model';
import { FindOneOptions } from 'typeorm';
import { LinkEntity } from './entity/link.entity';

@Injectable({ scope: Scope.REQUEST })
export class LinkGeneratorService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly linkRepository: DatabaseService,
  ) {}

  private generateMaskedUrl(maskedUrl: string): string {
    return `${this.request.secure ? 'https://' : 'http://'}${this.request.headers.host}${this.request.path}/${maskedUrl}`;
  }

  private async validateLink(link: LinkModel) {
    if (dayjs().isAfter(link.expirationDate)) {
      link.isValid = false;
      await this.linkRepository.save(link);
      throw new NotFoundException();
    }
  }

  async generate(body: CreateLinkDto): Promise<MaskedUrl> {
    const newLink = new LinkModel(body.url);

    await this.linkRepository.save(newLink);

    const result: MaskedUrl = {
      target: newLink.originalUrl,
      link: this.generateMaskedUrl(newLink.maskedUrl),
      valid: newLink.isValid,
    };
    return result;
  }

  async trackAndRedirect(maskedUrl: string) {
    const param: FindOneOptions<LinkEntity> = {
      where: { maskedUrl, isValid: true },
    };
    const link = await this.linkRepository.findMaskedUrl(param);
    await this.validateLink(link);
    link.redirectCount++;
    await this.linkRepository.save(link);

    return link.originalUrl;
  }

  async counterStats(maskedUrl: string) {
    const param: FindOneOptions<LinkEntity> = {
      where: { maskedUrl },
    };
    const link = await this.linkRepository.findMaskedUrl(param);
    return link.redirectCount;
  }

  async invalidateLink(maskedUrl: string) {
    const param: FindOneOptions<LinkEntity> = {
      where: { maskedUrl },
    };
    const link = await this.linkRepository.findMaskedUrl(param);
    link.isValid = false;
    return await this.linkRepository.save(link);
  }
}

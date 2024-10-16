import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from 'src/link-generator/entity/link.entity';
import { LinkModel } from 'src/link-generator/model/link.model';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
  ) {}

  async save(link: LinkModel) {
    const some = await this.linkRepository.save(link);
    return some;
  }

  async findMaskedUrl(params: FindOneOptions<LinkEntity> = {}) {
    const result = await this.linkRepository.findOne({
      ...params,
    });
    if (!result) throw new NotFoundException();
    return result;
  }
}

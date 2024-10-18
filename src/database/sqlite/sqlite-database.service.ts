import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkModel } from 'src/link-generator/model/link.model';
import { FindOneOptions, Repository } from 'typeorm';
import { LinkEntity } from '../../link-generator/entity/link.entity';
import { LinkGeneratorRepository } from '../../link-generator/repository/link-generator.repository';

@Injectable()
export class SqliteDatabaseService implements LinkGeneratorRepository {
  constructor(
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
  ) {}

  async save(link: LinkModel) {
    return await this.linkRepository.save(link);
  }

  async findMaskedUrl(params: FindOneOptions<LinkEntity> = {}) {
    const result = await this.linkRepository.findOne({
      ...params,
    });
    if (!result) throw new NotFoundException();
    return result;
  }
}

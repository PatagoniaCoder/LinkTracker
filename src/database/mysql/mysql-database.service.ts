import { FindOneOptions, Repository } from 'typeorm';
import { LinkEntity } from '../../link-generator/entity/link.entity';
import { LinkModel } from '../../link-generator/model/link.model';
import { LinkGeneratorRepository } from '../../link-generator/repository/link-generator.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MySqlDatabaseService implements LinkGeneratorRepository {
  constructor(
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
  ) {}

  async save(link: LinkModel): Promise<LinkModel> {
    return await this.linkRepository.save(link);
  }

  async findMaskedUrl(params: FindOneOptions<LinkEntity>): Promise<LinkModel> {
    const result = await this.linkRepository.findOne({
      ...params,
    });
    if (!result) throw new NotFoundException();
    return result;
  }
}

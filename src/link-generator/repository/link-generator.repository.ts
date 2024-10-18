import { FindOneOptions } from 'typeorm';
import { LinkModel } from '../model/link.model';
import { LinkEntity } from '../entity/link.entity';

export abstract class LinkGeneratorRepository {
  abstract save(link: LinkModel): Promise<LinkModel>;
  abstract findMaskedUrl(
    params: FindOneOptions<LinkEntity>,
  ): Promise<LinkModel>;
}

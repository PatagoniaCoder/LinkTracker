import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../shared/entity-base';
import { LinkModel } from '../model/link.model';

@Entity('link')
export class LinkEntity extends EntityBase implements LinkModel {
  @Column({ name: 'original_url' })
  originalUrl: string;

  @Column({ name: 'masked_url', unique: true })
  maskedUrl: string;

  @Column({ name: 'expiration_date', type: 'datetime' })
  expirationDate: Date;

  @Column({ name: 'redirect_count', default: 0 })
  redirectCount: number;

  @Column({ name: 'is_valid', default: true })
  isValid: boolean;
}

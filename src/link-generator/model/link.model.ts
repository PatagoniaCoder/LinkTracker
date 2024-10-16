import { v4 as uuid4 } from 'uuid';
import * as days from 'dayjs';
export class LinkModel {
  id: string;
  originalUrl: string;
  maskedUrl: string;
  expirationDate: Date;
  redirectCount: number;
  isValid: boolean;

  constructor(originalUrl: string) {
    this.id = uuid4();
    this.originalUrl = originalUrl;
    this.maskedUrl = uuid4().split('-')[0];
    this.expirationDate = days().add(30, 's').toDate();
    this.isValid = true;
    this.redirectCount = 0;
  }
}

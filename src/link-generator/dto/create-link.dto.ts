import { IsNotEmpty, IsString, isURL, IsUrl, validate } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl({
    require_protocol: true,
  })
  url: string;
}

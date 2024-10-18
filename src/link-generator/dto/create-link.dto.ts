import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl({
    require_protocol: true,
  })
  url: string;
}

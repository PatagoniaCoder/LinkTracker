import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateLinkDto } from './dto/create-link.dto';
import { MaskedUrl } from './interfaces/masked-url';
import { LinkGeneratorService } from './link-generator.service';

@Controller('link-generator')
export class LinkGeneratorController {
  constructor(private readonly linkGeneratorService: LinkGeneratorService) {}
  @Post()
  async create(@Body() body: CreateLinkDto): Promise<MaskedUrl> {
    return await this.linkGeneratorService.generate(body);
  }

  @Get(':id')
  async redirect(
    @Param('id') id: string,
    @Query() query: string,
    @Res() res: Response,
  ) {
    const originalUrl = await this.linkGeneratorService.trackAndRedirect(id);
    const params = Object.keys(query).reduce((prev, acc, idx) => {
      prev += `${acc}=${query[acc]}${Object.keys(query)[idx + 1] ? '&' : ''}`;
      return prev;
    }, '');
    res.redirect(`${originalUrl}${params ? '?' + params : ''}`);
  }

  @Get(':id/stats')
  async stats(@Param('id') id: string) {
    return await this.linkGeneratorService.counterStats(id);
  }

  @Put(':id')
  async invalidateLink(@Param('id') id: string) {
    return await this.linkGeneratorService.invalidateLink(id);
  }
}

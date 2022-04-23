import { ConvertService } from '@backend/convert/convert.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ConversionDto } from '@backend/convert/dtos/inputs/conversion.dto';
import { RateOutputDto } from '@backend/convert/dtos/output/rate-output.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Api')
@Controller()
export class AppController {
  constructor(private readonly convertService: ConvertService) {}

  @Get('quote')
  async convertData(@Query() data: ConversionDto): Promise<RateOutputDto> {
    return this.convertService.convertData(data);
  }
}

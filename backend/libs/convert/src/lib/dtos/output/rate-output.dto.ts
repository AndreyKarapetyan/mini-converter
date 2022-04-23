import { SupportedCurrencies } from '../../types';
import {ApiProperty} from '@nestjs/swagger'

export class RateOutputDto {
  @ApiProperty()
  exchange_rate: number;

  @ApiProperty()
  currency_code: SupportedCurrencies;

  @ApiProperty()
  amount: number;
}
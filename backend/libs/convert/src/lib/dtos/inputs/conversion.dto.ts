import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { SupportedCurrencies } from '../../types';
import { Type } from 'class-transformer';

export class ConversionDto {
  @IsEnum(SupportedCurrencies)
  from_currency_code: SupportedCurrencies;

  @IsPositive()
  @IsInt()
  @Type(() => Number)
  amount: number;

  @IsEnum(SupportedCurrencies)
  to_currency_code: SupportedCurrencies;
}

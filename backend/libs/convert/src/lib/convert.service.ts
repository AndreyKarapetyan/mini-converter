import axios from 'axios';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConversionDto } from './dtos/inputs/conversion.dto';
import { RateOutputDto } from './dtos/output/rate-output.dto';

@Injectable()
export class ConvertService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async convertData(data: ConversionDto): Promise<RateOutputDto> {
    const { from_currency_code, amount, to_currency_code } = data;
    const key = `${from_currency_code}_${to_currency_code}`;
    let rate: number = await this.cacheManager.get(key);
    if (!rate) {
      const url = `${process.env.CURRENCY_API_URL}?base_currency=${from_currency_code}&currencies=${to_currency_code}`;
      const apiResult = await axios.get(url, {
        headers: {
          apikey: process.env.CURRENCY_API_KEY,
        },
      });
      rate = apiResult?.data?.data[to_currency_code]?.value;
      if (!rate) {
        throw new Error('Something went wrong');
      }
      await this.cacheManager.set(key, rate);
    }
    const calcedValue = Number((amount * rate).toFixed(3));
    const result: RateOutputDto = {
      currency_code: to_currency_code,
      exchange_rate: rate,
      amount: calcedValue,
    };
    return result;
  }
}

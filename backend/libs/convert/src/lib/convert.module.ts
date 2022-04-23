import { CacheModule, Module } from '@nestjs/common';
import { ConvertService } from './convert.service';

@Module({
  imports: [CacheModule.register({ ttl: 10 })],
  providers: [ConvertService],
  exports: [ConvertService],
})
export class ConvertModule {}

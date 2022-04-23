import { AppController } from './controllers/app.controller';
import { ConvertModule } from '@backend/convert/convert.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConvertModule],
  controllers: [AppController],
})
export class AppModule {}

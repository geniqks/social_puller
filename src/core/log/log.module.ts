import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogRepository } from './repositories/log.repository';
import { LogModel, LogSchema } from './schemas/log.schema';
import { LogService } from './services/log.service';

const exported = [LogService];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LogModel.name, schema: LogSchema, collection: 'logs' },
    ]),
  ],
  providers: [...exported, LogRepository],
  exports: exported,
})
export class LogModule {}

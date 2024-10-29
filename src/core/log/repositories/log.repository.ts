import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogModel } from '../schemas/log.schema';

@Injectable()
export class LogRepository {
  constructor(
    @InjectModel(LogModel.name) private readonly logModel: Model<LogModel>,
  ) {}

  public async createLog(log: LogModel) {
    return this.logModel.create(log);
  }
}

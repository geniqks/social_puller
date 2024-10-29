import { Injectable } from '@nestjs/common';
import { LogModel } from '../schemas/log.schema';
import { LogRepository } from '../repositories/log.repository';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}

  public async createLog(log: LogModel) {
    return this.logRepository.createLog(log);
  }
}

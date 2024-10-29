import { Injectable } from '@nestjs/common';
import { LogRepository } from '../repositories/log.repository';
import { LogModel } from '../schemas/log.schema';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}

  public async createLog(log: LogModel) {
    return this.logRepository.createLog(log);
  }
}

import { Body, Injectable, Post, ValidationPipe } from '@nestjs/common';
import { LogModel } from '../schemas/log.schema';
import { LogService } from '../services/log.service';

@Injectable()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  public async createLog(@Body(ValidationPipe) body: LogModel) {
    return this.logService.createLog(body);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { IBrightDataMonitorInput } from '../interfaces/brightdata-monitor-input.interface';
import { BrightDataMonitorRepository } from '../repositories/brightdata-monitor.repository';

@Controller('brightdata/monitor')
export class BrightDataMonitorController {
  constructor(
    private readonly brightDataMonitorRepository: BrightDataMonitorRepository,
  ) {}

  @Get()
  public async getBrightDataMonitor(
    @Query() query: { snapshot_id: string; url: string },
    @Res() res: Response,
  ): Promise<void> {
    const { snapshot_id, url } = query;
    const monitorResponse =
      await this.brightDataMonitorRepository.getTransaction(snapshot_id, url);
    res.status(StatusCodes.OK).send(monitorResponse);
  }

  @Post()
  public async createMonitor(
    @Body() body: IBrightDataMonitorInput,
    @Res() res: Response,
  ): Promise<void> {
    const { snapshot_id, status, error_message } = body;
    await this.brightDataMonitorRepository.updateTransactionStatus({
      snapshot_id,
      status,
      error_message,
    });

    res.status(HttpStatus.OK).send(ReasonPhrases.OK);
  }
}

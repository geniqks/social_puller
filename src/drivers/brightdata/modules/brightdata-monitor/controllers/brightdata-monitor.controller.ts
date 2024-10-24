import { Controller, Get } from '@nestjs/common';

@Controller('brightdata/monitor')
export class BrightDataMonitorController {
  @Get()
  public async getBrightDataMonitor(): Promise<string> {
    return 'salut';
  }
}

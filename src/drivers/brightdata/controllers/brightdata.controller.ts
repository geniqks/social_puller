import { Controller, Get } from '@nestjs/common';

@Controller('brightdata')
export class BrightDataController {
  @Get()
  public async getBrightData(): Promise<string> {
    return 'salut 2';
  }
}

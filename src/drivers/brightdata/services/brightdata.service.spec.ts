import { Test, TestingModule } from '@nestjs/testing';
import { BrightdataService } from './brightdata.service';

describe('BrightdataService', () => {
  let service: BrightdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrightdataService],
    }).compile();

    service = module.get<BrightdataService>(BrightdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

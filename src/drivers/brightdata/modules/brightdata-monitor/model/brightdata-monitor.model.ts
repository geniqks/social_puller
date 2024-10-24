import { getModelForClass } from '@typegoose/typegoose';
import { BrightDataMonitorDto } from '../dto/brightdata-monitor.dto';

export const BRIGHTDATA_MONITOR_MODEL = 'BRIGHTDATA_MONITOR_MODEL';

export const BrightDataMonitorModel = getModelForClass(BrightDataMonitorDto, {
  schemaOptions: {
    collection: 'brightdata_monitor',
  },
});

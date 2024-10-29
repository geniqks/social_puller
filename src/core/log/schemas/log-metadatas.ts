import { Prop, Schema } from '@nestjs/mongoose';
import { LogType } from '../enums/log-types.enum';

@Schema()
export class LogMetadatas {
  @Prop({ type: String, enum: LogType })
  type: LogType;

  @Prop({ type: String })
  url?: string;
}

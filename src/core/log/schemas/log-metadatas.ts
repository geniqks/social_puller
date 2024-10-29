import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LogTypeEnum } from '../enums/log-types.enum';

@Schema()
export class LogMetadatas {
  @Prop({
    type: String,
    enum: LogTypeEnum,
  })
  type: LogTypeEnum;

  @Prop({ type: String })
  url?: string;
}

export const LogMetadatasSchema = SchemaFactory.createForClass(LogMetadatas);

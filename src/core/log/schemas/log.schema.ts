import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDefined } from 'class-validator';
import { LogMetadatas, LogMetadatasSchema } from './log-metadatas';

@Schema()
export class LogModel {
  @IsDefined()
  @Prop({ type: LogMetadatasSchema })
  public metadatas: LogMetadatas;

  @Prop({ default: () => new Date() })
  public created_at?: Date;
}

export const LogSchema = SchemaFactory.createForClass(LogModel);

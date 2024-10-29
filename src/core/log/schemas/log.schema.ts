import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDefined } from 'class-validator';
import { LogMetadatas } from './log-metadatas';

@Schema()
export class LogModel {
  @IsDefined()
  @Prop()
  public metadatas!: LogMetadatas;

  @Prop({ default: () => new Date() })
  public created_at?: Date;
}

export const LogSchema = SchemaFactory.createForClass(LogModel);

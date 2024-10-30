import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class UserSchema {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

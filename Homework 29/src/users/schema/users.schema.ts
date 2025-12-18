import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  username: string;

  @Prop({ type: Number })
  age: Number;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String, select: false })
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);

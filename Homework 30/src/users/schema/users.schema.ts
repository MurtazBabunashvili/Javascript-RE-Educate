import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from 'src/enums/role.enum';

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

  @Prop({ type: String, default: Role.USER })
  role: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
  posts: [mongoose.Schema.Types.ObjectId];
}

export const userSchema = SchemaFactory.createForClass(User);

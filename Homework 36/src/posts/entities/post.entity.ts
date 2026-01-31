import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;
}

export const postSchema = SchemaFactory.createForClass(Post);

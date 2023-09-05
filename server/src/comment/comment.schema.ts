import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  idUser: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'ProductsMovie' })
  idMovie: Types.ObjectId;
  @Prop()
  titleComment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

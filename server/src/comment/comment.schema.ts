import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  idUser: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'ProductsMovie' })
  idMovie: Types.ObjectId;

  @Prop({ required: true, type: Number, min: 0, max: 5, default: 0 }) // Đặt giá trị mặc định là 1
  rating: number;

  @Prop()
  titleComment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

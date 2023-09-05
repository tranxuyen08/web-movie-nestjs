import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema({ timestamps: true })
export class Favorite extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  idUser: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'ProductsMovie' })
  idMovie: Types.ObjectId;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

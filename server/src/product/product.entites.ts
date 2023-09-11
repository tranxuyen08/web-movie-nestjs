import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = ProductsMovie & Document;

@Schema()
export class ProductsMovie extends Document {
  @Prop({unique: true})
  title: string;

  @Prop({default : 0})
  vote_average: number;

  @Prop()
  release_date: Date;

  @Prop()
  overview: string;

  @Prop()
  video: string;

  @Prop([String])
  typeMovie: string[];

  @Prop({required: true})
  backdrop_path: string;

  @Prop({required: true})
  poster: string;

  @Prop({required : true})
  role_movie: number;

  @Prop({default: 0})
  popularity: number;
  @Prop({required : true})
  runtime: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductsMovie);

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = ProductsMovie & Document;

@Schema()
export class ProductsMovie extends Document {
  @Prop({unique: true})
  title: string;

  @Prop()
  vote_average: number;

  @Prop()
  release_date: Date;

  @Prop()
  overview: string;

  @Prop()
  video: string;

  @Prop([String])
  typeMovie: string[];

  @Prop()
  backdrop_path: string;

  @Prop()
  poster: string;

  @Prop()
  role_movie: number;

  @Prop()
  popularity: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductsMovie);

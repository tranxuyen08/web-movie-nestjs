import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
export type HistoryDocument = History & Document;

@Schema({ timestamps: true })
export class History extends Document {
  @Prop({ required: true, unique: true, ref: "User" , type: Types.ObjectId}) // Set required to true
  idUser: ObjectId
  @Prop({type : Number})
  price : number
  @Prop({type : Date})
  expiration_Date: Date
  @Prop({type : Date})
  // ngay heet han
  SubscriptionEndDate ?: Date
  @Prop({type: Boolean})
  LifetimeSubscriber : boolean
}

export const HistorySchema = SchemaFactory.createForClass(History);

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { Exclude } from 'class-transformer';
export type AuthUserGooglesDocument = AuthUserGoogle & Document;

@Schema({ timestamps: true })
export class AuthUserGoogle extends Document {
  @Prop({ required: true }) // Set required to true
  firstName: string;

  @Prop({ required: true }) // Set required to true
  lastName: string;

  @Prop({ required: true, unique: true }) // Set required to true
  email: string;

  // @Exclude() // ẩn đi filed mình muốn
  @Prop({ required: true }) // Set required to true
  password: string;

  @Prop({ default: 1 })
  role_admin: number;

  @Prop({ default: 1 })
  role_subscription: number;

  @Prop({ default: 1 })
  role_active: number;

  @Prop({ default: './image/zyro-image (3).png' })
  avatar: string;

  @Prop({type: Date, default: null})
  expiration_Date ?: Date
}

export const AuthUserGooglesSchema = SchemaFactory.createForClass(AuthUserGoogle);

import { Module } from '@nestjs/common';
import { GoogleAuthController } from './authGoogle.controller';
import { GoogleAuthService } from './authGoogle.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/user/user.schema';
import { authGooglesSchema } from './authGoogle.schema';
require("dotenv").config()

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY, // Thay bằng secret key thực tế
      signOptions: { expiresIn: '15m' },
    }),
    MongooseModule.forFeature([{ name: "authGoogle", schema: authGooglesSchema, collection: 'authGoogle' }]),
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService],
})
export class GoogleAuthModule {}